<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeCarousel",
  data() {
    return {
      slides: ["@/assets/images/introduce.png"],
    };
  },
  methods: {
    route_to(to) {
      this.$router.push({ name: to });
    },
  },
});
</script>

<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet height="100%" style="cursor: pointer">
        <div class="d-flex fill-height justify-center align-center">
          <v-img src="@/assets/images/introduce.png" contain aspect-ratio="1.4">
          </v-img>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped></style>
