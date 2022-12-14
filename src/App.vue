<template>
  <v-app>
    <!-- <v-navigation-drawer app>
    </v-navigation-drawer>
    <v-app-bar app>
    </v-app-bar> -->
    <v-app-bar
      app
      color="#2B3A55"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="m-auto nav-mouse-over" @click="toHome">
        <img src="@/assets/logo.png" alt="" width="50" height="50">
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      mobile-breakpoint
    >
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="text--accent-4">
          <v-list-item-title class="text-center">
            <h3>Kickin</h3>
          </v-list-item-title>
          <!-- <v-divider></v-divider> -->
          <v-list-item v-if="this.$store.state.user_data.access_token" @click="toProfile">
          <v-list-item-avatar>
            <v-img :src="this.$store.state.user_data.profile_img"></v-img>
          </v-list-item-avatar>
            <v-list-item-title class="font-weight-black accent-4 text-h6">{{this.$store.state.user_data.nick_name}}</v-list-item-title>
          </v-list-item>
          <v-list-item v-else @click="toLogin">
            <v-list-item-icon>
              <span class="material-symbols-outlined">account_circle</span>
            </v-list-item-icon>
            <v-list-item-title>로그인을 해주세요.</v-list-item-title>
          </v-list-item>
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
            <v-list-item-title>Sneakers</v-list-item-title>
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
        </v-list-item-group>
      </v-list>
          <v-btn v-if="this.$store.state.user_data.access_token" icon style="margin-top:33.3rem;" @click="signoutRequest">
            <span class="material-symbols-outlined">logout</span>
          </v-btn>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <transition name="fade">
          <loadingImg v-if="this.$store.state.isLoading"/>
          <router-view :key="$route.fullPath" v-else/>
        </transition>
      </v-container>
    </v-main>
    <v-footer app>
    <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
// import HeaderMenu from "@/components/layouts/LayoutHeader.vue";
// import FooterMenu from "@/components/layouts/LayoutFooter.vue";
import loadingImg from '@/components/common/loadingPage.vue'
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
    group: null,
  }),
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  },
  methods: {
    setLoading() {
      console.log('App.Vue created')
      this.isLoading = true
    },
    toHome(){
      //TODO: 현재 위치한 페이지 볼드 처리 .
      // this.$store.dispatch('setLoading', true)
        this.$router.push({name:'home'})
      
    },
    toSneakers(){
      // this.$store.dispatch('setLoading', true)
      this.$router.push({name:'sneakers', 
                        query: {
                          keyword: '',
                          brand: 'All',
                          gender: 'All',
                        }})
    },
    toCalendar(){
      this.$store.dispatch('setLoading').then(
        this.$router.push({name:'calendar'})
      )
    },
    toLogin(){
      this.$store.dispatch('setLoading').then(
        this.$router.push({name:'login'})
      )
    },
    signoutRequest(){
      this.$store.dispatch("signoutRequest")
      .then(() => this.$router.push({name:'login'}))
      },
    toProfile(){
      // this.$router.push({name:'profile'})
    },
    searchKeyword(){
      console.log('search', this.keyword )
      this.keyword = '';
    }
  },
  computed:{
    is_loading(){
      console.log(this.$state.isLoading)
      return true;
    }
  },
  created() {
    this.setLoading()
  },
};
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.nav-mouse-over {
  cursor: pointer;
}
</style>

