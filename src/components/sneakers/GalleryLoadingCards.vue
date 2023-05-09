<template>
  <v-row>
    <v-col
      class="mt-13"
      cols="6"
      sm="4"
      md="3"
      style="width: 25rem"
      v-for="index in 10"
      :key="index"
    >
      <v-hover v-slot="{ hover }">
        <v-card
          class=""
          style="box-shadow: none"
          max-width="250"
          min-height="300"
        >
          <v-img
            :aspect-ratio="1.4"
            contain
            :src="env_url + 'media/images/loading.gif'"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out grey-blue lighten-4 v-card--reveal text-h2 black--text"
                style="height: 100%; background: rgba(235, 235, 235, 0.49)"
              ></div>
            </v-expand-transition>
          </v-img>
          <v-btn absolute color="blue-grey" class="white--text" fab right small>
            <v-icon>read_more</v-icon>
          </v-btn>
          <v-card-text class="pt-6">
            <v-rating
              :value="0"
              dense
              readonly
              half-icon
              color="orange"
              background-color="orange"
              half-increments
              class="mr-2"
            ></v-rating>
          </v-card-text>
        </v-card>
      </v-hover>

      <!-- spiral waveDots -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "GalleryLoadingCards",
  data() {
    return {};
  },
  computed: {
    env_url() {
      return this.$store.getters.get_env_url;
    },
  },
};
</script>

<style scoped></style>
