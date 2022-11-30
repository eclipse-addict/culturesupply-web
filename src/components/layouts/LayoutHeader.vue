<template>
  <!-- <v-app-bar> -->

    <nav class="navbar navbar-dark navbar-expand-lg bg-black fixed-top">
  <div class="container-fluid header-font">
    <img src="@/assets/logo.png" alt="" height=30 width=30 class="logo ms-2 me-1">
    <a class="navbar-brand nav-mouse-over text-white font-weight-bolder" style="margin-left: 1rem;" @click="toHome">KickIn</a>
    <div class='v-line d-none d-md-block d-xl-block d-xxl-block'></div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav d-flex me-auto mb-0 mb-lg-0">
        <li class="nav-item mx-3 nav-mouse-over">
          <a class="nav-link text-white" aria-current="page" @click="toHome">Home</a>
        </li>
        <li class="nav-item mx-3 nav-mouse-over">
          <a class="nav-link text-white" @click="toSneakers">Sneakers</a>
        </li>
        <li class="nav-item mx-3 nav-mouse-over">
          <a class="nav-link text-white" >Raffles</a>
        </li>
        <li class="nav-item mx-3 nav-mouse-over">
          <a class="nav-link text-white" @click="toCalendar">Calender</a>
        </li>
        
        

        <!-- <li class="nav-item dropdown ">
          <ul class="dropdown-menu">
            <li><a class="dropdown-item nav-mouse-over" href="#">Action</a></li>
            <li><a class="dropdown-item nav-mouse-over" href="#">Another action</a></li>
            <li><hr class="dropdown-divider nav-mouse-over"></li>
            <li><a class="dropdown-item nav-mouse-over" href="#">Something else here</a></li>
          </ul>
        </li> -->
      </ul>
      <input type="text" name="keyword" id="searchBox" class="searchBox" placeholder="  Search" @keyup.enter="searchKeyword()" v-model="keyword">
      <ul class="d-flex mb-0 list-unstyled d-none d-sm-none d-md-block d-lg-block">
        <img src="@/assets/images/instagram.png" alt="" height=20 width=20 class="logo ms-2 me-1 nav-mouse-over"> 
      </ul>
      <ul class="d-flex mb-0 list-unstyled d-none d-sm-none d-md-block d-lg-block">
        <img src="@/assets/images/twitter.png" alt="" height=20 width=20 class="logo ms-2 me-1 nav-mouse-over">
      </ul>

      <ul class="d-flex mb-0 list-unstyled ">
        <li class="nav-item mx-3" @click="toLogin" v-if="!this.$store.state.user_data.access_token"><button class="btn btn-primary" style="font-family: 'Ubuntu', sans-serif;">Get Started</button></li>
        <li class="nav-item dropdown" v-else>
          <a class="nav-link dropdown-toggle nav-mouse-over ms-3 mt-1" @click="toProfile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             {{this.$store.state.user_data.email}}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item nav-mouse-over" >Profile</a></li>
            <li><a class="dropdown-item nav-mouse-over" >Raffle History</a></li>
            <li><a class="dropdown-item nav-mouse-over" @click="signoutRequest">sign out</a></li>
          </ul>
        </li>
      <!-- <li class="nav-item mx-3"  v-else>
        Welcome 
        <span class="text-primary" style="cursor: pointer;"></span>
      </li> -->
    </ul>
      <!-- <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
    </div>
  </div>
</nav>

<!-- </v-app-bar>   -->
</template>

<script>
export default {
  name: 'HeaderComponent',
  data (){
    return {
      keyword: null,
    }
  },
  methods: {
    toHome(){
      //TODO: 현재 위치한 페이지 볼드 처리 .
      this.$store.dispatch('setLoading').then(
        this.$router.push({name:'home'})
      )
    },
    toSneakers(){
      this.$store.dispatch('setLoading').then(
        this.$router.push({name:'sneakers'})
      )
    },
    toCalendar(){
      this.$store.dispatch('setLoading').then(
        this.$router.push({name:'calendar'})
      )
    },
    toLogin(){
      this.$store.dispatch('setLoading').then(
        this.$router.push({name:'login'})
      )
    },
    signoutRequest(){
      this.$store.dispatch("signoutRequest")
      .then(() => this.$router.push({name:'login'}))
      },
    toProfile(){
      // this.$router.push({name:'profile'})
    },
    searchKeyword(){
      console.log('search', this.keyword )
      this.keyword = '';
    }

  },
  computed: {

  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap');
.nav-mouse-over {
  cursor: pointer;
 }
 .nav-mouse-over:hover {
  text-shadow: 0.5px 1px #bfc0c0;
  /* background-color: rgb(241, 236, 229); */
 }
  .v-line {
    border-left : thin solid #c6c8c9;
    margin-left: 1rem;
    height : 27px;
  }
  .header-font{
    /* font-family: 'Poppins', sans-serif; */
    font-family: 'Quicksand', sans-serif;
    font-weight: 100;
  }
  .searchBox{ 
    background-color: #e2e2e2;
    border-radius: 30px;
    margin : 7px 0px auto 0px ;

  }
</style>