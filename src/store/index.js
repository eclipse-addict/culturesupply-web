/* eslint-disable no-unused-vars */
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const url = 'http://localhost:8000/'

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    isLoading : false,
    user_data : {
      email: null,
      pk : null,
      access_token : null,
      refresh_token : null,
    },

  },
  getters: {
    // getLoadingState(state) {
    //   return state.isLoading
    // }
  },
  mutations: {
    SET_USER_TOKEN(state, payload){

      state.user_data.access_token = payload.access_token
      state.user_data.refresh_token = payload.refresh_token
      state.user_data.email = payload.user.email
      state.user_data.pk = payload.user.pk

      const user = JSON.stringify(state.user_data);

      window.localStorage.setItem('user', user);
    },
    DELETE_USER_TOKEN(state){
      state.user_data.access_token = null
      state.user_data.refresh_token = null
      state.user_data.email = null
      state.user_data.pk = null

      window.localStorage.removeItem('user');
    },

    SET_LOADING_STATE(state, payload){
      state.isLoading = payload
    },
  },
    
  actions: {
    signinRequest (context, payload){
      // form component 에서 로그인 요청 후, 
      //결과에 따라서 세션 저장하러 vuex action 호출
      // 로그인 실패까지도 vuex 에서 모두 처리할 필요 없다고 판단. 
      context.commit('SET_USER_TOKEN', payload);
    },
    signupRequest (context, payload){
      
      axios({
        method: 'POST',
        url : url + 'user/dj-rest-auth/registration/',
        data: {
          email: payload.email,
          password1: payload.password,
          password2: payload.password,
        }
      }).then(res =>{
        context.commit('SET_USER_TOKEN', res.data);
        console.log('signup res', res);
      }).catch(err =>{
        console.log('signup err', err);
      })
    },
    signoutRequest(context){
      axios({
        method: 'POST',
        url: url + 'user/dj-rest-auth/logout/',
        headers: {
          Authorization: 'Bearer ' + this.state.user_data.access_token
        },
      }).then(res =>{
        console.log('logout request response: ', res);
        context.commit('DELETE_USER_TOKEN');

      }).catch(err =>{
        console.log('logout request error: ', err);
      })
    },
    setLoading(context){
      console.log('callll')
      context.commit('SET_LOADING_STATE', false);
    },

  },
  modules: {
  }
})
