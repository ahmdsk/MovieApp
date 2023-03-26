import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: "/",
    component: () => import("./views/Home.vue"),
  },
  {
    name: 'detail-movie',
    path: "/:slug",
    component: () => import("./views/DetailMovie.vue"),
  },
  {
    path: "/about",
    component: () => import("./views/About.vue"),
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;