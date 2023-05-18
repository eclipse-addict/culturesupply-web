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
    approve_updator() {
      if (this.approval_list.length == 0) {
        swal("주의 요망", "등록된 정보를 일괄 승인처리합니다", {
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
                url:
                  this.$store.state.prod_url +
                  `info/accpet/${this.$props.updator.pk}/`,
              })
                .then((res) => {
                  console.log("approve_updator res: ", res.data);
                  swal("승인 완료", "정보가 승인되었습니다", "success");
                  // this.$emit("updator_approved");
                })
                .catch((err) => {
                  console.log("approve_updator err: ", err);
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
});
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ updator.final_approved ? "승인" : "승인 필요" }}
      <v-divider></v-divider>
      {{ updator.product_info.name }}
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
          width="15%"
          height="30"
          class="mx-1"
        >
          <v-icon>mdi-magnify</v-icon>
          구글 검색
        </v-btn>
        <v-btn
          color="blue lighten-2
"
          @click="toDetail(updator.product)"
          width="15%"
          height="30"
          class="mx-1"
        >
          <v-icon>mdi-magnify</v-icon>
          제품 보기
        </v-btn>
        <v-btn
          width="15%"
          height="30"
          class="mx-1"
          color="success"
          @click="approve_updator"
        >
          <v-icon>mdi-check</v-icon>
          전체 승인
        </v-btn>
        <v-btn width="15%" height="30" class="mx-1">
          <v-icon>mdi-check</v-icon>
          선택 승인
        </v-btn>
        <v-btn class="mx-1" width="15%" height="30" color="warning">
          <v-icon>mdi-close</v-icon>
          반려
        </v-btn>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<style scoped></style>
