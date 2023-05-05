<template>
  <!--  <v-card-title class="fs-1 mb-6 border-bottom">개인 정보 수정</v-card-title>-->
  <!--  <v-card-subtitle>Update your Personal Info</v-card-subtitle>-->
  <v-container>
    <h3 class="border-bottom">개인 정보 수정</h3>
    <span class="fw-light">Update your Personal Info</span>
    <form class="needs-validation" novalidate>
      <div class="row g-3">
        <div class="col-sm-6">
          <label for="firstName" class="form-label">First name</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            placeholder=""
            required
            v-model="firstName"
          />
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>

        <div class="col-sm-6">
          <label for="lastName" class="form-label">Last name</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            placeholder=""
            required
            v-model="lastName"
          />
          <div class="invalid-feedback">Valid last name is required.</div>
        </div>

        <div class="col-12">
          <label for="nickname" class="form-label">nickname</label>
          <div class="input-group has-validation">
            <span class="input-group-text">@</span>
            <input
              type="text"
              class="form-control"
              id="nickname"
              @input="nickName_duplicate_check"
              placeholder="nickname"
              required
              v-model="nickName"
            />
            <div class="validator" v-show="nickNameCheck">
              닉네임은 3글자 이상 입력되어야 합니다.
            </div>
            <div
              class="validator"
              id="nickNameMsg"
              v-show="nickName_is_valid"
              v-html="nickName_msg"
            ></div>
          </div>
        </div>

        <div class="col-12">
          <label for="email" class="form-label"
            >Email <span class="text-muted"></span
          ></label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="you@example.com"
            v-model="email"
            required
            disabled
          />
          <div class="validator" v-show="emailCheck">
            이메일 형식에 맞게 작성되야 합니다.
          </div>
          <div
            class="validator"
            id="emailMsg"
            v-show="email_is_valid"
            v-html="email_msg"
          ></div>
        </div>
        <hr class="my-4" />
        <h5>Optional</h5>

        <hr class="my-4" />
        <div class="col-12">
          <label class="form-label"
            >Avatar<span class="text-muted"></span
          ></label>
          <div class="col-12">
            <v-avatar class="profile" color="grey" size="130">
              <v-img :src="current_profile_img"></v-img>
            </v-avatar>
          </div>
          <v-file-input
            v-model="profile_img_file"
            show-size
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="프로필 이미지 변경"
          ></v-file-input>
        </div>

        <div class="col-12">
          <label for="gender" class="form-label"
            >Gender <span class="text-muted"></span
          ></label>
          <v-select
            :items="['Male', 'Female']"
            label="Gender"
            id="gender"
            v-model="gender"
          ></v-select>
        </div>
        <div class="col-12">
          <label for="shoeSize" class="form-label"
            >Pick your Shoe size <span class="text-muted"></span
          ></label>
          <v-select
            :items="shoeSize"
            label="shoe Size"
            id="shoeSize"
            v-model="pickedShoeSize"
          ></v-select>
        </div>
        <div class="col-12">
          <label for="topSize" class="form-label"
            >Pick your top size <span class="text-muted"></span
          ></label>
          <v-select
            :items="topSize"
            label="top Size"
            id="topSize"
            v-model="pickedTopSize"
          ></v-select>
        </div>
        <div class="col-12">
          <label for="bottomSize" class="form-label"
            >Pick your bottom size <span class="text-muted"></span
          ></label>
          <v-select
            :items="bottomSize"
            label="bottom Size"
            id="bottomSize"
            v-model="pickeBottomSize"
          ></v-select>
        </div>
        <hr class="my-4" />

        <div class="col-6">
          <label for="postcode" class="form-label"
            >우편번호 <span class="text-muted"></span
          ></label>
          <input
            type="text"
            class="form-control"
            v-model="zipCode"
            id="postCode"
            name="postCode"
            placeholder="우편번호"
          />
        </div>
        <div class="col-6">
          <button
            @click.prevent="dPostcode()"
            class="btn btn-outline-secondary mt-8"
          >
            우편번호 찾기</button
          ><br />
        </div>
        <div class="col-12">
          <label for="address" class="form-label"
            >주소 <span class="text-muted"></span
          ></label>
          <input
            type="text"
            id="address"
            placeholder="주소"
            class="form-control"
            v-model="address"
          /><br />
          <label for="detailAddress" class="form-label"
            >상세주소 <span class="text-muted"></span
          ></label>
          <input
            type="text"
            id="detailAddress"
            placeholder="상세주소"
            class="form-control"
            v-model="address_detail"
          />
        </div>
      </div>

      <hr class="my-4" />

      <!-- <h4 class="mb-3">Payment</h4>

            <div class="my-3">
              <div class="form-check">
                <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required>
                <label class="form-check-label" for="credit">Credit card</label>
              </div>
              <div class="form-check">
                <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required>
                <label class="form-check-label" for="debit">Debit card</label>
              </div>
              <div class="form-check">
                <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required>
                <label class="form-check-label" for="paypal">PayPal</label>
              </div>
            </div>

            <div class="row gy-3">
              <div class="col-md-6">
                <label for="cc-name" class="form-label">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required>
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">
                  Name on card is required
                </div>
              </div>

              <div class="col-md-6">
                <label for="cc-number" class="form-label">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder="" required>
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>

              <div class="col-md-3">
                <label for="cc-expiration" class="form-label">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
                <div class="invalid-feedback">
                  Expiration date required
                </div>
              </div>

              <div class="col-md-3">
                <label for="cc-cvv" class="form-label">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
                <div class="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div> -->
      <hr class="my-4" />
      <button
        class="w-100 btn btn-primary btn-lg"
        type="submit"
        @click.prevent="update_user_info"
      >
        정보 수정
      </button>
    </form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "UserInfoUpdateForm",
  data() {
    return {
      shoeSize: [
        "200",
        "205",
        "210",
        "215",
        "220",
        "225",
        "230",
        "235",
        "240",
        "245",
        "250",
        "255",
        "260",
        "265",
        "270",
        "275",
        "280",
        "285",
        "290",
        "295",
        "300",
        "310",
        "315",
        "320",
      ],
      topSize: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
      bottomSize: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
      alert: false,
      // 회원가입 필수 필드
      email: null,
      firstName: "",
      lastName: "",
      nickName: "",

      // 회원가입 추가 필드
      profile_img_file: null,
      current_profile_img: null,
      zipCode: "",
      address: "",
      address_detail: "",
      gender: "",
      pickedShoeSize: "",
      pickedTopSize: "",
      pickeBottomSize: "",

      // 검사 필드
      nickNameCheck: false,
      passwordCheck: false,
      emailCheck: false,

      password_is_valid: false,

      nickName_is_valid: false,
      nickName_msg: "",
      nickFinalCheck: false,

      email_is_valid: false,
      email_msg: "",
      emailFinalCheck: false,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "프로필 이미지 사이즈는 4 MB를 초과할 수 없습니다.!",
      ],
    };
  },
  methods: {
    nickName_duplicate_check() {
      this.nickName_msg = "";
      this.nickName_is_valid = false;
      this.nickFinalCheck = false;

      const nickName = this.nickName;

      if (nickName.trim().length < 3) {
        this.nickNameCheck = true;
      } else {
        this.nickNameCheck = false;

        axios({
          method: "GET",
          url:
            this.$store.state.prod_url +
            "user/nickcheck/?nick_name=" +
            this.nickName,
          params: { nickName: this.nickName },
        })
          .then((res) => {
            if (res.status === 200) {
              this.nickName_is_valid = true;
              this.nickName_msg = "사용 가능한 닉네임입니다.";
              this.nickFinalCheck = true;
              document.getElementById("nickNameMsg").style.color = "#079400";
            } else {
              this.nickName_is_valid = true;
              this.nickName_msg = "이미 중복된 닉네임입니다";
              document.getElementById("nickNameMsg").style.color = "#dc3545";
            }
          })
          .catch((err) => {
            console.log("error : ", err);
          });
      }
    },
    dPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.address_detail !== "") {
            this.address_detail = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }
          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.address_detail += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.address_detail +=
                this.address_detail !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.address_detail !== "") {
              this.address_detail = `(${this.address_detail})`;
            }
          } else {
            this.address_detail = "";
          }
          // 우편번호를 입력한다.
          this.zipCode = data.zonecode;
        },
      }).open();
    },
    get_user_data() {
      this.email = this.$store.getters.get_user_data.email;
      this.nickName = this.$store.getters.get_user_data.nick_name;
      this.firstName = this.$store.getters.get_user_data.first_name;
      this.lastName = this.$store.getters.get_user_data.last_name;
      this.pickedShoeSize = this.$store.getters.get_user_data.shoeSize;
      this.pickedTopSize = this.$store.getters.get_user_data.topSize;
      this.pickeBottomSize = this.$store.getters.get_user_data.bottomSize;
      this.gender = this.$store.getters.get_user_data.gender;
      this.current_profile_img = this.$store.getters.get_user_data.profile_img;
      this.zipCode = this.$store.getters.get_user_data.zipCode;
      this.address = this.$store.getters.get_user_data.address;
      this.address_detail = this.$store.getters.get_user_data.addressDetail;
      this.current_profile_img = this.$store.getters.get_user_data.profile_img;
    },

    update_user_info() {
      const pk = this.$store.getters.get_user_data.pk;
      const token = this.$store.getters.get_user_data.access_token;

      const last_name = this.lastName;
      const first_name = this.firstName;
      const nick_name = this.nickName;
      const profile_img = this.profile_img_file;
      const gender = this.gender;
      const shoeSize = this.pickedShoeSize;
      const topSize = this.pickedTopSize;
      const bottomSize = this.pickeBottomSize;

      const zipCode = this.zipCode;
      const address = this.address;
      const address_detail = this.address_detail;

      const payload2 = {
        last_name,
        first_name,
        nick_name,
        profile_img,
        gender,
        shoeSize,
        topSize,
        bottomSize,
        zipCode,
        address,
        address_detail,
      };
      axios({
        method: "PUT",
        url: this.$store.state.prod_url + "user/userinfo/" + pk + "/",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        data: payload2,
      })
        .then((res) => {
          console.log("User Info change res : ", res);
          this.$store.commit("SET_USER_INFO", res.data);

          this.$emit("change_tab", "user_info");
          console.log(
            "this.$store.getters.get_user_data : ",
            this.$store.getters.get_user_data
          );
        })
        .catch((err) => {
          console.log("error : ", err);
        });
    },
  },
  created() {
    this.get_user_data();
  },
};
</script>

<style scoped></style>
