<template>
  <v-app id="inspire">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="100vh" rounded="lg">
              <v-card color="basil">
                <v-card-title class="text-center justify-center py-6">
                  <h3 class="font-weight-bold text-h4 basil--text">
                    제품 정보 추가하기
                  </h3>
                  </v-card-title>

                  <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    color="basil"
                    grow
                  >
                  <v-tab
                    v-for="item in items"
                    :key="item"
                  >
                      {{ item }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item
                      v-for="item in items"
                      :key="item"
                    >
                      <v-card
                        color="basil"
                        flat
                      >
                        <v-card-text>
                          <div class="text-center" v-if="item == '안내사항'">
                            <h5 class="border-bottom mb-6">- 제품 이미지 예시 -</h5> 
                              <div style="float: left; width: 50%;">
                              <h6 class="">안좋은 이미지 예시 1</h6>
                                  <v-img class="mr-1" :src="`http://localhost:8000/media/images/defaultImg.png`" max-width="350" max-height="300"></v-img>
                              </div>
                              <div style="float: left; width: 50%;">
                              <h6 class="">안좋은 이미지 예시 2</h6>
                                  <v-img class="ml-1" :src="`http://localhost:8000/media/images/defaultImg.png`" max-width="350" max-height="300"></v-img>
                              </div>
                              <div style="float: left; width: 50%;" class="mt-8">
                              <h6 class="">좋은 이미지 예시 1</h6>
                                  <v-img class="mr-1" :src="`http://localhost:8000/media/images/defaultImg.png`" max-width="350" max-height="300"></v-img>
                              </div>
                              <div style="float: left; width: 50%;" class="mt-8">
                              <h6 class="">좋은 이미지 예시 2</h6>
                                  <v-img class="ml-1" :src="`http://localhost:8000/media/images/defaultImg.png`" max-width="350" max-height="300"></v-img>
                              </div>
                              
                          </div>
                          <div class="text-center" v-else>
                          <h5>- 제품 정보 등록 -</h5>
                          <v-col>
                            <v-row>
                            <v-text-field
                              label="브랜드"
                              hide-details="auto"
                            ></v-text-field>
                              <v-file-input
                                :rules="rules"
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder=""
                                prepend-icon="mdi-camera"
                                label="제품 이미지"
                              ></v-file-input>
                            </v-row>
                          </v-col>
                          </div>
                          
                        </v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          '안내사항', '정보등록', 
        ],
        rules: [
        value => !value || value.size < 10000000 || '파일 크기는 10 MB를 초과할 수 없습니다!',
      ],
      }
    },
  }
</script>

<style scoped>
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>