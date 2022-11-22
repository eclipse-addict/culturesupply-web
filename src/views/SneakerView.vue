<template>
  <div class="Sneakers">
    <SneakerPage/>
    <SneakersCarousel/>
    <button @click="test">stockX</button>
    <button @click="test2">stockX</button>
  </div>
</template>

<script>
// @ is an alias to /src
import SneakerPage from '@/components/sneakers/SneakerPage.vue'
import SneakersCarousel from '@/components/sneakers/SneakersCarousel'
const StockXData = require("stockx-data");
export default {
  name: 'HomeView',
  components: {
    SneakerPage,
    SneakersCarousel
  },
  methods :{
    
    test (){
      const stockX = new StockXData();
      stockX.searchProducts("Jordan 1")
      .then((searchedProduct) => {
        console.log(searchedProduct)
      });
    },

    
  }
}
</script>
