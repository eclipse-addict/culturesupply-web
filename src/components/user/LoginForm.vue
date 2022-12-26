<template>
<div>
    <div class="container  p-0" style="box-shadow: #24212163 3px 1px 5px; width: 327px;">
      <div v-show="isFailed" class="text-white alert w-100 text-start" style="background-color: #e91300;" role="alert">
        Invalid Login or password
      </div>
      <p class="display-6 fw-bold text-center text-black">KickIn</p>
      <hr/>
      <div class="fw-bold text-center form-control border-bottom-0 rounded-top rounded-0 p-3">Sign in</div>
      <div class="border border-primary"></div>
      <div class="form-control border-top-0 rounded-bottom rounded-0 p-4">
        <form @submit.prevent @keyup.enter="signinRequest">
          <div class="mb-3">
            <label for="inputEmail" class="fw-bold form-label">
              email 
            </label>
            <input type="email" v-model="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="email@address.com"/>
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="fw-bold form-label">Password</label>
            <input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="password"/>
          </div>
          <div class="d-flex row justify-content-between mb-3 form-check">
            <div class="">
              <input type="checkbox" class="form-check-input" id="check"/>
              <label class="form-check-label" for="check">
                Remember me
              </label>
            </div>
            <div>
            <a href="#" class="text-decoration-none">
              Forgot your password?
            </a>
            </div>
          </div>
          <button @click="signinRequest" class="btn btn-outline-success w-100" type="button">
            Sign in
          </button>
          <button @click="toAgreement" class="btn btn-outline-success w-100 mt-1 mb-4" type="button">
            Sign up
          </button>
          <span class="row d-flex btn-group-vertical  justify-content-center align-content-center">

          <img src="@/assets/images/btn_google_signin_dark_normal_web@2x.png"  class="mt-2 img-fluid mouse-over-pointer" style="max-width: 280px;"/>
          <img src="@/assets/images/kakao_login_medium_narrow.png" class="mt-2 img-fluid mouse-over-pointer" style="max-width: 280px;"/>
          <img src="@/assets/images/btnW_official.png" class="mt-2 img-fluid mouse-over-pointer" style="max-width: 280px;"/>
          </span>
        </form>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
const url = 'http://localhost:8000/'

export default {
  name: 'LoginView',
  data () {
    return {
      isFailed : false,
      email : null,
      password : null,

    }
  },
  methods : {
    toAgreement () {
      this.$router.push({path: '/agreement'})
    },
    signinRequest () {
      const email = this.email
      const password = this.password
      
      const payload = {
        email,
        password,
      }

      axios({
        method: 'POST',
        url : url + 'user/dj-rest-auth/login/',
        data: {
          email: payload.email,
          password: payload.password,
        }
      }).then(res => {
        console.log('login request', res.data);
        this.userInfo_req(res.data.access_token, res.data.user.pk)
        this.$store.dispatch('signinRequest', res.data)
        .then(() => {
          const id =this.$route.query.next
          console.log('login id', id)
          if(id){
            this.$router.push({ name: "detail", params: { id } });
          }else{
            this.$router.push({name:'home'})}
          }
        )
      }).catch(err =>{
        this.isFailed = true; // 로그인 실패 메세지 출력 
        console.log('login request error', err);
      })

    },
    userInfo_req(token, user_id){

      axios({
        method: "GET",
        url: this.$store.state.dev_url+"user/userinfo/get/"+user_id+'/',
        headers: {
          'Authorization':'Bearer '+token,
          },
      }).then(res => {
        console.log(res.data)
        this.$store.dispatch('setUserInfo', res.data)
      }).catch(err => {
        console.log('err; ', err)
      })
      
    }
  },
  watch:{
    // 로그인 실패 메시지 가리기 
    password(val){
      if (val.length <= 0){
        this.isFailed = false;
      }
    }
  },

}
</script>

<style scoped>
  .mouse-over-pointer {
    cursor: pointer;
  }

</style>