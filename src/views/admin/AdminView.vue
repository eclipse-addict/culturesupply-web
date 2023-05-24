<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat>
            <v-row v-if="item.key == 'updator'">
              <InfoRegistryList
                :updators="updators"
                @chage_filter="fetch_updators"
              ></InfoRegistryList>
              <v-col>
                <div class="text-center my-3">
                  <v-pagination
                    v-model="page"
                    :length="page_count"
                    circle
                  ></v-pagination>
                </div>
              </v-col>
            </v-row>
            <v-row v-else-if="item.key == 'Product'">
              <ProductManager></ProductManager>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import InfoRegistryList from "@/components/admin/InfoRegistryList.vue";
import ProductManager from "@/components/admin/ProductManager.vue";
import axios from "axios";
export default {
  name: "AdminView",
  components: { InfoRegistryList, ProductManager },
  data() {
    return {
      updators: [],
      next_page: null,
      previous_page: null,
      count: null,
      page: 1,
      condition: 3,
      tab: null,
      items: [
        { tab: "제품 정보 업데이터", key: "updator" },
        { tab: "회원 문의 관리", key: "Content" },
        { tab: "응모 현황", key: "Content" },
        { tab: "회원 신고", key: "Content" },
        { tab: "제품 관리", key: "Product" },
      ],
    };
  },
  methods: {
    fetch_updators(condition) {
      console.log("fetch_updators condition: ", condition);
      this.condition = condition;
      const request_url =
        this.$store.state.prod_url +
        `info/updators/?condition=${this.condition}&page=${this.page}`;
      axios({
        method: "GET",
        url: request_url,
        headers: {
          Authorization:
            "Bearer " + this.$store.getters.get_user_data.access_token,
        },
      })
        .then((res) => {
          console.log("fetch_updators res: ", res.data);
          this.updators = res.data.results;
          this.next_page = res.data.next;
          this.previous_page = res.data.previous;
          this.count = res.data.count;
          window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        })
        .catch((err) => {
          console.log("fetch_updators err: ", err);
        });
    },
  },
  watch: {
    page() {
      this.fetch_updators(this.condition);
    },
  },
  created() {
    this.fetch_updators(this.condition);
  },
  computed: {
    page_count() {
      return Math.ceil(this.count / 5);
    },
  },
};
</script>

<style scoped></style>
