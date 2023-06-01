<script>
import { defineComponent } from "vue";
import axios from "axios";
import RaffleList from "@/components/admin/RaffleList.vue";
export default defineComponent({
  name: "RaffleManager",
  components: { RaffleList },
  data() {
    return {
      overlay: false,
      tabs: [
        { tab: "라플 목록", key: "raffle_list" },
        { tab: "응모자 목록", key: "raffle_participant_list" },
      ],
      raffle_list_tabs: [
        { tab: "전체", key: "raffle_list_all" },
        { tab: "진행중", key: "raffle_list_ongoing" },
        { tab: "종료", key: "raffle_list_finished" },
        { tab: "예정", key: "raffle_list_upcoming" },
      ],
      current_tab: "raffle_list",
      current_tabcurrent_status_tab: "raffle_list_all",
      raffle_tot_cnt: 1,
      results: null,
      page: 1,
      selected_item: {
        title: null,
        product: null,
      },
    };
  },
  computed: {
    page_count() {
      return Math.ceil(this.raffle_tot_cnt / 5);
    },
    resutl_filter() {
      const date = new Date();
      if (this.results) {
        if (this.current_status_tab == 1) {
          return this.results.filter((item) => {
            return (
              new Date(item.start_date) < date && new Date(item.end_date) > date
            );
          });
        } else if (this.current_status_tab == 2) {
          return this.results.filter((item) => {
            return new Date(item.end_date) < date;
          });
        } else if (this.current_status_tab == 3) {
          return this.results.filter((item) => {
            return new Date(item.start_date) > date;
          });
        }
      }
      return this.results;
    },
  },
  watch: {
    page() {
      this.fetch_raffles();
    },
  },
  created() {
    this.fetch_raffles();
  },
  methods: {
    fetch_raffles() {
      axios({
        method: "GET",
        url: this.$store.getters.get_env_url + `raffle/?page=${this.page}`,
        headers: {
          Authorization:
            "Bearer " + this.$store.getters.get_user_data.access_token,
        },
      })
        .then((res) => {
          console.log("fetch_raffles res: ", res.data);
          this.results = res.data.results;
          this.raffle_tot_cnt = res.data.count;
        })
        .catch((err) => {
          console.log("fetch_raffles err: ", err);
        });
    },
    get_page_cnt(content_size) {
      const limit = 5;
      if (content_size) {
        let page_num = content_size / limit;
        let remainder = content_size % limit;
        if (page_num <= 1) {
          this.total_pg_cnt = 1;
          return;
        } else if (remainder > 0) {
          this.total_pg_cnt = page_num + 1;
          return;
        } else {
          this.total_pg_cnt = page_num;
          return;
        }
      }
    },
  },
});
</script>

<template>
  <v-container class="mt-2">
    <v-row>
      <v-col>
        <v-card>
          <v-tabs
            light
            v-model="current_tab"
            background-color="blue-grey lighten-1"
            left
            dark
            show-arrows
          >
            <v-tab v-for="tab in tabs" :key="tab.key">
              {{ tab.tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="current_tab">
            <v-tab-item>
              <v-card>
                <v-tabs v-model="current_status_tab" show-arrows right>
                  <v-tab v-for="s_tab in raffle_list_tabs" :key="s_tab.key">{{
                    s_tab.tab
                  }}</v-tab>
                </v-tabs></v-card
              >
            </v-tab-item>
            <RaffleList :raffle_list="resutl_filter"></RaffleList>
            <div class="text-center" v-if="page_count">
              <v-pagination :length="page_count" v-model="page"></v-pagination>
            </div>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
