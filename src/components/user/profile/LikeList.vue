<script>
import axios from "axios";

export default {
  name: "LikeList",
  data() {
    return {
      like_list: [],
      page: 1,
      env_url: this.$store.state.prod_url,
      img_base_url: this.$store.getters.get_env_url,
      count: null,
    };
  },
  created() {
    this.get_like();
  },
  computed: {
    page_count() {
      return Math.ceil(this.count / 5);
    },
  },
  methods: {
    get_like() {
      axios({
        method: "GET",
        url:
          this.$store.state.prod_url +
          `/kicks/sneaker/likes/${this.$store.getters.get_user_data.pk}/?page=${this.page}`,
        headers: {
          Authorization:
            "Bearer " + this.$store.getters.get_user_data.access_token,
        },
      }).then((res) => {
        console.log(res.data);
        this.like_list = res.data.results;
        this.count = res.data.count;
      });
    },
    toDetail(id, name) {
      this.$router.push({ name: "detail", params: { id, name } });
    },
  },
  watch: {
    page() {
      this.get_like();
    },
  },
};
</script>

<template>
  <v-card>
    <v-card-title> 관심 제품</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">제품 이미지</th>
            <th class="text-left">제품명</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in like_list"
            :key="index"
            @click="toDetail(item?.id, item?.name)"
          >
            <td>
              <v-img
                :src="
                  item?.local_imageUrl.startsWith('productUpdator')
                    ? img_base_url + 'media/' + item?.local_imageUrl
                    : img_base_url + item?.local_imageUrl
                "
                :lazy-src="env_url + 'media/images/loading.gif'"
                contain
                width="50"
              >
              </v-img>
            </td>
            <td>{{ item?.name }}</td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center my-3">
      <v-pagination v-model="page" :length="page_count" circle></v-pagination>
    </div>
  </v-card>
</template>

<style scoped></style>
