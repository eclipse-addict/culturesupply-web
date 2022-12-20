<template>

<v-row>
  <!-- TODO: v-card 컴포넌트로 분리.  -->
  <v-col v-for="n in 6" :key="n" cols="4">
    <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-img
      class="white--text align-end"
      height="450px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      Number 10
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Share
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-col>
</v-row>
</template>