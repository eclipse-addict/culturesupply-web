<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <span class="font-monospace font-weight-bold main-header">
          Let's stay Kickin</span
        >
      </v-col>
      <v-col cols="12">
        <!-- <v-img
          contain
          class="mt-5 pt-4"
          aspect-ratio="4"
          src="https://images.stockx.com/images/Air-Jordan-1-Retro-High-Dior-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1607043976&q=75"
        ></v-img> -->
      </v-col>
      <v-slide-group
        v-model="current_item"
        class="pa-4"
        center-active
        show-arrows
      >
        <v-slide-item
          v-for="(p, index) in recent_releases_products"
          :key="index"
          v-slot="{ isSelected, toggle }"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :color="isSelected ? 'grey lighten-2' : 'grey lighten-4'"
              class="ma-4"
              height="200"
              width="200"
              @click="toggle"
            >
              <v-img
                :src="env_url + p.local_imageUrl"
                :lazy-src="env_url + 'media/images/loading.gif'"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out blue-grey lighten-4 v-card--reveal text-h2 black--text"
                    style="height: 100%; opacity: 0.6"
                  >
                    <div class="mt-5">
                      <v-btn
                        absolute
                        fab
                        right
                        x-small
                        @click="like_btn(p?.id, index)"
                        v-if="check_like_user(p.like_users)"
                      >
                        <font-awesome-icon icon="fa-solid fa-heart" />
                      </v-btn>
                      <v-btn
                        x-small
                        absolute
                        fab
                        right
                        @click="like_btn(p?.id, index)"
                        v-else
                      >
                        <font-awesome-icon icon="fa-regular fa-heart" />
                      </v-btn>
                      <v-btn x-small absolute fab left>
                        <span class="material-symbols-outlined">ios_share</span>
                      </v-btn>
                    </div>
                    <v-btn>test</v-btn>
                  </div>
                </v-expand-transition>
              </v-img>
              <div
                class="position-absolute me-4 px-2 bg-white bg-opacity-50"
                style="bottom: 1%; font-weight: bolder"
              >
                {{ p?.name }}
              </div>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
// import MainPage from '@/components/home/CultureSupply.vue'
export default {
  name: "CultureSupply",
  components: {},
  data() {
    return {
      main_product: null,
      current_item: null,
      recent_releases_products: null,
      env_url: this.$store.state.prod_url,
    };
  },
  methods: {
    recent_releases() {
      console.log("recent_releases()");
      axios({
        method: "GET",
        url: this.$store.state.prod_url + "kicks/recent/",
      })
        .then((res) => {
          console.log("recent_releases res: ", res.data);
          this.recent_releases_products = res.data;
          console.log("main_product", this.main_product);
        })
        .catch((err) => {
          console.log("recent_releases err: ", err);
        });
    },
    toDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
    check_like_user(like_users) {
      for (let user of like_users) {
        if (user == this.$store.state.user_data.pk) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  computed: {
    img_url() {
      return this.main_product?.local_imageUrl;
    },
  },
  created() {
    this.recent_releases();
  },
  filters: {
    desc_shortener(desc) {
      if (desc) {
        return desc.substring(0, 150) + "...";
      }
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Anton&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bowlby+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,900&display=swap");
.brand-name {
  margin-bottom: 0px;
  padding-left: 2.5px;
  color: rgb(14, 12, 12);
}
.background {
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-image: url("@/assets/image.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.main-header {
  font-weight: bolder;
  color: rgb(7, 7, 7);
  font-size: 3rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.main-font {
  font-family: "Poppins", sans-serif;
}
.main-desc {
  color: #0e0d0d;
}
/* img {
  box-shadow: 0px 0px 10px 40px #ffffff;
} */
</style>
