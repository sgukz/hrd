<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <img src="img/HRD_Banner.jpg" width="100%" alt="logo reh">
                  <p class="text-muted">เข้าสู่ระบบขออนุมัติไปราชการ</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="เลขบัตรประชาชน 13 หลัก"
                      autocomplete="username"
                      :required="true"
                      v-model="form.idcard"
                    />
                  </b-input-group>
                  <!-- <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="รหัสผ่าน" autocomplete="current-password" :required="true" v-model="form.password" />
                  </b-input-group>-->
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">ล็อคอิน</b-button>
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
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      login_user: [],
      form: {
        idcard: ""
      }
    };
  },
  methods: {
    login(evt) {
      let url = this.HOST;
      axios
        .post(url + "/login/v1", {
          auth: this.form
        })
        .then(res => {
          let resp = res.data;
          console.log(resp);
          if (resp.length > 0) {
            if (resp[0].chkLog == 1 && resp[0].pos_no != "") {
              let parsed = JSON.stringify(res.data);
              window.localStorage.setItem("user-login", parsed);
              this.getDepartment();
              this.getEmployee();
              this.getPositions();
               setTimeout(() => {
                this.$router.push('/services/register-all');
              },1000);
            } else if (resp[0].chkLog == 1 && resp[0].pos_no == "") {
              let parsed = JSON.stringify(res.data);
              window.localStorage.setItem("user-login", parsed);
              this.getDepartment();
              this.getEmployee();
              this.getPositions();
              setTimeout(() => {
                this.$router.push("/profile/Profiles");
              }, 1500);
            }
          } else {
            this.$swal(
              "เข้าสู่ระบบไม่สำเร็จ",
              "Username or Password Invalid.",
              "error"
            );
          }
        })
        .catch(error => console.log("Error :", error));
      evt.preventDefault();
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
        .get(this.HOST + "/users/rehuser")
        .then(res => {
          let parsed = JSON.stringify(res.data);
          window.localStorage.setItem("rehuser", parsed);
        })
        .catch(error => console.log("Error", error));
    },
    getPositions() {
      axios
        .get(this.HOST + "/hrd/position")
        .then(res => {
          let parsed = JSON.stringify(res.data);
          window.localStorage.setItem("position", parsed);
        })
        .catch(error => console.log("Error", error));
    }
  },
  mounted() {
    if (window.localStorage.getItem("user-login")) {
      this.$router.push("/services/register-all");
    }
  }
};
</script>
