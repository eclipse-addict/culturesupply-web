<template>
  <div id="app">
    <LayoutHeader/>
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

<style >


</style>
