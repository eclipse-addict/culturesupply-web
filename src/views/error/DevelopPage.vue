<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="mt-15">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">
            <h1>
              업데이트 예정입니다!
              <font-awesome-icon :icon="['fas', 'screwdriver-wrench']" />
            </h1>
          </v-card-title>
          <v-card-text>
            <p>
              죄송합니다.곧 예정된 업데이트가 있습니다. 잠시만 기다려주세요!
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-alert
              v-if="isComponentBeingUpdated"
              type="info"
              outlined
              icon="mdi-information"
            >
              곧 업데이트됩니다!
            </v-alert>
            <v-alert
              v-else
              type="info"
              dismissible
              outlined
              icon="mdi-information"
            >
              현재 작성 중인 컴포넌트에 대한 정보가 없습니다.
            </v-alert>
          </v-card-text>
          <v-card-actions class="text-center">
            <!-- 버튼을 가운데로 정렬하기 위해 text-center 클래스를 추가합니다 -->
            <v-btn outlined width="100%" color="primary" @click="goBack">
              뒤로가기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isComponentBeingUpdated: true, // 업데이트 예정 여부를 표시하는 데이터 속성입니다.
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 한 단계 이전으로 돌아갑니다.
    },
  },
};
</script>

<style>
/* 필요한 스타일을 추가하세요. */
</style>
