<template>
  <v-app id="inspire">
    <v-main class="sneaker-main" style="padding-left:0px; padding-top:0px" >
      <v-container v-if="this.$store.state.isLoading">
      <loadingImg />
      </v-container>

      <v-container id="top" fluid ma-0 pa-0 fill-height v-else >
        <!-- <SneakersCarousel/> -->
        <sneakersGallery :url=url ref="sneakersGallery" />
        <v-btn
          color="blue"
          dark
          fixed
          bottom
          right
          fab
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <span class="material-symbols-outlined">search</span>
        </v-btn>

        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">Search</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <v-text-field
              label="Search Keyword"
              :loading="isLoading"
              v-model="keyword"
              :append-outer-icon="keyword ? 'mdi-magnify' : ''"
              @click:append-outer="search"
              @keyup.enter="search"
            ></v-text-field>
            <!-- <v-btn elevation="2"></v-btn> -->
            <p>
              <span>Brand</span>
            </p>
            <v-radio-group v-model="brand">
              <v-radio
                v-for="n in brandGroup"
                :key="n"
                :label="`${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
            <p class="mt-4">
              <span>Gender</span>
            <v-radio-group v-model="gender">
              <v-radio
                v-for="n in genderGroup"
                :key="n"
                :label="`${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
              
            </p>
          </div>
        </div>
        <v-btn
          style="margin-right: 8px;margin-bottom: 75px;"
          v-show="scroll>0"
            fab
            fixed
            dark
            bottom
            right
            small
            v-scroll:#top="onScroll"
            @click="goTop"
        >
          <v-icon>mdi-menu-up</v-icon>
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelopeOpenText);
export default {};
</script>

<script>
// @ is an alias to /src
import sneakersGallery from "@/components/sneakers/SneakersGallery.vue";
const StockXData = require("stockx-data");
export default {
  name: "HomeView",
  data() {
    return {
      scroll: 0,
      scrollTarget: null,

      isLoading: false, // it chages every time user types into the input field
      keyword: '',
      brandGroup: ['All', 'Nike', 'Jordan', 'Adidas', 'Puma', 'New Balance', 'Vans'],
      genderGroup: ['All', 'Youth', 'Men', 'Women', 'Infant', 'Toddler', 'Child', 'Unisex', 'Preschool'],
      brand: 'All',
      gender: 'All',
      url : 'http://127.0.0.1:8000/kicks/sneaker/',

    };
  },
  mounted() {
	// goTop을 위해 mount 시 element 설정
  console.log('mount')
	// this.scrollTarget = document.getElementById('top');
  document.addEventListener('scroll', this.onScroll);
},
unmounted() {
  document.removeEventListener('scroll', this.onScroll);
},
  components: {
    sneakersGallery,
  },
  methods: {
    search() {
      this.$router.push({name:'sneakers', 
                query: {
                  keyword: this.keyword,
                  brand: this.brand,
                  gender: this.gender,
                }})
      this.$refs.sneakersGallery.search_kicks()
      // console.log('this.$refs',this.$refs.sneakersGallery)
      this.keyword = "";
      // console.log(document.getElementById('offcanvasRight'));
      // document.getElementById('offcanvasRight').style.transform = '';
      this.goTop()
    },
    onScroll(e) {
      // 스크롤 움직일 때 마다 호출됨
      this.scroll = 1;
    },
	goTop() {
      window.scrollTo(0,0);
		if (this.scrollTarget) {
		}
    }
  },
  watch: {
    keyword() {
      this.isLoading = true;
      setTimeout(() => (this.isLoading = false), 2000);
    },
  },
};
</script>
<style scoped>
.sneaker-main {
  background-color: rgb(239, 239, 239);
}
</style>