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
  background-image: url('http://localhost:8000/media/images/Air-Jordan-3-Seoul-3-808x455.jpg');
          height: 100vh;
        width: 100vw;
              background-repeat : no-repeat;
        background-size : cover;
  /* background-color: antiquewhite; */
  }


</style>