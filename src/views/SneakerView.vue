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
              <v-text-field label="Search Keyword" :loading="isLoading"></v-text-field>
              <!-- <v-btn elevation="2"></v-btn> -->
              <p>
              <span>Brand</span>
              </p>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                  All
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                  Nike
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label" for="flexRadioDefault2">
                  Adidas
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label" for="flexRadioDefault2">
                  Puma
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label" for="flexRadioDefault2">
                  Vans
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label" for="flexRadioDefault2">
                  New Balance
                </label>
              </div>
                <p class="mt-4">
              <span>Gender</span>
              </p>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label" for="flexRadioDefault2">
                  Men
                </label>
              </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label" for="flexRadioDefault2">
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
      isLoading: true, // it chages every time user types into the input field
    }
  },
  components: {
    SneakerPage,
    sneakersGallery,
  },
  methods: {},
};
</script>
<style scoped>
.sneaker-main {
  background-color: rgb(239, 239, 239);
}
</style>