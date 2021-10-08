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
      path: "/dataList",
      name: "dataList",
      meta: {
        title: "数据列表",
      },
      component: () => import("../components/dataList.vue"),
    },
    {
      path: "/choose",
      name: "choose",
      meta: {
        title: "方案选择",
      },
      component: () => import("../components/choose.vue"),
    },
    {
      path: "/chooseCargo",
      name: "chooseCargo",
      meta: {
        title: "货车选择",
      },
      component: () => import("../components/chooseCargo.vue"),
    },
    {
      path: "/truckInput",
      name: "truckInput",
      meta: {
        title: "货车参数修改",
      },
      component: () => import("../components/truckInput.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../components/test.vue"),
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
