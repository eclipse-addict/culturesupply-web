<template>
  <v-row>
    <InfoRegistryList :updators="updators"></InfoRegistryList>
  </v-row>
</template>

<script>
import InfoRegistryList from "@/components/admin/InfoRegistryList.vue";
import axios from "axios";
export default {
  name: "AdminView",
  components: { InfoRegistryList },
  data() {
    return {
      updators: [],
      next_page: null,
      previous_page: null,
      count: null,
    };
  },
  methods: {
    fetch_updators(url) {
      const request_url = url
        ? url
        : this.$store.state.prod_url + "info/updators/";
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
        })
        .catch((err) => {
          console.log("fetch_updators err: ", err);
        });
    },
  },
  created() {
    this.fetch_updators();
  },
  computed: {
    beforeApprove() {
      // 승인이 필요한 정보들 필터링
      return this.item.productUpdatorItems.filter(
        (item) => item.approved == false
      );
    },
    registedInfoLength() {
      return this.beforeApprove.length;
    },
  },
};
</script>

<style scoped></style>
