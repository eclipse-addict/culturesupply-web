<template>
  <div class="home">
    <MainPage msg="Welcome to Culture Supply"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainPage from '@/components/home/CultureSupply.vue'

export default {
  name: 'HomeView',
  components: {
    MainPage,
  }
}
</script>
