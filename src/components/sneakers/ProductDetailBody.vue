<template>
  <div class="mt-15 pt-5 text-center h-100 w-100" style="background-color:white;">
    <div class="row h-100 border-bottom pb-5" v-show="kick">
      <div class="col-md-6 col-12" >
        <img :src="img_url" alt="main_img" height="200px" class="mx-lg-5" style="width:100%; height:100%;">
      </div>
      <div class="col-md-6 col-sm-12 text-start mt-16">
        <p class="fw-normal">{{kick.brand}}</p>
        <h4 class="fw-bold">{{kick.name}}</h4>
        <div class='v-line'></div>
          <star-rating :star-size="20" active-color="#000040" :read-only="true" :show-rating="false" v-model="rating"></star-rating>
          <!-- TODO: disscusion  -->
        <p>
          <span class="" style="margin-top: 13px;">5 discussions</span> 
        </p>
        <p class="font-monospace ">{{kick.description}}</p>
        <p>
        <span class="fw-bold">SKU : </span>  
        <span> {{kick.sku}}</span>
        </p>
        <p>
        <span class="fw-bold">ColorWay : </span>  
        <span> {{kick.colorway}}</span>
        </p>
      </div>  
  </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'


export default {
  name: 'productDetail',
  components: {
    StarRating,
  },
  props: {
    kick : null,
  },
  data(){
    return {
      rating: 4.0,
    }
  },
    computed : {
    img_url () {
      return this.kick?.local_imageUrl
    }
  },

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