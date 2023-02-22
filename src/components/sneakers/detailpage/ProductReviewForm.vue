<template>
<v-main>
    <v-container class="mt-5 pt-5 shadow" style="background-color:white;" v-if="this.$store.state.user_data.access_token">
      <!-- <star-rating class="ml-2" :star-size="20" active-color="#000040"  :show-rating="false" v-model="rating"></star-rating> -->
      <v-rating
            :value="this.rating"
            dense          
            color="orange"
            hover
            background-color="orange"
            class="mr-2"
          ></v-rating>
      <v-textarea
        append-outer-icon="mdi-comment"
        class="mx-2"
        label="한줄평을 작성해주세요!"
        :rules="[rules.required, rules.maxLength(150), rules.minLength(15)]"
        counter
        rows="1"
        v-model="comment"
        @click:append-outer="create_comment"
        @keyup.enter="create_comment"
      ></v-textarea>
    </v-container>
    <v-container v-else>
      <div class="text-center mt-8">
      <h5 >로그인 후 작성가능합니다.</h5>
      <v-btn color="#D6E4E5" @click="toLogin" class="mt-3">
        로그인하러 가기
      </v-btn>
      </div>
    </v-container>
</v-main>
</template>

<script>
import axios from 'axios'
// import StarRating from 'vue-star-rating'
import swal from 'sweetalert';

export default {
  name: 'productDetailForm',
    components: {
    // StarRating,
  },
  data(){
    return {
      rating: null,
      comment: '',
      review_check: false,
      rules: {
        maxLength: len => v => (v || '').length <= len || `${len}자 이상 작성할 수 없습니다!`,
        minLength: len => v => (v || '').length >= len || `${len}자 이상 작성해주세요!`,
        required: v => !!v || 'This field is required',
      },
    }
  },
  props: {
    product_id : null,
    reviews : null,
  },
  methods: {
    create_comment(){
      const content = this.comment
      const rating = this.rating
      const user_id = this.$store.state.user_data.pk
      const product_id = this.$props.product_id
      const url = `https://218.155.159.235:9000/review/new/${product_id}/${user_id}/`

      axios({
        method: 'POST',
        url: url,
        headers: {'Authorization':'Bearer '+this.$store.state.user_data.access_token},
        data: {
          content,
          rating
        },
      }).then(res => {
        console.log('create_comment : ', res.data)
        this.$emit('newReviewEvent', res.data)
      }).catch(err => {
        console.log('create_comment err: ', err)
        if(err.response.status == 409){this.reviewer_check()}
      })
      // this.comment = ''
      this.rating = 0
    },
    toLogin(){
      this.$store.dispatch('setLoading').then(
        this.$router.push({name:'login', query: {next : this.$props.product_id}})
      )
    },
    reviewer_check(){
        swal({
          title: "이미 작성한 리뷰가 존재합니다.",
          text: "제품당 하나의 리뷰만 작성 가능합니다.",
          icon: "warning",
          button: '닫기'
        });
    }
  },
  computed: {
  already_reviewed(){

    return true
  }
  },
  watch:{

  }
}
</script>

<style>

</style>