<template>

<div class="container show-grid mt-auto mb-auto">

    <div class="row h-100">
      <div class="col-md-6 col-sm-12 mt-auto mb-auto">
        <p class="brand-name">{{main_product.brand}}</p>
        <h2>{{main_product.name}}</h2>
        <span>{{main_product.description | desc_shortener}}</span>
      </div>
      <div class="col-md-6 col-12">
        <img :src="img_url" alt="main_img" height="500px">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
// import MainPage from '@/components/home/CultureSupply.vue'
export default {
  name: 'HomeView',
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
.brand-name {
  margin-bottom: 0px;
  padding-left: 2.5px;

}
</style>
