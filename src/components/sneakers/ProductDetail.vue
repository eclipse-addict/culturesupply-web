<template>
  <div class="text-center">
    <h1>{{kick?.brand}}</h1>
    <h4>{{kick?.name}}</h4>
  </div>
</template>

<script>

export default {
  name: 'productDetail',
  props: {
    kick : null,
  }

}
</script>

<style>

</style>