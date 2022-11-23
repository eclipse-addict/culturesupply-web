<template>
  <div>
    <nav class="navbar navbar-expand-lg">
  <div class="container-fluid ">
    <img src="@/assets/logo.png" alt="" height=30 width=30 class="logo ms-2 me-1">
    <a class="navbar-brand nav-mouse-over text-dark" @click="toHome">CultureSupply</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav d-flex me-auto mb-0 mb-lg-0">
        <li class="nav-item mx-3 nav-mouse-over">
          <a class="nav-link text-dark" aria-current="page" @click="toHome">Home</a>
        </li>
        <li class="nav-item mx-3 nav-mouse-over">
          <a class="nav-link text-dark" @click="toSneakers">Sneakers</a>
        </li>
        <li class="nav-item mx-3 nav-mouse-over">
          <a class="nav-link text-dark" >Raffles</a>
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
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data (){
    return {

    }
  },
  methods: {
    toHome(){
      //TODO: 현재 위치한 페이지 볼드 처리 . 
      this.$router.push({name:'home'})
    },
    toSneakers(){
      this.$router.push({name:'sneakers'})
    },
    toLogin(){
      this.$router.push({name:'login'})
    },
    signoutRequest(){
      this.$store.dispatch("signoutRequest")
      .then(() => this.$router.push({name:'login'}))
      },
    toProfile(){
      // this.$router.push({name:'profile'})
    }

  },
  computed: {

  },
}
</script>

<style scoped>

.nav-mouse-over {
  cursor: pointer;
 }
 .nav-mouse-over:hover {
  text-shadow: 0.5px 1px #bfc0c0;
  /* background-color: rgb(241, 236, 229); */
 }

</style>