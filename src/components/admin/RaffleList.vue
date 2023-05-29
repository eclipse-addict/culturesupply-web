<script>
import { defineComponent } from "vue";
import RaffleIten from "@/components/admin/RaffleIten.vue";
export default defineComponent({
  name: "RaffleList",
  components: { RaffleIten },
  props: {
    raffle_list: Array,
  },
  data() {
    return {
      overlay: false,
      img_base_url: this.$store.getters.get_img_url,

      selected_item: {
        title: null,
        product: null,
      },
    };
  },
  methods: {
    modal_data(item) {
      console.log(item);
      this.overlay = true;
      this.selected_item.title = item.title;
      this.selected_item.product = item.product;
    },
  },
});
</script>

<template>
  <v-container>
    <v-overlay :value="overlay"
      ><v-card width="500" height="330" class="mx-auto" color="primary"
        ><v-card-title>{{ selected_item?.title }}</v-card-title
        ><v-card-text>
          <v-row>
            <v-col cols="5">
              <v-img
                :src="img_base_url + selected_item.product?.local_imageUrl"
              ></v-img
            ></v-col>
            <v-col cols="7">
              <v-row>
                <v-col cols="12">
                  <span>브랜드: </span>
                  {{ selected_item.product?.brand }}
                </v-col>
                <v-col cols="12"
                  ><span>제품명: </span>{{ selected_item.product?.name }}</v-col
                >
                <v-col cols="12"
                  ><span>조회수:</span>
                  {{ selected_item.product?.click }}</v-col
                >
                <v-col cols="12"><span>응모:</span> 999</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn>추첨</v-btn>
          <v-btn>수정</v-btn>
          <v-btn @click="overlay = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-simple-table dense fixed-header>
      <thead>
        <tr>
          <th class="text-left">제목</th>
          <th class="text-left">시작일</th>
          <th class="text-left">종료일</th>
        </tr>
      </thead>
      <tbody v-for="(item, idx) in raffle_list" :key="idx">
        <RaffleIten
          :raffle="item"
          @click.native="modal_data(item)"
        ></RaffleIten>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<style scoped></style>
