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
        <v-card class="" style="box-shadow: none;" color="grey lighten-4" max-width="600" min-height="455" min-width="200">
          <v-img :aspect-ratio="1.4" :src="k.local_imageUrl">
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
                  <div class="text-center mt-15 w-100 ">
                    <v-btn 
                      rounded color="primary" 
                      dark 
                      v-if="k.local_imageUrl == 'http://localhost:8000/media/images/defaultImg.png'" 
                      @click="add_info(k?.id)"
                    > 

                    사진 및 정보 등록하기 <br/>
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
            <div class="grey--text text-h6 mb-2" v-if="k.brand">
              {{k.brand.includes('%20')? k.brand.replaceAll('%20', ' ').toUpperCase() :k.brand.toUpperCase()}}
            </div>
            <div class="grey--text text-h6 mb-2" v-else>
              Brand
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
      @infinite="get_next_page"
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
      overlay: false,
      next_page : '',
    };
  },
  props:{
    url : String,
    searchCondition: {
      keyword : '',
      brand: '',
      release: '',
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
      const search = this.$route.query.search;
      let brand = this.$route.query.brand;
      const releaseDate = this.$route.query.release;
      if(brand == 'All'){
        brand = ''
      }
      console.log(" fetch_kicksfetch_kicksfetch_kickscall")
      let params = {
              search,
              releaseDate,
              brand,
            }
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/kicks/sneaker/list/",
        params: params,
      })
        .then((res) => {
          console.log(res)
          if(res){
            this.kicks = res.data.results
            this.next_page = res.data.next
            $state.loaded();
          }else{
            $state.complete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    get_next_page($state){
      if(this.next_page != null){
        axios({
          method: "GET",
          url: this.next_page,
        })
        .then((res) => {
          console.log(res)
          if(res){
            this.kicks = this.kicks.concat(res.data.results)
            this.next_page = res.data.next
            $state.loaded();
          }else{
            $state.complete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
        $state.complete();
      }
    },
    infinityScrollHandler(e) {
      console.log(e);
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const bottomCheck = scrollHeight === scrollTop + clientHeight;
      if (bottomCheck) {
        this.get_next_page()
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
            this.kicks[index].like_users.push(user_id);
          }else if(res.data.message =='removed'){
            this.kicks[index].like_users.splice(this.kicks.indexOf(user_id), 1);
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
    add_info(id){
      this.$router.push({ name: "updateInfo", params: { id } });
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
  watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 2000)
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