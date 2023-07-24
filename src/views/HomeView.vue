<template>
  <v-app>
    <HomeCarousel />
    <v-divider></v-divider>
    <RecentDrops />
    <v-divider></v-divider>
    <CultureSupply />
    <v-divider></v-divider>
    <v-footer height="50"> </v-footer>
  </v-app>
</template>

<script>
import CultureSupply from "../components/home/CultureSupply.vue";
import HomeCarousel from "@/components/home/HomeCarousel.vue";
import RecentDrops from "@/components/home/RecentDrops.vue";

export default {
  name: "HomeView",
  components: {
    CultureSupply,
    HomeCarousel,
    RecentDrops,
  },
};
</script>
<style scoped>
.background {
  height: 100vh;
  overflow: hidden;
  margin: 0;
  /* background-image: url("@/assets/image.png"); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
