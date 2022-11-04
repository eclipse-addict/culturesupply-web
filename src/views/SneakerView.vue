<template>
  <div class="Sneakers">
    <SneakerPage/>
    <SneakersCarousel/>
  </div>
</template>

<script>
// @ is an alias to /src
import SneakerPage from '@/components/sneakers/SneakerPage.vue'
import SneakersCarousel from '@/components/sneakers/SneakersCarousel'
export default {
  name: 'HomeView',
  components: {
    SneakerPage,
    SneakersCarousel
  }
}
</script>
