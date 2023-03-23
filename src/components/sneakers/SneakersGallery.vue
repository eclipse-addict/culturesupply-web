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
                  label="브랜드"
                  multiple
                  clear-icon="$clear"
                  clearable
                  chips
                ></v-combobox>
              </v-col>

              <v-col cols="12" lg="4" sm="12">
                <v-text-field
                  label="Search Keyword"
                  :loading="isLoading"
                  v-model="keyword"
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
                width="140"
                elevation="1"
                dark
                color="#497174"
                @click="fetch_kicks"
                :loading="!loadingComplete"
                >검색</v-btn
              >
              <v-btn
                bottom
                width="50"
                elevation="1"
                dark
                color="#EB455F"
                @click="option_reset"
                >초기화</v-btn
              >
            </p>
            <p class="text-center">
              <v-checkbox label="정보 등록 필요 제품만 보기"></v-checkbox>
            </p>
          </v-sheet>
        </v-card-text>
      </v-card>
      <div class="marquee fw-bolder" v-if="loadingComplete">
        <div>
          <span>PLEASE SELECET YOUR SEARCH CONDITIONS</span>
          <span>PLEASE SELECET YOUR SEARCH CONDITIONS</span>
          <span>PLEASE SELECET YOUR SEARCH CONDITIONS</span>
        </div>
      </div>
      <v-btn
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
            label="Search Keyword"
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
    <v-row
      class="mt-sm-0 container row d-flex justify-content-around"
      id="main"
      v-if="loadingComplete"
    >
      <v-col
        class="card mt-13"
        cols="12"
        sm="6"
        md="4"
        style="width: 25rem"
        v-for="(k, index) in kicks"
        :key="index"
        v-scroll:#main="infinityScrollHandler"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class=""
            style="box-shadow: none"
            color="grey lighten-4"
            max-width="600"
            min-height="455"
            min-width="200"
          >
            <v-img
              :aspect-ratio="1.4"
              :src="env_url + k.local_imageUrl"
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
                  class="d-flex transition-fast-in-fast-out blue-grey lighten-4 v-card--reveal text-h2 black--text"
                  style="height: 100%; opacity: 0.9"
                >
                  <div class="mt-5">
                    <v-btn
                      small
                      absolute
                      fab
                      right
                      @click="like_btn(k?.id, index)"
                      v-if="check_like_user(k.like_users)"
                    >
                      <font-awesome-icon icon="fa-solid fa-heart" />
                    </v-btn>
                    <v-btn
                      small
                      absolute
                      fab
                      right
                      @click="like_btn(k?.id, index)"
                      v-else
                    >
                      <font-awesome-icon icon="fa-regular fa-heart" />
                    </v-btn>
                    <v-btn small absolute fab left>
                      <span class="material-symbols-outlined">ios_share</span>
                    </v-btn>
                  </div>
                  <div class="text-center mt-15 w-100">
                    <v-btn
                      rounded
                      color="primary"
                      dark
                      v-if="
                        k.local_imageUrl == 'media/images/defaultImg.png' ||
                        k.brand == null ||
                        k.colorway == null ||
                        k.releaseDate == '1900-01-01' ||
                        k.releaseDate == null ||
                        k.retailPrice == null ||
                        k.category == ''
                      "
                      @click="add_info(k?.id)"
                    >
                      사진 및 정보 등록하기 <br />
                      [최대 +1000 points 적립]
                    </v-btn>
                    <div v-else>
                      <h6>something</h6>
                    </div>
                  </div>
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-6" style="position: relative">
              <v-btn
                absolute
                color="blue-grey"
                class="white--text"
                fab
                large
                right
                top
                @click="toDetail(k?.id)"
              >
                <v-icon>read_more</v-icon>
              </v-btn>
              <div class="grey--text text-h6 mb-2" v-if="k.brand">
                {{
                  k.brand.includes("%20")
                    ? k.brand.replaceAll("%20", " ").toUpperCase()
                    : k.brand.toUpperCase()
                }}
              </div>
              <div class="grey--text text-h6 mb-2" v-else>Brand</div>
              <h6 class="text-h6 font-weight-heavy black--text mb-2">
                {{ k.name }}
              </h6>
              <div class="font-weight-light text-h6 mb-2">
                {{ k.releaseDate }}
              </div>
              <!-- <v-rating
            :value="k.avg_rating?k.avg_rating:0"
            dense
            readonly
            half-icon
            color="orange"
            background-color="orange"
            half-increments
            class="mr-2"
          ></v-rating> -->
              <!-- <span class="primary--text text-subtitle-2">{{k.count_reviews}} Reviews</span> -->
            </v-card-text>
          </v-card>
        </v-hover>

        <!-- spiral waveDots -->
      </v-col>
      <infinite-loading
        v-if="!initialLoading"
        @infinite="get_next_page"
        spinner="bubbles"
        ref="infiniteLoading"
        style="width: 100%"
      ></infinite-loading>
    </v-row>
    <v-row v-else>
      <loadingImg></loadingImg>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import infiniteLoading from "vue-infinite-loading";
import loadingImg from "@/components/common/loadingPage.vue";
import swal from "sweetalert";
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
      brandGroup: [
        "Nike",
        "adidas",
        "New Balance",
        "Vans",
        "Air Jordan",
        "Supreme",
        "Puma",
        "Converse",
        "Reebok",
        "ASICS",
        "Palace",
        "Kith",
        "off white",
        "Stussy",
        "Under Armour",
        "Gucci",
        "BAPE",
        "Balenciaga",
        "Billionaire Boys Club",
        "Saucony",
        "Palm Angels",
        "Amiri",
        "Fear Of God Essentials",
        "Pleasures",
        "Stone Island",
        "Versace",
        "Icecream",
        "MCQ",
        "Saint Laurent",
        "Rhude",
        "Brain Dead",
        "Diadora",
        "Bottega Veneta",
        "Givenchy",
        "Carhartt WIP",
        "Heron Preston",
        "Loewe",
        "comme des garcons play",
        "Air Jordan",
        "Vetements",
        "Anti Social Social Club",
        "Burberry",
        "Casablanca",
        "Dior",
        "Undercover",
        "OFF-WHITE",
        "Under Armour",
        "Jacquemus",
        "Rick Owens",
        "Raf Simons",
        "cactus jack by travis scott",
        "Honor The Gift",
        "Marni",
        "Moncler",
        "Chinatown Market",
        "MM6 Maison Margiela",
        "Market",
        "Neighborhood",
        "Maison Margiela",
        "acne studios",
        "1017 alyx 9sm",
        "GANNI",
        "Alexander McQueen",
        "Moncler Genius",
        "Ambush",
        "Kapital",
        "Marine Serre",
        "Ami",
        "Ksubi",
        "Needles",
        "Aries",
        "Fear Of God",
        "Balmain",
        "a cold wall",
        "Karhu",
        "Vlone",
        "",
        "Dime",
        "Human Made",
        "Fendi",
        "Thisisneverthat",
        "Visvim",
        "Saint Laurent",
        "Lemaire",
        "Helmut Lang",
        "Martine Rose",
        "Saint Michael",
        "Common Projects",
        "Cav Empt",
        "Polo Ralph Lauren",
        "Jil Sander",
        "y 3",
        "032c",
        "KidSuper",
        "The North Face",
        "Crocs",
        "Ader Error",
        "Wacko Maria",
        "Prada",
        "courreges",
        "Sacai",
        "Nahmias",
        "apc",
        "Who Decides War",
        "comme des garcons shirt",
        "Cactus Plant Flea Market",
        "Paco Rabanne",
        "Mizuno",
        "Louis Vuitton",
        "Liberaiders",
        "Yohji Yamamoto Pour Homme",
        "Rick Owens DRKSHDW",
        "Awake NY",
        "Reese Cooper",
        "Engineered Garments",
        "Junya Watanabe",
        "Les Tien",
        "Yeezy Gap",
        "comme des garcons",
        "Valentino",
        "Advisory Board Crystals",
        "New Balance",
        "Fila",
        "JW Anderson",
        "Music",
        "Saintwoods",
        "Just Don",
        "Khaite",
        "comme des garcons wallet",
        "Real Bad Man",
        "Lanvin",
        "We11done",
        "museum of peace quiet",
        "C2H4",
        "Timberland",
        "Born X Raised",
        "GOLF WANG",
        "Hatton Labs",
        "Curry Brand",
        "Yeezy",
        "Gentle Monster",
        "Mykita",
        "Acronym",
        "Bode",
        "Clarks",
        "Martine Ali",
        "Kanye West",
        "Chanel",
        "yproject",
        "CELINE",
        "Parra",
        "comme des garcons homme plus",
        "Mastermind World",
        "Mastermind",
        "Nanamica",
        "li ning",
        "Alexander McQueen",
        "Stone Island Shadow Project",
        "CLOT",
        "ERL",
        "Fred Perry",
        "redone",
        "bricks wood",
        "Ewing",
        "Wales Bonner",
        "READYMADE",
        "Dries Van Noten",
        "Flight Club",
        "paris saint germain",
        "Eckhaus Latta",
        "Sp5der",
        "Kiko Kostadinov",
        "Simone Rocha",
        "girls dont cry",
        "Louis Vuitton",
        "OAMC",
        "Afield Out",
        "And Wander",
        "Skim Milk",
        "Song For The Mute",
        "Agolde",
        "MISBHV",
        "WHOLE",
        "Hoka One One",
        "Hood By Air",
        "Noah",
        "KangaROOS",
        "Kenzo",
        "Online Ceramics",
        "Pleats Please Issey Miyake",
        "Polo By Ralph Lauren",
        "Iise",
        "Li-Ning",
        "Other",
        "Yeezy Gap Engineered By Balenciaga",
        "SUPER By RetroSuperFuture",
        "Yohji Yamamoto",
        "mr saturday",
        "BLUEMARBLE",
        "Flatlist",
        "VTMNTS",
        "dr martens",
        "424",
        "levis",
        "John Geiger",
        "Salomon",
        "Midnight Studios",
        "ON",
        "Students",
        "Bao Bao Issey Miyake",
        "Norse Projects",
        "Patta",
        "2 moncler",
        "Brooks",
        "Champion",
        "Moncler Grenoble",
        "Junya Watanabe MAN",
        "K Swiss",
        "Chemist Creations",
        "Craig Green",
        "Dutch Tulip Financial",
        "Issey Miyake",
        "Big Baller Brand",
        "Children Of The Discordance",
        "Ian Charms",
        "Rassvet",
        "SLVRLAKE",
        "Entire Studios",
        "Psychworld",
        "Hyein Seo",
        "Maison Mihara Yasuhiro",
        "Total Luxury Spa",
        "Camp High",
        "Onitsuka Tiger",
        "Yamborghini",
        "bianca chandon",
        "3paradis",
        "Harley Davidson",
        "Little Africa",
        "VEERT",
        "Anta",
        "CLOTTEE",
        "Drew House",
        "Kids Of Immigrants",
        "Le Coq Sportif",
        "New Era",
        "One Of These Days",
        "CDG",
        "Chrome Hearts",
        "Miu Miu",
        "RetroSuperFuture",
        "Vintage",
        "ernest w baker",
        "porter yoshida co",
        "tao comme des garcons",
        "AI Studios",
        "Casey Casey",
        "Denim Tears",
        "Keiser Clark",
        "Sandal Boyz",
        "Veneda Carter",
        "Birkenstock",
        "Ottolinger",
        "Sandy Liang",
        "Andersson Bell",
        "Dc",
        "Filling Pieces",
        "Mister Green",
        "Supra",
        "dolce gabbana",
        "Etudes",
        "Jack Eller",
        "Sky High Farm",
        "Soulland",
        "comme des garcons homme",
        "number nine",
        "5 moncler",
        "Golden Goose",
        "I Know Nigo",
        "IDEA",
        "MSCHF",
        "Movies",
        "Suicoke",
        "Anonymous Club",
        "Books",
        "Cecilie Bahnsen",
        "Dior Homme",
        "Edward Cuming",
        "Greg Lauren",
        "Jean Paul Gaultier",
        "Know Wave",
        "Mowalola",
        "Polite Worldwide",
        "T By Alexander Wang",
        "Ubiq",
        "ADYAR",
        "Christian Louboutin",
        "Eric Emanuel",
        "Hidden NY",
        "MediCom Toy",
        "Tommy Hilfiger",
        "Travis Scott",
        "tricot comme des garcons",
        "AND1",
        "Borsalino",
        "Buscemi",
        "DC Comics",
        "Haider Ackermann",
        "Hender Scheme",
        "Marc Jacobs",
        "Marcelo Burlon",
        "Merrell",
        "Mugler",
        "Paperboy",
        "Sinclair",
        "Umbro",
        "mercedes benz",
        "361 degrees",
        "66 north",
        "90s anxiety",
        "AREA",
        "Alexander Wang",
        "Angel Chen",
        "Ari",
        "Art",
        "Baracuta",
        "Boris Bidjan Saberi",
        "Brandon Maxwell",
        "Calvin Klein",
        "Cartier",
        "Charles Jeffrey Loverboy",
        "Coperni",
        "Ellesse",
        "Etonic",
        "Ferrari",
        "GR10K",
        "Hummel Hive",
        "Hussein Chalayan",
        "KARA",
        "KAWS",
        "Lotto",
        "Molly Goddard",
        "Nowhere",
        "OVO",
        "PF Flyers",
        "Peter Do",
        "Pierre Hardy",
        "Poche",
        "Quiet Golf",
        "Siberia Hills",
        "Sies Marjan",
        "Sony",
        "Sophie Bille Brahe",
        "Stand Studio",
        "Sulvam",
        "Taiga Takahashi",
        "The Hundreds",
        "The Source",
        "Tier",
        "Tom Sachs",
        "Used Future",
        "Vivienne Westwood",
        "mitchell ness",
        "pam",
        "ys",
      ],
      genderGroup: [
        "All",
        "Youth",
        "Men",
        "Women",
        "Infant",
        "Toddler",
        "Child",
        "Unisex",
        "Preschool",
      ],
      categoryGroup: ["shoes", "accessories", "apparel", "bags", "jewelry"],
      brand: ["All"],
      category: ["All"],
      dates: [],
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
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
    option_reset() {
      this.keyword = "";
      this.brand = ["All"];
      this.category = ["All"];
      this.dates = [];
    },
    search() {
      this.$router.push({
        name: "sneakers",
        query: {
          search: this.keyword,
          brand: this.brand.join(),
          release: this.dates.join(),
        },
      });
      this.keyword = "";
      this.goTop();
      location.reload();
    },
    goTop() {
      window.scrollTo(0, 0);
    },
    fetch_kicks($state) {
      this.initialLoading = false; // 검색 전 카드 영역 출력 방지 // 검색 후 카드 영역 출력
      this.loadingComplete = false; // 검색 결과 출력 전 로딩 이미지 출력

      // 검색 조건
      const search = this.keyword;
      let brand = this.brand.join();
      let category = this.category.join();
      let release_date = this.dates.join();

      // 검색 조건 정리 (All 제거)
      if (brand == "All") brand = "";
      if (category == "All") category = "";
      // release_date가 null일 경우
      if (!release_date) {
        console.log("releaseDate is null");
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
        console.log(release_date);
      }

      console.log(" fetch_kicksfetch_kicksfetch_kickscall");
      let params = {
        search,
        release_date,
        category,
        brand,
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
            this.kicks = res.data.results;
            this.next_page = res.data.next;
            console.log("loadingComplete1111");
            this.loadingComplete = true;
            this.goTop();
            // $state.loaded();
          } else {
            console.log("loadingComplete222");
            this.loadingComplete = true;
            $state.complete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    get_next_page($state) {
      if (this.next_page != null) {
        axios({
          method: "GET",
          url: this.next_page,
        })
          .then((res) => {
            console.log(res);
            if (res) {
              this.kicks = this.kicks.concat(res.data.results);
              this.next_page = res.data.next;
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
  },
  created() {
    //TODO: 페이지 헤더에 있는 검색 바에 검색어가 있으면 검색어를 통해 검색할 경우 실행
    // this.fetch_kicks();
  },
  computed: {
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