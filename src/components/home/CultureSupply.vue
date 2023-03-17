<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <div class="font-monospace font-weight-bold main-header"
        v-text="`Let's stay Kickin`"></div>
      </v-col>
      <v-col>
        <v-img contain class="mt-5 pt-4" src="https://images.stockx.com/images/Air-Jordan-1-Retro-High-Dior-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1607043976&q=75"></v-img>
      </v-col>
    </v-row>


  </v-container>

</template>

<script>
import axios from 'axios'
// @ is an alias to /src
// import MainPage from '@/components/home/CultureSupply.vue'
export default {
  name: 'CultureSupply',
  components: {

  },
  data () {
    return {
      main_product : null,
      
    }
  },
  methods: {
    main_image_fatch(){
      console.log('main_image_fatch()')
      axios({
        method: 'GET',
        url: this.$store.state.prod_url+'kicks/img/main/',
      }).then(res => {
        console.log('main_image_fatch res: ', res.data);
        this.main_product = res.data[1]
        console.log('main_product', this.main_product)
      }).catch(err => {
        console.log('main_image_fatch err: ', err);
      })
    },
    toDetail(id){
      this.$router.push({name:'detail',params: {id}})
    },
  },
  computed : {
    img_url () {
      return this.main_product?.local_imageUrl
    }
  },
  created(){
    this.main_image_fatch()
  },
   filters:{
    desc_shortener(desc){
      if (desc){
        return desc.substring(0, 150) + '...'
      }
    }
   },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bowlby+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,900&display=swap');
.brand-name {
  margin-bottom: 0px;
  padding-left: 2.5px;
  color: rgb(14, 12, 12);
}
.background{
  height: 100vh;
  overflow: hidden;
  margin:0;
  background-image: url("@/assets/image.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.main-header{
  font-weight: bolder;
  color: rgb(7, 7, 7);
  font-size: 3rem;
  font-family: 'Lobster', cursive;
  font-family: 'Pathway Gothic One', sans-serif;

}
.main-font{font-family: 'Poppins', sans-serif;}
.main-desc{
  color: #0e0d0d;
}
/* img {
  box-shadow: 0px 0px 10px 40px #ffffff;
} */
</style>
