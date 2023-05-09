<template>
  <v-app id="inspire">
    <v-main class="sneaker-main" style="padding-left: 0px; padding-top: 0px">
      <v-container v-if="this.$store.state.isLoading">
        <loadingImg />
      </v-container>

      <v-container id="top" fluid ma-0 pa-0 fill-height v-else>
        <!-- <SneakersCarousel/> -->
        <sneakersGallery :url="url" ref="sneakersGallery" />

        <v-btn
          style="margin-right: 8px; margin-bottom: 130px"
          fab
          fixed
          dark
          bottom
          right
          small
          elevation="9"
          v-show="isScrollDown"
          @click="goTop"
        >
          <v-icon>mdi-menu-up</v-icon>
        </v-btn>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="margin-right: 70px; margin-bottom: 130px"
              fixed
              bottom
              icon
              fab
              right
              elevation="9"
              color="black"
              small
              v-show="isScrollDown"
              @click="reset_sneakers"
              v-bind="attrs"
              v-on="on"
            >
              <span class="material-symbols-outlined">refresh</span>
            </v-btn>
          </template>
          <span>페이지 새로고침</span>
        </v-tooltip>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelopeOpenText);
</script>

<script>
import { mapActions } from "vuex";
const searchStore = "searchStore";
// @ is an alias to /src
import sneakersGallery from "@/components/sneakers/SneakersGallery.vue";
export default {
  name: "SneakerVie",
  data() {
    return {
      isLoading: false,
      scroll: 0,
      scrollTarget: null,

      isLoading: false, // it chages every time user types into the input field
      outOfRange: false,
      keyword: "",
      brandGroup: this.$store.state.brandGroup,
      genderGroup: this.$store.state.categoryGroup,
      brand: ["All"],
      dates: [],
      url: this.$store.state.prod_url + "kicks/sneaker/",
      isScrollDown: false,
      scrollTop: 0,
    };
  },
  mounted() {
    // goTop을 위해 mount 시 element 설정
    console.log("mount");
    // console.log(process.env)
    // this.scrollTarget = document.getElementById('top');
    document.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    sneakersGallery,
  },
  methods: {
    ...mapActions(searchStore, ["RESET_RESULT"]),
    search() {
      this.$router.push({
        name: "sneakers",
        query: {
          search: this.keyword,
          brand: this.brand.join(),
          release: this.dates.join(),
        },
      });
      this.keyword = "";
      this.goTop();
      location.reload();
    },
    reset_sneakers() {
      //TODO: vuex 에 들어있는 검색 결과 초기화
      this.RESET_RESULT();
      location.reload();
      this.goTop();
    },
    onScroll(e) {
      // 스크롤 움직일 때 마다 호출됨
      this.scroll = 1;
    },
    handleScroll(e) {
      // console.log("target", e.target);
      // console.log("e :", e);
      // console.log("scroll", e.target.documentElement.scrollTop);
      this.scrollTop = e.target.documentElement.scrollTop;
      if (this.scrollTop > 1) {
        this.isScrollDown = true;
      } else {
        this.isScrollDown = false;
      }
    },
    goTop() {
      window.scrollTo(0, 0);
    },
  },
  watch: {
    keyword() {
      this.isLoading = true;
      setTimeout(() => (this.isLoading = false), 2000);
    },
    brand() {
      if (this.brand.length > 1 && this.brand.indexOf("All") == 0) {
        this.brand.shift();
      } else if (this.brand.length == 0) {
        this.brand = ["All"];
      }
    },
    dates() {
      let stDate = this.dates[0].replaceAll("-", "");
      let endDate = this.dates[1].replaceAll("-", "");
      console.log("stDate", stDate);
      console.log("endDate", endDate);
      let diff = Math.abs(stDate - endDate);
      console.log("diff", diff);
      if (diff > 30) {
        this.dates = [];
        this.outOfRange = true;
      } else {
        this.outOfRange = false;
      }
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>
<style scoped>
/*.sneaker-main {
   background-color: rgb(239, 239, 239); 
}*/
</style>
