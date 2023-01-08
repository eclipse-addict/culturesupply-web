<template>
    <v-row no-gutters>
          <v-btn 
            top
            left
            elevation="5"
            max-width="68"
            @click="$router.go(-1)"
          >
          뒤로가기
          </v-btn>
          <productDetailBody></productDetailBody>
          <reviewList :product_id=product_id></reviewList>
    </v-row>

  
</template>

<script>
// import axios from 'axios'

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
