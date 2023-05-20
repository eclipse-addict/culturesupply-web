<script>
import { defineComponent } from "vue";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import swal from "sweetalert";
import InfoRegistryList from "@/components/admin/InfoRegistryList.vue";
export default defineComponent({
  name: "ProductRegistBoard",
  components: { InfoRegistryList },
  data() {
    return {
      updators: [],
      next_page: null,
      previous_page: null,
      count: null,
      page: 1,
      condition: 3,
    };
  },
  methods: {
    fetch_updators(condition) {
      console.log("fetch_updators condition: ", condition);
      this.condition = condition;
      const request_url =
        this.$store.state.prod_url +
        `info/updators/?condition=${this.condition}&user=${this.$store.getters.get_user_data.pk}&page=${this.page}`;
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
  computed: {
    page_count() {
      return Math.ceil(this.count / 5);
    },
  },
  created() {
    this.fetch_updators(this.condition);
  },
  watch: {
    page() {
      this.fetch_updators(this.condition);
    },
  },
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-card>
        <InfoRegistryList
          :updators="updators"
          @chage_filter="fetch_updators"
        ></InfoRegistryList>

        <div class="text-center my-3">
          <v-pagination
            v-model="page"
            :length="page_count"
            circle
          ></v-pagination>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped></style>
