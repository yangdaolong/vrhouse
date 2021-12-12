import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/home/home.vue")
  }
];

const router = createRouter({
  history: createWebHistory(""),
  routes
});

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;
