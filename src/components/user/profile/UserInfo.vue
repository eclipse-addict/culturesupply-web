<template>
  <v-card class="mx-auto my-auto mt-3" tile height="400" width="1550">
    <v-row align="start" class="fill-height">
      <v-col align-self="start" class="pa-10" cols="3">
        <v-avatar class="profile" color="grey" size="130">
          <v-img :src="get_user_data.profile_img"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="" cols="12" sm="7">
        <v-list-item color="rgba(0, 0, 0, .4)">
          <v-list-item-content>
            <v-list-item-title class="text-h6 border-bottom pb-2">
              {{ get_user_data.email }}
            </v-list-item-title>
            <v-list-item-subtitle class="pt-2">
              {{
                get_user_data.nick_name
                  ? get_user_data.nick_name
                  : "닉네임을 설정해주세요."
              }}
            </v-list-item-subtitle>
            <v-list-item-content class="fw-bold">
              <span>
                현재 보유 포인트 :

                {{
                  get_user_data.current_points
                    ? get_user_data.current_points
                    : 0
                }}
              </span>
            </v-list-item-content>
            <v-card-text>
              <span class="fw-bold"> 상의 : </span>
              <span class="mr-11">
                {{ get_user_data.topSize ? get_user_data.topSize : "미설정" }}
              </span>
              <span class="fw-bold"> 하의 : </span>
              <span class="mr-11">
                {{
                  get_user_data.bottomSize ? get_user_data.bottomSize : "미설정"
                }}</span
              >
              <span class="fw-bold"> 신발 : </span>
              <span class="mr-11">
                {{ get_user_data.shoeSize ? get_user_data.shoeSize : "미설정" }}
              </span>
            </v-card-text>
            <v-list-item>
              <span class="fw-bold mr-2"> 주소 : </span
              ><span>
                {{
                  get_user_data.address ? get_user_data.address : "미설정"
                }}</span
              >
            </v-list-item>
            <v-list-item>
              <span class="fw-bold mr-2"> 상세 주소 : </span>
              {{
                get_user_data.address_detail
                  ? get_user_data.address_detail
                  : "미설정"
              }}
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "UserInfo",
  computed: {
    get_user_data() {
      return this.$store.getters.get_user_data;
    },
  },
};
</script>

<style scoped></style>
