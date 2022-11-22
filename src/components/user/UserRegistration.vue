  <template>
  <div class="text-center">
    <main class="form-signin w-50 m-auto">
      <form class="" @submit.prevent="signUp">
        <img
          class="mb-4"
          src="@/assets/logo.png"
          alt=""
          width="70"
          height="70"
        />
        <h1 class="h3 mb-3 fw-normal">Registeration</h1>

        <div class="form-floating mt-2">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="email"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mt-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword1"
            placeholder="Password"
            v-model="password"
          />
          <label for="floatingPassword1">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary mt-4" >
          Sign up
        </button>
      </form>
    </main>
  </div>
</template>

  <script>
export default {
  name: 'userRegisterForm',
  data(){
    return { 
        email : null, 
        password: null,

    }
  },
  methods: {
    signUp(){
      const email = this.email
      const password = this.password

      const payload = {
        email, 
        password,
      }
      this.$store.dispatch('signupRequest', payload)
      .then(() => this.$router.push({name:'home'}))
;
    }

  },

};
</script>

  <style>
</style>