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
              <v-col cols="12" lg="2" sm="12">
                <v-combobox
                  v-model="ordering"
                  :items="ordering_filters"
                  @change="infoCheckBoxReset"
                  label="정렬 기준"
                  chips
                  dense
                ></v-combobox>
              </v-col>
              <v-col cols="12" lg="2" sm="12">
                <v-combobox
                  v-model="category"
                  :items="categoryGroup"
                  @change="infoCheckBoxReset"
                  label="카테고리"
                  multiple
                  clear-icon="$clear"
                  dense
                  clearable
                  chips
                ></v-combobox>
              </v-col>
              <v-col cols="12" lg="2" sm="12">
                <v-combobox
                  v-model="brand"
                  :items="brandGroup"
                  @change="infoCheckBoxReset"
                  label="브랜드"
                  clear-icon="$clear"
                  clearable
                  chips
                  dense
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
                  dense
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

            <v-treeview
              hoverable
              rounded
              dense
              selectable
              v-model="info_registrequired"
              :items="items"
            ></v-treeview>
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
        left
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
              @change="infoCheckBoxReset"
              label="브랜드"
              clear-icon="$clear"
              clearable
              chips
              dense
            ></v-combobox>
          </p>
          <p>
            <v-combobox
              v-model="category"
              :items="categoryGroup"
              @change="infoCheckBoxReset"
              label="카테고리"
              multiple
              clear-icon="$clear"
              dense
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
                      <font-awesome-icon
                        :icon="['fas', 'up-right-from-square']"
                      />
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
                      k.category == '' ||
                      k.name_kr == null
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
              @click="toDetail(k?.id, k?.name)"
            >
              <v-icon>read_more</v-icon>
            </v-btn>
            <v-card-text class="pt-6">
              <div class="grey--text text-caption" v-if="k.brand">
                {{
                  k.brand.includes("%20")
                    ? k.brand.replaceAll("%20", " ").toUpperCase()
                    : k.brand.toUpperCase()
                }}
              </div>
              <div class="grey--text mb-2" v-else>Brand</div>
              <span class="font-weight-heavy black--text text-body-2">
                {{ k?.name }}
              </span>
              <div class="font-weight-light text-body-1">
                {{ k.releaseDate }}
              </div>
              <!--              <div class="mx-0">-->
              <!--                <v-rating-->
              <!--                  :value="k.rating_avg ? k.rating_avg : 0"-->
              <!--                  dense-->
              <!--                  readonly-->
              <!--                  half-icon-->
              <!--                  color="amber"-->
              <!--                  background-color="orange"-->
              <!--                  half-increments-->
              <!--                  x-small-->
              <!--                  style="display: inline-block"-->
              <!--                ></v-rating>-->
              <!--                <span class="grey&#45;&#45;text ms-4">({{ k.review_count }})</span>-->
              <!--              </div>-->

              <div class="grey--text text-caption">
                {{ k.click }}
                <v-icon x-small>mdi-eye-outline</v-icon>
              </div>
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
      env_url: this.$store.getters.get_env_url,
      imag_url: this.$store.state.imageUrl,
      sticky: false,
      loadingComplete: true,
      initialLoading: true,
      searchConditionChanged: false,
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
      categoryGroup: ["shoes", "accessories", "apparel", "bags", "jewelry"],
      brand: ["All"],
      category: ["All"],
      dates: [],
      info_registrequired: [],
      isScrollDown: false,
      scrollTop: 0,
      ordering_filters: ["발매일 기준", "조회수"],
      ordering: ["발매일 기준"],
      items: [
        {
          id: 1,
          name: "정보 등록하고 포인트 받기",
          children: [
            { id: "brand", name: "브랜드" },
            { id: "date", name: "발매일" },
            { id: "category", name: "카테고리" },
            { id: "price", name: "발매 금액" },
            { id: "image", name: "제품 이미지" },
          ],
        },
      ],
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
    ...mapActions(searchStore, ["likeOrUnlike"]),
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
    toDetail(id, name) {
      this.$router.push({ name: "detail", params: { id, name } });
    },
    option_reset() {
      this.keyword = "";
      this.brand = ["All"];
      this.category = ["All"];
      this.dates = [];
      this.info_registrequired = [];
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
      let brand = this.brand;
      let category = this.category.join();
      let release_date = this.dates.join();
      let info_registrequired = this.info_registrequired;
      let ordering = this.ordering;

      // 검색 조건 정리 (All 제거)
      if (brand == "All") brand = "";
      if (category == "All") category = "";
      if (ordering == "발매일 기준") ordering = "all";
      else if (ordering == "조회수") ordering = "click";

      if (info_registrequired.length != 0) {
        info_registrequired = this.info_registrequired.join();
        console.log("info_registrequired", info_registrequired);
      }

      // release_date가 null일 경우
      if (!release_date) {
        console.log("release_date가 null일 경우");
        // 현재 날짜 객체 생성
        let currentDate = new Date();

        // 현재 날짜에서 2주를 뺀 날짜 계산
        let twoWeeksAgo = new Date(1900, 0, 1);
        // let twoWeeksAgo = new Date(
        //   currentDate.getTime() - 14 * 24 * 60 * 60 * 1000
        // );
        // 현재 날짜에서 2주를 더한 날짜 계산
        let twoWeeksLater = new Date(
          currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
        );
        // compare the two dates and if twoWeeksAgo is greater than twoWeeksLater then swap the dates
        if (twoWeeksAgo > twoWeeksLater) {
          let temp = twoWeeksAgo;
          twoWeeksAgo = twoWeeksLater;
          twoWeeksLater = temp;
        }

        // 각 날짜를 원하는 포맷에 맞게 변환
        let twoWeeksAgoFormatted = twoWeeksAgo.toISOString().substring(0, 10);
        let twoWeeksLaterFormatted = twoWeeksLater
          .toISOString()
          .substring(0, 10);

        console.log("twoWeeksAgoFormatted", twoWeeksAgoFormatted);
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
        ordering,
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
            // console.log("like req: ", res);
            if (res.data.message == "added") {
              this.likeOrUnlike({
                index: index,
                action: "added",
                user_id: user_id,
              });
            } else if (res.data.message == "removed") {
              this.likeOrUnlike({
                index: index,
                action: "removed",
                user_id: user_id,
              });
            }
          })
          .catch((err) => {
            // console.log("err: ", err);
            if (err.status == 401) {
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
      this.info_registrequired = [];
    },
  },
  created() {
    let currentDate = new Date();

    // 현재 날짜에서 2주를 뺀 날짜 계산
    // let twoWeeksAgo = new Date(1900, 0, 1);
    let twoWeeksAgo = new Date(
      currentDate.getTime() - 14 * 24 * 60 * 60 * 1000
    );
    // 현재 날짜에서 2주를 더한 날짜 계산
    let twoWeeksLater = new Date(
      currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
    );

    // 각 날짜를 원하는 포맷에 맞게 변환
    let twoWeeksAgoFormatted = twoWeeksAgo.toISOString().substring(0, 10);
    let twoWeeksLaterFormatted = twoWeeksLater.toISOString().substring(0, 10);
    // 결과
    this.dates = [twoWeeksAgoFormatted, twoWeeksLaterFormatted];
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
    brand(oldVal, newVal) {
      if (this.brand == "") {
        this.brand = ["All"];
      }

      if (oldVal != newVal) {
        this.searchConditionChanged = true;
      }
      // if (this.brand.length > 1 && this.brand.indexOf("All") == 0) {
      //   this.brand.shift();
      // } else if (this.brand.length == 0) {
      //   this.brand = ["All"];
      // }
    },
    category() {
      if (this.category.length > 1 && this.category.indexOf("All") == 0) {
        this.category.shift();
      } else if (this.category.length == 0) {
        this.category = ["All"];
      }
    },
    dates() {
      if (this.dates.length == 2) {
        if (this.dates[0] > this.dates[1]) {
          this.dates = [this.dates[1], this.dates[0]];
        }
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
