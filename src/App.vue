<template>
  <v-app>
    <HeaderMenu/>
    <v-main>
      <router-view/>
    </v-main>
    <FooterMenu/>
  </v-app>
</template>

<script>
import HeaderMenu from '@/components/layouts/LayoutHeader.vue'
import FooterMenu from '@/components/layouts/LayoutFooter.vue'

export default {
  name: 'App',
  components: {
    HeaderMenu,
    FooterMenu
  },
  data: () => ({
    //
  }),
};
</script>
