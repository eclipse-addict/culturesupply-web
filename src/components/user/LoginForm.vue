<template>
  <container>
    <v-row
      align-content="center"
      align-content-xl="center"
      justify="center"
      style="opacity: 50"
    >
      <v-col
        v-show="isFailed"
        class="text-white alert w-100 text-start"
        style="background-color: #e91300"
        role="alert"
        lg="6"
      >
        이메일 또는 비밀번호가 일치하지 않습니다.
      </v-col>
      <!-- <p class="display-6 fw-bold text-center text-black">KickIn</p> -->
      <v-col
        cols="auto"
        lg="6"
        md="8"
        sm="8"
        class="bg-white bg-opacity-100 mt-16 px-10"
      >
        <span class="h2 fw-bolder"> LOGIN </span>

        <!-- <div class="border"></div> -->

        <form @submit.prevent @keyup.enter="signinRequest" class="mt-3">
          <div class="mb-3">
            <label for="inputEmail" class="fw-bold"> EMAIL ADDRESS </label>
            <v-text-field
              type="email"
              v-model="email"
              id="inputEmail"
              aria-describedby="emailHelp"
              placeholder="YOUR EMAIL ADDRESS"
            />
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="fw-bold">PASSWORD</label>
            <v-text-field
              type="password"
              v-model="password"
              id="inputPassword"
              placeholder="ENTER VALID PASSWORD"
            />
          </div>
          <v-row class="">
            <v-col class="">
              <v-checkbox id="check" label="Remember me" />
            </v-col>
            <v-col class="text-end mt-4">
              <a href="#" class="text-decoration-none">
                Forgot your password?
              </a>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-btn
                @click="signinRequest"
                type="button"
                height="50"
                width="230"
                color="#DDDDDD"
                ripple="false"
              >
                Sign in &nbsp;&nbsp;&nbsp;>>>
              </v-btn>
            </v-col>
            <v-col class="d-block d-lg-none d-flex justify-center">
              <v-btn
                @click="toAgreement"
                height="50"
                width="230"
                color="#DDDDDD"
                ripple="false"
              >
                Sign up
              </v-btn>
            </v-col>
          </v-row>
          <!-- social login area -->
          <v-row>
            <v-col sm="12" class="d-flex justify-center">
              <v-btn
                @click="googleSignIn"
                color="red"
                dark
                height="48"
                width="514"
              >
                <v-icon left>mdi-google</v-icon>
                Sign in with Google
              </v-btn>
            </v-col>
            <v-col sm="12" class="d-flex justify-center">
              <v-btn color="#FEE500" href="#" height="48" width="514">
                <i class="icon-kakaotalk"></i>
                Sign in with Kakao
              </v-btn>
            </v-col>
            <v-col sm="12" class="d-flex justify-center">
              <v-btn color="#06CF5D" href="#" height="48" width="514">
                <i class="icon-kakaotalk"></i>
                Sign in with Naver
              </v-btn>
            </v-col>
            <v-col cols="8"> </v-col>
          </v-row>
        </form>
      </v-col>
      <v-col
        lg="3"
        md="8"
        class="mt-16 ps-1 pt-10 bg-opacity-100 bg-white d-none d-lg-block"
      >
        <span class="h4 font-weight-lighter">아직 맴버가 아니신가요?</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ea culpa
          inventore consectetur voluptatibus nihil aperiam, sequi hic repellat
          deleniti minima dolores atque suscipit voluptatem nobis temporibus
          libero provident qui exercitationem asperiores eius aliquid nulla in!
          Alias eligendi exercitationem at unde fugit perferendis nobis sapiente
          id? Necessitatibus similique totam reprehenderit?
        </p>
        <v-btn
          @click="toAgreement"
          height="50"
          width="230"
          color="#DDDDDD"
          ripple="false"
        >
          Sign up
        </v-btn>
      </v-col>
    </v-row>
  </container>
</template>

<script>
import axios from "axios";
// const url = this.$store.state.prod_url

export default {
  name: "LoginView",
  data() {
    return {
      isFailed: false,
      email: null,
      password: null,
    };
  },
  methods: {
    toAgreement() {
      this.$router.push({ path: "/agreement" });
    },
    signinRequest() {
      const email = this.email;
      const password = this.password;

      const payload = {
        email,
        password,
      };

      axios({
        method: "POST",
        url: this.$store.state.prod_url + "user/dj-rest-auth/login/",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((res) => {
          console.log("login request", res.data);
          this.userInfo_req(res.data.access_token, res.data.user.pk);
          this.$store.dispatch("signinRequest", res.data).then(() => {
            const id = this.$route.query.next;
            console.log("login id", id);
            if (id) {
              this.$router.push({ name: "detail", params: { id } });
            } else {
              this.$router.push({ name: "home" });
            }
          });
        })
        .catch((err) => {
          this.isFailed = true; // 로그인 실패 메세지 출력
          console.log("login request error", err);
        });
    },
    userInfo_req(token, user_id) {
      axios({
        method: "GET",
        url: this.$store.state.prod_url + "user/userinfo/get/" + user_id + "/",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          console.log(res.data);
          this.$store.dispatch("setUserInfo", res.data);
        })
        .catch((err) => {
          console.log("err; ", err);
        });
    },
  },
  watch: {
    // 로그인 실패 메시지 가리기
    password(val) {
      if (val.length <= 0) {
        this.isFailed = false;
      }
    },
  },
};
</script>

<style scoped>
.mouse-over-pointer {
  cursor: pointer;
}
</style>