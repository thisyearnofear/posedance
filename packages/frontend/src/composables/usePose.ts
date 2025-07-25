// MVP: stubbed pose detection composable
export function usePose() {
  // In real app, load MoveNet in a web worker, get video/camera frames, return keypoints
  async function getKeypoints(): Promise<number[][]> {
    // Return fake keypoints for demo
    return Array(17)
      .fill(0)
      .map(() => [Math.random(), Math.random(), Math.random()]);
  }
  return { getKeypoints };
}