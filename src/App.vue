<template>
  <router-view></router-view>
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
export default {
  name: "app",
  data() {
    return {
      date_login: window.localStorage.getItem("date-login")
    };
  },
  mounted() {
    if (window.localStorage.getItem("user-login")) {
      if (this.date_login != date_now) {
        this.$router.push("/pages/login");
      } else {
        this.$router.push("/services/register-all");
      }
    } else {
      this.$router.push("/pages/login");
    }
  }
};
</script>

<style lang="scss">
// CoreUI Icons Set
@import "~@coreui/icons/css/coreui-icons.min.css";
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Simple Line Icons Set */
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/scss/simple-line-icons.scss";
/* Import Flag Icons Set */
@import "~flag-icon-css/css/flag-icon.min.css";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
// Import Main styles for this application
@import "assets/scss/style";
// Import SED
// @import 'assets/css/select2.min.css';
.bold{
  font-weight: bold;
}
</style>
