<template>
  <div class="d-block d-sm-none">
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover style="box-shadow: 2px 2px 21px gray; border-radius: 10px;">
    <v-carousel-item v-for="(slide, i) in slides" :key="i" id="blur-effect">
      <v-sheet height="100%">
        <v-row class="fill-height" justify="center">
          <v-hover v-slot="{ hover }">
            <div class="" style="text-align: center; position: relative;">
              <v-img 
              :src="env_url + slide.local_imageUrl"
              :lazy-src="env_url + 'media/images/loading.gif'"  contain aspect-ratio="1"
              >
              <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out v-card--reveal text-h2 black--text"
                      style="height: 100%"
                    >
                      <div class="my-auto mx-auto">
                        <v-btn
                          color="#F6F1E9" width="200px"
                          elevation="10"
                          class=""
                          @click="toDetail(slide?.id)"
                          >Detail</v-btn
                        >
                      </div>
                    </div>
                  </v-expand-transition>
            </v-img>
          </div>
          </v-hover>
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
  name: "SneakersCarousel",
  data() {
    return {
      slides: Array,
      env_url: this.$store.state.prod_url,
    }
  },
  methods : {
    fetch_kicks(){
      axios({
        method: "GET",
        url: this.$store.state.prod_url + '/kicks/recent/',
      })
      .then(res => {
        console.log(res)
        this.slides = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    toDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
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