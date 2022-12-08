<template>
  <v-main>
    <v-container class="mt-5 pt-5 shadow" style="background-color:white;">
      <v-card class="mx-auto">
          <star-rating class="ml-2" :star-size="20" active-color="#000040" :read-only="true" v-model="rating"  :show-rating="false"></star-rating>
          <v-card-subtitle class="">
            {{review.user_info.nick_name}}
            </v-card-subtitle>
          <!-- <v-card-subtitle class="text">{{review.user_info.nick_name}}</v-card-subtitle> -->
          <v-card-text class="">{{review.content}}</v-card-text>
          <v-card-actions>
            <v-btn class="ml-2 mt-3" fab icon height="40px" width="40px" right>
              <span class="material-symbols-outlined">thumb_up</span>            
            </v-btn>
            <v-btn class="ml-2 mt-3" fab icon height="40px" width="40px" right>
              <span class="material-symbols-outlined">thumb_down</span>            
            </v-btn>
          </v-card-actions>
      </v-card>

    </v-container>
</v-main>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'reviewItem',
  components: {
    StarRating,
  },
  props: {
    review: null,
  },
  computed: {
    rating(){
      return this.review.rating;
    }
  }
}
</script>

<style>

</style>