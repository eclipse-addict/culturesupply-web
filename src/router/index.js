/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';

import HomeView from '../views/HomeView.vue'
import NotFound404 from '../views/error/NotFound404.vue'
import  store  from "@/store/index.js";

import '../../node_modules/nprogress/nprogress.css'
import '@/assets/css/progress.css';
Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    name: 'home', 
    component: HomeView
  },
  {
    path: '/kicks/',
    name: 'sneakers',
    component: () => import('../views/sneakers/SneakerView.vue'),
  },
  {
    path: '/kicks/updateInfo/:id?',
    name: 'updateInfo',
    component: () => import('../views/sneakers/UpdateInfoView.vue'),

  },
  {
    path: '/product/detail/:id',
    name: 'detail', 
    component: () => import('../views/SneakerDetailView.vue')
  },
  {
    path: '/calendar',
    name: 'calendar', 
    component: () => import('../views/CalendarView.vue')
  },
  {
    path: '/login/:next?/:id?',
    name: 'login', 
    component: () => import('../views/user/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/agreement',
    name: 'agreement', 
    component: () => import('../views/user/UserAgreementView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/registration',
    name: 'regist', 
    component: () => import('@/components/user/UserRegistration'),
    meta: { requiresAuth: false }
  },
  {
    path: '/culture',
    name: 'culture', 
    component: () => import('../views/CultureView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/auction',
    name: 'auction', 
    component: () => import('../views/AuctionView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})


router.beforeEach((to, from, next) => {
  if (to.name) {
    
    store.commit('SET_LOADING_STATE', true);
    NProgress.start()
    }
    next()
})

router.beforeResolve((to, from, next) => {
  next()
});

router.afterEach((to, from) => {
  console.log('router.afterEach')
  store.commit('SET_LOADING_STATE', false);
  NProgress.done()
})


// NavigationDuplicated Error Handler
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

export default router
