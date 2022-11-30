<template>
  <v-app id="inspire">
    <v-main class="sneaker-main">
      <v-container fluid ma-0 pa-0 fill-height>
        <!-- <SneakersCarousel/> -->
        <sneakersGallery />
        <v-btn color="blue" dark fixed bottom right fab data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <span class="material-symbols-outlined">search</span>
        </v-btn>

          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasRightLabel">Search</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> 
            </div>
            <div class="offcanvas-body">
              <v-text-field label="Search Keyword" :loading="isLoading" v-model="keyword" :append-outer-icon="keyword ? 'mdi-magnify' : ''" @click:append-outer="search" @keyup.enter="search"></v-text-field>
              <!-- <v-btn elevation="2"></v-btn> -->
              <p>
              <span>Brand</span>
              </p>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="brandRadio" id="radioAll" v-model="brand">
                <label class="form-check-label" for="radioAll">
                  All
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="brandRadio" id="radioNike" v-model="brand" value="Nike">
                <label class="form-check-label" for="radioNike">
                  Nike
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="brandRadio" id="radioAdidas" v-model="brand">
                <label class="form-check-label" for="radioAdidas">
                  Adidas
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="brandRadio" id="radioPuma" v-model="brand">
                <label class="form-check-label" for="radioPuma">
                  Puma
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="brandRadio" id="radioVans" v-model="brand">
                <label class="form-check-label" for="radioVans">
                  Vans
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="brandRadio" id="radionewBalance" v-model="brand">
                <label class="form-check-label" for="radionewBalance">
                  New Balance
                </label>
              </div>
                <p class="mt-4">
              <span>Gender</span>
              </p>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="genderRadio" id="radioMen" >
                <label class="form-check-label" for="radioMen">
                  Men
                </label>
              </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="genderRadio" id="radioWomen" >
                <label class="form-check-label" for="radioWomen">
                  Women
                </label>
              </div>
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
  data(){
    return {
      isLoading: false, // it chages every time user types into the input field
      keyword: null,
      brand: null,
      gender: null,
    }
  },
  components: {
    SneakerPage,
    sneakersGallery,
  },
  methods: {
    search(){
      console.log("search", this.keyword)
      //TODO: 검생  기능 구현
      this.keyword = ''
    },
  },
  watch:{
    keyword(){
      this.isLoading = true;
      setTimeout(() => this.isLoading = false, 2000);
    }
  },
};
</script>
<style scoped>
.sneaker-main {
  background-color: rgb(239, 239, 239);
}
</style>