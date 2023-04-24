<template>
  <v-app>
    <v-main class="">
      <v-row>
        <v-col>
          <MypageMenu @change_tab="change_tab"></MypageMenu>
        </v-col>
        <v-col cols="12" sm="12" md="9">
          <UserInfo v-if="current_tap == 'user_info'"></UserInfo>
          <CustomerService
            v-else-if="current_tap == 'customer_service'"
          ></CustomerService>
          <UserInfoUpdateForm
            v-else-if="current_tap == 'update_user_info'"
            @change_tab="change_tab"
          ></UserInfoUpdateForm>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import UserInfo from "@/components/user/profile/UserInfo.vue";
import MypageMenu from "@/components/user/profile/MypageMenu.vue";
import CustomerService from "@/components/user/profile/CustomerService.vue";
import UserInfoUpdateForm from "@/components/user/profile/UserInfoUpdateForm.vue";
// import axios from "axios";
export default {
  name: "UserPage",
  components: {
    UserInfo,
    MypageMenu,
    CustomerService,
    UserInfoUpdateForm,
  },
  data() {
    return {
      current_tap: "user_info",
    };
  },
  methods: {
    change_tab(tab) {
      console.log("change_tab", tab);
      this.current_tap = tab;
    },
  },
  created() {},
  computed: {},
};
</script>

<style scoped></style>
