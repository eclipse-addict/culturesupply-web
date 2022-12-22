<template>
  <div class="text-center h-100 w-100" style="background-color:white;">
    <div class="row h-100 border-bottom" v-show="kick">
    <div>
      <div class="mt-2">
      <v-btn small absolute fab right style="margin-right: 8px;" @click="like_btn(kick?.id, index)" v-if="check_like_user(kick.like_users)">
          <font-awesome-icon icon="fa-solid fa-heart" />
        </v-btn>
        <v-btn small absolute fab right style="margin-right: 8px;" @click="like_btn(kick?.id, index)" v-else>
          <font-awesome-icon icon="fa-regular fa-heart" />                 
        </v-btn>
      </div>
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
      <v-row justify="center" class="">
        
        <v-img :src="img_url" contain lazy-src="" alt="main_img"  class="mt-15 img-row" max-width="500" max-height="300" >
        <v-btn style="margin-top: 7rem;"  rounded  color="primary" dark v-if="kick?.local_imageUrl == 'http://localhost:8000/media/images/defaultImg.png'"  > 
          사진 등록하기 <br/>
          [+ 100 points 적립]
        </v-btn>

        <v-btn class="original_btn" elevation="10" rounded shaped style="margin-top: 7rem;" @click="original_size_img(kick?.local_imageUrl, k?.name)">크게보기</v-btn>


        <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
        </v-img>

      <div class="col-md-6 col-sm-12 text-start mt-16 ml-16">
        <p class="fw-normal" v-if="kick.brand">{{kick?.brand.includes('%20')? kick.brand.replaceAll('%20', ' ').toUpperCase() :kick.brand.toUpperCase()}}</p>
        <p class="fw-normal" v-else>Brand</p>
        <h4 class="fw-bold">{{kick?.name}}</h4>
        <div class='v-line'></div>
            <v-rating
            :value="this.rating"
            dense
            readonly
            half-icon
            color="orange"
            background-color="orange"
            half-increments
            class="mr-2"
          ></v-rating>
          <!-- <star-rating :star-size="20" active-color="#000040" :read-only="true" :show-rating="false" dense v-model="this.rating"></star-rating> -->
          <!-- TODO: disscusion  -->
        <p>
          <span class="" style="margin-top: 13px;">{{ get_review_cnt }} discussions</span> 
        </p>
        
        <p>
        <span class="fw-bold">발매일 : </span>  
        <span> {{kick?.releaseDate}}</span>
        </p>
        <p>
        <span class="fw-bold">SKU : </span>  
        <span> {{kick?.sku}}</span>
        </p>
        <p>
        <span class="fw-bold">ColorWay : </span>  
        <span> {{kick?.colorway}}</span>
        </p>
        <p>
        <span class="fw-bold">발매금액 : </span>  
        <span> USD: ${{get_dollor}} / KRW: 약 {{get_krw.toLocaleString()}}원</span>
        </p>
      </div>  
    </v-row>
  </div>
  </div>
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
  props: {
    kick : null,
  },
  data(){
    return {
      rating: 0,
      like_users: [],
    }
  },
  methods: {
    get_avg_rating(){
      let avg_rating = 0
      if(this.$props.kick){
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
      if(this.$props.kick){
        console.log("chec")
        this.like_users = this.$props.kick.like_users
      }
    },
    original_size_img(url, name){
      const options = 'width=850, height=850, menubar=no, toolbar=no'
      window.open(url, name,options);
    }
  }, // end of methods 
  computed : {
    img_url () {
      return this.kick?.local_imageUrl
    },
    get_review_cnt() {
      if(this.$props.kick){
        return this.kick.reviews.length
      }
      return 0;
    },
    get_krw(){
      const rate = 1302.58
      if(this.$props.kick.retailPrice){
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
  mounted() {
  }
}
</script>

<style scoped>
  .v-line {
    border-top : thin solid #c6c8c9;
    /* margin-left: 1rem; */
    height : 1px;
    width: 634px;
    margin-bottom: 3.5px;
  }

  .img-row{
    cursor: pointer;
  }

  .original_btn{
    display: none;
  }

  .img-row:hover .original_btn {
    display: inline;
  }
</style>