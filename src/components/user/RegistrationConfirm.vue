<template>
    <v-main class="h-100" style="text-align: center; ">
      <v-container >
        <div class="px-3 mt-10 h-100" >
          <span class="material-symbols-outlined"> waving_hand </span>
          <h1>Kickin에 가입해주셔서 감사합니다.</h1>
          <p class="lead font-weight-bold">
            가입 시 입력하신 이메일로 전송된 메일을 통해 인증을해주시기 바랍니다.
          </p>
          <p>
            만약 인증 이메일을 받지 못한 경우, 스팸메일함을 확인해주시기 바랍니다. <br/>
            스팸메일함에도 없는 경우, Kickin 고객센터<strong>kickin@kickin.kr</strong>로 문의해주시기 바랍니다.
          </p>
          <p class="lead">
            <a class="btn btn-lg border-white bg-white" @click="toLogin">로그인 페이지로</a>
            <a class="btn btn-lg border-white bg-white" @click="toLogin">인증 이메일 재전송</a>
          </p>
        </div>
      </v-container>
    </v-main>

</template>

<script>
export default {
  name: "registrationConfirm",
  methods: {
    toLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
#main-body {
  /* background-image: url("https://218.155.159.235:9000/media/images/confirmpagebackground.jpg"); */
  background-repeat: no-repeat;
  background-size: contain;
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>