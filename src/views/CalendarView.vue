<template>
  <v-app id="inspire">
    <div class="mt-16 text-center border-bottom">
      <h1 class="font-weight-bolder mt-5">Raffle Calendar</h1>
    </div>
    <v-main class="sneaker-main mt-16">
      <v-container fluid ma-0 pa-0 fill-height>
        <CalendarBody/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CalendarBody from "@/components/calendar/calendarBody.vue"
export default {
  components:{
    CalendarBody,
  }
};
</script>

<style>
</style>