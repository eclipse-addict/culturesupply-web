  <template>
  <div class="container">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
    <v-btn absolute top left icon style="margin-top:7rem;" @click="toAgreement" v-bind="attrs" v-on="on">
    <span class="material-symbols-outlined">arrow_back_ios_new</span>
    </v-btn>
    </template>
    <span>개인정보동의 페이지로 가기</span>
    </v-tooltip>
    <main>
  <div class="px-5 text-center">
    <h1 class="policyTitle pt-4 font-weight-bolder">JOIN</h1>
    <h5 class="policyTitle">회원정보 입력</h5>
    <hr>
    <div class="justify-content-between">
      <img src="" alt="" class="img-fluid center-block" >
    </div>
  </div>

      <div class="row d-flex">
        <!-- this section could be used to register add later -->
        <div
          class="
            col-md-5 col-lg-4 col-sm-4

            d-none d-xl-block d-md-block
            position-fixed
            d-xl-block
            border-1
            shadow
          "
          style="right: 0"
        >
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">required Check</span>
            <span
              v-if="!requiredChecks"
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-danger
                me-10
              "
              >close</span
            >
            <span
              v-else
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-bg-primary
                me-10
              "
              >Done</span
            >
          </h4>
          <p>
            <span class="align-middle">First Name</span>
            <span
              v-if="!firstName"
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-danger
                me-10
              "
              >close</span
            >
            <span
              v-else
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-bg-primary
                me-10
              "
              >Done</span
            >
          </p>
          <p>
            <span>Last Name</span>
            <span
              v-if="!lastName"
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-danger
                me-10
              "
              >close</span
            >
            <span
              v-else
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-bg-primary
                me-10
              "
              >Done</span
            >
          </p>
          <p>
            <span>nickName</span>
            <span
              v-if="!nickFinalCheck"
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-danger
                me-10
              "
              >close</span
            >
            <span
              v-else
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-bg-primary
                me-10
              "
              >Done</span
            >
          </p>
          <p>
            <span>E-mail Address</span>
            <span
              v-if="!email"
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-danger
                me-10
              "
              >close</span
            >
            <span
              v-else
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-bg-primary
                me-10
              "
              >Done</span
            >
          </p>
          <p>
            <span>Password</span>
            <span
              v-if="!password_is_valid"
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-danger
                me-10
              "
              >close</span
            >
            <span
              v-else
              class="
                material-symbols-outlined
                align-middle
                float-right
                text-bg-primary
                me-10
              "
              >Done</span
            >
          </p>
        </div>
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Personal information</h4>
          <form class="needs-validation" novalidate>
            <div class="row g-3">
              <div class="col-sm-6">
                <label for="firstName" class="form-label">First name</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  placeholder=""
                  value=""
                  required
                  v-model="firstName"
                />
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div class="col-sm-6">
                <label for="lastName" class="form-label">Last name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  placeholder=""
                  value=""
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
                  @input="email_duplicate_check"
                  v-model="email"
                  required
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
              <div class="col-12">
                <label for="email" class="form-label"
                  >Password <span class="text-muted"></span
                ></label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  v-model="password"
                  required
                  @input="checkPassword"
                />
                <div class="validator" v-show="passwordCheck">
                  영문, 숫자, 특수문자를 조합하여 입력해주세요.(8-16자)
                </div>
              </div>
              <hr class="my-4" />
              <h5>Optional</h5>

              <hr class="my-4" />
              <div class="col-12">
                <label class="form-label">Avatar<span class="text-muted"></span></label>
                <v-file-input
                  v-model="avatar"
                  show-size
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                  
                ></v-file-input>
              </div>
              <div class="col-12">
              <label for="gender" class="form-label">Gender <span class="text-muted"></span></label>
              <v-select :items="['Male', 'Female']" label="Gender" id="gender" v-model="gender"></v-select>
              </div>
              <div class="col-12">
              <label for="shoeSize" class="form-label">Pick your Shoe size <span class="text-muted"></span></label>
              <v-select :items="shoeSize" label="shoe Size" id="shoeSize" v-model="pickedShoeSize"></v-select>
              </div>
              <div class="col-12">
              <label for="topSize" class="form-label">Pick your top size <span class="text-muted"></span></label>
              <v-select :items="topSize" label="top Size" id="topSize" v-model="pickedTopSize"></v-select>
              </div>
              <div class="col-12">
              <label for="bottomSize" class="form-label">Pick your bottom size <span class="text-muted"></span></label>
              <v-select :items="bottomSize" label="bottom Size" id="bottomSize" v-model="pickeBottomSize"></v-select>
              </div>
              <hr class="my-4" />

              <div class="col-6">
                <label for="postcode" class="form-label"
                  >우편번호 <span class="text-muted"></span
                ></label>
                <input
                  type="text"
                  class="form-control"
                  v-model="postcode"
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
                  v-model="extraAddress"
                />
              </div>
            </div>

            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="same-address"
              />
              <label class="form-check-label" for="same-address"
                >Shipping address is the same as my billing address</label
              >
            </div>

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="save-info" />
              <label class="form-check-label" for="save-info"
                >Save this information for next time</label
              >
              <div class="form-check"></div>
              <form class="card p-2">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Promo code"
                  />
                  <button type="submit" class="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </form>
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
            <div>
              <div class="text-center mb-4"></div>
              <v-alert
                :value="alert"
                color="red"
                dark
                border="top"
                icon="mdi-home"
                transition="scale-transition"
              >
              필수 입력값이 누락되었습니다.
                  <v-btn class="mx-1" small color="white"  @click="alert = !alert">
                    <span class="material-symbols-outlined text-danger">close</span>
                  </v-btn>
              </v-alert>
            </div>
            <hr class="my-4" />
            <button
              class="w-100 btn btn-primary btn-lg"
              type="submit"
              @click.prevent="signUp"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </main>

    <footer class="my-5 pt-5 text-muted text-center text-small">
      <p class="mb-1">&copy; 2022–2024</p>
      <ul class="list-inline">
        <li class="list-inline-item"><a href="#">Privacy</a></li>
        <li class="list-inline-item"><a href="#">Terms</a></li>
        <li class="list-inline-item"><a href="#">Support</a></li>
      </ul>
    </footer>
  </div>
</template>

  <script>
import axios from "axios";
import swal from 'sweetalert';

// const prod_url = "http://localhost:8000/";
export default {
  name: "userRegisterForm",
  data() {
    return {
      shoeSize : ['200','205','210','215','220','225','230','235','240','245','250',
      '255','260','265','270','275','280','285','290','295','300','310','315','320'],
      topSize : ['XXS','XS','S','M','L','XL','XXL'],
      bottomSize : ['XXS','XS','S','M','L','XL','XXL'],
      alert: false,
      // 회원가입 필수 필드
      email: null,
      password: null,
      firstName: "",
      lastName: "",
      nickName: "",

      
      // 회원가입 추가 필드
      avatar: null,
      postcode: "",
      address: "",
      extraAddress: "",
      gender: '',
      pickedShoeSize: '',
      pickedTopSize: '',
      pickeBottomSize: '',

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
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
    };
  },
  methods: {
    checkPassword() {
      const password = this.password;
      if (!/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(password)) {
        this.passwordCheck = true;
        this.password_is_valid = false;
      } else {
        this.passwordCheck = false;
        this.password_is_valid = true;
      }
    },
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
            this.$store.state.prod_url+"user/nickcheck/?nick_name=" + this.nickName,
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
    email_duplicate_check() {
      this.email_msg = "";
      this.email_is_valid = false;
      this.emailFinalCheck = false;

      const email = this.email;

      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.emailCheck = true;
      } else {
        this.emailCheck = false;

        axios({
          method: "GET",
          url: this.$store.state.prod_url+"user/emailcheck/?email=" + this.email,
          params: { email: this.email },
        })
          .then((res) => {
            if (res.status === 200) {
              this.email_is_valid = true;
              this.email_msg = "사용 가능한 이메일입니다.";
              this.emailFinalCheck = true;
              document.getElementById("emailMsg").style.color = "#079400";
            } else {
              this.email_is_valid = true;
              this.email_msg = "이미 중복된 이메일입니다";
              document.getElementById("emailMsg").style.color = "#dc3545";
            }
          })
          .catch((err) => {
            console.log("error : ", err);
          });
      }
    },
    userInfo_create(pk, token, data){
      console.log("userInfo", pk, token, data);
      axios({
        method: "POST",
        ContentType: 'application/json',
        url: this.$store.state.prod_url + "user/userinfo/"+pk+'/',
        headers: {
          'Authorization':'Bearer '+token,
          'Content-Type': 'multipart/form-data'
          },
        data: data,
      })
      .then(res => {
        console.log(res.status);
        if (res.status == 201){
          this.$emit('toFinalStep')
        }
      })
      // .then(() => this.$routet = {name:'home'});
    },

    signUp() {
      let validated = true;
      let required_item = "";
      if (!this.firstName) {
        validated = false;
        required_item = "이름";
      } else if (!this.lastName) {
        validated = false;
        required_item = "성";
      } else if (!this.nickFinalCheck) {
        validated = false;
        required_item = "닉네임";
      } else if (this.ememailFinalCheckail) {
        validated = false;
        required_item = "이메일";
      } else if (!this.password_is_valid) {
        validated = false;
        required_item = "비밀번호";
      }
      console.log("validated: ", validated, required_item);
      if (validated) {
        const email = this.email;
        const password = this.password;
        const payload = {
          email,
          password,
        };
        // this.$store.dispatch('signupRequest', payload)
        axios({
          method: "POST",
          url: this.$store.state.prod_url + "user/dj-rest-auth/registration/",
          data: {
            email: payload.email,
            password1: payload.password,
            password2: payload.password,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status == 201) {
              const pk = res.data.user.pk
              const token = res.data.access_token

              const last_name = this.lastName
              const first_name = this.firstName
              const nick_name = this.nickName
              const profile_img = this.avatar
              const gender = this.gender
              const shoeSize = this.pickedShoeSize
              const topSize = this.pickedTopSize
              const bottomSize = this.pickeBottomSize

              const zipCode = this.postcode
              const address = this.address + this.extraAddress

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
              }

              this.userInfo_create(pk, token, payload2)
            }
          })
          .catch((err) => {
            console.log("signupRequest err:", err.response.data);
          });
        // .then(() => this.$routet = {name:'home'}))
      } //end of validated if
      else {
        // alert(`필수 입력값이 누락되었습니다! \n\n 누락 항목 : ${required_item}`)
        this.alert = true;
      }
    },

    dPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
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
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },
    toAgreement(){
      swal("입력하신 정보가 모두 사라집니다.", {
          title: "주의!",
          buttons: {
            catch: {
              text: "확인",
              value: "뒤로가기",
            },
            취소: true,
          },
        })
        .then((value) => {
          switch (value) {
        
            case "뒤로가기":
              this.$emit('toAgreement')
              break;
        
            case "취소":
              break;
        
            default:
              break;
              
          }
        });
    },
  }, //end of methods
  computed: {
    requiredChecks() {
      if (
        !this.firstName ||
        !this.lastName ||
        !this.nickName ||
        !this.email ||
        !this.password
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.validator {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>