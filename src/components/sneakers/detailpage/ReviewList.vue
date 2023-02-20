<template>
<div>
  <productReviewForm :reviews=reviews :product_id=product_id @newReviewEvent="newReviewEvent"></productReviewForm>
  <v-col v-for="(review, i) in page_content" :key="i" cols="12">
  <ReviewItem :review=review></ReviewItem>
  </v-col>
  <div class="text-center" v-if="page_length">
    <v-pagination
      :length="page_length"
      v-model="page"
      @input="page_req"      
    ></v-pagination>
  </div>
</div>
</template>

<script>
import ReviewItem from "@/components/sneakers/detailpage/ReviewItem.vue";
import productReviewForm from '@/components/sneakers/detailpage/ProductReviewForm.vue'
import axios from 'axios';

export default {
  name: "reviewList",
  props: {
    product_id: null,
  },
  components: {
    ReviewItem,
    productReviewForm,
  },
  data() {
    return {
      total_pg_cnt: null,
      reviews: null,
      page: 1,
      page_content: [],
      total_cnt : null,
    }
  },
  computed: {
    //리뷰 5개씩 한페이지로 2차원 배열로 묶기.
    page_length(){
      const limit = 5
      let result = 0
      if(this.total_cnt){
        let page_num = this.total_cnt/limit
        let remainder = this.total_cnt%limit
        if(page_num <= 1){
          result = 1
        }else if(remainder > 0){
          result = page_num + 1
        }else{
          result = page_num 
        }
      }
      return result
    },
  },
  methods:{
    reveiw_fetch(){
      console.log('reveiw_fetch()')
      axios({
        method: 'GET',
        url: `http://218.155.159.235:9000/review/list/${this.$route.params.id}/`,
      }).then(res => {
        console.log('reveiw_fetch res : ', res)
        this.get_page_cnt(res.data.length)
        this.total_cnt = res.data.length
        this.reviews = this.review_slice(res.data)
        this.page_content = this.reviews[0]
      }).catch(err =>{
        console.log('reveiw_fetch err : ', err)
      })
    },
    page_req(){
      setTimeout(()=>{
        if(this.reviews){
          this.page_content = this.reviews[this.page - 1]
        }
      },500)
        window.scrollTo({ left: 0, top: 600, behavior: "smooth" });

      
    },
    review_slice(payload){
      var tmp = [];
      for (var i = 0; i < this.total_pg_cnt; i++) {
        tmp.push(payload.splice(0, 5));
      }
      return tmp
    },
    get_page_cnt(content_size){
      const limit = 5
      if(content_size){
        let page_num = content_size/limit
        let remainder = content_size%limit
        if(page_num <= 1){
          this.total_pg_cnt = 1
          return
        }else if(remainder > 0){
          this.total_pg_cnt = page_num + 1
          return 
        }else{
          this.total_pg_cnt = page_num 
          return 
        }
      }
    },
    newReviewEvent(payload){
      console.log(payload)
      this.reveiw_fetch()
      this.page = 1 // page 초기화
      this.page_req()

      // window.location.reload(true);
    },
  },
  mounted(){
    // this.page_req()
  },
  created(){
      this.reveiw_fetch()
  }
};
</script>

<style>
</style>