<template>
  <div>
    <h3>Culture-Supply</h3>
    <p>{{ msg }}</p>
    <b-button>Button</b-button>
    <b-button variant="danger">Button</b-button>
    <b-button variant="success">Button</b-button>
    <b-button variant="outline-primary">Button</b-button>
  </div>
</template>
<script>
export default {
  name: "CultureSupply",
  props: {
    msg: String,
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>