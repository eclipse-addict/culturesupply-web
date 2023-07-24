<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "InfoTabs",
  props: {
    sku: null,
  },
  data: () => ({
    tab: null,
    price_result: null,
    raffles: [],
  }),
  filters: {
    addCommasToKoreanWon(amount) {
      // 숫자를 문자열로 변환 후 쉼표 추가
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  created() {},
  computed: {
    original_price_fomat() {
      if (this.price_result) {
        return this.addCommasToKoreanWon(this.price_result?.original_price);
      }
      return 0;
    },
    remove_decimal() {
      return Math.floor(this.price_result?.pricepremium_percentage);
    },
  },
  mounted() {
    setTimeout(() => {
      const sku = this.$props.sku;
      console.log("sku check ", sku);
      const price_url =
        this.$store.state.prod_url + "release/prices/" + sku + "/";

      axios.get(price_url).then((res) => {
        console.log("price check ", res.data);
        if (res.data.result == "no data") {
          this.price_result = {
            market_price: 0,
            original_price: 0,
            pricepremium_percentage: 0,
          };
        } else {
          this.price_result = res.data.result;
        }
      });
      const raffle_url =
        this.$store.state.prod_url + "release/sneaker/" + sku + "/";
      axios.get(raffle_url).then((res) => {
        console.log("raffle check ", res.data);
        this.raffles = res.data;
      });
    }, 1000);
  },
});
</script>

<template>
  <v-card flat>
    <v-tabs fixed-tabs background-color="#B0BEC5" dark v-model="tab">
      <v-tab> 발매처 ({{ raffles?.length }})</v-tab>
      <v-tab>시세</v-tab>
    </v-tabs>

    <v-card max-height="275" class="overflow-y-auto p-4 mt-3" v-if="tab == 0">
      <v-row
        v-for="(raffle, idx) in raffles"
        :key="idx"
        style="
          margin: 5px 0;
          border-bottom: 0.5px solid #3498db !important;
          cursor: pointer;
        "
        v-ripple
      >
        <v-col cols="12">
          <v-col cols="12" class="fw-bolder">{{ raffle?.site_name }}</v-col>
          <v-col cols="12" class="fa-1x">
            {{ raffle?.date_info }}
          </v-col></v-col
        >
        <v-divider></v-divider>
      </v-row>
    </v-card>
    <v-card v-else class="p-4 mt-3">
      <v-row v-if="price_result">
        <v-card flat>
          <v-card-text>
            <v-row v-ripple style="cursor: pointer">
              <v-col cols="4" class="fw-bolder mt-2">KREAM</v-col>
              <v-col cols="4" class="fw-bolder text-center mt-2">
                {{
                  price_result?.market_price ? price_result?.market_price : 0
                }}
                원</v-col
              >
              <v-col cols="4" class="fw-bolder text-center">
                <v-chip>
                  <v-icon>mdi-chart-line-variant</v-icon
                  >{{ remove_decimal }}%</v-chip
                ></v-col
              >
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="fa-1x"> 아직 시세 정보가 없습니다.</v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<style scoped></style>
