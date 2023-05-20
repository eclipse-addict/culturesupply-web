<script>
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PointHistory",
  data() {
    return {
      history: [],
      next_page: null,
      previous_page: null,
      count: null,
      page: 1,
    };
  },
  created() {
    this.getPointHistory();
  },
  methods: {
    getPointHistory() {
      console.log("getPointHistory");
      axios({
        method: "GET",
        url: this.$store.state.prod_url + `/point/points/?page=${this.page}`,
        headers: {
          Authorization:
            "Bearer " + this.$store.getters.get_user_data.access_token,
        },
      })
        .then((res) => {
          console.log("getPointHistory res: ", res.data);
          this.history = res.data.results;
          this.next_page = res.data.next;
          this.previous_page = res.data.previous;
          this.count = res.data.count;
        })
        .catch((err) => {
          console.log("getPointHistory err: ", err);
        });
    },
    data_formator(datetimeString) {
      const datetime = new Date(datetimeString);

      const year = datetime.getFullYear();
      const month = String(datetime.getMonth() + 1).padStart(2, "0");
      const day = String(datetime.getDate()).padStart(2, "0");
      const hours = String(datetime.getHours()).padStart(2, "0");
      const minutes = String(datetime.getMinutes()).padStart(2, "0");
      const seconds = String(datetime.getSeconds()).padStart(2, "0");

      const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      console.log(formattedDatetime);
      return formattedDatetime;
    },
  },
  computed: {
    page_count() {
      return Math.ceil(this.count / 2);
    },
  },
  watch: {
    page() {
      this.getPointHistory();
    },
  },
});
</script>

<template>
  <v-card>
    <v-card-title> 포인트 히스토리 </v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">적립 포인트</th>
            <th class="text-left">적립 사유</th>
            <th class="text-left">적립 일시</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in history" :key="index">
            <td>{{ item.point_amount }}</td>
            <td>{{ item.description }}</td>
            <td>{{ data_formator(item.created_at) }}</td>
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
