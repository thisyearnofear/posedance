import { createRouter, createWebHistory } from 'vue-router';

const Landing = () => import('@/views/Landing.vue');
const Dance = () => import('@/views/Dance.vue');
const Leaderboard = () => import('@/views/Leaderboard.vue');

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/dance/:videoId', name: 'Dance', component: Dance, props: true },
  { path: '/leaderboard/:videoId', name: 'Leaderboard', component: Leaderboard, props: true },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});