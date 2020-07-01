import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";
import LayoutSubApp from "@/layout/index_subapp";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/master-index",
        name: "master-home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
      },
    ],
  },
  {
    path: "/master-about",
    name: "master-about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/app1*",
    name: "app1",
    component: LayoutSubApp,
    children: [
      {
        path: "*",
        component: () =>
          import(
            /*webpackChunkName:"qiankun" */ "../components/framework/index.vue"
          ),
      },
    ],
  },
  {
    path: "/app2*",
    name: "app2",
    component: LayoutSubApp,
    children: [
      {
        path: "*",
        component: () =>
          import(
            /*webpackChunkName:"qiankun" */ "../components/framework/index.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
