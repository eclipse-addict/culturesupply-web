<template>
<v-main>
    <v-container class="mt-5 pt-5 shadow" style="background-color:white;" v-if="this.$store.state.user_data.access_token">
      <star-rating class="ml-2" :star-size="20" active-color="#000040"  :show-rating="false" v-model="rating"></star-rating>
      <v-textarea
        append-outer-icon="mdi-comment"
        class="mx-2"
        label="한줄평을 작성해주세요!"
        :rules="[rules.required, rules.maxLength(150), rules.minLength(30)]"
        counter
        rows="1"
        v-model="comment"
        @click:append-outer="create_comment"
        @keyup.enter="create_comment"
      ></v-textarea>
    </v-container>
    <v-container v-else>
      <div class="text-center mt-6">
      <h5>리뷰를 작성하려면 로그인 해주세요!</h5>
      <v-btn color="#D6E4E5" @click="toLogin">
        로그인하러 가기
      </v-btn>
      </div>
    </v-container>
</v-main>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
import swal from 'sweetalert';

export default {
  name: 'productDetail',
    components: {
    StarRating,
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
    kick : null,
  },
  methods: {
    create_comment(){
      if(this.reviewer_check()){
        swal({
          title: "이미 작성한 리뷰가 존재합니다.",
          text: "제품당 하나의 리뷰만 작성 가능합니다.",
          icon: "warning",
          button: '닫기'
        });
        return 
      }
      const content = this.comment
      const rating = this.rating
      const user_id = this.$store.state.user_data.pk
      const product_id = this.$props.kick.id
      const url = `http://127.0.0.1:8000/review/new/${product_id}/${user_id}/`

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
      }).catch(err => {
        console.log('create_comment err: ', err)
      })
      this.comment = ''
      this.rating = 0
    },
    toLogin(){
      console.log('pk: ',this.$props.kick.id)
      this.$store.dispatch('setLoading').then(
        this.$router.push({name:'login', query: {next : this.$props.kick.id}})
      )
    },
    reviewer_check(){
      const user = this.$store.state.user_data.pk
      if(this.kick){
        for (const i of this.kick.reviews) {
          if(user == i.user){
            console.log('reviewer_check', user, i.user)
            return true;
          }
        }
      }else{
        return false
      }
      
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