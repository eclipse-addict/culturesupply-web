<script>
import { defineComponent } from "vue";
import RaffleCard from "@/components/raffle/RaffleCard.vue";
import axios from "axios";
export default defineComponent({
  name: "RaffleView",
  created() {
    this.fetch_raffles();
  },
  components: { RaffleCard },
  watch: {
    page() {
      this.fetch_raffles();
    },
  },
  data() {
    return {
      raffle_list: [],
      page: 1,
      current_tab: 0,
      date: new Date(),
    };
  },
  methods: {
    fetch_raffles() {
      console.log("fetch_raffles");
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/raffle/",
      })
        .then((res) => {
          console.log("fetch_raffles res: ", res.data);
          this.raffle_list = res.data.results;
        })
        .catch((err) => {
          console.log("fetch_raffles err: ", err);
        });
    },
  },
  computed: {
    resutl_filter() {
      const date = new Date();
      if (this.raffle_list) {
        if (this.current_tab == 1) {
          return this.raffle_list.filter((item) => {
            return (
              new Date(item.start_date) < date && new Date(item.end_date) > date
            );
          });
        } else if (this.current_tab == 2) {
          return this.raffle_list.filter((item) => {
            return new Date(item.end_date) < date;
          });
        } else if (this.current_tab == 3) {
          return this.raffle_list.filter((item) => {
            return new Date(item.start_date) > date;
          });
        }
      }
      return this.raffle_list;
    },
  },
});
</script>

<template>
  <v-main>
    <v-container>
      <v-tabs centered icons-and-text v-model="current_tab">
        <v-tab>전체<v-icon>mdi-calendar-blank-multiple</v-icon></v-tab>
        <v-tab>진행중<v-icon>mdi-calendar-start</v-icon></v-tab>
        <v-tab>종료<v-icon>mdi-calendar-end-outline</v-icon></v-tab>
        <v-tab>예정<v-icon>mdi-calendar-clock</v-icon></v-tab>
      </v-tabs>
      <v-row>
        <v-col cols="12" v-for="(raffle, idx) in resutl_filter" :key="idx">
          <RaffleCard :raffle="raffle"></RaffleCard>
        </v-col>
      </v-row>
      <v-btn icon bottom large fixed left class="arrow_btn" fab outlined
        ><span class="material-symbols-outlined"> arrow_back </span></v-btn
      >
      <v-btn icon bottom large fixed right class="arrow_btn" fab outlined
        ><span class="material-symbols-outlined"> arrow_forward </span></v-btn
      >
    </v-container>
  </v-main>
</template>

<style scoped>
.arrow_btn {
  margin-bottom: 20.5% !important;
}
</style>
