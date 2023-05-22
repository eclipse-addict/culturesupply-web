<template>
  <v-app id="inspire">
    <v-container>
      <v-btn
        fixed
        width="300px"
        right
        @click="goDown"
        rounded
        color="blue-grey darken-1"
        dark
        style="z-index: 1; margin-top: 1%; margin-right: 30%"
        class="agree_btn"
        :class="{ hidden: isScrollAtBottom }"
        v-show="this.tab == 0"
        >동의하기 &nbsp;
        <font-awesome-icon :icon="['far', 'hand-point-down']" />
      </v-btn>
      <v-btn top left elevation="5" max-width="68" @click="$router.go(-1)">
        뒤로가기
      </v-btn>
      <v-row>
        <v-col>
          <v-sheet min-height="100vh" rounded="lg" class="mt-3">
            <v-card color="grey lighten-4">
              <v-card-title class="text-center justify-center py-6">
                <h3 class="font-weight-bold text-h4 basil--text">
                  제품 정보 추가하기
                </h3>
              </v-card-title>

              <v-tabs v-model="tab" background-color="transparent" grow>
                <v-tab v-for="item in items" :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                  <v-card color="grey lighten-4" flat>
                    <v-card-text>
                      <div v-if="item == '주의사항'">
                        <InfoRegistWarning
                          @goToEdit="change_tab(1)"
                          @checkboxValueChanged="agreementChanged"
                        ></InfoRegistWarning>
                      </div>

                      <div class="text-center" v-else>
                        <InfoUpdateForm></InfoUpdateForm>
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
import InfoRegistWarning from "@/components/sneakers/infoUpdator/InfoRegistWarning";
import InfoUpdateForm from "@/components/sneakers/infoUpdator/InfoRegistForm";
import swal from "sweetalert";
export default {
  name: "UpdateInfoView",
  data() {
    return {
      tab: null,
      isScrollAtBottom: false,
      agreed: false,

      items: ["주의사항", "정보등록"],
      rules: [
        (value) =>
          !value ||
          value.size < 10000000 ||
          "파일 크기는 10 MB를 초과할 수 없습니다!",
      ],
    };
  },
  watch: {
    tab() {
      if (this.tab == 1) {
        if (!this.agreed) {
          swal(
            "동의해주세요!",
            "동의하지 않으면 정보를 등록할 수 없습니다.",
            "warning",
            { button: "확인", value: true }
          ).then((value) => {
            switch (value) {
              case true:
                window.scrollTo(0, document.body.scrollHeight);
                this.tab = 0;
                break;
            }
          });

          this.tab = 0;
        }
      }
    },
  },
  mounted() {
    document.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    goDown() {
      window.scrollTo(0, document.body.scrollHeight);
    },
    handleScroll() {
      // 현재 스크롤의 위치
      const scrollPosition =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      // 문서의 전체 높이
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      // 스크롤의 위치와 문서의 높이를 비교하여 isScrollAtBottom 값을 설정
      if (scrollPosition + window.innerHeight >= documentHeight) {
        this.isScrollAtBottom = true;
      } else {
        this.isScrollAtBottom = false;
      }
    },
    change_tab(tab_key) {
      this.tab = tab_key;
      window.scroll(0, 0, "smooth");
    },
    agreementChanged(payload) {
      this.agreed = payload;
    },
  },
  components: {
    InfoRegistWarning,
    InfoUpdateForm,
  },
};
</script>

<style scoped>
@keyframes buttonFadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.agree_btn {
  opacity: 1;
  animation: buttonFadeOut 0.3s;
  pointer-events: auto;
}

.hidden {
  opacity: 0;
  transform: scaleX(0);
  pointer-events: none;
}
.basil {
  background-color: black !important;
}
.basil--text {
  color: black !important;
}
</style>
