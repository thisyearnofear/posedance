<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-6">PoseDance</h1>
    <div class="mb-4">Choose a challenge video:</div>
    <div class="space-x-4">
      <button
        v-for="v in demoVideos"
        :key="v.id"
        class="bg-blue-500 text-white px-4 py-2 rounded"
        @click="goToDance(v.id)"
      >
        {{ v.title }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const demoVideos = [
  { id: 1, title: 'TikTok Demo 1' },
  { id: 2, title: 'TikTok Demo 2' },
  { id: 3, title: 'TikTok Demo 3' },
];

function goToDance(id: number) {
  router.push({ name: 'Dance', params: { videoId: id } });
}
</script>