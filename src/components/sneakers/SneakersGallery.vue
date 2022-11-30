<template>
  <div class="mt-sm-0 container row d-flex justify-content-around mt-16" id="main">
    <!-- <div class="input-group mb-3 mt-16" v-show="kicks">
      <button type="button" class="btn btn-outline-secondary">Action</button>
      <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
      <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
    </div> -->

    <div
      class="card mt-13"
      style="width: 25rem;"
      v-for="k in kicks"
      :key="k.id"
      v-scroll:#main="infinityScrollHandler"
    >
     
    <!-- <img :src="`${k.local_imageUrl ? k.local_imageUrl : k.imageUrl}`" class="card-img-top"  -->
      <img :src="k.local_imageUrl" class="card-img-top" alt="Not Found" style="margin-top: 1rem;"/>
      <div class="card-body">
        <h6 class="card-title">{{ k.brand }}</h6>
        <h5 class="card-title">{{ k.name }}</h5>
        <!-- <p class="card-text">{{k.description | desc_shortener}}</p> -->
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <span class="strong-text">retail : </span >
          {{ k.retailPrice }}
          </li>
        <li class="list-group-item">
          <span class="strong-text">Estimated Market Price : </span >
          {{ k.estimatedMarketValue }}
          </li>
        <li class="list-group-item">{{k.releaseDate}}</li>
      </ul>
      <div class="card-body">
        <v-btn class="ma-2" outlined color="black" small @click="toDetail(k?.id)">Take me to Detail</v-btn>
      </div>
    </div>
    <!-- spiral waveDots -->
  <infinite-loading @infinite="fetch_kicks" spinner="waveDots"></infinite-loading>
  </div>
</template>

<script>
import axios from "axios";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "sneakersGallery",
  data() {
    return {
      kicks: [],
      page: 0,
      limit: 20,
    };
  },
  components: {
    InfiniteLoading
  },
  methods: {   
    toDetail(id){
      this.$router.push({name:'detail',params: {id}})
    },
    fetch_kicks($state) {
      this.page += 1
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/sneaker/",
        params: { 'page': this.page,
                  'limit': this.limit},
      })
        .then((res) => {
          setTimeout(() => {
            if(res.data.length){
              if(this.page == 1){
                this.kicks = res.data;
              }else {
                // const result = this.kicks.slice(-10).filter(item => {
                //   let flag = true;
                //   res.data.forEach(element => {
                //     if(item.id === element.id){
                //       flag = false;
                //     }
                //   });
                //   return flag;
                // })
                for(let i=0; i< res.data.length; i++){
                  if(!JSON.stringify(this.kicks).includes(JSON.stringify(res.data[i]))){
                    console.log(JSON.stringify(this.kicks).includes(JSON.stringify(res.data[i])))
                    this.kicks.push(res.data[i])
                    }
                }
              }

              // this.kicks = new Set(this.kicks)
              $state.loaded();
            }else{
              $state.complete()
            }
          }, 1000)
        })
        .catch((err) => {
          console.log(err); 
        });
    },


    infinityScrollHandler(e){
      console.log(e)
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const bottomCheck = scrollHeight === scrollTop + clientHeight;
      if(bottomCheck){this.fetch_kicks()}
    },

  },
  created() {
    this.fetch_kicks();
  },
  computed : {

  },
     filters:{
    desc_shortener(desc){
      if (desc){
        return desc.substring(0, 100) + '...'
      }
    }
   },
};
</script>

<style scoped>
.strong-text{
  font-weight: bolder;
}
</style>