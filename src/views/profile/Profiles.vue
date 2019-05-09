<template>
  <b-row>
    <b-col cols="12" xl="6">
      <b-card>
        <div slot="header">
          <strong>Profiles</strong>
        </div>
        <b-form @submit.prevent="onSubmit">
          <b-card-body>
            <b-row>
              <b-col sm="12">
                <b-form-group label="ชื่อ" label-for="re_date" :horizontal="true">
                  <b-form-input type="text" :readonly="true" v-model="form.fname"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group label="นามสกุล" label-for="phone" :horizontal="true">
                  <b-form-input type="text" :readonly="true" v-model="form.lname"></b-form-input>
                </b-form-group>
                <!-- required -->
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group label="ตำแหน่ง" label-for="re_date" :horizontal="true">
                  <b-form-input type="text" :readonly="true" v-model="position"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group label="หน่วยงาน" label-for="phone" :horizontal="true">
                  <b-form-input type="text" :readonly="true" v-model="form.dep_name"></b-form-input>
                </b-form-group>
                <!-- required -->
              </b-col>
            </b-row>
          </b-card-body>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";
export default {
  name: "profiles",
  data() {
    return {
      userLogin: JSON.parse(window.localStorage.getItem("user-login")),
      form: {
        fname: "",
        lname: "",
        dep_name: "",
        idcard: ""
      },
      position: ""
    };
  },
  computed: {},
  methods: {
    loadData() {
      this.form.fname = this.userLogin[0].fname;
      this.form.lname = this.userLogin[0].lname;
      this.form.dep_name = this.userLogin[0].dep_name;
      this.position = this.userLogin[0].positionname;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
