/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";

import HomeView from "../views/HomeView.vue";
import NotFound404 from "../views/error/NotFound404.vue";
import store from "@/store/index.js";
import searchStore from "@/store/modules/searchStore";

import "../../node_modules/nprogress/nprogress.css";
import "@/assets/css/progress.css";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title:
        "KICKIN | 킥인 - 세상 모든 브랜드의 제품 정보를 모아보다. 내가 만드는 상품 빅데이터 | 정보를 등록하고 한정판 스니커즈 응모 기회를!",
    },
  },
  {
    path: "/kicks/",
    name: "sneakers",
    component: () =>
      import(
        /* webpackChunkName: "sneakers" */ "../views/sneakers/SneakerView.vue"
      ),
    meta: {
      title: "제품 검색",
    },
  },
  {
    path: "/kicks/updateInfo/:id?",
    name: "updateInfo",
    component: () =>
      import(
        /* webpackChunkName: "updateInfo" */ "../views/sneakers/UpdateInfoView.vue"
      ),
  },
  {
    path: "/product/detail/:id",
    name: "detail",
    component: () =>
      import(
        /* webpackChunkName: "detail" */ "../views/sneakers/SneakerDetailView.vue"
      ),
  },

  {
    path: "/calendar",
    name: "calendar",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/CalendarView.vue"),
  },
  {
    path: "/login/:next?/:id?",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/user/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/agreement",
    name: "agreement",
    component: () =>
      import(
        /* webpackChunkName: "agreement" */ "../views/user/UserAgreementView.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/registration",
    name: "regist",
    component: () =>
      import(
        /* webpackChunkName: "regist" */ "@/components/user/UserRegistration"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/raffle",
    name: "raffle",
    component: () =>
      import(/* webpackChunkName: "raffle" */ "../views/RaffleView.vue"),
  },
  {
    path: "/culture",
    name: "culture",
    component: () =>
      import(/* webpackChunkName: "culture" */ "../views/CultureView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/auction",
    name: "auction",
    component: () =>
      // import(/* webpackChunkName: "auction" */ "../views/AuctionView.vue"),
      import(
        /* webpackChunkName: "auction" */ "../views/error/DevelopPage.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/user/UserPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/admin/AdminView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/loading",
    name: "loading",
    component: () =>
      import(
        /* webpackChunkName: "loading" */ "../views/common/LoadingView.vue"
      ),
    meta: { requiresAuth: false },
  },
  {
    path: "/404",
    name: "NotFound404",
    component: NotFound404,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  console.log("#####nam#####: ", to.name);
  const resetStoreRoute = ["sneakers", "detail", "updateInfo"];
  if (to.name) {
    if (!resetStoreRoute.includes(to.name)) {
      console.log(resetStoreRoute.includes(to.name), to.name);
      console.log('to.name != "sneakers" || to.name != "detail"');
      store.dispatch("searchStore/reset_result");
    }
    store.commit("SET_LOADING_STATE", true);
    NProgress.start();
  }
  next();
});

router.beforeResolve((to, from, next) => {
  next();
});

router.afterEach((to, from) => {
  const title = to.meta && to.meta.title ? to.meta.title : "KICKIN | 킥인";
  console.log("router.afterEach");
  Vue.nextTick(() => {
    document.title = title;
  });
  store.commit("SET_LOADING_STATE", false);
  NProgress.done();
});

// NavigationDuplicated Error Handler
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== "NavigationDuplicated") throw err;
  });
};

export default router;
