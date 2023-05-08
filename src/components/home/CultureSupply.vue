<template>
  <v-row>
    <v-col cols="12" class="d-none d-sm-block" v-if="recent_releases_products">
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
                    class="d-flex transition-slow-in-slow-out v-card--reveal text-h2 black--text"
                    style="height: 100%"
                  >
                    <div class="my-auto mx-auto">
                      <v-btn
                        color="#F6F1E9"
                        elevation="10"
                        class="mx-2"
                        @click="toDetail(p?.id)"
                        >Detail</v-btn
                      >
                    </div>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-sheet
                elevation="4"
                rounded="3"
                outlined
                class="position-absolute me-4 px-2 bg-white bg-opacity-50"
                style="
                  bottom: 1%;
                  font-weight: bolder;
                  text-shadow: -1px 0 whitesmoke, 0 1px whitesmoke,
                    1px 0 whitesmoke, 0 -1px whitesmoke;
                "
              >
                {{ p?.name }}
              </v-sheet>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </v-col>

    <loadingImg v-show="isLoading"></loadingImg>
  </v-row>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import loadingImg from "@/components/common/loadingPage.vue";
export default {
  name: "CultureSupply",
  components: { loadingImg },
  data() {
    return {
      main_product: null,
      current_item: null,
      recent_releases_products: null,
      env_url: this.$store.state.prod_url,
      isLoading: false,
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
