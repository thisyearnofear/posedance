import Vue from "vue";
import Router from "vue-router";

import Dance from "@/views/DanceView.vue";
import SelectVideo from "@/views/SelectVideo.vue";
import Login from "@/views/LoginView.vue";
import Register from "@/views/RegisterView.vue";
import Leaderboard from "@/views/LeaderboardView.vue";

import store from "./store.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: SelectVideo,
    },
    {
      path: "/dance/:id",
      name: "Dance",
      component: Dance,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: Leaderboard,
    },
    {
      path: "/blank",
      name: "blank",
      component: {
        template: "<div></div>",
        beforeRouteEnter(to, from, next) {
          next(() => {
            setTimeout(() => {
              window.location.href = from.fullPath;
            }, 100);
          });
        },
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
