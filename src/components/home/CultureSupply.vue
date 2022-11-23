<template>
<div class="container show-grid" style="margin-top:250px;">
  <div class="row h-100">
    <div class="col-md-6 col-sm-12 mt-auto mb-auto main-font">
      <p class="brand-name d-none d-md-block">{{main_product.brand}}</p>
      <h1 class="d-none d-md-block d-xl-none main-header">{{main_product.name}}</h1>
     <div class="d-none d-sm-block d-lg-none d-md-none">
        <h5 style="color:white; font-size:30px;">{{main_product.name}}</h5>
      </div> 
      <span class="d-none d-lg-block main-desc">{{main_product.description | desc_shortener}}</span>
    </div>
      <div class="col-md-6 col-12" style="text-align: center;">
        <img :src="img_url" alt="main_img" height="450px" class="mx-lg-5">
      </div>
    <div class="text-center">
      <v-btn
        class="ma-2"
        outlined
        color="white"
        x-large
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
      main_product : Object,
    }
  },
  methods: {
    main_image_fatch(){
      console.log('main_image_fatch()')
      axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/img/main/',
      }).then(res => {
        console.log('main_image_fatch res: ', res.data);
        this.main_product = res.data
        console.log('main_product', this.main_product)
      }).catch(err => {
        console.log('main_image_fatch err: ', err);
      })
    },
  },
  computed : {
    img_url () {
      return this.main_product.local_imageUrl
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
  color: white;
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
  color: white;
  font-size: 60px;
}
.main-font{font-family: 'Poppins', sans-serif;}
.main-desc{
  color: #c5c0c0;
}
</style>
