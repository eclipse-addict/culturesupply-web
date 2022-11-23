<template >
  <v-app>
    <v-main class="background">
    <CultureSupply />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import CultureSupply from '../components/home/CultureSupply.vue'

  export default {
    name: 'HomeView',
    components: {
      CultureSupply,
    },
  }
</script>
<style scoped>
.brand-name {
  margin-bottom: 0px;
  padding-left: 2.5px;
}
.background{
  height: 100vh;
  overflow: hidden;
  margin:0;
  background-image: url("@/assets/image.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>