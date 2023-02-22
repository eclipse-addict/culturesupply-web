<template>
  <v-app id="main-body">
    <v-main >
      <v-container>
  <main class="px-3">
    <span class="material-symbols-outlined">
waving_hand
</span>
    <h1>Hello there!</h1>
    <p class="lead font-weight-bold">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
    <p class="lead">
      <a class="btn btn-lg btn-secondary fw-bold border-white bg-white" @click="toLogin">Get Started</a>
    </p>
  </main>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'registrationConfirm',
  methods: {
    toLogin(){
      this.$router.push({name:'login'})
    },
  }
}
</script>

<style scoped>
#main-body {
  background-image: url('https://218.155.159.235:9000/media/images/confirmpagebackground.jpg');
  background-repeat : no-repeat;
  background-size : contain;
}
.material-symbols-outlined {
  

  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

</style>