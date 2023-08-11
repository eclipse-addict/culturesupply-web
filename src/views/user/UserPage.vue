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
          <PasswordChange v-else-if="current_tap == 'update_user_password'">
          </PasswordChange>
          <ProductRegistBoard
            v-else-if="current_tap == 'product_regist'"
          ></ProductRegistBoard>
          <PointHistory
            v-else-if="current_tap == 'point_history'"
          ></PointHistory>
          <LikeList v-else-if="current_tap == 'like_list'"></LikeList>
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
import PasswordChange from "@/components/user/profile/PasswordChange.vue";
import ProductRegistBoard from "@/components/user/profile/ProductRegistBoard.vue";
import PointHistory from "@/components/user/profile/PointHistory.vue";
import LikeList from "@/components/user/profile/LikeList.vue";
// import axios from "axios";
export default {
  name: "UserPage",
  components: {
    UserInfo,
    MypageMenu,
    CustomerService,
    UserInfoUpdateForm,
    PasswordChange,
    ProductRegistBoard,
    PointHistory,
    LikeList,
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
