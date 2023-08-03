ㅣ
<template>
  <v-container>
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
        cols="12"
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
                :loading="loginRequestLoading"
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
              >
                Sign up &nbsp;&nbsp;&nbsp;&nbsp;>>>
              </v-btn>
            </v-col>
            <v-col class="d-flex justify-center">
              <v-btn @click="googleSignIn" color="red" dark height="48">
                <v-icon left>mdi-google</v-icon>
                Sign in with Google
              </v-btn>
            </v-col>
            <v-col class="d-flex justify-center">
              <v-btn color="#FEE500" href="#" height="48">
                <i class="icon-kakaotalk"></i>
                Sign in with Kakao
              </v-btn>
            </v-col>
            <!-- <v-col class="d-flex justify-center">
              <v-btn color="#06CF5D" href="#" height="48">
                <i class="icon-kakaotalk"></i>
                Sign in with Naver
              </v-btn>
            </v-col> -->
          </v-row>
        </form>
      </v-col>
      <v-col
        lg="3"
        md="8"
        class="mt-16 ps-1 pt-10 bg-opacity-100 bg-white d-none d-lg-block"
      >
        <span class="h4 font-weight-lighter">아직 맴버가 아니신가요?</span>
        <p
          class="text-justify"
          style="line-height: 2; margin-top: 20px; margin-bottom: 45px"
        >
          지금 바로 회원가입을 하고 KickIn의 다양한 서비스를 이용해보세요!
          KickIn은 200,000개 이상의 제품 정보를 제공하고 있습니다. 우리가
          만들어가는 KickIn의 세상을 함께 만들어보세요!
        </p>
        <v-btn @click="toAgreement" height="50" width="230" color="#DDDDDD">
          Sign up
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
// const url = this.$store.state.prod_url

export default {
  name: "LoginView",
  data() {
    return {
      isFailed: false,
      email: null,
      password: null,
      loginRequestLoading: false,
    };
  },
  methods: {
    toAgreement() {
      this.$router.push({ path: "/agreement" });
    },
    signinRequest() {
      if (this.email == null || this.password == null) {
        swal("로그인 실패", "이메일 또는 비밀번호를 입력해주세요.", "error");
        return;
      }
      const email = this.email;
      const password = this.password;

      const payload = {
        email,
        password,
      };
      this.loginRequestLoading = true;
      // http://localhost:8000/user/dj-rest-auth/login/
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
            const id = this.$route.query.id;
            let next = this.$route.query.next;
            if (next == "updateInfo") {
              this.$router.push({ name: "updateInfo", params: { id } });
            } else if (next == "detail") {
              this.$router.push({ name: "detail", params: { id } });
            } else {
              this.$router.push({ name: "home" });
            }
          });
        })
        .catch((err) => {
          this.isFailed = true; // 로그인 실패 메세지 출력\
          if (err.response?.status == 400) {
            if (
              err.response?.data.non_field_errors[0] ==
              "이메일 주소가 확인되지 않았습니다."
            ) {
              swal("로그인 실패", "이메일 주소 인증이 필요합니다.", "error");
            } else if (
              err.response.data.non_field_errors[0] ==
              "주어진 자격 증명으로 로그인이 불가능합니다."
            ) {
              swal(
                "로그인 실패",
                "이메일 주소 또는 비밀번호가 잘못되었습니다.",
                "error"
              );
              this.password = "";
            } else {
              swal(
                "로그인 실패",
                err.response.data.non_field_errors[0],
                "error"
              );
            }
          }
          console.log("login request error", err);
        });
    },
    userInfo_req(token, user_id) {
      axios({
        method: "GET",
        url: this.$store.getters.getProdUrl + `user/userinfo/${user_id}/`,
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
    googleSignIn() {},
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
