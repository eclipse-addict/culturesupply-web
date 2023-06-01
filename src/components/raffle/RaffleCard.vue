<script>
import { defineComponent } from "vue";
import axios from "axios";
import swal from "sweetalert";

export default defineComponent({
  name: "RaffleCard",
  props: {
    raffle: Object,
  },
  data() {
    return {
      sheet: false,
      env_url: this.$store.getters.get_env_url,
      raffleAgreement: false,
    };
  },
  methods: {
    date_format(input) {
      const date = new Date(input);
      return date.toLocaleString();
    },
    raffleIn() {
      console.log("raffle in");
      axios({
        method: "POST",
        url: this.$store.getters.get_env_url + "raffle/entries/",
        headers: {
          Authorization:
            "Bearer " + this.$store.getters.get_user_data.access_token,
        },
        data: {
          raffle: this.raffle.id,
        },
      })
        .then((res) => {
          console.log("raffle in res: ", res.data);
          this.raffleAgreement = false;

          swal("응모 완료", "응모가 완료되었습니다.", "success");
          this.sheet = false;
        })
        .catch((err) => {
          console.log("raffle in err: ", err.response);
          this.raffleAgreement = false;
          // let default_err_msg =
          //   "같은 오류가 지속되는 경우 고객센터에 문의 바랍니다.";
          const status = err.response.status;
          switch (status) {
            case 400:
              swal("응모 실패", "응모 기간이 아닙니다.", "error");
              break;
            case 302:
              swal("응모 실패", "이미 응모하셨습니다.", "error");
              break;
            default:
              swal(
                "응모 실패",
                "같은 오류가 지속되는 경우 고객센터에 문의 바랍니다.",
                "error"
              );
              break;
          }

          this.sheet = false;
        });
    },
  },
});
</script>

<template>
  <v-container>
    <v-card hover style="cursor: default">
      <v-row class="px-4">
        <v-col cols="12" md="6">
          <v-img
            :src="
              raffle?.product.local_imageUrl.startsWith('productUpdator')
                ? env_url + 'media/' + raffle?.product.local_imageUrl
                : env_url + raffle?.product.local_imageUrl
            "
          >
          </v-img>
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="0">
            <v-card-title style="font-size: 0.99rem">{{
              raffle?.product.name
            }}</v-card-title>
            <v-card-subtitle>{{ raffle?.product.name_kr }}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <span>차감 포인트: </span>
                  {{ raffle?.point_cost }}
                </v-col>
                <v-col cols="12"><span>응모 인원:</span> 999</v-col>
                <v-col cols="12"
                  ><span>당첨 인원:</span> {{ raffle?.winnerCount }}</v-col
                >
                <v-col cols="12"
                  ><span>응모 기간: </span>
                  {{ date_format(raffle?.start_date) }} ~
                  {{ date_format(raffle?.end_date) }}
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <div class="text-center mx-auto">
                <v-bottom-sheet v-model="sheet" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mt-10"
                      color="blue darken-1"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      응모하기
                    </v-btn>
                  </template>
                  <v-sheet class="text-center" height="200px">
                    <v-btn
                      text
                      class="mt-6"
                      :disabled="!raffleAgreement"
                      @click="raffleIn"
                    >
                      응모하기</v-btn
                    >
                    <v-btn
                      class="mt-6"
                      text
                      color="error"
                      @click="sheet = !sheet"
                    >
                      취소
                    </v-btn>
                    <div class="py-3">
                      유저당 1회 응모 가능합니다. 당첨 시 회원 정보에 등록하신
                      주소로 자동 발송되며, 주소 미등록 시 당첨 무효 처리됩니다.
                    </div>
                    <div>
                      부정한 방법을 통해 응모하거나, 포인트를 수급한 경우 이용에
                      제한이 발생할 수 있습니다.
                    </div>
                    <div class="mt-3">
                      <input
                        type="checkbox"
                        v-model="raffleAgreement"
                        id="agreement"
                        class="mr-3"
                        style="cursor: pointer"
                      />
                      <label for="agreement" style="cursor: pointer"
                        >위 내용을 숙지하였으며, 이에 동의합니다.</label
                      >
                    </div>
                  </v-sheet>
                </v-bottom-sheet>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped></style>
