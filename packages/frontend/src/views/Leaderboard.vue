<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Leaderboard for Video {{ videoId }}</h2>
    <div v-if="leaderboard.length === 0" class="italic text-gray-600">No scores yet.</div>
    <ul>
      <li v-for="entry in leaderboard" :key="entry.address" class="mb-2">
        <span class="font-mono">{{ entry.address }}</span>
        <span class="ml-4 font-bold">{{ entry.score }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// TODO: fetch leaderboard from contract events (wagmi)
const route = useRoute();
const videoId = Number(route.params.videoId);

const leaderboard = ref<{ address: string; score: number }[]>([]);

onMounted(() => {
  leaderboard.value = [
    { address: '0x111...', score: 95 },
    { address: '0x222...', score: 90 },
  ];
});
</script>