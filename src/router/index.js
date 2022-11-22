/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import  store  from "@/store/index.js";


Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    name: 'home', 
    component: HomeView
  },
  {
    path: '/sneakers',
    name: 'sneakers', 
    component: () => import('../views/SneakerView.vue')
  },
  {
    path: '/login',
    name: 'login', 
    component: () => import('../views/user/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login/agreement',
    name: 'agreement', 
    component: () => import('../views/user/UserAgreementView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login/regist',
    name: 'regist', 
    component: () => import('@/components/user/UserRegistration'),
    meta: { requiresAuth: false }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('from',from)
  console.log('to',to)
  console.log('next', next)

  const authRequired = ['create',]

  // if (to.path != "/login") { // 로그인을 제외한 요청이 들어왔을 때 
  //   console.log('to.path != "/login"', to.path != "/login")
  //   if (store.getters.authentificate) { // 로그인 된 유저라면 ? 
  //     next(); // 요청한 페이지로 랜더링 
  //   } else { // 로그인 되있는 사용자가 아니라면 ? 
  //     if(to.path == "/agreement") {
  //       next();
  //     }else{
  //       next("/login");
  //     }
  //   }
  // } else {
    next();
  // }
});
// NavigationDuplicated Error Handler
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

export default router
