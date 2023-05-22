<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template>
        <v-col cols="12" md="12">
          <v-hover v-slot="{ hover }" close-delay="200">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="[{ 'on-hover': hover }, { card_hover: hover }]"
              @click="searchByLabel(All_card.label)"
            >
              <v-img
                :src="hover ? All_card.gif_img : All_card.still_img"
                height="225px"
                contain
              >
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left text-black main_font">
                      {{ All_card.title }}
                    </p>

                    <div>
                      <p
                        class="ma-0 text-body-1 font-weight-bold font-italic text-left text-black main_font"
                      >
                        All Products
                      </p>
                      <p
                        class="text-caption font-weight-medium font-italic text-left text-black main_font"
                      ></p>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" md="4">
          <v-hover v-slot="{ hover }" close-delay="200">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="[{ 'on-hover': hover }, { card_hover: hover }]"
            >
              <v-img
                :src="hover ? hyper_card.gif_img : hyper_card.still_img"
                height="225px"
                contain
              >
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left text-black main_font">
                      {{ hyper_card.title }}
                    </p>

                    <div>
                      <p
                        class="ma-0 text-body-1 font-weight-bold font-italic text-left text-black main_font"
                      >
                        Jordan 1 Retro High OG SP
                      </p>
                      <p
                        class="text-caption font-weight-medium font-italic text-left text-black main_font"
                      >
                        Fragment x Travis Scott
                      </p>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover> </v-col
        ><v-col cols="12" md="4">
          <v-hover v-slot="{ hover }" close-delay="200">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              @click="searchByLabel(most_view_card.label)"
            >
              <v-img
                contain
                :src="hover ? most_view_card.gif_img : most_view_card.still_img"
                height="225px"
              >
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left text-black main_font">
                      {{ most_view_card.title }}
                    </p>

                    <div>
                      <p
                        class="ma-0 text-body-1 font-weight-bold font-italic text-left text-black main_font"
                      >
                        Jordan 1 Retro High OG SP
                      </p>
                      <p
                        class="text-caption font-weight-medium font-italic text-left text-black main_font"
                      >
                        Fragment x Travis Scott
                      </p>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover> </v-col
        ><v-col cols="12" md="4">
          <v-hover v-slot="{ hover }" close-delay="200">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              @click="searchByLabel(info_need.label)"
            >
              <v-img
                contain
                :src="hover ? info_need.gif_img : info_need.still_img"
                height="225px"
              >
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left text-black main_font">
                      {{ info_need.title }}
                    </p>
                    <div>
                      <p
                        class="ma-0 text-body-1 font-weight-bold font-italic text-left text-black main_font"
                      >
                        Jordan 1 Retro High OG SP
                      </p>
                      <p
                        class="text-caption font-weight-medium font-italic text-left text-black main_font"
                      >
                        Fragment x Travis Scott
                      </p>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
          <v-overlay :value="overlay">
            <div>
              <div class="typing-effect">
                제품 정보를 불러오는 중입니다. 잠시만 기다려주세요......
              </div>
            </div>
          </v-overlay>
        </v-col>
      </template>
    </v-row>
    <span class="underline-on-hover"></span>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

const searchStore = "searchStore";
export default {
  data: () => ({
    All_card: {
      still_img: require("@/assets/images/dunk_c.avif"),
      gif_img: require("@/assets/images/dunk_c.gif"),
      title: "RECENT DROP",
      label: "recent_drop",
    },
    info_need: {
      still_img: require("@/assets/images/adidas.avif"),
      gif_img: require("@/assets/images/adidas.gif"),
      title: "INFO NEEDED",
      label: "info_need",
    },
    hyper_card: {
      still_img: require("@/assets/images/tifany.avif"),
      gif_img: require("@/assets/images/tifany.gif"),
      title: "MOST COMMENTED",
      label: "most_commented",
    },
    most_view_card: {
      still_img: require("@/assets/images/travis_still_img.avif"),
      gif_img: require("@/assets/images/travis_frag_j.gif"),
      title: "MOST VIEWED",
      label: "click",
    },
    overlay: false,
  }),
  methods: {
    ...mapActions(searchStore, ["mainPageSearch"]),
    searchByLabel(label) {
      // 화면 전환 되기 전까지 로딩 컴포넌트 띄우기
      this.overlay = !this.overlay;
      this.mainPageSearch(label);
    },
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 15000);
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.main_font {
  font-family: "Oswald", sans-serif;
  font-weight: 900;
  font-size: 1rem;
}

.v-card:hover .main_font {
  letter-spacing: 0.7rem;
  text-shadow: 1px 1px 2px #000000;
  transition: all ease 1.5s 0s;
}
.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.typing-effect {
  overflow: hidden; /* 내용이 넘치는 경우 숨김 처리 */
  white-space: nowrap; /* 한 줄에 모든 내용 표시 */
  border-right: 2px solid #000; /* 글자가 한 글자씩 나타나는 효과를 줄 테두리 스타일 설정 */
  width: fit-content; /* 내용에 맞게 너비 설정 */
  animation: typing 5s steps(40) infinite;
}

@keyframes typing {
  from {
    width: 0;
  } /* 글자가 보이지 않는 상태로 시작 */
  to {
    width: 100%;
  } /* 글자가 한 글자씩 나타남 */
}
</style>
