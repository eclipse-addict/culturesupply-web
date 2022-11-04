<template>
  <div id="app">
    <LayoutHeader/>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/Sneakers">Sneakers</router-link>
    </nav>
    <router-view/>
  <LayoutFooter/>
  </div>
</template>
<script>
import LayoutHeader from '@/components/layouts/LayoutHeader.vue'
import LayoutFooter from '@/components/layouts/LayoutFooter.vue'
export default {
    components: {
    LayoutHeader,
    LayoutFooter,
  }
}
</script>

<style>

</style>
