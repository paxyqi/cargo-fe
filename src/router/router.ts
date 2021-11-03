import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(), // route model
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../components/login.vue"),
      meta: {
        title: "登录",
      },
    },
    {
      path: "/chooseTruck",
      name: "chooseTruck",
      meta: {
        title: "货车选择",
      },
      component: () => import("../components/chooseTruck.vue"),
    },
    {
      path: "/show",
      name: "show",
      meta: {
        title: "结果展示",
      },
      component: () => import("../components/show.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;
