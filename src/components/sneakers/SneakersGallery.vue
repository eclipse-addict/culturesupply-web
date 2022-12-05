<template>
  <div
    class="mt-sm-0 container row d-flex justify-content-around mt-16"
    id="main"
  >
    <!-- <div class="input-group mb-3 mt-16" v-show="kicks">
      <button type="button" class="btn btn-outline-secondary">Action</button>
      <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
      <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
    </div> -->

    <div
      class="card mt-13"
      style="width: 25rem"
      v-for="k in kicks"
      :key="k.id"
      v-scroll:#main="infinityScrollHandler"
    >
      <v-hover v-slot="{ hover }">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600" min-height="455" min-width="370">
          <v-img :aspect-ratio="16 / 9" :src="k.local_imageUrl">
            <v-expand-transition>
              <div
                v-if="hover"
                class="
                  d-flex
                  transition-fast-in-fast-out
                  blue-grey
                  lighten-4
                  v-card--reveal
                  text-h2
                  black--text
                "
                style="height: 100%"
              >
                <div class="ma-5">
                  <span style="font-size:30px;">retail : {{k.retailPrice}}</span>
                </div>
                <div class="ma-4">
                  <span style="font-size:30px;">expected : {{k.estimatedMarketValue}}</span>
                </div>
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text class="pt-6" style="position: relative">
            <v-btn
              absolute
              color="blue-grey"
              class="white--text"
              fab
              large
              right
              top
              @click="toDetail(k?.id)"
            >
              <v-icon >read_more</v-icon>
            </v-btn>
            <div class="font-weight-light grey--text text-h6 mb-2">
              {{k.brand}}
            </div>
            <h5 class="text-h5 font-weight-heavy black--text mb-2">
              {{k.name}}
            </h5>
            <div class="font-weight-light text-h6 mb-2">
              {{k.releaseDate}}
            </div>
            <v-rating
            :value="4"
            dense
            color="orange"
            background-color="orange"
            hover
            class="mr-2"
          ></v-rating>
          <span class="primary--text text-subtitle-2">64 Reviews</span>
          </v-card-text>
        </v-card>
      </v-hover>

      <!-- spiral waveDots -->
    </div>
    <infinite-loading
      @infinite="fetch_kicks"
      spinner="waveDots"
      ref="infiniteLoading"
    ></infinite-loading>
  </div>
</template>

<script>
import axios from "axios";
import infiniteLoading from "vue-infinite-loading";

export default {
  name: "sneakersGallery",
  data() {
    return {
      kicks: [],
      page: 0,
      limit: 20,
    };
  },
  props:{
    url : String,
    searchCondition: {
      keyword : '',
      gender : '',
      brand: '',
    },
  },
  components: {
    infiniteLoading,
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
    fetch_kicks($state) {
      
      const keyword = this.$route.query.keyword;
      const brand = this.$route.query.brand;
      const gender = this.$route.query.gender;
      
      this.page += 1;
      let page = this.page
      let limit = this.limit
      let params = {
        page,
        limit,
        keyword,
        brand,
        gender,
      }

      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/sneaker/",
        params: params,
      })
        .then((res) => {
          setTimeout(() => {
            if (res.data.length) {
              if (this.page == 1) {
                this.kicks = res.data;
              } else {
                for (let i = 0; i < res.data.length; i++) {
                  if (
                    !JSON.stringify(this.kicks).includes(
                      JSON.stringify(res.data[i])
                    )
                  ) {
                    console.log(
                      JSON.stringify(this.kicks).includes(
                        JSON.stringify(res.data[i])
                      )
                    );
                    this.kicks.push(res.data[i]);
                  }
                }
              }

              // this.kicks = new Set(this.kicks)
              $state.loaded();
            } else {
              $state.complete();
            }
          }, 100);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search_kicks($state) {
      const keyword = this.$route.query.keyword;
      const brand = this.$route.query.brand;
      const gender = this.$route.query.gender;
      // console.log('status : ', infiniteLoading)
      // infiniteLoading.data().status = 0
      this.$refs.infiniteLoading.stateChanger.reset(); 
      this.page = 1;
      this.kicks = []
      let page = this.page
      let limit = this.limit
      let params = {
        page,
        limit,
        keyword,
        brand,
        gender,
      }
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/sneaker/",
        params: params,
      })
        .then((res) => {
          if(res.data){
            console.log('res: ' + res.data)
            this.kicks = res.data
            $state.loaded();
          }else{
            $state.complete();

          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    infinityScrollHandler(e) {
      console.log(e);
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const bottomCheck = scrollHeight === scrollTop + clientHeight;
      if (bottomCheck) {
        this.fetch_kicks();
      }
    },
  },
  created() {
    this.fetch_kicks();
  },
  computed: {

  },
  filters: {
    desc_shortener(desc) {
      if (desc) {
        return desc.substring(0, 100) + "...";
      }
    },
  },
};
</script>

<style scoped>
.strong-text {
  font-weight: bolder;
}
</style>