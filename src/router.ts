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
    name: 'detail-tv',
    path: "/tv/:slug",
    component: () => import("./views/DetailTV.vue"),
  },
  {
    name: 'stream-tv-eps',
    path: "/tv/eps/:slug",
    component: () => import("./views/DetailTVStream.vue"),
  },
  {
    name: 'search',
    path: "/search",
    component: () => import("./views/Search.vue"),
  },
  {
    name: 'category',
    path: "/category/:slug",
    component: () => import("./views/MovieCategory.vue"),
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