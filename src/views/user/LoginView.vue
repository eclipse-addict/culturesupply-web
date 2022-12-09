<template>
  <v-app>
    <v-main class="back">
      <v-container>
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
  background-image: url(https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/morzu5viyb40byaohjiu/off-white-x-nike-the-ten-collection?fimg-ssr-default);
          height: 100vh;
        width: 100vw;
              background-repeat : no-repeat;
        background-size : cover;
  /* background-color: antiquewhite; */
  }


</style>