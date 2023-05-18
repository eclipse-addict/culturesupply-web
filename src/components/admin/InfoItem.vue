<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InfoItem",
  props: {
    item: Object,
  },
  data() {
    return {
      approved: false,
    };
  },
  watch: {
    approved() {
      this.$emit("approve_status_updated", this.$props.item.field_name);
    },
  },
});
</script>

<template>
  <tr>
    <td>
      <v-simple-checkbox v-model="approved"></v-simple-checkbox>
    </td>
    <td>{{ item.field_name }}</td>
    <td>{{ item.field_value.replace(/[\[\]']+/g, "") }}</td>
  </tr>
</template>

<style scoped></style>
