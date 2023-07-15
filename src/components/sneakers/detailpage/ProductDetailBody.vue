<template>
  <v-row align="center" align-content="space-around">
    <div class="text-center">
      <v-btn
        rounded
        color="#D6E4E5"
        top
        style="margin-top: 10px"
        max-width="500px"
        v-if="
          kick?.local_imageUrl == '' ||
          kick?.brand == null ||
          kick?.colorway == null ||
          kick?.releaseDate == '1900-01-01' ||
          kick?.releaseDate == null ||
          kick?.retailPrice == null ||
          kick?.category == ''
        "
        @click="add_info(kick?.id)"
      >
        정보 등록하고 포인트 받기
      </v-btn>
    </div>
    <div class="text-center mt-2">
      <v-btn
        small
        rounded
        color="#E2E2EF"
        v-if="this.$store.getters.get_user_data.email == 'kickin@kickin.kr'"
        @click="raffle_exsit_check"
        >라플 생성</v-btn
      >
    </div>
    <div class="mt-2 mb-2">
      <v-btn
        small
        absolute
        fab
        right
        style="margin-top: 3px; margin-right: 12px"
        @click="like_btn(kick?.id)"
        v-if="check_like_user(kick?.like_users)"
      >
        <font-awesome-icon icon="fa-solid fa-heart" />
      </v-btn>
      <v-btn
        small
        absolute
        fab
        right
        style="margin-right: 12px; margin-top: 3px"
        @click="like_btn(kick?.id)"
        v-else
      >
        <font-awesome-icon icon="fa-regular fa-heart" />
      </v-btn>
      <v-menu offset-y rounded="3">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon x-large style="float: left">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
          </v-btn>
        </template>
        <v-list dense rounded>
          <v-list-item-group v-model="selectedAction" color="primary">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>공유하기</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>수정제안</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
    <template>
      <!--      <div class="ad-container">-->
      <!--        <InArticleAdsense-->
      <!--          style="border: 1px solid black"-->
      <!--          data-ad-client="ca-pub-6048277531996552"-->
      <!--          data-ad-slot="9648734008"-->
      <!--          data-ad-format="fluid"-->
      <!--          data-adtest="on"-->
      <!--          data-ad-layout="in-article"-->
      <!--        >-->
      <!--        </InArticleAdsense>-->
      <!--      </div>-->
    </template>
    <v-col sm="12" md="8" xl="8">
      <v-sheet height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <v-img
            :src="
              kick?.local_imageUrl.startsWith('productUpdator')
                ? img_base_url + 'media/' + kick?.local_imageUrl
                : img_base_url + kick?.local_imageUrl
            "
            :lazy-src="env_url + 'media/images/loading.gif'"
            contain
            width="650"
            height="700"
          >
          </v-img>
        </v-row>
      </v-sheet>
    </v-col>
    <v-col class="" dense sm="12" md="4" xl="4">
      <v-card height="600">
        <v-img
          class="ma-auto"
          :src="brand_logo"
          height="100"
          width="100"
        ></v-img>
        <v-card-title class="mt-0">
          <h5 class="mb-0">{{ kick?.name }}</h5>
        </v-card-title>
        <v-card-subtitle v-if="kick?.name_kr">
          {{ kick?.name_kr }}
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-rating
              :value="this.rating"
              dense
              readonly
              half-icon
              color="orange"
              background-color="orange"
              half-increments
              class="ml-0"
            ></v-rating>
            <span class="ml-2" style="">{{ get_review_cnt }} discussions</span>
          </v-row>
        </v-card-text>
        <v-divider class="mx-4 text--black" light></v-divider>
        <v-card-text>
          <span class="fw-bold">발매일 : </span>
          <span class="mr-5"> {{ kick?.releaseDate }}</span>
          <span class="fw-bold ml-5">발매금액 : </span>
          <span>
            USD: ${{ get_dollor }} / KRW: 약
            {{ get_krw.toLocaleString() }}원</span
          >
        </v-card-text>
        <v-card-text class="pt-0">
          <span class="fw-bold">SKU : </span>
          <span class="mr-5"> {{ kick?.sku }}</span>
          <span class="fw-bold ml-7">ColorWay : </span>
          <span> {{ kick?.colorway }}</span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-overlay :value="overlay"
      ><v-card color="white" width="520">
        <v-card-title>라플 등록</v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="6"
                ><v-text-field
                  label="제목"
                  v-model="new_raffle.title"
                  required
                  light
                ></v-text-field
              ></v-col>

              <v-col cols="6">
                <v-combobox
                  label="제품 검색"
                  light
                  required
                  readonly
                  v-model="new_raffle.product"
                ></v-combobox>
              </v-col>
              <v-col cols="12">
                <v-date-picker v-model="dates" range></v-date-picker
              ></v-col>
              <v-col cols="12" class="text-dark">
                <span><strong>이벤트 기간:</strong> {{ return_dates }}</span>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="당첨자 수"
                  v-model="new_raffle.winnerCount"
                  required
                  light
                  readonly
                >
                  <v-icon
                    slot="append"
                    color="red"
                    @click="
                      new_raffle.winnerCount < 5
                        ? new_raffle.winnerCount++
                        : null
                    "
                  >
                    mdi-plus
                  </v-icon>
                  <v-icon
                    slot="prepend"
                    color="green"
                    @click="
                      new_raffle.winnerCount > 1
                        ? new_raffle.winnerCount--
                        : null
                    "
                  >
                    mdi-minus
                  </v-icon></v-text-field
                >
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="응모 포인트"
                  v-model="new_raffle.pointRequired"
                  readonly
                  required
                  light
                >
                  <v-icon
                    slot="append"
                    color="red"
                    @click="new_raffle.pointRequired += 500"
                  >
                    mdi-plus
                  </v-icon>
                  <v-icon
                    slot="prepend"
                    color="green"
                    @click="
                      new_raffle.pointRequired > 500
                        ? (new_raffle.pointRequired -= 500)
                        : null
                    "
                  >
                    mdi-minus
                  </v-icon></v-text-field
                >
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="인원 제한"
                  v-model="new_raffle.raffle_cnt"
                  readonly
                  required
                  light
                >
                  <v-icon
                    slot="append"
                    color="red"
                    @click="new_raffle.raffle_cnt += 100"
                  >
                    mdi-plus
                  </v-icon>
                  <v-icon
                    slot="prepend"
                    color="green"
                    @click="
                      new_raffle.raffle_cnt > 500
                        ? (new_raffle.raffle_cnt -= 100)
                        : null
                    "
                  >
                    mdi-minus
                  </v-icon></v-text-field
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="create_raffle"> 등록 </v-btn>
          <v-btn color="warning" @click="overlay = false"> 취소 </v-btn>
          <v-btn color="error"> 초기화 </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-row>
</template>

<script>
// import StarRating from 'vue-star-rating'
import axios from "axios";
import swal from "sweetalert";
import { mapActions } from "vuex";
export default {
  name: "productDetail",
  components: {
    // StarRating,
  },
  metaInfo() {
    return {
      title: "KICKIN",
      meta: [
        {
          property: "og:name",
          content: this.kick ? this.kick.name : "", // 동적으로 설정되는 제목
        },

        {
          property: "og:image",
          content: this.kick?.local_imageUrl.startsWith("productUpdator")
            ? this.img_base_url + "media/" + this.kick?.local_imageUrl
            : this.img_base_url + this.kick?.local_imageUrl,
        },
      ],
    };
  },
  data() {
    return {
      kick: null,
      rating: 0,
      like_users: [],
      selectedAction: null,
      env_url: this.$store.state.prod_url,
      img_base_url: this.$store.getters.get_env_url,
      overlay: false,
      dates: null,
      new_raffle: {
        title: null,
        winnerCount: 1,
        product: null,
        pointRequired: 500,
        end_date: null,
        start_date: null,
        raffle_cnt: 100,
      },
    };
  },
  methods: {
    ...mapActions("searchStore", ["addTorecentView", "likeOrUnlike"]),

    getCurrentDateTime() {
      var now = new Date();
      var hours = ("0" + now.getHours()).slice(-2);
      var minutes = ("0" + now.getMinutes()).slice(-2);
      var seconds = ("0" + now.getSeconds()).slice(-2);
      return " " + hours + ":" + minutes + ":" + seconds;
    },
    get_avg_rating() {
      let avg_rating = 0;
      if (this.kick) {
        if (this.kick.reviews.length > 0) {
          for (const r of this.kick.reviews) {
            avg_rating += r.rating;
          }
          this.rating = parseInt(avg_rating / this.kick.reviews.length);
        }
      } else {
        this.rating = 0;
      }
    },

    like_btn(product_id) {
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
              this.like_users.push(user_id);
            } else if (res.data.message == "removed") {
              this.like_users.splice(this.like_users.indexOf(user_id), 1);
            }
          })
          .catch((err) => {
            console.log("err: ", err);
            // if (err.response.status == 401) {
            //   this.$store.dispatch("refresh_token_request").then(() => {
            //     this.like_btn(product_id, index);
            //   });
            // }
          });
      }
    },
    check_like_user(like_users) {
      if (like_users) {
        for (let user of like_users) {
          if (user == this.$store.state.user_data.pk) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    set_like_user() {
      if (this.kick) {
        console.log("chec");
        this.like_users = this.kick.like_users;
      }
    },
    original_size_img(url, name) {
      const options = "width=850, height=850, menubar=no, toolbar=no";
      window.open(url, name, options);
    },
    /**이미지 리스트 중 하나라도 미등록 상태일 경우 정보 등록 버튼을 노출시킨다. return boolean */
    img_check() {
      let result = false;
      if (this.kick) {
        if (
          this.kick?.local_imageUrl == null ||
          this.kick?.local_imageUrl ==
            this.$store.state.prod_url + "media/images/defaultImg.png"
        ) {
          result = true;
        }
      }

      return result;
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
              this.$router.push({
                name: "login",
                query: { next: "updateInfo", id: id },
              });
              break;

            default:
              break;
          }
        });
      } else {
        this.$router.push({ name: "updateInfo", params: { id } });
      }
    },
    raffle_exsit_check() {
      axios({
        method: "GET",
        url: `http://localhost:8000/raffle/${this.kick?.id}/`,
      })
        .then((res) => {
          if (res.data.result == 1) {
            swal("이미 해당 제품의 라플이 존재합니다.");
            return;
          } else {
            this.overlay = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    create_raffle() {
      //해당 제품으로 이미 존재하는 라플이 있는지 확인

      if (
        !this.new_raffle.title ||
        !this.new_raffle.start_date ||
        !this.new_raffle.end_date ||
        !this.new_raffle.product
      ) {
        swal("필수 항목을 입력해 주세요.");

        return;
      }

      axios({
        method: "POST",
        url: "http://localhost:8000/raffle/",
        data: this.new_raffle,
        headers: {
          Authorization:
            "Bearer " + this.$store.getters.get_user_data.access_token,
        },
      })
        .then((res) => {
          console.log(res);
          this.overlay = false;
          swal("성공적으로 등록되었습니다.", { buttons: "확인" });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setMetaInfo() {
      const metaTitle = this.kick?.name;
      const metaKeywords = [this.kick?.name, this.kick?.brand, this.kick?.id];

      // Vue 컴포넌트의 metaInfo 속성을 사용하여 메타 데이터 동적으로 설정
      this.$options.metaInfo = {
        title: metaTitle,
        meta: [
          {
            name: "name",
            content: metaTitle,
          },
          {
            name: "keywords",
            content: metaKeywords.join(","),
          },
        ],
      };
    },
  }, // end of methods
  computed: {
    // img_url_parser () {
    //   return  this.kick?.local_imageUrl
    // },
    get_meta_data() {
      return this.kick;
    },
    return_dates() {
      const default_msg = "날짜를 선택해 주세요.";
      switch (this.dates?.length) {
        case 0:
          return default_msg;

        case 1:
          return this.dates[0];

        case 2:
          return this.dates[0] + " ~ " + this.dates[1];

        default:
          return default_msg;
      }
    },
    get_review_cnt() {
      if (this.kick) {
        return this.kick.reviews.length;
      }
      return 0;
    },
    get_krw() {
      const rate = 1302.58;
      if (this.kick?.retailPrice) {
        const krw_price = this.kick?.retailPrice * 0.01 * rate;
        return Math.ceil(krw_price);
      }
      return 0;
    },
    get_dollor() {
      if (this.kick?.retailPrice) {
        const price = this.kick?.retailPrice * 0.01;
        var dollarUSLocale = Intl.NumberFormat("en-US");
        return dollarUSLocale.format(price);
      } else {
        return 0;
      }
    },
    brand_formatter() {
      if (this.kick?.brand) {
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
    brand_logo() {
      if (this.kick?.brand) {
        const brand = this.kick?.brand;
        if (brand == "Air Jordan" || brand == "Jordan") {
          return (
            this.$store.state.prod_url + "media/images/logos/air-jordan.png"
          );
        } else if (brand == "Nike") {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Nike_Just_Do_It_logo.svg/1200px-Nike_Just_Do_It_logo.svg.png";
        } else if (brand == "Adidas") {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png";
        } else if (brand == "Yeezy") {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png";
        } else if (brand == "New%20Balance") {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/New_Balance_logo.svg/1200px-New_Balance_logo.svg.png";
        } else if (brand == "Vans") {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vans_logo.svg/1200px-Vans_logo.svg.png";
        } else if (brand == "Converse") {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png";
        } else if (brand == "Puma") {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png";
        } else if (brand == "Reebok") {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png";
        } else if (brand == "Diadora") {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png";
        }
      }
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png";
    },
  },
  watch: {
    kick() {
      this.get_avg_rating();
      this.set_like_user();
    },
    dates() {
      if (this.dates.length > 1) {
        this.new_raffle.start_date = this.dates[0] + "T00:00:00+00:00";
        this.new_raffle.end_date = this.dates[1] + "T00:00:00+00:00";
      } else {
        this.new_raffle.start_date = this.dates[0] + "T00:00:00+00:00";
        this.new_raffle.end_date = this.dates[0] + "T00:00:00+00:00";
      }
    },
  },
  created() {
    const product_id = this.$route.params.id;
    axios({
      method: "GET",
      url: this.$store.state.prod_url + "kicks/sneaker/" + product_id + "/",
    })
      .then((res) => {
        console.log("detail res: ", res);
        this.kick = res.data;
        this.product_id = res.data.id;
        this.new_raffle.product = res.data.id;
        console.log("axios Finally clause", this.kick);
        this.addTorecentView(this.kick);

        // 비동기 처리가 완료된 후에 메타 데이터 설정
        this.setMetaInfo();
      })
      .catch((err) => {
        console.log("detail err :", err);
        this.$router.push("/404");
      })
      .finally(() => {});
  },
  mounted() {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap");
.v-line {
  border-top: thin solid #c6c8c9;
  /* margin-left: 1rem; */
  height: 1px;
  width: 1234px;
  margin-bottom: 3.5px;
}

.img-row {
  cursor: pointer;
}

.original_btn {
  display: none;
}

#img_caraousel {
  box-shadow: 1px 5px 5px #c6c8c9;
  border-radius: 4px;
}

#img_caraousel:hover .original_btn {
  display: inline;
}
#korean_name {
  font-family: "Pathway Gothic One", sans-serif;
}

.product_name {
  font-family: "Pathway Gothic One", sans-serif;
}
</style>
