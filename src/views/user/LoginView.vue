<template>
  <v-app>
    <v-main class="back">
      <v-container fluid>
      <LoginForm/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoginForm from '@/components/user/LoginForm.vue';
export default {
  name: 'loginView',
  components : {
    LoginForm,
  }
}
</script>

<style scoped>

.back {
  background-image: url('https://www.kickin.co.kr:9000/media/images/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-63641.jpg.webp');
          height: 100vh;
        width: 100vw;
              background-repeat : no-repeat;
        background-size : cover;
  /* background-color: antiquewhite; */
  }


</style>