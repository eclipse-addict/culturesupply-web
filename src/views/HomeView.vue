<template >
  <v-app>
      <v-main>
        <CultureSupply />
<!--        <CultureSupplyBottom />      -->
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

.background{
  height: 100vh;
  overflow: hidden;
  margin:0;
  /* background-image: url("@/assets/image.png"); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>