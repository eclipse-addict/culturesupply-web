<template>
  <v-row class="mt-sm-0 container row d-flex justify-content-around" id="main">
    <v-col
      class="card mt-13"
      cols="12"
      sm="6"
      md="4"
      style="width: 25rem"
      v-for="(k, index) in kicks"
      :key="index"
      v-scroll:#main="infinityScrollHandler"
    >
      <v-hover v-slot="{ hover }">
        <v-card class="" color="grey lighten-4" max-width="600" min-height="455" min-width="200">
          <v-img :aspect-ratio="16 / 9" :src="k.local_imageUrl">
            <v-expand-transition>
              <div
                v-if="hover"
                class="
                  d-flex
                  transition-fast-in-fast-out
                  blue-grey
                  lighten-4
                  v-card--reveal
                  text-h2
                  black--text  
                "
                style="height: 100%;  opacity: 0.9;"
              >
                <div class='mt-5'>
                  <v-btn small absolute fab right @click="like_btn(k?.id, index)" v-if="check_like_user(k.like_users)">
                    <font-awesome-icon icon="fa-solid fa-heart" />
                  </v-btn>
                  <v-btn small absolute fab right @click="like_btn(k?.id, index)" v-else>
                    <font-awesome-icon icon="fa-regular fa-heart" />                 
                  </v-btn>
                  <v-btn small absolute fab left>
                    <span class="material-symbols-outlined">ios_share</span>
                  </v-btn>
                </div>
                  <div class="text-center mt-15 w-100 pt-5">
                    <v-btn rounded color="primary" dark v-if="k.local_imageUrl == 'http://localhost:8000/media/images/defaultImg.png'" > 
                    사진 등록하기 <br/>
                    [+ 100 points 적립]
                    </v-btn>
                    <div v-else>
                      <h6>something</h6>
                    </div>
                  </div>
                </div>
            </v-expand-transition>
          </v-img>
          <v-card-text class="pt-6" style="position: relative">
            <v-btn
              absolute
              color="blue-grey"
              class="white--text"
              fab
              large
              right
              top
              @click="toDetail(k?.id)"
            >
              <v-icon >read_more</v-icon>
            </v-btn>
            <div class="font-weight-light grey--text text-h6 mb-2">
              {{k.brand.includes('%20')? k.brand.replace('%20', ' ').toUpperCase() :k.brand.toUpperCase()}}
            </div>
            <h6 class="text-h6 font-weight-heavy black--text mb-2">
              {{k.name}}
            </h6>
            <div class="font-weight-light text-h6 mb-2">
              {{k.releaseDate}}
            </div>
            <v-rating
            :value="k.avg_rating?k.avg_rating:0"
            dense
            readonly
            half-icon
            color="orange"
            background-color="orange"
            half-increments
            class="mr-2"
          ></v-rating>
          <span class="primary--text text-subtitle-2">{{k.count_reviews}} Reviews</span>
          </v-card-text>
        </v-card>
      </v-hover>

      <!-- spiral waveDots -->
    </v-col>
    <infinite-loading
      @infinite="fetch_kicks"
      spinner="waveDots"
      ref="infiniteLoading"
    ></infinite-loading>
  </v-row>
</template>

<script>
import axios from "axios";
import infiniteLoading from "vue-infinite-loading";
import swal from 'sweetalert';
export default {
  name: "sneakersGallery",
  data() {
    return {
      kicks: [],
      page: 0,
      limit: 20,
      like_check: false,
    };
  },
  props:{
    url : String,
    searchCondition: {
      keyword : '',
      gender : '',
      brand: '',
    },
  },
  components: {
    infiniteLoading,
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
    fetch_kicks($state) {
      // this.$store.dispatch('setLoading', true)
      const keyword = this.$route.query.keyword;
      const brand = this.$route.query.brand;
      const gender = this.$route.query.gender;
      
      this.page += 1;
      let page = this.page
      let limit = this.limit
      let params = {
        page,
        limit,
        keyword,
        brand,
        gender,
      }
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/sneaker/",
        params: params,
      })
        .then((res) => {
          // setTimeout(() => {
            if (res.data.length) {
              if (this.page == 1) {
                this.kicks = res.data;
                console.log('this.kicks = res.data; 바로 직후 ')
                // this.$store.dispatch('setLoading', false)
              } else {
                for (let i = 0; i < res.data.length; i++) {
                  if (
                    !JSON.stringify(this.kicks).includes(
                      JSON.stringify(res.data[i])
                    )
                  ) {
                    console.log(
                      JSON.stringify(this.kicks).includes(
                        JSON.stringify(res.data[i])
                      )
                    );
                    this.kicks.push(res.data[i]);
                  }
                }
              }
              // this.kicks = new Set(this.kicks)
              $state.loaded();
              console.log('$state.loaded();; 바로 직후 ')
            } else {
              // this.$store.dispatch('setLoading', false)
              $state.complete();
            }
          // }, 100);
          console.log('setTimeout 블록 바로 밖. 아래에 바로 dispatch있음. ')
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search_kicks($state) {
      const keyword = this.$route.query.keyword;
      const brand = this.$route.query.brand;
      const gender = this.$route.query.gender;
      // console.log('status : ', infiniteLoading)
      // infiniteLoading.data().status = 0
      this.$refs.infiniteLoading.stateChanger.reset(); 
      this.page = 1;
      this.kicks = []
      let page = this.page
      let limit = this.limit
      let params = {
        page,
        limit,
        keyword,
        brand,
        gender,
      }
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/sneaker/",
        params: params,
      })
        .then((res) => {
          if(res.data){
            console.log('res: ' + JSON.parse(res.data))
            this.kicks = res.data
            

            $state.loaded();
          }else{
            $state.complete();

          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    infinityScrollHandler(e) {
      console.log(e);
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const bottomCheck = scrollHeight === scrollTop + clientHeight;
      if (bottomCheck) {
        this.fetch_kicks();
      }
    },
    like_btn(product_id, index){
      console.log('index Check :', index)
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
          url: this.$store.state.dev_url+`api/sneaker/like/${product_id}/${user_id}/`,
          headers: {'Authorization':'Bearer '+this.$store.state.user_data.access_token},
        }).then(res =>{
          console.log('like req: ',res);
          if(res.data.message =='added'){
            this.kicks[index].like_users.push(user_id);
          }else if(res.data.message =='removed'){
            this.kicks[index].like_users.splice(this.kicks.indexOf(user_id), 1);
          }
        }).catch(err=>{
          console.log('err: ',err);
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
  },
  created() {
    this.fetch_kicks();
  },
  computed: {
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
  filters: {
    desc_shortener(desc) {
      if (desc) {
        return desc.substring(0, 100) + "...";
      }
    },
  },
};
</script>

<style scoped>
.strong-text {
  font-weight: bolder;
}
</style>