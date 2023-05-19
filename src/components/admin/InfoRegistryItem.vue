<script>
import { defineComponent } from "vue";
import InfoItem from "@/components/admin/InfoItem.vue";
import swal from "sweetalert";
import axios from "axios";
export default defineComponent({
  name: "InfoRegistryItem",
  props: {
    updator: Object,
  },
  components: {
    InfoItem,
  },
  data() {
    return { approval_list: [] };
  },
  methods: {
    search_url_creator() {
      window.open(
        "https://www.google.com/search?q=" +
          this.$props.updator.product_info.name,
        "_blank",
        "width=900, height=900"
      );
    },
    change_item_status(payload) {
      if (this.approval_list.includes(payload)) {
        this.approval_list.splice(this.approval_list.indexOf(payload), 1);
      } else {
        this.approval_list.push(payload);
      }
    },
    approve_or_deny_updator(type) {
      const before_msg =
        type === "approve"
          ? "등록된 정보의 일괄 승인 처리하시겠습니까?"
          : "등록된 정보를 반려하시겠습니까?";

      const request_url =
        type === "approve"
          ? `info/accpet/${this.$props.updator.pk}/`
          : `info/deny/${this.$props.updator.pk}/`;

      const after_msg = type === "approve" ? "승인" : "반려";

      if (this.approval_list.length == 0) {
        swal("주의 요망", before_msg, {
          icon: "info",
          buttons: {
            cancel: "취소",
            catch: {
              text: "확인 했습니다.",
              value: "confirm",
            },
          },
        }).then((value) => {
          switch (value) {
            case "confirm":
              axios({
                method: "POST",
                headers: {
                  Authorization:
                    "Bearer " + this.$store.state.user_data.access_token,
                },
                url: this.$store.state.prod_url + request_url,
              })
                .then((res) => {
                  console.log("approve_updator res: ", res.data);
                  swal(
                    `${after_msg} 완료`,
                    `정보가 ${after_msg}되었습니다`,
                    "success"
                  );
                  // this.$emit("updator_approved");
                })
                .catch((err) => {
                  console.log(`updator ${after_msg} err: `, err);
                });
              break;
            default:
              break;
          }
        });
      }
    },
    deny_updator() {},
    toDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
  },
  computed: {
    button_disabled() {
      return this.$props.updator.final_approved == 2
        ? true
        : this.$props.updator.final_approved == 1
        ? true
        : this.$store.getters.get_user_data.email != "kickin.@kickin.kr"
        ? true
        : false;
    },
    button_show() {
      return this.$store.getters.get_user_data.email == "kickin.@kickin.kr"
        ? true
        : false;
    },
  },
});
</script>

<template>
  <v-expansion-panel class="my-2">
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="3">
          <v-icon v-if="updator.final_approved == 0" color="red darken-2"
            >mdi-exclamation-thick
          </v-icon>
          <v-icon v-else-if="updator.final_approved == 1" color="green darken-2"
            >mdi-check-all</v-icon
          ><v-icon v-else-if="updator.final_approved == 2" color="red darken-2"
            >mdi-cancel</v-icon
          >
          <span class="overline fw-light">
            {{
              updator.final_approved == 0
                ? "미승인"
                : updator.final_approved == 1
                ? "승인"
                : "반려"
            }}
          </span>
        </v-col>
        <v-col>
          {{ updator.product_info.name }}
        </v-col>
        <v-col>{{
          new Date(updator.created_at).toLocaleDateString("ko-KR")
        }}</v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">승인</th>
              <th class="text-left">항목</th>
              <th class="text-left">입력값</th>
            </tr>
          </thead>
          <tbody v-for="(item, idx) in updator.productUpdatorItems" :key="idx">
            <InfoItem
              :item="item"
              @approve_status_updated="change_item_status"
            ></InfoItem>
          </tbody>
        </template>
      </v-simple-table>
      <div class="text-center mt-2">
        <v-btn
          color="primary"
          @click="search_url_creator"
          width="17%"
          height="30"
          class="mx-1"
          x-small
        >
          <v-icon>mdi-magnify</v-icon>

          <span style="font-size: 10px">구글 검색</span>
        </v-btn>
        <v-btn
          color="blue lighten-2
"
          @click="toDetail(updator.product)"
          width="17%"
          height="30"
          class="mx-1"
          x-small
        >
          <v-icon>mdi-magnify</v-icon>
          <span style="font-size: 10px">제품 보기 </span>
        </v-btn>
        <v-btn
          width="17%"
          height="30"
          class="mx-1"
          color="success"
          @click="approve_or_deny_updator('approve')"
          :disabled="button_disabled"
          v-show="button_show"
          x-small
        >
          <v-icon>mdi-check</v-icon>
          <span style="font-size: 10px"> 전체 승인</span>
        </v-btn>
        <v-btn
          width="17%"
          height="30"
          class="mx-1"
          :disabled="button_disabled"
          v-show="button_show"
        >
          <v-icon>mdi-check</v-icon>
          <span style="font-size: 10px">선택 승인</span>
        </v-btn>
        <v-btn
          class="mx-1"
          width="17%"
          height="30"
          color="warning"
          @click="approve_or_deny_updator('deny')"
          :disabled="button_disabled"
          v-show="button_show"
          x-small
        >
          <v-icon>mdi-close</v-icon>
          <span style="font-size: 10px"> 반려 </span>
        </v-btn>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<style scoped></style>
