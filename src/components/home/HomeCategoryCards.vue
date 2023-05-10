<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template>
        <v-col cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="[{ 'on-hover': hover }, { card_hover: hover }]"
            >
              <v-img
                :src="hover ? hyper_card.still_img : hyper_card.gif_img"
                height="225px"
                contain
              >
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p
                      class="mt-4 subheading text-left text-black h2 main_font"
                    >
                      {{ hyper_card.title }}
                    </p>

                    <div>
                      <p
                        class="ma-0 text-body-1 font-weight-bold font-italic text-left"
                      ></p>
                      <p
                        class="text-caption font-weight-medium font-italic text-left"
                      ></p>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover> </v-col
        ><v-col cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img
                contain
                :src="hover ? most_view_card.gif_img : most_view_card.still_img"
                height="225px"
              >
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p
                      class="mt-4 subheading text-left text-black h2 main_font"
                    >
                      {{ most_view_card.title }}
                    </p>

                    <div>
                      <p
                        class="ma-0 text-body-1 font-weight-bold font-italic text-left"
                      ></p>
                      <p
                        class="text-caption font-weight-medium font-italic text-left"
                      ></p>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover> </v-col
        ><v-col cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img
                contain
                :src="hover ? recent_card.gif_img : recent_card.still_img"
                height="225px"
              >
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p
                      class="mt-4 subheading text-left text-black h2 main_font"
                    >
                      {{ recent_card.title }}
                    </p>
                    <div>
                      <p
                        class="ma-0 text-body-1 font-weight-bold font-italic text-left"
                      ></p>
                      <p
                        class="text-caption font-weight-medium font-italic text-left"
                      ></p>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    hyper_card: {
      still_img: require("@/assets/images/travis_frag_j.gif"),
      gif_img: require("@/assets/images/travis_still_img.avif"),
      title: "MOST VIEWED",
    },
    most_view_card: {
      still_img: require("@/assets/images/tifany.avif"),
      gif_img: require("@/assets/images/tifany.gif"),
      title: "MOST HYPED",
    },
    recent_card: {
      still_img: require("@/assets/images/ducnk_c.avif"),
      gif_img: require("@/assets/images/dunk_c.gif"),
      title: "RECENT DROP",
    },
  }),
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.main_font {
  font-family: "Oswald", sans-serif;
  font-weight: 900;
}

.v-card:hover .main_font {
  letter-spacing: 0.7rem;
  text-shadow: 1px 1px 2px #000000;
  transition: all ease 1.5s 0s;
}
</style>
