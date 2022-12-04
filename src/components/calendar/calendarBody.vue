<template>
  <v-layout wrap>
    <v-flex xs12 class="mb-3">
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :end="end"
          color="primary"
        ></v-calendar>
      </v-sheet>
    </v-flex>

    <v-flex sm4 xs12 class="text-sm-left text-xs-center">
      <v-btn
        @click="$refs.calendar.prev()"
        class="ma-2"
        outlined
        small
        fab
        color="indigo"
      >
        <v-icon dark > keyboard_arrow_left </v-icon>
      </v-btn>
    </v-flex>
    <v-flex sm4 xs12 class="text-xs-center">
      <v-select v-model="type" :items="typeOptions" label="Type"></v-select>
    </v-flex>
    <v-flex sm4 xs12 class="text-sm-right text-xs-center">
      <v-btn
        @click="$refs.calendar.next()"
        class="ma-2"
        outlined
        small
        fab
        color="indigo"
      >
        <v-icon dark large> keyboard_arrow_right </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    type: "month",
    start: "2022-12-01",
    end: "2200-01-06",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "4 Day", value: "4day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" },
    ],
  }),
};
</script>

<style>
</style>