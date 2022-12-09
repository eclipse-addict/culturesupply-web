<template>
  <v-main>
    <v-container class="mt-5 pt-5 shadow" style="background-color:white;">
      <v-card class="mx-auto">
        <!-- <v-card-actions class="pa-4"> -->
          <v-rating
            :value="this.rating"
            dense
            readonly
            half-icon
            color="orange"
            background-color="orange"
            half-increments
            class="mr-2"
          ></v-rating>
          <!-- <span class="grey--text text-caption ">({{ review.rating }})</span> -->
        <!-- </v-card-actions>           -->
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

export default {
  name: 'reviewItem',
  components: {
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