<template>
  <div class="mt-15 pt-5 text-center h-100 w-100" style="background-color:white;">
    <div class="row h-100 border-bottom pb-5" v-show="kick">
      <div class="col-md-6 col-12" >
        <img :src="img_url" alt="main_img"  class="mx-lg-5" style="margin-top: 4rem; width:60%;">
      </div>
      <div class="col-md-6 col-sm-12 text-start mt-16">
        <p class="fw-normal">{{kick?.brand}}</p>
        <h4 class="fw-bold">{{kick?.name}}</h4>
        <div class='v-line'></div>
            <v-rating
            :value="this.rating"
            dense
            readonly
            half-icon
            color="orange"
            background-color="orange"
            half-increments
            class="mr-2"
          ></v-rating>
          <!-- <star-rating :star-size="20" active-color="#000040" :read-only="true" :show-rating="false" dense v-model="this.rating"></star-rating> -->
          <!-- TODO: disscusion  -->
        <p>
          <span class="" style="margin-top: 13px;">{{ get_review_cnt }} discussions</span> 
        </p>
        <p class="font-monospace ">{{kick?.description}}</p>
        <p>
        <span class="fw-bold">발매일 : </span>  
        <span> {{kick?.releaseDate}}</span>
        </p>
        <p>
        <span class="fw-bold">SKU : </span>  
        <span> {{kick?.sku}}</span>
        </p>
        <p>
        <span class="fw-bold">ColorWay : </span>  
        <span> {{kick?.colorway}}</span>
        </p>
        <p>
        <span class="fw-bold">발매금액 : </span>  
        <span> USD: ${{kick?.retailPrice}} / KRW: 약{{get_krw}}원</span>
        </p>
      </div>  
  </div>
  </div>
</template>

<script>
// import StarRating from 'vue-star-rating'


export default {
  name: 'productDetail',
  components: {
    // StarRating,
  },
  props: {
    kick : null,
  },
  data(){
    return {
      rating: 0,
    }
  },
  methods: {
    get_avg_rating(){
      let avg_rating = 0
      if(this.$props.kick){
        if(this.kick.reviews.length > 0){
          for(const r of this.kick.reviews) {
            avg_rating += r.rating
          }
          this.rating = parseInt(avg_rating / this.kick.reviews.length)
        }
      }else{
        this.rating = 0
      }
    }
  },
  computed : {
    img_url () {
      return this.kick?.local_imageUrl
    },
    get_review_cnt() {
      if(this.$props.kick){
        return this.kick.reviews.length
      }
      return 0;
    },
    get_krw(){
      const rate = 1302.58
      if(this.$props.kick){
        return this.kick.retailPrice * rate
      }
      return 0
    },
  },
  watch: {
    kick(){
      this.get_avg_rating();
    }
  }
}
</script>

<style scoped>
  .v-line {
    border-top : thin solid #c6c8c9;
    /* margin-left: 1rem; */
    height : 1px;
    width: 634px;
    margin-bottom: 3.5px;
  }
</style>