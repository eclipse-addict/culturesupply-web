<template>
<v-app id="inspire">
    <v-main class="sneaker-main h-100">
      <v-container fluid class="w-100" >
          <!-- <productDetail :kick=kick></productDetail> -->
          <productDetailBody :kick=kick></productDetailBody>
          <reviewList :product_id=product_id></reviewList>
      </v-container>
    </v-main>
  </v-app>
  
</template>

<script>
import axios from 'axios'

import productDetailBody from '@/components/sneakers/detailpage/ProductDetailBody.vue'
import reviewList from '@/components/sneakers/detailpage/ReviewList.vue'
export default {
components: {
  productDetailBody,
  reviewList,
},
data() {
  return {
    kick : null,
    reviews : null,
    product_id: null,
    total_pg_cnt : 0,
    current_page: 1,
    current_page_content : null
  }
},
  created(){
    const product_id = this.$route.params.id;
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/sneaker/' + product_id,
    }).then(res=> {
      console.log('detail res: ', res)
      this.kick = res.data
      this.product_id = res.data.id

    }).catch(err => {
      console.log('detail err :', err)
    })
  },
  methods: {
    

  },
computed: {

}
}
</script>
<style scoped>
.sneaker-main{
  background-color: rgb(239, 239, 239);
}
</style>
