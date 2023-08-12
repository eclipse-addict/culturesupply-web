<script>
import { defineComponent } from "vue";
import loadingPage from "@/components/common/loadingPage.vue";
import axios from "axios";

export default defineComponent({
  name: "LoadingView",
  components: {
    loadingPage,
  },
  methods: {
    userInfo_req(token, user_id) {
      axios({
        method: "GET",
        url: this.$store.getters.getProdUrl + `user/userinfo/${user_id}/`,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          console.log(res.data);
          this.$store.dispatch("setUserInfo", res.data);
        })
        .catch((err) => {
          console.log("err; ", err);
        });
    },
  },
  created() {
    const code = new URLSearchParams(window.location.search).get("code");
    console.log("code: ", code);
    axios({
      method: "POST",
      url: this.$store.getters.getProdUrl + "user/kakao/login/",
      data: {
        code: code,
      },
    })
      .then((res) => {
        console.log("res: ", res);
        if (res.data.kakao_profile) {
          const payload = {
            profile_img: res.data.kakao_profile,
            nickname: res.data.kakao_nickname,
          };
          this.$store.dispatch("setSocialProfile", payload);
        }
        this.userInfo_req(res.data.access_token, res.data.user.pk);
        this.$store.dispatch("signinRequest", res.data).then(() => {
          const id = this.$route.query.id;
          let next = this.$route.query.next;
          if (next == "updateInfo") {
            this.$router.push({ name: "updateInfo", params: { id } });
          } else if (next == "detail") {
            this.$router.push({ name: "detail", params: { id } });
          } else {
            this.$router.push({ name: "home" });
          }
        });
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  },
  computed: {},
});
</script>

<template>
  <div class="mt-16">
    <loadingPage />
  </div>
</template>

<style scoped></style>
