<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <img src="img/HRD_Banner.jpg" width="100%" alt="logo reh" />
                  <p class="text-muted">เข้าสู่ระบบขออนุมัติไปราชการ</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <input-mask
                      class="form-control"
                      v-bind:class="{ 'is-invalid': isInvalid }"
                      placeholder="เลขบัตรประชาชน 13 หลัก"
                      v-model="form.idcard"
                      mask="9 9999 99999 99 9"
                    />
                    <b-form-invalid-feedback>กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง</b-form-invalid-feedback>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">ล็อคอิน</b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="text-right">
                      <p>version {{ this.VUE_APP_VERSION }}</p>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h3>ระบบขออนุมัติไปราชการ</h3>
                  <h5>โรงพยาบาลร้อยเอ็ด</h5>
                  <h1>Human Resource Development</h1>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
const toTwoDigits = num => (num < 10 ? "0" + num : num);
let today = new Date();
let year = today.getFullYear();
let year_TH = parseInt(today.getFullYear()) + 543;
let month = toTwoDigits(today.getMonth() + 1);
let day = toTwoDigits(today.getDate());
let ToDay = today.getDate();
let date_now = `${year}-${month}-${day}`;
import axios from "axios";
import decode from "jwt-decode";

// const pkgVersion = require('../../../package.json').version;

export default {
  name: "Login",
  data() {
    return {
      login_user: [],
      date_login: window.localStorage.getItem("date-login"),
      form: {
        idcard: "",
        password: ""
      },
      maxLength: 13,
      totalcharacter: 0,
      isInvalid: false,
      isValid: false,
      VUE_APP_VERSION: ""
    };
  },
  methods: {
    login(evt) {
      let strIdcard = this.form.idcard.split(" ").join("");
      this.form.idcard = strIdcard;
      if (this.form.idcard === "") {
        this.isInvalid = true;
      } else {
        if (this.form.idcard.split("_").join("").length === 13) {
          let url = this.HOST;
          //console.log(JSON.stringify(this.form));
          axios
            .post(url + "/login", {
              auth: this.form
            })
            .then(res => {
              let resp = res.data.token;
              let decoded = decode(resp);

              if (decoded.data.length > 0) {
                if (decoded.data[0].chkLog > 0) {
                  window.localStorage.setItem("user-login", resp);
                  window.localStorage.setItem("date-login", date_now);
                  this.getDepartment();
                  this.getEmployee();
                  setTimeout(() => {
                    this.$router.push("/services/register-all");
                  }, 1000);
                } else {
                //   this.$swal(
                //     "เข้าสู่ระบบไม่สำเร็จ",
                //     "Username or Password Invalid.",
                //     "error"
                //   );
                  this.isInvalid = true;
                }
              } else {
                // this.$swal(
                //   "เข้าสู่ระบบไม่สำเร็จ",
                //   "Username or Password Invalid.",
                //   "error"
                // );
                this.isInvalid = true;
              }
            })
            .catch(error => console.log("Error :", error));
          evt.preventDefault();
          this.isInvalid = false;
        } else {
          this.isInvalid = true;
        }
      }
    },
    restrictChars($event) {
      if (
        $event.charCode === 0 ||
        /\d/.test(String.fromCharCode($event.charCode))
      ) {
        return true;
      } else {
        $event.preventDefault();
      }
    },
    charCount() {
      this.totalcharacter = this.form.idcard.length;
      if (this.totalcharacter != 13) {
        this.isInvalid = true;
      } else {
        this.isInvalid = false;
      }
    },
    getDepartment() {
      axios
        .get(this.HOST + "/hrd/department")
        .then(res => {
          let parsed = JSON.stringify(res.data);
          window.localStorage.setItem("department", parsed);
        })
        .catch(error => console.log("Error", error));
    },
    getEmployee() {
      axios
        .get(this.HOST + "/hrd/rehuser")
        .then(res => {
          let parsed = JSON.stringify(res.data);
          window.localStorage.setItem("rehuser", parsed);
        })
        .catch(error => console.log("Error", error));
    }
  },
  mounted() {
    this.VUE_APP_VERSION = this.VERSION_APP
    window.localStorage.clear();
  }
};
</script>
