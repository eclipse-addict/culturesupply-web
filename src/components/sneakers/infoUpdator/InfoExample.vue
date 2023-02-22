<template>
<div>
  <h5 class="border-bottom">- 이미지 샘플 -</h5>
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col cols="6">
          <v-card elevation="8">
            <v-card-title class="text-h6 text-danger text--darken-5">
              안좋은 이미지 예시
            </v-card-title>
            <v-img
              :src="`https://218.155.159.235:9000/media/images/defaultImg.png`"
              max-height=""
              contain
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="8">
            <v-card-title class="text-h6 text-primary text--darken-5">
              좋은 이미지 예시
            </v-card-title>
            <v-img
              :src="`https://218.155.159.235:9000/media/images/defaultImg.png`"
              max-height=""
              contain
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card elevation="8">
            <v-card-title class="text-h6 text-primary text--darken-5">
              측면
            </v-card-title>
            <v-img
              :src="`https://218.155.159.235:9000/media/images/defaultImg.png`"
              max-height=""
              contain
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card elevation="8">
            <v-card-title class="text-h6 text-primary text--darken-5">
              정면
            </v-card-title>
            <v-img
              :src="`https://218.155.159.235:9000/media/images/defaultImg.png`"
              max-height=""
              contain
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card elevation="8">
            <v-card-title class="text-h6 text-primary text--darken-5">
              후면
            </v-card-title>
            <v-img
              :src="`https://218.155.159.235:9000/media/images/defaultImg.png`"
              max-height=""
              contain
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card elevation="8">
            <v-card-title class="text-h6 text-primary text--darken-5">
              상단
            </v-card-title>
            <v-img
              :src="`https://218.155.159.235:9000/media/images/defaultImg.png`"
              max-height=""
              contain
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
    <h5 class="border-bottom mt-10">-  추가 정보 등록 예시 -</h5>
    <div class="text-left">
      <h6>1. 브랜드 정보</h6>
    </div>
</div>
</template>

<script>
export default {
  name: 'InfoExample'
}
</script>

<style>

</style>