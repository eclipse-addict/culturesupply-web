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
import StarRating from 'vue-star-rating'
export default {
  name: 'productDetail',
    components: {
    StarRating,
  },
  data(){
    return {
      rating: null,
      comment: '',
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
      console.log('aadfasdfasd', this.comment)
      console.log('aadfasdfasd', this.rating)
      this.comment = ''
      this.rating = 0
    },
    toLogin(){
      console.log('pk: ',this.$props.kick.id)
      this.$store.dispatch('setLoading').then(
        this.$router.push({name:'login', query: {next : this.$props.kick.id}})
      )
    },
  }
}
</script>

<style>

</style>