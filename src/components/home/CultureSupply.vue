<template>
  <v-row v-if="show_recent_views">
    <v-col cols="12" class="d-block">
      <p class="mb-0 ml-8 fs-5">최근 본 상품</p>
      <p class="ml-9">recent Views</p>
      <v-container>
        <v-row>
          <v-col
            v-for="(recent_k, idx) in recent_views"
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
                  recent_k?.local_imageUrl.startsWith('productUpdator')
                    ? env_url + 'media/' + recent_k?.local_imageUrl
                    : env_url + recent_k?.local_imageUrl
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
                @click="toDetail(recent_k?.id, recent_k?.name)"
              >
                <v-icon>read_more</v-icon>
              </v-btn>
              <v-card-text class="pt-6">
                <div class="grey--text text-caption" v-if="recent_k?.brand">
                  {{
                    recent_k?.brand.includes("%20")
                      ? recent_k?.brand.replaceAll("%20", " ").toUpperCase()
                      : recent_k?.brand.toUpperCase()
                  }}
                </div>
                <div class="grey--text mb-2" v-else>Brand</div>
                <span class="font-weight-heavy black--text text-body-2">
                  {{ recent_k?.name }}
                </span>
              </v-card-text>
            </v-card>
            <v-card-text> </v-card-text>
          </v-col>
          <v-btn
            @click="
              recent_page_num += 1;
              isViewMoreClicked = true;
            "
            width="80"
            class="mx-auto"
            v-show="show_more_btn & !isViewMoreClicked"
            outlined
            >더 보기</v-btn
          >
        </v-row>
      </v-container>
    </v-col>

    <loadingImg v-show="isLoading"></loadingImg>
  </v-row>
</template>

<script>
// @ is an alias to /src
import loadingImg from "@/components/common/loadingPage.vue";
import { mapGetters } from "vuex";

const searchStore = "searchStore";

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
      no_recents: "아직 최근 본 상품이 없습니다.",
      recent_page_num: 1,
      isViewMoreClicked: false,
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
  computed: {
    ...mapGetters(searchStore, ["GET_RECENT_VIEWS"]),
    // img_url() {
    //   return this.main_product?.local_imageUrl;
    // },
    recent_views() {
      const recent_item_list = {
        page: this.recent_page_num,
        total_pages: this.GET_RECENT_VIEWS.length / 4,
      };
      // console.log("최근 조회 숫자 ", recent_item_list.total_pages);
      if (this.GET_RECENT_VIEWS.length > 0) {
        return this.GET_RECENT_VIEWS.slice(0, recent_item_list.page * 4);
      } else {
        return [];
      }
    },
    show_recent_views() {
      console.log("this.GET_RECENT_VIEWS", this.GET_RECENT_VIEWS);
      if (this.GET_RECENT_VIEWS) {
        return true;
      } else {
        return false;
      }
    },
    show_more_btn() {
      if (this.GET_RECENT_VIEWS.length >= 4) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {},
  watch: {},
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
