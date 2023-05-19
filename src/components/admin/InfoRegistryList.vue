<template>
  <v-container>
    <v-row align-content="center">
      <v-col cols="8" class="mx-auto mt-2">
        <v-select v-model="filter_select" :items="filter_items" attach chips>
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels
          v-for="(updator, idx) in updators"
          :key="idx"
          focusable
        >
          <InfoRegistryItem :updator="updator"></InfoRegistryItem>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import InfoRegistryItem from "@/components/admin/InfoRegistryItem.vue";
export default {
  name: "InfoRegistryList",
  components: {
    InfoRegistryItem,
  },
  props: {
    updators: Array,
  },
  data() {
    return {
      filter_select: "전체",
      filter_items: ["전체", "승인 완료", "정보 확인 중", "반려"],
    };
  },
  mehtods: {},
  watch: {
    filter_select() {
      console.log(this.list_filter_condition);
      this.$emit("chage_filter", this.list_filter_condition);
    },
  },
  computed: {
    list_filter_condition() {
      if (this.filter_select == "승인 완료") {
        return 1;
      } else if (this.filter_select == "정보 확인 중") {
        return 0;
      } else if (this.filter_select == "반려") {
        return 2;
      }
      return 3;
    },
  },
};
</script>
<style scoped></style>
