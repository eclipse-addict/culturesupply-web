<template>
  <v-card class="mx-auto my-auto mt-3" tile width="850">
    <v-card-title class="fs-1 mb-6 border-bottom">고객 센터</v-card-title>
    <v-card-subtitle
      >서비스 이용 중 발생한 문제점, 또는 건의사항을 자유롭게
      남겨주세요.</v-card-subtitle
    >

    <v-card-text class="fs-6 mt-2 fw-bolder">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <v-text-field label="제목"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="이메일"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                placeholder="문의내용을 작성해주세요."
                label="문의내용"
                outlined
                shaped
                auto-grow
                counter
                hint="최대 500자"
                :rules="rules"
                :value="value"
              ></v-textarea>
            </v-col>
            <v-col>
              <v-btn>제출하기</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <!--        <v-col cols="6"> 문의 메일 : kickin@kickin.kr </v-col>-->
        <!--        <v-col cols="6">-->
        <!--          <v-btn-->
        <!--            color="primary"-->
        <!--            dark-->
        <!--            href="https://open.kakao.com/o/s5Y8X1dd"-->
        <!--            target="_blank"-->
        <!--          >-->
        <!--            카카오톡 문의-->
        <!--          </v-btn>-->
        <!--        </v-col>-->
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "customerService",
  data: () => ({
    rules: [
      (v) => v?.length <= 500 || "문의 내용은 최대 500자를 넘을 수 없습니다.",
    ],
    value: null,
  }),
};
</script>

<style scoped></style>
