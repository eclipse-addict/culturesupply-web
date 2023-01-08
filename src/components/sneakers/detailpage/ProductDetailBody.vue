<template>
  <v-row align="center" align-content="space-around" no-gutters>
    <div class="text-center">
      <v-btn 
        rounded color="#D6E4E5" 
        top
        style="margin-top:10px"
        max-width="500px"          
        v-if="img_check || 
              kick.brand == null || 
              kick.colorway == null ||
              kick.releaseDate == '1900-01-01'||
              kick.releaseDate == null ||
              kick.retailPrice == null ||
              kick.category == ''
              " 
        @click="add_info(kick?.id)" 
      > 
        사진 및 정보 등록하기 <br/>
        [최대 +1000 points 적립]
      </v-btn>
      </div>
    <div class="mt-2 mb-2">
      <v-btn small absolute fab right style="margin-top:3px; margin-right:12px;" @click="like_btn(kick?.id, index)" v-if="check_like_user(kick.like_users)">
          <font-awesome-icon icon="fa-solid fa-heart" />
      </v-btn>
      <v-btn small absolute fab right style="margin-right:12px; margin-top:3px;" @click="like_btn(kick?.id, index)" v-else>
        <font-awesome-icon icon="fa-regular fa-heart" />                 
      </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon x-large style="float: left;">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
        </v-btn>
      </template>
      <v-list>
        <v-list-item>공유하기</v-list-item>
        <v-list-item>수정제안</v-list-item>
      </v-list>
    </v-menu>
    </div>
    <v-col sm="12" md="6" xl="6" class=" d-xl-none d-lg-none">
      <v-carousel
      cycle
      height="600"
      show-arrows-on-hover
      id="img_caraousel" 
      interval="6000" 
      touch="true" 
      hide-delimiter-background 
      hide-delimiters
    >
        <template v-slot:prev="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            fab small
          >
          <span class="material-symbols-outlined">chevron_left</span>
          </v-btn>
        </template>
        <template v-slot:next="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon fab small
          >
          <span class="material-symbols-outlined">chevron_right</span>
          </v-btn>
        </template>
        <v-carousel-item 
          v-for="(img, i) in kick.productImg"
          :key="i"
        >
          <v-sheet height="100%">
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
            <v-img :src="img.img_url" contain width="650" height="700" >
              <div class="text-center">
              <v-btn class="original_btn" elevation="10" rounded shaped style="margin-top: 15rem;" @click="original_size_img(img.img_url, kick.name)">크게보기</v-btn>
              </div>
            </v-img>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col sm="12" md="6" xl="6" class="d-none d-lg-flex  d-xl-flex">
    <v-card v-for="(img, i) in kick.productImg" :key="i">
      <v-img :src="img.img_url"></v-img>
    </v-card>
    </v-col>
    <v-col class="mt-10" dense sm="12" md="6" xl="6">
      <v-card>

      </v-card>
    </v-col>
  </v-row>



</template>

<script>
// import StarRating from 'vue-star-rating'
import axios from "axios";
import swal from 'sweetalert';
export default {
  name: 'productDetail',
  components: {
    // StarRating,
  },
  
  data(){
    return {
      kick : null,
      rating: 0,
      like_users: [],
    }
  },
  methods: {
    get_avg_rating(){
      let avg_rating = 0
      if(this.kick){
        if(this.kick.reviews.length > 0){
          for(const r of this.kick.reviews) {
            avg_rating += r.rating
          }
          this.rating = parseInt(avg_rating / this.kick.reviews.length)
        }
      }else{
        this.rating = 0
      }
    },
    like_btn(product_id, index){
      // console.log('index Check :', index)
      if(!this.$store.state.user_data.access_token){
        swal("계속하려면 로그인해주세요.", {
          buttons: {
            cancel: "취소",
            catch: {
              text: "로그인하러 가기",
              value: "login",
            },
            회원가입: true,
          },
        })
        .then((value) => {
          switch (value) {
        
            case "회원가입":
              this.$router.push({path: '/agreement'})
              break;
        
            case "login":
              this.$router.push({name:'login'});
              break;
        
            default:
              break;
              
          }
        });
      }
      else{
        const user_id = this.$store.state.user_data.pk
        axios({
          method: 'POST',
          url: this.$store.state.dev_url+`kicks/sneaker/like/${product_id}/${user_id}/`,
          headers: {'Authorization':'Bearer '+this.$store.state.user_data.access_token},
        }).then(res =>{
          // console.log('like req: ',res);
          if(res.data.message =='added'){
            this.like_users.push(user_id);
          }else if(res.data.message =='removed'){
            this.like_users.splice(this.like_users.indexOf(user_id), 1);
          }
        }).catch(err=>{
          // console.log('err: ',err);
          if(err.response.status == 401){
            this.$store.dispatch('refresh_token_request')
            .then(()=>{
              this.like_btn(product_id, index)
            })
          }
        })
      }
    },
    check_like_user(like_users){
      for(let user of like_users){
        if (user == this.$store.state.user_data.pk){
          return true;
        }
        else {
          return false;
        } 
      }
    },
    set_like_user(){
      if(this.kick){
        console.log("chec")
        this.like_users = this.kick.like_users
      }
    },
    original_size_img(url, name){
      const options = 'width=850, height=850, menubar=no, toolbar=no'
      window.open(url, name,options);
    },
        /**이미지 리스트 중 하나라도 미등록 상태일 경우 정보 등록 버튼을 노출시킨다. return boolean */
    img_check(){
      let result = false
      for(let img of this.kick.productImg){
        if(img.img_url =="http://localhost:8000/media/images/defaultImg.png")
          result = true
          break;
      }
    return result
    }
  }, // end of methods 
  computed : {
    img_url () {
      return this.kick?.local_imageUrl
    },
    get_review_cnt() {
      if(this.kick){
        return this.kick.reviews.length
      }
      return 0;
    },
    get_krw(){
      const rate = 1302.58
      if(this.kick.retailPrice){
        const krw_price = ((this.kick.retailPrice)* 0.01 * rate)
        return Math.ceil(krw_price)
      }
      return 0
    },
    get_dollor(){
      if(this.kick.retailPrice){
        const price = this.kick.retailPrice *0.01
        var dollarUSLocale = Intl.NumberFormat('en-US');
        return dollarUSLocale.format(price)
      }else{
        return 0
      }
    },
    brand_formatter(){
      if(this.kick.brand){
        const brand = this.kick.brand
        if(brand == 'Air$%20Jordan' || brand == 'Jordan'){
          return  'AIR JORDAN'
        }else{
          return brand.toUpperCase()
        } 
      }else{
        return ' '
      }

    },

  },
  watch: {
    kick(){
      this.get_avg_rating();
      this.set_like_user();
    }
  },
    created(){
    const product_id = this.$route.params.id;
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/kicks/sneaker/' + product_id,
    }).then(res=> {
      console.log('detail res: ', res)
      this.kick = res.data
      this.product_id = res.data.id

    }).catch(err => {
      console.log('detail err :', err)
      this.$router.push('/404')
    })
  },
  mounted() {
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap');
  .v-line {
    border-top : thin solid #c6c8c9;
    /* margin-left: 1rem; */
    height : 1px;
    width: 1234px;
    margin-bottom: 3.5px;
  }

  .img-row{
    cursor: pointer;
  }

  .original_btn{
    display: none;
  }

  #img_caraousel{
    box-shadow:10px 20px 25px #c6c8c9;
    border-radius: 21px;
  }


  #img_caraousel:hover .original_btn {
    display: inline;
  }
  #korean_name{
    font-family: 'Pathway Gothic One', sans-serif;
  }

  .product_name{
    font-family: 'Pathway Gothic One', sans-serif;
  }
</style>