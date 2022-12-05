<template>
  <v-app id="inspire">
    <v-main class="sneaker-main">
      <v-container fluid ma-0 pa-0 fill-height>
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
import SneakerPage from "@/components/sneakers/SneakerPage.vue";
import sneakersGallery from "@/components/sneakers/SneakersGallery.vue";
const StockXData = require("stockx-data");
export default {
  name: "HomeView",
  data() {
    return {
      isLoading: false, // it chages every time user types into the input field
      keyword: '',
      brandGroup: ['All', 'Nike', 'Jordan', 'Adidas', 'Puma', 'New Balance', 'Vans'],
      genderGroup: ['All', 'Youth', 'Men', 'Women', 'Infant', 'Toddler', 'Child', 'Unisex', 'Preschool'],
      brand: 'All',
      gender: 'All',
      url : 'http://127.0.0.1:8000/api/sneaker/',

    };
  },
  components: {
    SneakerPage,
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
    },
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