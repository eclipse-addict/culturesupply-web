<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ProductManager",
  data() {
    return {
      time: null,
      new_product_count: null,
      loading: false,
    };
  },
  methods: {
    crawling() {
      this.loading = true;

      axios({
        method: "POST",
        url: this.$store.getters.getProdUrl + "kicks/goat/collections/",
        timeout: 1200000,
        headers: {
          Authorization:
            "Bearer " + this.$store.getters.get_user_data.access_token,
        },
      }).then((res) => {
        console.log("crawling res: ", res.data);
        this.time = res.data.time;
        this.new_product_count = res.data.new_product_count;
        this.loading = false;
      });
    },
  },
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> 데이터 크롤링 </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>소요시간: {{ time }}</v-col>
              <v-col>신규 제품 갯수: {{ new_product_count }}</v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn :loading="loading" @click="crawling">크롤링 시작</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
