<template>
  <div class="d-none d-md-block d-xl-block d-xxl-block">
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover style="margin-top:5rem; box-shadow: 2px 2px 21px gray; border-radius: 10px;">
    <v-carousel-item v-for="(slide, i) in slides" :key="i" id="blur-effect">
      <v-sheet height="100%">
        <v-row class="fill-height" justify="center">
          <div class="" style="text-align: center; position: relative;">
            <img :src="slide.local_imageUrl" alt="" width="475px" height="475px" style="position: relative;">
          </div>
          <div style="position: absolute; margin-top: 5rem; text-center">
            <h1  class="h1-font">{{ slide.name }}</h1>
            <!-- <v-btn class="detail-btn"  style="margin:4.5rem 20rem 0 20rem;" outlined raised rounded text color="black" x-large>Take me to Detail</v-btn> -->
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      slides: Array,
    }
  },
  methods : {
    fetch_kicks(){
      axios({
        method: "GET",
        url: 'http://127.0.0.1:8000/api/popular',
      })
      .then(res => {
        console.log(res)
        this.slides = res.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.fetch_kicks()
  },
  computed: {

  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bowlby+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,900&display=swap');

.v-size--x-large{
  display:none;
}

 .v-window__container:hover.v-size--x-large {
        display:block;
    }
.h1-font{
  font-family:'Poppins', sans-serif;
}
</style>