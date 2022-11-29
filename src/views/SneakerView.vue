<template>
  <v-app id="inspire">
    <v-main class="sneaker-main">
      <v-container>
        <!-- <SneakersCarousel/> -->
        <sneakersGallery/>
        <v-btn
                color="blue"
                dark
                fixed
                bottom
                right
                fab
              >   
<span class="material-icons">
notifications_active
</span></v-btn>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// this is must have
import { library } from '@fortawesome/fontawesome-svg-core';
// import { name of your icon in camelCase } from "@fortawesome/free-solid-svg-icons";
// For example, I want to use fa-enveloper-open-text, then it's faEnvelopeOpenText
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
// Then add it to library
library.add(faEnvelopeOpenText)
  export default {

  }
</script>

<script>
// @ is an alias to /src
import SneakerPage from '@/components/sneakers/SneakerPage.vue'
// import SneakersCarousel from '@/components/sneakers/SneakersCarousel.vue'
import sneakersGallery from '@/components/sneakers/SneakersGallery.vue'
const StockXData = require("stockx-data");
export default {
  name: 'HomeView',
  components: {
    SneakerPage,
    // SneakersCarousel,
    sneakersGallery,
  },
  methods :{
 
  }
}
</script>
<style scoped>
.sneaker-main{
  background-color: rgb(239, 239, 239);
}
</style>