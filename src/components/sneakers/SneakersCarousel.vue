<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet :color="white"  height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div class="text-h2">{{ slide }} Slide</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      slides: Array,
      sneakers: Array,
    };
  },
  methods : {
    fetch_kicks(){
      axios({
        
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.fetch_kicks()
  },
  computed () {},
};
</script>

<style>
</style>