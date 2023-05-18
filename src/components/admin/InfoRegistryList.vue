<template>
  <v-row align-content="center">
    <v-col cols="8" class="mx-auto mt-2">
      <v-select v-model="filter_select" :items="filter_items" attach chips>
      </v-select>
    </v-col>
    <v-col cols="12">
      <v-expansion-panels v-for="(updator, idx) in list_filter" :key="idx">
        <InfoRegistryItem :updator="updator"></InfoRegistryItem>
      </v-expansion-panels>
    </v-col>
  </v-row>
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
  computed: {
    list_filter() {
      if (this.filter_select == "") {
        return;
      }
      return this.$props.updators;
    },
  },
};
</script>
<style scoped></style>
