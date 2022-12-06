<template >
  <v-app>
    <v-main>
      <v-container>
    <CultureSupply />
    <CultureSupplyBottom />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import CultureSupply from '../components/home/CultureSupply.vue'
  import CultureSupplyBottom from '../components/home/CultureSupplyBottom.vue'

  export default {
    name: 'HomeView',
    components: {
      CultureSupply,
      CultureSupplyBottom,
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
  /* background-image: url("@/assets/image.png"); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>