<template>
<div class="container show-grid">
  <div class="row h-100 border-bottom pb-5" v-show="main_product">
    <div class="col-md-6 col-sm-12 mt-auto mb-auto main-font">
      <p class="brand-name d-none d-md-block">{{main_product?.brand}}</p>
      <h1 class="d-none d-md-block d-xl-block d-xxl-block main-header">{{main_product?.name}}</h1>
    <div class="">
        <h5 style=" font-size:30px;">{{main_product?.name}}</h5>
        <div class="mt-4">
        <v-btn class="ma-2" outlined color="black" small @click="toDetail(main_product?.id)">Take me to Detail</v-btn>
        </div>
      </div> 
      <!-- <span class="d-none d-lg-block main-desc">{{main_product.description | desc_shortener}}</span> -->
    </div>
      <div class="col-md-6 col-12" style="text-align: center;">
        <img :src="img_url" alt="main_img" height="400px" class="mx-lg-5" style="width:100%; height:100%;">
      </div>
    <div class="text-center d-none mt-lg-10 d-md-block d-xl-block d-xxl-block">
      <v-btn
        class="ma-2"
        outlined
        color="black"
        x-large
        @click="toDetail(main_product?.id)"
      >
      Take me to Detail
      </v-btn>
    </div>
  </div>
  </div>

</template>

<script>
import axios from 'axios'
// @ is an alias to /src
// import MainPage from '@/components/home/CultureSupply.vue'
export default {
  name: 'CultureSupply',
  components: {

  },
  data () {
    return {
      main_product : null,
    }
  },
  methods: {
    main_image_fatch(){
      console.log('main_image_fatch()')
      axios({
        method: 'GET',
        url: 'https://127.0.0.1:8000/kicks/img/main/',
      }).then(res => {
        console.log('main_image_fatch res: ', res.data);
        this.main_product = res.data[0]
        console.log('main_product', this.main_product)
      }).catch(err => {
        console.log('main_image_fatch err: ', err);
      })
    },
    toDetail(id){
      this.$router.push({name:'detail',params: {id}})
    },
  },
  computed : {
    img_url () {
      return this.main_product?.local_imageUrl
    }
  },
  created(){
    this.main_image_fatch()
  },
   filters:{
    desc_shortener(desc){
      if (desc){
        return desc.substring(0, 150) + '...'
      }
    }
   },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bowlby+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,900&display=swap');
.brand-name {
  margin-bottom: 0px;
  padding-left: 2.5px;
  color: rgb(14, 12, 12);
}
.background{
  height: 100vh;
  overflow: hidden;
  margin:0;
  background-image: url("@/assets/image.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.main-header{
  font-weight: bolder;
  color: rgb(7, 7, 7);
  font-size: 3rem;
}
.main-font{font-family: 'Poppins', sans-serif;}
.main-desc{
  color: #0e0d0d;
}
/* img {
  box-shadow: 0px 0px 10px 40px #ffffff;
} */
</style>
