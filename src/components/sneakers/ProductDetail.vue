<template>
  <div>
    <h1>Detail</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'productDetail',
  created(){
    // const product_id = this.$router.params.id;
    axios({

    }).then(res=> {
      console.log('detail res: ', res)
    }).catch(err => {
      console.log('detail err :', err)
    })
  }
}
</script>

<style>

</style>