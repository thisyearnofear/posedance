import type { Handler } from '@netlify/functions';
import { createHash } from 'crypto';
import stringify from 'fast-json-stable-stringify';

// MVP: simple average cosine similarity between keypoints
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

// Assume POST { wallet, videoId, keypointsA, keypointsB, timestamp }
const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Malformed JSON' };
  }

  const { wallet, videoId, keypointsA, keypointsB, timestamp } = body;
  if (
    !wallet ||
    typeof videoId !== 'number' ||
    !Array.isArray(keypointsA) ||
    !Array.isArray(keypointsB) ||
    keypointsA.length !== keypointsB.length ||
    typeof timestamp !== 'number'
  ) {
    return { statusCode: 400, body: 'Invalid input' };
  }

  let total = 0, count = 0;
  for (let i = 0; i < keypointsA.length; i++) {
    if (
      Array.isArray(keypointsA[i]) &&
      Array.isArray(keypointsB[i]) &&
      keypointsA[i].length === keypointsB[i].length
    ) {
      total += cosineSimilarity(keypointsA[i], keypointsB[i]);
      count++;
    }
  }
  const avg = count ? total / count : 0;
  // Score: scale 0-100, min 0
  const score = Math.round(Math.max(avg, 0) * 100);

  // Create bytes32 hash (keccak256) of {wallet, videoId, score, timestamp}
  const encoded = stringify({ wallet, videoId, score, timestamp });
  const hash = '0x' + createHash('keccak256').update(encoded).digest('hex').slice(0, 64);

  return {
    statusCode: 200,
    body: JSON.stringify({ score, hash }),
    headers: { 'content-type': 'application/json' },
  };
};

export { handler as default };