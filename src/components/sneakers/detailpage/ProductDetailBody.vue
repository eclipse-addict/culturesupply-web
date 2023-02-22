<template>
  <v-row align="center" align-content="space-around">
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
    <v-menu offset-y rounded="3">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon x-large style="float: left;">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
        </v-btn>
      </template>
      <v-list dense rounded>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item>
            <v-list-item-content>  
              <v-list-item-title>공유하기</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>  
              <v-list-item-title>수정제안</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list-item-group>

      </v-list>
    </v-menu>
    </div>
    <v-col sm="12" md="8" xl="8">
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
    <v-col class="" dense sm="12" md="4" xl="4">
      <v-card height="600">
        <v-img class="ma-auto" :src="brand_logo" height="100" width="100"></v-img>
        <v-card-title class="mt-0">
          <h5 class="mb-0">{{kick?.name}}</h5>
        </v-card-title>
        <!-- <v-divider class="mx-4 text--black" light></v-divider> -->
        <v-card-text>
        <v-row
        >
          <v-rating
            :value="this.rating"
            dense
            readonly
            half-icon
            color="orange"
            background-color="orange"
            half-increments
            class="ml-0"
          ></v-rating>
          <span class="ml-2" style="">{{ get_review_cnt }} discussions</span> 
        </v-row>
      </v-card-text>
      <v-divider class="mx-4 text--black" light></v-divider>
      <v-card-text>
        <span class="fw-bold">발매일 : </span>  
        <span class="mr-5"> {{kick?.releaseDate}}</span>
        <span class="fw-bold ml-5">발매금액 : </span>  
        <span> USD: ${{get_dollor}} / KRW: 약 {{get_krw.toLocaleString()}}원</span>
      </v-card-text>
      <v-card-text class="pt-0">
        <span class="fw-bold">SKU : </span>  
        <span class="mr-5"> {{kick?.sku}}</span>
        <span class="fw-bold ml-7">ColorWay : </span> 
        <span> {{kick?.colorway}}</span>
      </v-card-text>
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
        if(img.img_url =="https://218.155.159.235:9000/media/images/defaultImg.png")
          result = true
          break;
      }
    return result
    },
    add_info(id){
      this.$router.push({ name: "updateInfo", params: { id } });
    },
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
    brand_logo(){
      if(this.kick.brand){
        const brand = this.kick.brand
        if(brand == 'Air Jordan' || brand == 'Jordan'){
          return  'https://218.155.159.235:9000/media/images/logos/air-jordan.png'
        }else if(brand == 'Nike'){
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Nike_Just_Do_It_logo.svg/1200px-Nike_Just_Do_It_logo.svg.png'
        }else if(brand == 'Adidas'){
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png'
        }else if(brand == 'Yeezy'){
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png'
        }else if(brand == 'New%20Balance'){
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/New_Balance_logo.svg/1200px-New_Balance_logo.svg.png'
        }else if(brand == 'Vans'){
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vans_logo.svg/1200px-Vans_logo.svg.png'
        }else if(brand == 'Converse'){
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png'
        }else if(brand == 'Puma'){
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png'
        }else if(brand == 'Reebok'){
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png'
        }else if(brand == 'Diadora'){
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png'
        }
    }
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Converse_logo.svg/1200px-Converse_logo.svg.png'
    }


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
      url: 'https://218.155.159.235:9000/kicks/sneaker/' + product_id,
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
    box-shadow:1px 5px 5px #c6c8c9;
    border-radius: 4px;
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