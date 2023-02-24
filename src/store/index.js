/* eslint-disable no-unused-vars */
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const url = 'https://www.kickin.co.kr/'

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    dev_url : "https://www.kickin.co.kr/",
    isLoading : true,
    user_data : {
      email: null,
      pk : null,
      access_token : null,
      refresh_token : null,
      nick_name: null,
      profile_img: null,
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
    SET_USER_INFO(state, payload){
      state.user_data.nick_name = payload.nick_name
      state.user_data.profile_img = state.dev_url + payload.profile_img

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
    SET_REFRESH_TOKEN(state, payload){
      state.user_data.access_token = payload.access
      
      window.localStorage.removeItem('user');

      const user = JSON.stringify(state.user_data);
      window.localStorage.setItem('user', user);
    },

    SET_LOADING_STATE(state, payload){
      console.log('SET_LOADING_STATE CALLED, payload: ', payload)
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
    setUserInfo(context, payload){
      context.commit('SET_USER_INFO', payload);

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

      }).catch(error =>{
        console.log('access_token expired', error.response.status);
        //TODO: access_token 이 만료된 경우 로그아웃 처리 불가(401) => 응답 결과에 따른 강제 로그아웃 처리 필요. 
        if(error.response.status == 401){
          context.commit('DELETE_USER_TOKEN');
        }
        
      })
    },
    refresh_token_request(context, dispatch){
      axios({
        method: 'POST',
        url: url + 'api/token/refresh/',
        headers:{"Content-Type": "application/json"},
        data: {
          'refresh': this.state.user_data.refresh_token
        },
      })
      .then(res=>{
          console.log('refresh_token');
          context.commit('SET_REFRESH_TOKEN', res.data);
        })
        .catch(err=>{
          // console.log('refresh_token_err', err);
          dispatch("signoutRequest").then(()=>{
            this.$router.push({name:'login'})
          })
        })
    },
    setLoading(context, payload){
      console.log('setLoading Called')
      context.commit('SET_LOADING_STATE', payload);
    },

  },
  modules: {
  }
})
