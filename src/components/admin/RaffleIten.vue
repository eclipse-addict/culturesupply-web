<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RaffleIten",
  props: {
    raffle: Object,
  },
});
</script>

<template>
  <tr style="cursor: pointer">
    <td>{{ raffle.title }}</td>
    <td>{{ raffle.start_date }}</td>
    <td>{{ raffle.end_date }}</td>
  </tr>
</template>

<style scoped></style>
