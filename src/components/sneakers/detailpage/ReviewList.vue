<template>
<div>
  <ReviewItem></ReviewItem>
</div>
</template>

<script>
import ReviewItem from '@/components/sneakers/detailpage/ReviewItem.vue'
export default {
  name: 'reviewList',
  props: {
    kick : null,
  },
  components: {
    ReviewItem,
  },
  data(){
    return {

    }
  }
}
</script>

<style>

</style>