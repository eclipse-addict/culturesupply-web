<template>
  <v-container>
    <v-row>
      <v-card class="">
        <v-toolbar flat>
          <v-toolbar-title>SEARCH CONDITIONS</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="grey lighten-4">
          <v-sheet class="mx-auto px-10 py-3">
            <v-row>
              <v-col cols="12" lg="3" sm="12">
                <v-combobox
                  v-model="category"
                  :items="categoryGroup"
                  @change="infoCheckBoxReset"
                  label="카테고리"
                  multiple
                  clear-icon="$clear"
                  clearable
                  chips
                ></v-combobox>
              </v-col>
              <v-col cols="12" lg="3" sm="12">
                <v-combobox
                  v-model="brand"
                  :items="brandGroup"
                  @change="infoCheckBoxReset"
                  label="브랜드"
                  multiple
                  clear-icon="$clear"
                  clearable
                  chips
                ></v-combobox>
              </v-col>

              <v-col cols="12" lg="6" sm="12">
                <v-text-field
                  label="검색어"
                  :loading="isLoading"
                  v-model="keyword"
                  @input="infoCheckBoxReset"
                  :append-outer-icon="keyword ? 'mdi-magnify' : ''"
                  @click:append-outer="fetch_kicks"
                  @keyup.enter="fetch_kicks"
                  height="42"
                ></v-text-field>
              </v-col>
            </v-row>
            <p class="mt-4">
              <span v-show="outOfRange" class="warning" style="font-size: 13px"
                >검색가능 범위를 초과했습니다.(최대30일)</span
              >
              <v-date-picker
                v-model="dates"
                range
                elevation="1"
                no-title
                full-width
                title="발매 기준일"
                scrollable
                show-current
              ></v-date-picker>
            </p>
            <p class="text-center">
              <v-btn
                class="mr-2"
                bottom
                width="40"
                elevation="1"
                dark
                color="#497174"
                @click="fetch_kicks"
                :loading="!loadingComplete"
                >검색</v-btn
              >
              <v-btn
                bottom
                width="90"
                elevation="1"
                dark
                color="#EB455F"
                @click="option_reset"
                >조건 초기화</v-btn
              >
            </p>
            <p class="text-center">
              <v-checkbox
                label="정보 등록이 필요한 제품만 보기"
                v-model="info_registrequired"
                @change="reset_other_options"
              ></v-checkbox>
            </p>
          </v-sheet>
        </v-card-text>
      </v-card>
      <div class="marquee fw-bolder" v-if="loadingComplete">
        <div>
          <span>검색 조건을 설정해 주세요.</span>
          <span>검색 조건을 설정해 주세요.</span>
          <span>검색 조건을 설정해 주세요.</span>
          <span>검색 조건을 설정해 주세요.</span>
          <span>검색 조건을 설정해 주세요.</span>
          <span>검색 조건을 설정해 주세요.</span>
        </div>
      </div>
      <!-- TODO: 아래 버튼도 스크롤 변화에 따라 보이도록  -->
      <v-btn
        v-show="isScrollDown"
        color="blue"
        dark
        fixed
        bottom
        right
        fab
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <span class="material-symbols-outlined">search</span>
      </v-btn>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">Search</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <v-text-field
            label="검색 키워드"
            :loading="isLoading"
            v-model="keyword"
            :append-outer-icon="keyword ? 'mdi-magnify' : ''"
            @click:append-outer="fetch_kicks"
            @keyup.enter="fetch_kicks"
          ></v-text-field>
          <!-- <v-btn elevation="2"></v-btn> -->
          <p>
            <v-combobox
              v-model="brand"
              :items="brandGroup"
              label="브랜드"
              multiple
              clear-icon="$clear"
              clearable
              chips
            ></v-combobox>
          </p>
          <p class="mt-4">
            <span v-show="outOfRange" class="warning" style="font-size: 13px"
              >검색가능 범위를 초과했습니다.(최대30일)</span
            >
            <v-date-picker
              v-model="dates"
              range
              elevation="1"
              no-title
              title="발매 기준일"
              scrollable
              show-current
            ></v-date-picker>
          </p>
          <v-btn
            top
            absolute
            color="#D6E4E5"
            left
            fixed
            elevation="5"
            @click="option_reset"
            >조건 초기화</v-btn
          >
          <v-btn
            block
            bottom
            width="100"
            elevation="1"
            dark
            color="#497174"
            @click="fetch_kicks"
            :loading="!loadingComplete"
            >검색</v-btn
          >
        </div>
      </div>
    </v-row>
    <InFeedAdsense
      style="border: 1px solid black; margin-top: 10px"
      data-ad-layout-key="-fg+5n+6t-e7+r"
      data-ad-client="ca-pub-6048277531996552"
      data-ad-slot="9648734008"
    >
    </InFeedAdsense>
    <GalleryLoadingCards v-if="!loadingComplete"> </GalleryLoadingCards>
    <v-row
      class="mt-sm-0 container d-flex justify-content-around"
      id="main"
      v-if="loadingComplete"
    >
      <v-col
        class="mt-13"
        cols="6"
        sm="4"
        md="3"
        style="width: 25rem"
        v-for="(k, index) in search_result"
        :key="index"
        v-scroll:#main="infinityScrollHandler"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class=""
            style="box-shadow: none"
            max-width="250"
            min-height="300"
          >
            <v-img
              :aspect-ratio="1.4"
              contain
              :src="
                k.local_imageUrl.startsWith('productUpdator')
                  ? env_url + 'media/' + k.local_imageUrl
                  : env_url + k.local_imageUrl
              "
              :lazy-src="env_url + 'media/images/loading.gif'"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out grey-blue lighten-4 v-card--reveal text-h2 black--text"
                  style="height: 100%; background: rgba(235, 235, 235, 0.49)"
                >
                  <div class="mt-5">
                    <v-btn
                      absolute
                      fab
                      right
                      x-small
                      @click="like_btn(k?.id, index)"
                      v-if="check_like_user(k.like_users)"
                    >
                      <font-awesome-icon icon="fa-solid fa-heart" />
                    </v-btn>
                    <v-btn
                      x-small
                      absolute
                      fab
                      right
                      @click="like_btn(k?.id, index)"
                      v-else
                    >
                      <font-awesome-icon icon="fa-regular fa-heart" />
                    </v-btn>
                    <v-btn x-small absolute fab left>
                      <span class="material-symbols-outlined">ios_share</span>
                    </v-btn>
                  </div>
                  <div
                    class="text-center mt-15 w-100"
                    v-if="
                      /[a-zA-Z]/.test(k?.name) ||
                      k.local_imageUrl == 'media/images/defaultImg.png' ||
                      k.brand == null ||
                      k.colorway == null ||
                      k.releaseDate == '1900-01-01' ||
                      k.releaseDate == null ||
                      k.retailPrice == null ||
                      k.category == ''
                    "
                  >
                    <v-btn
                      rounded
                      color="primary"
                      dark
                      x-small
                      @click="add_info(k?.id)"
                    >
                      정보 등록하고 포인트 받기
                    </v-btn>
                  </div>
                  <div class="text-center mt-15 w-100" v-else>
                    <v-btn
                      rounded
                      color="primary"
                      dark
                      x-small
                      @click="add_info(k?.id)"
                    >
                      경매 시작하기
                    </v-btn>
                  </div>
                </div>
              </v-expand-transition>
            </v-img>
            <v-btn
              absolute
              color="blue-grey"
              class="white--text"
              fab
              right
              small
              @click="toDetail(k?.id)"
            >
              <v-icon>read_more</v-icon>
            </v-btn>
            <v-card-text class="pt-6">
              <div class="grey--text text-caption mb-2" v-if="k.brand">
                {{
                  k.brand.includes("%20")
                    ? k.brand.replaceAll("%20", " ").toUpperCase()
                    : k.brand.toUpperCase()
                }}
              </div>
              <div class="grey--text mb-2" v-else>Brand</div>
              <span class="font-weight-heavy black--text mb-2 text-body-2">
                {{ k.name }}
              </span>
              <div class="font-weight-light mb-2 text-body-1">
                {{ k.releaseDate }}
              </div>
              <v-rating
                :value="k.rating_avg ? k.rating_avg : 0"
                dense
                readonly
                half-icon
                color="orange"
                background-color="orange"
                half-increments
                class="mr-2"
              ></v-rating>
              <span class="primary--text text-subtitle-2"
                >{{ k.review_count }} Reviews</span
              >
            </v-card-text>
          </v-card>
        </v-hover>

        <!-- spiral waveDots -->
      </v-col>

      <infinite-loading
        @infinite="get_next_page"
        spinner="bubbles"
        ref="infiniteLoading"
        style="width: 100%"
      >
        <div slot="no-results" class="mt-10 fw-bold fs-6">
          검색 설정을 해주세요...&#128531;
        </div>
        <div slot="no-more">no more data :(</div>
      </infinite-loading>
    </v-row>
    <v-row v-else class="mt-10">
      <loadingImg></loadingImg>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import infiniteLoading from "vue-infinite-loading";
import loadingImg from "@/components/common/loadingPage.vue";
import GalleryLoadingCards from "@/components/sneakers/GalleryLoadingCards.vue";
import swal from "sweetalert";
import { mapActions, mapGetters } from "vuex";

const searchStore = "searchStore";
export default {
  name: "sneakersGallery",
  data() {
    return {
      kicks: [],
      page: 0,
      limit: 20,
      like_check: false,
      overlay: false,
      next_page: "",
      env_url: this.$store.state.prod_url,
      sticky: false,
      loadingComplete: true,
      initialLoading: true,

      // search area related
      isLoading: false, // it chages every time user types into the input field
      outOfRange: false,
      keyword: "",
      brandGroup: this.$store.state.brandGroup,
      categoryGroup: this.$store.state.categoryGroup,
      brand: ["All"],
      category: ["All"],
      dates: [],
      info_registrequired: false,
      isScrollDown: false,
      scrollTop: 0,
    };
  },
  props: {
    url: String,
    searchCondition: {
      keyword: "",
      brand: "",
      release: "",
    },
  },
  components: {
    infiniteLoading,
    loadingImg,
    GalleryLoadingCards,
  },
  mounted() {
    // goTop을 위해 mount 시 element 설정
    // console.log("vue gallary mount");
    // console.log(process.env)
    // this.scrollTarget = document.getElementById('top');
    document.addEventListener("scroll", this.handleScroll);
    // 검색 결과를 vuex 에 들고 페이지로 이동 됐을 때, 검색 결과를 넣어준다. (vuex 에서 검색 결과를 가져온다.)
    console.log("this.banner_search_result :", this.banner_search_result);
    if (this.banner_search_result) {
      this.kicks = this.banner_search_result.results;
      this.next_page = this.banner_search_result.next;
      this.initialLoading = false;
      this.goTop();
    }
  },
  unmounted() {
    console.log(
      "this.$store.state.searchStore.search_result :",
      this.$store.state.searchStore.search_result
    );
    document.removeEventListener("scroll", this.handleScroll);
  },

  beforeRouteUpdate(to, from, next) {
    console.log(
      "beforeRouteUpdatebeforeRouteUpdatebeforeRouteUpdatebeforeRouteUpdatebeforeRouteUpdate"
    );
    console.log("to :", to);
    console.log("from :", from);
    console.log("next :", next);
    if (to.name === "sneakersGallery") {
      this.kicks = this.$store.state.searchStore.search_result.results;
      this.next_page = this.$store.state.searchStore.search_result.next;
      this.initialLoading = false;
      this.goTop();
    }
    next();
  },
  methods: {
    handleScroll(e) {
      // console.log("target", e.target);
      // console.log("e :", e);
      // console.log("scroll", e.target.documentElement.scrollTop);
      this.scrollTop = e.target.documentElement.scrollTop;
      if (this.scrollTop > 1) {
        this.isScrollDown = true;
      } else {
        this.isScrollDown = false;
      }
    },
    toDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
    option_reset() {
      this.keyword = "";
      this.brand = ["All"];
      this.category = ["All"];
      this.dates = [];
    },

    goTop() {
      window.scrollTo(0, 770);
    },
    ...mapActions(searchStore, ["saveSearchResult", "reset_result"]),

    fetch_kicks($state) {
      this.reset_result();
      this.initialLoading = false; // 검색 전 카드 영역 출력 방지 // 검색 후 카드 영역 출력
      this.loadingComplete = false; // 검색 결과 출력 전 로딩 이미지 출력

      // 검색 조건
      const search = this.keyword;
      let brand = this.brand.join();
      let category = this.category.join();
      let release_date = this.dates.join();
      let info_registrequired = this.info_registrequired;

      // 검색 조건 정리 (All 제거)
      if (brand == "All") brand = "";
      if (category == "All") category = "";
      // release_date가 null일 경우
      if (!release_date) {
        // 현재 날짜 객체 생성
        let currentDate = new Date();

        // 현재 날짜에서 2주를 뺀 날짜 계산
        let twoWeeksAgo = new Date(1900, 0, 1);

        // 현재 날짜에서 2주를 더한 날짜 계산
        let twoWeeksLater = new Date(
          currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
        );

        // 각 날짜를 원하는 포맷에 맞게 변환
        let twoWeeksAgoFormatted = twoWeeksAgo.toISOString().substring(0, 10);
        let twoWeeksLaterFormatted = twoWeeksLater
          .toISOString()
          .substring(0, 10);

        // 결과
        release_date = twoWeeksAgoFormatted + "," + twoWeeksLaterFormatted;
      }
      window.scrollTo(0, 900);
      let params = {
        search,
        release_date,
        category,
        brand,
        info_registrequired,
      };
      console.log(params);
      axios({
        method: "GET",
        url: this.$store.state.prod_url + "kicks/sneaker/list/",
        params: params,
      })
        .then((res) => {
          console.log(res);
          if (res) {
            this.loadingComplete = true;
            this.saveSearchResult(res.data);
            this.goTop();
            // $state.loaded();
          } else {
            this.loadingComplete = true;
            $state.complete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // TODO: axios 부분만 searchStore 로 빼기.
    // searchStore의 Actions 에서 결과 리턴 받아온 뒤,
    // 결과값에 따라 $state.loaded() 또는 $state.complete() 실행
    get_next_page($state) {
      console.log("get_next_page()");
      if (this.next_page_url != null) {
        axios({
          method: "GET",
          url: this.next_page_url,
        })
          .then((res) => {
            console.log(res);
            if (res) {
              this.saveSearchResult(res.data);

              $state.loaded();
            } else {
              $state.complete();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        $state.complete();
      }
    },
    infinityScrollHandler(e) {
      console.log(e);
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const bottomCheck = scrollHeight === scrollTop + clientHeight;
      if (bottomCheck) {
        this.get_next_page();
      }
    },
    like_btn(product_id, index) {
      // console.log('index Check :', index)
      if (!this.$store.state.user_data.access_token) {
        swal("계속하려면 로그인해주세요.", {
          buttons: {
            cancel: "취소",
            catch: {
              text: "로그인하러 가기",
              value: "login",
            },
            회원가입: true,
          },
        }).then((value) => {
          switch (value) {
            case "회원가입":
              this.$router.push({ path: "/agreement" });
              break;

            case "login":
              this.$router.push({ name: "login" });
              break;

            default:
              break;
          }
        });
      } else {
        const user_id = this.$store.state.user_data.pk;
        axios({
          method: "POST",
          url:
            this.$store.state.prod_url +
            `kicks/sneaker/like/${product_id}/${user_id}/`,
          headers: {
            Authorization: "Bearer " + this.$store.state.user_data.access_token,
          },
        })
          .then((res) => {
            // console.log('like req: ',res);
            if (res.data.message == "added") {
              this.kicks[index].like_users.push(user_id);
            } else if (res.data.message == "removed") {
              this.kicks[index].like_users.splice(
                this.kicks.indexOf(user_id),
                1
              );
            }
          })
          .catch((err) => {
            // console.log('err: ',err);
            if (err.response.status == 401) {
              this.$store.dispatch("refresh_token_request").then(() => {
                this.like_btn(product_id, index);
              });
            }
          });
      }
    },
    check_like_user(like_users) {
      for (let user of like_users) {
        if (user == this.$store.state.user_data.pk) {
          return true;
        } else {
          return false;
        }
      }
    },
    add_info(id) {
      if (!this.$store.state.user_data.access_token) {
        swal("계속하려면 로그인해주세요.", {
          buttons: {
            cancel: "취소",
            catch: {
              text: "로그인하러 가기",
              value: "login",
            },
            회원가입: true,
          },
        }).then((value) => {
          switch (value) {
            case "회원가입":
              this.$router.push({ path: "/agreement" });
              break;

            case "login":
              this.$router.push({ name: "login" });
              break;

            default:
              break;
          }
        });
      } else {
        this.$router.push({ name: "updateInfo", params: { id } });
      }
    },
    reset_other_options() {
      //TODO: 검색 조건에서 다른 옵션을 선택했을 때, 다른 옵션들을 초기화, Alert 띄워주기
      //(예: 정보 등록이 필요한 상품 검색 조건 선택 시, 브랜드, 카테고리, 릴리즈 날짜, 검색어 초기화)

      if (this.info_registrequired) {
        if (
          this.keyword != "" ||
          this.dates.length != 0 ||
          this.category[0] != "All" ||
          this.brand[0] != "All"
        ) {
          swal(
            "해당 조건을 선택하면 다른 검색 조건이 초기화됩니다. 계속 하시겠습니까?",
            {
              buttons: {
                cancel: "취소",
                catch: {
                  text: "확인",
                  value: "confirm",
                },
              },
            }
          ).then((value) => {
            switch (value) {
              case "confirm":
                this.option_reset();
                break;

              default:
                break;
            }
          });
        }
      }
    },
    infoCheckBoxReset() {
      this.info_registrequired = false;
    },
  },
  created() {
    //TODO: 페이지 헤더에 있는 검색 바에 검색어가 있으면 검색어를 통해 검색할 경우 실행
    // this.fetch_kicks();
  },
  computed: {
    ...mapGetters("searchStore", ["GET_SEARCH_RESULTS", "GET_NEXT_PAGE_URL"]),

    search_result() {
      return this.GET_SEARCH_RESULTS;
    },
    next_page_url() {
      return this.GET_NEXT_PAGE_URL;
    },

    brand_formatter() {
      if (this.kick.brand) {
        const brand = this.kick.brand;
        if (brand == "Air$%20Jordan" || brand == "Jordan") {
          return "AIR JORDAN";
        } else {
          return brand.toUpperCase();
        }
      } else {
        return " ";
      }
    },
    needed_tobe_updated() {
      if (
        this.local_imageUrl ==
        this.$store.state.prod_url + "media/images/defaultImg.png"
      ) {
        return true;
      } else {
        return false;
      }
    },
    search_btn_loading() {
      if (this.loadingComplete) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 2000);
    },
    brand() {
      if (this.brand.length > 1 && this.brand.indexOf("All") == 0) {
        this.brand.shift();
      } else if (this.brand.length == 0) {
        this.brand = ["All"];
      }
    },
    category() {
      if (this.category.length > 1 && this.category.indexOf("All") == 0) {
        this.category.shift();
      } else if (this.category.length == 0) {
        this.category = ["All"];
      }
    },
  },
  filters: {
    desc_shortener(desc) {
      if (desc) {
        return desc.substring(0, 100) + "...";
      }
    },
  },
};
</script>

<style scoped>
.strong-text {
  font-weight: bolder;
}
.marquee {
  height: 25px;

  overflow: hidden;
  position: relative;
}

.marquee div {
  display: block;
  width: 200%;
  height: 30px;

  position: absolute;
  overflow: hidden;

  animation: marquee 5s linear infinite;
}

.marquee span {
  float: left;
  width: 50%;
}

@keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
</style>
