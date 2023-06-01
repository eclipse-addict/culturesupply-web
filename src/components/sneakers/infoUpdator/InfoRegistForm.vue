<template>
  <div>
    <h5>- 제품 정보 등록 -</h5>
    <h4 class="h4 font-weight-bold border-bottom pb-3 mb-6">
      {{ kick?.name }}
    </h4>
    <p><span>SKU: </span>{{ kick?.sku }}</p>
    <v-row>
      <v-col>
        <v-btn
          small
          @click="search_url_creator"
          color="teal"
          outlined
          right
          text
          rounded
          max-width="150"
          >구글 검색</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="name_kr"
          label="한글 제품명"
          hint="한글 제품명을 입력해주세요."
          @change="info_added('name_kr', name_kr)"
          :rules="[(v) => !!v || '누락된 정보를 기입해주세요.']"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-file-input
          v-model="img_upload"
          @change="
            Preview_image('img_preview');
            info_added('local_imageUrl', img_upload);
          "
          :rules="[(v) => !!v || '첨부된 파일이 없습니다.']"
          accept="image/png, image/jpeg, image/bmp, image/webp"
          placeholder=""
          prepend-icon="mdi-camera"
          label="제품 이미지"
          :disabled="img_preview_exist"
        ></v-file-input>
        <v-img
          :src="img_preview"
          aspect-ratio="1.5"
          class="mx-auto"
          contain
          width="450"
        ></v-img>
      </v-col>

      <v-col sm="12" md="6" lg="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :disabled="releaseData_exist"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-combobox
              @change="info_added('date', date)"
              :disabled="releaseData_exist"
              v-model="date"
              chips
              clearable
              clear-icon="mdi-close-circle-outline"
              small-chips
              label="발매일을 입력해주세요."
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-combobox>
          </template>
          <v-date-picker
            @change="info_added('date', date)"
            :disabled="releaseData_exist"
            v-model="date"
            multiple
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col sm="12" md="6" lg="6">
        <v-select
          @change="info_added('brand', brand)"
          v-model="brand"
          :items="brandGroup"
          :rules="[(v) => !!v || 'Item is required']"
          label="브랜드"
          required
          chips
          clearable
          clear-icon=" mdi-close-circle-outline"
          dense
          :disabled="brand_exist"
        ></v-select>
      </v-col>
      <v-col sm="12" md="6" lg="6">
        <v-combobox
          @change="info_added('colorway', color_select)"
          v-model="color_select"
          :rules="[(v) => !!v || 'Item is required']"
          label="컬러웨이"
          required
          chips
          clearable
          multiple
          clear-icon=" mdi-close-circle-outline"
          dense
          :disabled="colorway_exist"
        ></v-combobox>
      </v-col>
      <v-col sm="12" md="6" lg="6">
        <v-text-field
          @change="
            price_formatter();
            info_added('retailPrice', retail);
          "
          @click="price_reset"
          v-model="retail"
          label="발매가"
          :rules="[(v) => !!v || 'Item is required']"
          :disabled="retialPrice_exist"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6" lg="6">
        <v-select
          @change="info_added('category', category)"
          v-model="category"
          :items="categories"
          :rules="[(v) => !!v || 'Item is required']"
          label="카테고리"
          required
          chips
          clearable
          clear-icon=" mdi-close-circle-outline"
          dense
          :disabled="category_exist"
        ></v-select>
      </v-col>
      <v-col sm="12" md="6"> </v-col>
      <hr />
    </v-row>
    <div class="d-flex justify-content-center">
      <v-btn elevation="4" class="mt-3 mr-1" @click="regist_infos">
        등록
      </v-btn>
      <v-btn elevation="4" class="mt-3 ml-1" @click="$router.go(-1)">
        취소
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "InfoUpdateForm",
  data() {
    return {
      brand: null,
      color_select: null,
      category: null,
      retail: null,
      kick: null,
      product_id: null,
      date: null,
      menu: false,
      env_url: this.$store.state.prod_url,
      img_base_url: this.$store.getters.get_img_url,
      img_upload: null,
      img_preview: null,
      update_cnt: 0,
      name_kr: null,

      updatated_infos: [], // 데이터 불러올 때, 유저가 입력할 수 있는 데이터 종류를 담아둘 리스트

      brandGroup: this.$store.getters.get_brand_list,
      categories: this.$store.getters.get_category_list,
    };
  },
  methods: {
    search_url_creator() {
      window.open(
        "https://www.google.com/search?q=" + this.kick?.name,
        "_blank",
        "width=900, height=900"
      );
    },
    Preview_image() {
      console.log("this.img_upload", this.img_upload);
      this.img_preview = URL.createObjectURL(this.img_upload);
    },

    check_existing_datas(res) {
      if (res.data.brand != null) {
        this.brand = res.data.brand;
      }
      if (res.data.name_kr != null) {
        this.name_kr = res.data.name_kr;
      }
      if (res.data.colorway != null) {
        this.color_select = res.data.colorway.split("/");
      }
      if (res.data.releaseDate != null) {
        this.date = res.data.releaseDate;
      }
      if (res.data.retailPrice != null && res.data.retailPrice != 0) {
        this.retail = res.data.retailPrice;
      }
      if (res.data.category != null && res.data.category != "") {
        this.category = res.data.category;
      }
    },
    price_formatter() {
      if (this.retail != null && this.retail != 0) {
        this.retail = this.retail
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    price_reset() {
      if (this.retail == 0) {
        this.retail = null;
      }
    },
    regist_infos() {
      console.log("regist_infos: ", this.updatated_infos);
      if (this.update_cnt == 0) {
        swal("누락된 제품의 정보를 기입해주세요!", { icon: "info" });
        return;
      }

      const formData = new FormData();

      formData.append("product", this.product_id);
      formData.append("user", this.$store.state.user_data.pk);

      let updated_info_list = this.updatated_infos;
      for (let i = 0; i < updated_info_list.length; i++) {
        if (updated_info_list[i] == "local_imageUrl") {
          formData.append("local_imageUrl", this.img_upload);
          continue;
        }
        console.log("this[updated_info_list[i]", this[updated_info_list[i]]);
        formData.append(updated_info_list[i], this[updated_info_list[i]]);
      }
      console.log("regist_infos formData: ", formData);
      //TODO: BE 구성 후 axios로 데이터 전송 구성
      axios({
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + this.$store.state.user_data.access_token,
        },
        url: this.$store.state.prod_url + "info/create/updator/",
        data: formData,
      })
        .then((res) => {
          console.log("regist_infos res: ", res);
          if (res.status == "201") {
            swal("정보가 성공적으로 등록되었습니다.", {
              icon: "success",
              buttons: {
                list: {
                  text: "뒤로가기",
                  value: "prod_list",
                },
                mypage: {
                  text: "등록 제품 확인",
                  value: "regist_list",
                },
              },
            }).then((value) => {
              switch (value) {
                case "목록으로":
                  this.$router.push({ path: "/sneakers" });
                  break;

                case "regist_list":
                  this.$router.push({ name: "mypage" });
                  break;

                default:
                  this.$router.go(-1);
                  break;
              }
            });
          }
        })
        .catch((err) => {
          console.log("regist_infos err :", err);
          swal("", "요청을 처리하는 중 오류가 발생했습니다.", {
            icon: "error",
          });
        });
    },
    info_added(info, value) {
      console.log("info_added: ", info, value);
      // let info_dict = {}
      if (!this.updatated_infos.includes(info)) {
        this.updatated_infos.push(info);
      }
      console.log("updatated_infos: ", this.updatated_infos);
      this.update_cnt++;
    },
  }, // methods end
  created() {
    const product_id = this.$route.params.id;
    axios({
      method: "GET",
      url: this.$store.state.prod_url + "kicks/sneaker/" + product_id,
    })
      .then((res) => {
        console.log("updator res: ", res);
        this.kick = res.data;
        this.img_preview = this.img_base_url + res.data.local_imageUrl;
        console.log("res.data.local_imageUrl: ", res.data.local_imageUrl);
        this.product_id = res.data.id;

        // 이미 존재하는 데이터가 있으면 불러와서 data에 넣어줌.
        this.check_existing_datas(res);
      })
      .catch((err) => {
        console.log("updator err :", err);
        // this.$router.push("/404");
      });
  },
  computed: {
    brand_exist() {
      if (this.kick?.brand != null) {
        return true;
      } else {
        return false;
      }
    },
    colorway_exist() {
      if (this.kick?.colorway != null) {
        return true;
      } else {
        return false;
      }
    },
    releaseData_exist() {
      if (this.kick?.releaseDate != null) {
        return true;
      } else {
        return false;
      }
    },
    retialPrice_exist() {
      if (this.kick?.retailPrice != null && this.kick.retailPrice != 0) {
        return true;
      } else {
        return false;
      }
    },
    name_kr_exist() {
      if (this.kick?.name_kr != null) {
        return true;
      } else {
        return false;
      }
    },
    category_exist() {
      if (this.kick?.category != "") {
        return true;
      } else {
        return false;
      }
    },
    img_preview_exist() {
      if (
        this.img_preview !=
        this.img_base_url + "media/images/defaultImg.png"
      ) {
        console.log("img_preview: ", this.img_preview);
        return true;
      } else {
        return false; // 이미 제품 사진이 등록되어있을 때
      }
    },
  },
};
</script>

<style scoped>
div.swal-footer {
  text-align: center !important;
}
</style>
