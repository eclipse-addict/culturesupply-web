<template>
  <v-list elevation="3" class="">
    <v-subheader>마이 페이지</v-subheader>
    <v-list-group
      :value="true"
      prepend-icon="mdi-account"
      @click="change_tab('user_info')"
    >
      <template v-slot:activator>
        <v-list-item-title>내 정보</v-list-item-title>
      </template>
      <v-list-item
        v-for="([title, icon, tab], i) in admins"
        :key="i"
        link
        @click="change_tab(tab)"
      >
        <v-list-item-title v-text="title"></v-list-item-title>

        <v-list-item-icon>
          <v-icon v-text="icon"></v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>
    <v-list-group :value="false" prepend-icon="mdi-walk">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>내 활동</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item
        v-for="([title, icon, tab], i) in cruds"
        :key="i"
        link
        @click="change_tab(tab)"
      >
        <v-list-item-title v-text="title"></v-list-item-title>

        <v-list-item-icon>
          <v-icon v-text="icon"></v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>
    <v-list-item-group>
      <v-list-item @click="change_tab('customer_service')">
        <v-list-item-icon>
          <v-icon v-text="'mdi-face-agent'"></v-icon>
        </v-list-item-icon>
        <v-list-item-title>고객센터</v-list-item-title>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "myPageMenu",
  data: () => ({
    admins: [
      ["내 정보 수정", "mdi-account-edit-outline", "update_user_info"],
      ["비밀번호 변경", "mdi-lock-alert-outline", "update_user_password"],
      ["회원 탈퇴", "mdi-exit-run", "delete_user"],
    ],
    cruds: [
      ["응모 내역", "mdi-medal-outline"],
      ["포인트", "mdi-cash-check"],
      ["등록한 제품 정보", "mdi-pen", "product_regist"],
      ["작성한 리뷰", "mdi-message-draw"],
    ],
  }),
  methods: {
    change_tab(tab) {
      this.$emit("change_tab", tab);
    },
  },
};
</script>

<style scoped></style>
