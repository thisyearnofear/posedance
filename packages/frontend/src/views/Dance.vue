<template>
  <div class="flex flex-col items-center py-8">
    <h2 class="text-2xl font-bold mb-4">Dance Challenge</h2>
    <div class="mb-4">Video: {{ videoId }}</div>
    <video ref="videoRef" class="mb-4" controls autoplay loop width="480" />
    <div class="mb-4">
      <button class="bg-green-500 text-white px-4 py-2 rounded" @click="startDance" :disabled="dancing">
        {{ dancing ? 'Dancing...' : 'Start Dance' }}
      </button>
    </div>
    <div v-if="score !== null" class="mb-4 text-xl font-semibold">
      Your Score: {{ score }}
    </div>
    <button
      v-if="score !== null && !recording"
      class="bg-blue-600 text-white px-4 py-2 rounded"
      @click="recordScore"
    >
      Record Score (on-chain)
    </button>
    <div v-if="txHash" class="mt-4 text-green-700">Submitted! Tx: {{ txHash }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePose } from '@/composables/usePose';
import axios from 'axios';

const route = useRoute();
const videoId = Number(route.params.videoId);

// Demo video URLs (replace with IPFS later)
const videoUrls = [
  '', // 0-index not used
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
  'https://samplelib.com/mp4/sample-720p.mp4',
];

const videoRef = ref<HTMLVideoElement | null>(null);
const dancing = ref(false);
const score = ref<number | null>(null);
const txHash = ref('');
const recording = ref(false);

const { getKeypoints } = usePose();

async function startDance() {
  dancing.value = true;
  score.value = null;
  // Simulate: get webcam & reference keypoints, send to backend
  const keypointsA = await getKeypoints(); // webcam (user)
  const keypointsB = await getKeypoints(); // reference (mock)
  const wallet = '0xUserWallet'; // replace with wallet store
  const timestamp = Date.now();
  // Call backend scoring function
  try {
    const { data } = await axios.post(import.meta.env.VITE_SCORE_FUNCTION_URL, {
      wallet,
      videoId,
      keypointsA,
      keypointsB,
      timestamp,
    });
    score.value = data.score;
  } catch (e) {
    alert('Scoring failed');
  }
  dancing.value = false;
}

async function recordScore() {
  recording.value = true;
  // TODO: connect wallet, send submitScore tx
  setTimeout(() => {
    txHash.value = '0xFakeTxHash';
    recording.value = false;
  }, 1500);
}
</script>