<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <SneakersCarousel/>
        <v-row>
          <v-col v-for="n in 10" :key="n" cols="4">
            <v-card height="300"></v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    //
  }
</script>

<script>
// @ is an alias to /src
import SneakerPage from '@/components/sneakers/SneakerPage.vue'
import SneakersCarousel from '@/components/sneakers/SneakersCarousel.vue'
const StockXData = require("stockx-data");
export default {
  name: 'HomeView',
  components: {
    SneakerPage,
    SneakersCarousel
  },
  methods :{
 
  }
}
</script>
