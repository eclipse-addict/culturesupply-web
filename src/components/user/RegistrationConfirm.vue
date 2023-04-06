<template>
  <v-app id="main-body">
    <v-main>
      <v-container>
        <main class="px-3">
          <span class="material-symbols-outlined"> waving_hand </span>
          <h1>Kickin에 가입해주셔서 감사합니다.</h1>
          <p class="lead font-weight-bold">
            입력하신 이메일로 전송된 메일을 통해 인증을해주시기 바랍니다.
          </p>
          <p class="lead">
            <a
              class="btn btn-lg btn-secondary fw-bold border-white bg-white"
              @click="toLogin"
              >Get Started</a
            >
          </p>
        </main>
      </v-container>
    </v-main>
  </v-app>
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
  background-image: url("https://218.155.159.235:9000/media/images/confirmpagebackground.jpg");
  background-repeat: no-repeat;
  background-size: contain;
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>