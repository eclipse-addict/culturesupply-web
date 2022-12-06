<template>
  <v-app>
    <HeaderMenu/>
    <!-- <v-app-bar app>
    </v-app-bar> -->
    <v-main>
      <!-- <v-container fluid> -->
      <transition name="fade">
      <loadingImg v-if="this.$store.state.isLoading"/>
      <router-view :key="$route.fullPath" v-else/>
      </transition>
      <!-- </v-container> -->

    </v-main>
    <!-- <FooterMenu /> -->
  </v-app>
</template>

<script>
import HeaderMenu from "@/components/layouts/LayoutHeader.vue";
// import FooterMenu from "@/components/layouts/LayoutFooter.vue";
import loadingImg from '@/components/common/loadingPage.vue'
export default {
  name: "App",
  components: {
    HeaderMenu,
    // FooterMenu,
    loadingImg,
  },
  data: () => ({
    isLoading: true,
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
</style>

