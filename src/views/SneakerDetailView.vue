<template>
<v-app id="inspire">
    <v-main class="sneaker-main h-100">
      <v-container fluid class="w-100" >
          <!-- <productDetail :kick=kick></productDetail> -->
          <productDetailBody :kick=kick></productDetailBody>
          <productReview :kick=kick></productReview>
      </v-container>
    </v-main>
  </v-app>
  
</template>

<script>
import axios from 'axios'

import productReview from '@/components/sneakers/ProductReviewForm.vue'
import productDetailBody from '@/components/sneakers/ProductDetailBody.vue'
export default {
components: {
  productReview,
  productDetailBody,
},
data() {
  return {
    kick : null,
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
    }).catch(err => {
      console.log('detail err :', err)
    })
  }
}
</script>
<style scoped>
.sneaker-main{
  background-color: rgb(239, 239, 239);
}
</style>
