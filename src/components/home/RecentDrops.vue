<template>
  <v-row>
    <v-col cols="12" class="d-block">
      <p class="mb-0 ml-8 fw-bolder fs-5">최근 발매 상품</p>
      <p class="ml-9">Recent Drops</p>

      <v-container>
        <v-row>
          <v-col
            v-for="(product, idx) in products"
            :key="idx"
            style="width: 25rem"
            cols="6"
            sm="6"
            md="3"
          >
            <v-card
              class=""
              style="box-shadow: none"
              max-width="250"
              min-height="100"
            >
              <v-img
                :aspect-ratio="1.4"
                contain
                :src="
                  product.local_imageUrl.startsWith('productUpdator')
                    ? env_url + 'media/' + product.local_imageUrl
                    : env_url + product.local_imageUrl
                "
                :lazy-src="env_url + 'media/images/loading.gif'"
              ></v-img>
              <v-btn
                absolute
                color="blue-grey"
                class="white--text"
                fab
                right
                small
                @click="toDetail(product?.id, product?.name)"
              >
                <v-icon>read_more</v-icon>
              </v-btn>
              <v-card-text class="pt-6">
                <div class="grey--text text-caption" v-if="product?.brand">
                  {{
                    product?.brand.includes("%20")
                      ? product?.brand.replaceAll("%20", " ").toUpperCase()
                      : product?.brand.toUpperCase()
                  }}
                </div>
                <div class="grey--text mb-2" v-else>Brand</div>
                <span class="font-weight-heavy black--text text-body-2">
                  {{ product?.name }}
                </span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <loadingImg v-show="isLoading"></loadingImg>
  </v-row>
</template>

<script>
// @ is an alias to /src
import loadingImg from "@/components/common/loadingPage.vue";

import axios from "axios";

export default {
  name: "CultureSupply",
  components: { loadingImg },
  data() {
    return {
      main_product: null,
      current_item: null,
      recent_releases_products: null,
      env_url: this.$store.state.prod_url,
      img_url: this.$store.state.imageUrl,
      isLoading: false,
      products: null,
    };
  },
  methods: {
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
  computed: {},
  created() {
    axios.get(this.env_url + "kicks/sneaker/recent/").then((res) => {
      this.products = res.data;
    });
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

.show_more {
  margin-left: 75%;
}
</style>
