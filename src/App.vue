<template>
  <v-app>
    <v-app-bar color="white" flat width="100%" height="38%">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="banner_title accent-1 fs-2" @click="toHome">
        KickIn
        <span class="material-symbols-outlined">barefoot</span>
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs
          class="d-none d-sm-flex"
          v-model="group"
          hide-slider
          inactive-color="grey"
          v-if="isLogin"
        >
          <v-tab
            class="d-none d-sm-flex p-0"
            v-model="group"
            hide-slider
            inactive-color="black"
            width="100"
          >
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  x-large
                  style="float: left"
                  depressed
                  plain
                  block
                  width="140"
                >
                  PROFILE
                </v-btn>
              </template>
              <v-list dense rounded>
                <v-list-item-group v-model="selectedAction" color="primary">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>내 정보</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>로그아웃</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
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
            Login
            <!-- </v-btn> -->
          </v-tab>
          <v-tab :ripple="false" @click="toAgreement">
            <!-- <v-btn class="fw-2" outlined elevation="1"> -->
            Sign Up
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
    </v-app-bar>
    <v-app-bar
      dense
      collapse
      color="white"
      flat
      max-width="400"
      shrink-on-scroll
      class="mt-5"
      style="flex-direction: row-reverse; border-bottom: 1px solid black"
    >
      <v-text-field
        class=""
        label="빠른 검색"
        :loading="false"
        v-model="keyword"
        @click:append-outer="quick_search"
        @keyup.enter="quick_search"
        :append-outer-icon="keyword ? 'mdi-magnify' : ''"
        v-show="currentRouteName"
      ></v-text-field>
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
            <v-list-item-avatar>
              <v-img :src="this.$store.state.user_data.profile_img"></v-img>
            </v-list-item-avatar>
            <v-list-item-title class="font-weight-black accent-4 text-h6">{{
              this.$store.state.user_data.nick_name
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
          <!-- <v-divider></v-divider> -->

          <v-divider></v-divider>
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
        </v-list-item-group>
      </v-list>
      <v-btn
        v-if="this.$store.state.user_data.access_token"
        icon
        style="margin-top: 30.3rem"
        @click="signoutRequest"
      >
        <span class="material-symbols-outlined">logout</span>
      </v-btn>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <transition name="fade">
          <loadingImg v-if="this.$store.state.isLoading" />
          <router-view :key="$route.fullPath" v-else />
        </transition>
      </v-container>
    </v-main>
    <v-footer dark padlessq>
      <v-card class="flex" flat tile>
        <v-card-title class="">
          <strong class="subheading">Everything starts from a dot.</strong>

          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px" @click="to_url(icon)">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Kickin</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
// import HeaderMenu from "@/components/layouts/LayoutHeader.vue";
// import FooterMenu from "@/components/layouts/LayoutFooter.vue";
import loadingImg from "@/components/common/loadingPage.vue";
import { mapActions, mapGetters } from "vuex";

const searchStore = "searchStore";
export default {
  name: "App",
  components: {
    // HeaderMenu,
    // FooterMenu,
    loadingImg,
  },
  data: () => ({
    isLoading: true,
    drawer: false,
    menu_group: null,
    group: null,
    keyword: null,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    selectedAction: null,
  }),
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  },
  methods: {
    ...mapActions(searchStore, ["BANNER_SEARCH_PRODUCTS"]),

    quick_search() {
      // this.SEARCH_RESULT_RESET();
      this.BANNER_SEARCH_PRODUCTS(this.keyword);
      console.log("ready to go", this.banner_search_result);
      // this.$router.push({
      //   name: "sneakers",
      //   params: { data: this.banner_search_result },
      // });
      // if (this.banner_search_result.results.length > 0) {

      // } else {
      //   alert("검색 결과가 없습니다. 다시 검색해주세요.");
      // }
      this.keyword = "";
    },
    setLoading() {
      console.log("App.Vue created");
      this.isLoading = true;
    },
    toHome() {
      //TODO: 현재 위치한 페이지 볼드 처리 .
      // this.$store.dispatch('setLoading', true)
      this.$router.push({ name: "home" });
      this.menu_group = "home";
    },
    toSneakers() {
      // this.$store.dispatch('setLoading', true)
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
      // this.$router.push({name:'profile'})
    },
    searchKeyword() {
      console.log("search", this.keyword);
      this.keyword = "";
    },
    toAgreement() {
      this.$router.push({ path: "/agreement" });
      this.group = "agreement";
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
  },
  computed: {
    ...mapGetters(searchStore, ["GET_SEARCH_RESULTS"]),

    banner_search_result() {
      return this.GET_SEARCH_RESULTS;
    },

    currentRouteName() {
      return this.$route.name === "sneakers" ? false : true;
    },

    is_loading() {
      console.log(this.$state.isLoading);
      return true;
    },
    isLogin() {
      return this.$store.state.user_data.access_token;
    },
  },
  created() {
    // console.log(this.$store.state.user_data.profile_img)
    // console.log()
    this.setLoading();
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
</style>

