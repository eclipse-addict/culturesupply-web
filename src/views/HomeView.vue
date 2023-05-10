<template>
  <v-app>
    <!--    <template>-->
    <!--      <div class="ad-container">-->
    <!--        <Adsense-->
    <!--          style="border: 1px solid black"-->
    <!--          data-ad-client="ca-pub-6048277531996552"-->
    <!--          data-ad-slot="9648734008"-->
    <!--          data-ad-format="auto"-->
    <!--          data-adtest="on"-->
    <!--        >-->
    <!--        </Adsense>-->
    <!--      </div>-->
    <!--    </template>-->
    <HomeCategoryCards></HomeCategoryCards>
    <CultureSupply />
    <!--        <CultureSupplyBottom />      -->
  </v-app>
</template>

<script>
import CultureSupply from "../components/home/CultureSupply.vue";
import HomeCategoryCards from "@/components/home/HomeCategoryCards.vue";

export default {
  name: "HomeView",
  components: {
    CultureSupply,
    HomeCategoryCards,
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
