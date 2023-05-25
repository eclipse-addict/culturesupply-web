<template>
  <v-app>
    <v-app-bar color="white" fixed collapse-on-scroll rounded="1" dense app>
      <v-app-bar-nav-icon @click="drawer = true">
        <span class="material-symbols-outlined">apps</span>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="banner_title accent-1 fs-2 w-100" @click="toHome">
        KickIn
        <span class="material-symbols-outlined">barefoot</span>
      </v-toolbar-title>

      <template v-slot:extension>
        <v-tabs
          v-if="isLogin"
          v-model="group"
          class="d-none d-sm-flex"
          hide-slider
          inactive-color="grey"
        >
          <v-tab
            :ripple="false"
            class="font-weight-regular body-2"
            @click="toProfile"
          >
            마이 페이지
          </v-tab>
          <v-tab
            :ripple="false"
            class="font-weight-regular body-2"
            @click="signoutRequest"
          >
            로그아웃
          </v-tab>
        </v-tabs>
        <v-tabs
          class="d-none d-sm-flex"
          v-model="group"
          hide-slider
          inactive-color="black"
          v-else
        >
          <v-tab :ripple="false" @click="toLogin">
            <!-- <v-btn  class="fw-2" outlined elevation="1" > -->
            로그인
            <!-- </v-btn> -->
          </v-tab>
          <v-tab :ripple="false" @click="toAgreement">
            <!-- <v-btn class="fw-2" outlined elevation="1"> -->
            회원 가입
            <!-- </v-btn> -->
          </v-tab>
        </v-tabs>
        <v-tabs
          class="d-none d-sm-flex"
          v-model="menu_group"
          hide-slider
          inactive-color="grey"
          style="flex-direction: row-reverse; border-bottom: 1px solid black"
        >
          <v-tab :ripple="false" color="black" @click="toHome">Home</v-tab>
          <v-tab :ripple="false" color="black" @click="toSneakers">Items</v-tab>
          <v-tab :ripple="false" color="black" @click="toCulture"
            >Culture</v-tab
          >
          <v-tab :ripple="false">Raffle</v-tab>
          <v-tab :ripple="false" @click="toCalendar">Calendar</v-tab>
          <v-tab :ripple="false" @click="toAuction">Auction</v-tab>
        </v-tabs>
      </template>

      <template v-if="!isScrollDown">
        <div class="carousel-wrapper d-none d-sm-block">
          <div class="carousel-slides">
            <div
              class="carousel-slide"
              v-for="(item, idx) in ranking"
              :key="idx"
              @click="ranking_click(item)"
            >
              {{ idx + 1 }}. {{ item }}
            </div>
          </div>
        </div>
      </template>
      <v-btn fab icon v-show="true" @click="pop_up_search" fixed right>
        <span class="material-symbols-outlined">search</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      mobile-breakpoint="5"
      expand-on-hover
    >
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-if="this.$store.state.user_data.access_token"
            @click="toProfile"
          >
            <v-list-item-avatar size="28">
              <v-img
                v-if="this.$store.state.user_data.profile_img"
                :src="this.$store.state.user_data.profile_img"
              ></v-img>
              <v-img v-else src="@/assets/images/user.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-title class="font-weight-black accent-4">{{
              this.$store.state.user_data.email
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-else @click="toLogin">
            <v-list-item-icon>
              <span class="material-symbols-outlined">account_circle</span>
            </v-list-item-icon>
            <v-list-item-title>로그인을 해주세요.</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group v-model="menu_group" active-class="text--accent-4">
          <v-list-item-title class="text-center">
            <!-- <h3>Kickin</h3> -->
          </v-list-item-title>
          <v-list-item @click="toHome">
            <v-list-item-icon>
              <span class="material-symbols-outlined">home</span>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toSneakers">
            <v-list-item-icon>
              <span class="material-symbols-outlined">foot_bones</span>
            </v-list-item-icon>
            <v-list-item-title>Items</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toCulture">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-fire" />
            </v-list-item-icon>
            <v-list-item-title>Culture</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <span class="material-symbols-outlined">casino</span>
            </v-list-item-icon>
            <v-list-item-title>Raffle</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toCalendar">
            <v-list-item-icon>
              <span class="material-symbols-outlined">calendar_month</span>
            </v-list-item-icon>
            <v-list-item-title>Calendar</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toAuction">
            <v-list-item-icon>
              <span class="material-symbols-outlined">gavel</span>
            </v-list-item-icon>
            <v-list-item-title>Auction</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signoutRequest">
            <v-list-item-icon>
              <span class="material-symbols-outlined"> logout </span>
            </v-list-item-icon>
            <v-list-item-title>log out</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="toAdmin"
            v-show="
              this.$store.getters.get_user_data.email == 'kickin@kickin.kr'
            "
          >
            <v-list-item-icon>
              <span class="material-symbols-outlined">construction</span>
            </v-list-item-icon>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-banner single-line>
          <v-icon slot="icon" color="warning" size="36"> mdi-update </v-icon>
          마지막 업데이트 : {{ last_updated?.last_updated }}
        </v-banner>
        <transition name="fade">
          <loadingImg v-if="this.$store.state.isLoading" />
          <router-view :key="$route.fullPath" v-else />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import HeaderMenu from "@/components/layouts/LayoutHeader.vue"
// import FooterMenu from "@/components/layouts/LayoutFooter.vue"
import loadingImg from "@/components/common/loadingPage.vue";
import swal from "sweetalert";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

const searchStore = "searchStore";
export default {
  name: "App",
  components: {
    // HeaderMenu,
    // FooterMenu,
    loadingImg,
  },
  data: () => ({
    last_updated: null,
    isLoading: true,
    drawer: false,
    menu_group: null,
    group: null,
    keyword: null,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    selectedAction: null,
    isScrollDown: false,
    scrollTop: 0,
    ranking: [
      "SUPREME",
      "JORDAN 1",
      "JORDAN 1 TRAVIS SCOTT",
      "SPIDER-MAN",
      "OFF-WHITE",
    ],
  }),
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    document.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions(searchStore, ["banner_search_product", "reset_result"]),
    handleScroll(e) {
      this.scrollTop = e.target.documentElement.scrollTop;
      if (this.scrollTop > 1) {
        this.isScrollDown = true;
      } else {
        this.isScrollDown = false;
      }
    },
    quick_search() {
      // this.SEARCH_RESULT_RESET()
      this.banner_search_product(this.keyword);
      console.log("ready to go", this.banner_search_result);
      this.keyword = "";
    },
    setLoading() {
      console.log("App.Vue created");
      this.isLoading = true;
    },
    toHome() {
      this.$router.push({ name: "home" });
      this.menu_group = "home";
    },
    toSneakers() {
      this.menu_group = "items";
      let today = new Date();
      let year = today.getFullYear();
      let month = ("0" + (today.getMonth() + 1)).slice(-2);
      let day = ("0" + today.getDate()).slice(-2);
      const release = year + month + day;
      console.log("toSneakers toSneakers", release);
      this.$router.push({
        name: "sneakers",
        query: {
          search: "",
          brand: "",
          release: "",
        },
      });
    },
    toCalendar() {
      this.$store
        .dispatch("setLoading")
        .then(this.$router.push({ name: "calendar" }));
    },
    toLogin() {
      this.group = "login";
      this.$store
        .dispatch("setLoading")
        .then(this.$router.push({ name: "login" }));
    },
    signoutRequest() {
      this.$store
        .dispatch("signoutRequest")
        .then(() => this.$router.push({ name: "login" }));
    },
    toCulture() {
      this.$router.push({ name: "culture" });
    },
    toAuction() {
      this.$router.push({ name: "auction" });
    },
    toProfile() {
      this.$router.push({ name: "mypage" });
    },
    searchKeyword() {
      console.log("search", this.keyword);
      this.keyword = "";
    },
    toAgreement() {
      this.$router.push({ path: "/agreement" });
      this.group = "agreement";
    },
    toAdmin() {
      this.$router.push({ name: "admin" });
    },
    to_url(icon) {
      if (icon == "mdi-facebook") {
        window.open("https://www.facebook.com/");
      } else if (icon == "mdi-twitter") {
        window.open("https://twitter.com/");
      } else if (icon == "mdi-linkedin") {
        window.open("https://www.linkedin.com/");
      } else if (icon == "mdi-instagram") {
        window.open("https://www.instagram.com/kickin.co.kr/");
      }
    },
    pop_up_search() {
      swal({
        title: "빠른 검색",
        text: "찾으시는 제품명을 입력해주세요. EX) jordan 1.",
        content: {
          element: "input",
          attributes: {
            placeholder: "검색어를 입력해주세요.",
            type: "text",
          },
        },
        button: {
          text: "Search!",
          closeModal: false,
          value: "search",
        },
      }).then((name) => {
        if (!name) {
          swal.close();
          return;
        }
        if (name?.lenght == 0) {
          swal("검색어를 입력해주세요.", { icon: "error" });
          return;
        }
        if (name?.length < 3) {
          swal("검색어는 3글자 이상 입력해주세요.", { icon: "error" });
          return;
        }
        this.banner_search_product(name);
        swal.stopLoading();
        swal.close();
      });
    },
    ranking_click(item) {
      this.banner_search_product(item);
    },
    get_last_updated() {
      axios.get(this.$store.state.prod_url + "kicks/last/").then((res) => {
        console.log(res.data);
        this.last_updated = res.data;
      });
    },
  },
  computed: {
    ...mapGetters(searchStore, ["GET_SEARCH_RESULTS"]),

    banner_search_result() {
      return this.GET_SEARCH_RESULTS;
    },

    is_loading() {
      console.log(this.$state.isLoading);
      return true;
    },
    isLogin() {
      return !!this.$store.state.user_data.access_token;
    },
    profile_img_getter() {
      if (this.$store.state.user_data.profile_img) {
        return this.$store.state.user_data.profile_img;
      } else {
        return "@/assets/images/user.png";
      }
    },
  },
  watch: {},
  created() {
    this.get_last_updated();
    // console.log(this.$store.state.user_data.profile_img)
    // console.log()
    this.setLoading();
    this.reset_result(); // 검색 결과 담을 변수 초기화
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.nav-mouse-over {
  cursor: pointer;
}
.banner_title {
  font-family: "Lobster";
  font-family: "Pathway Gothic One", sans-serif;
  font-weight: 900;
  cursor: pointer;
}
.carousel-wrapper {
  width: 100%;
  height: 70px;
  overflow: hidden;
  padding-right: 5rem;
}

.carousel-slides {
  display: flex;
  flex-direction: column;
  height: fit-content;
  animation: slide 15s infinite;
}

.carousel-slide {
  cursor: pointer;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 100px;
  font-size: 0.8rem;
  font-weight: 600;
}

.carousel-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.carousel-slides:hover {
  animation-play-state: paused;
}

@keyframes slide {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-2%);
  }
  25% {
    transform: translateY(-22%);
  }
  40% {
    transform: translateY(-42%);
  }
  55% {
    transform: translateY(-62%);
  }
  70% {
    transform: translateY(-82%);
  }
}
</style>
