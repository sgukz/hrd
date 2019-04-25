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
                          <b-form-group
                            label="ชื่อ"
                            label-for="re_date"
                            :horizontal="true"
                          >
                            <b-form-input
                              type="text"
                              v-model="form.fname"
                            ></b-form-input>
                          </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12">
                          <b-form-group
                            label="นามสกุล"
                            label-for="phone"
                            :horizontal="true"
                          >
                            <b-form-input
                              type="text"
                              v-model="form.lname"
                            ></b-form-input>
                          </b-form-group>
                          <!-- required -->
                        </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="12">
                        <b-form-group
                          label="ตำแหน่ง"
                          label-for="re_date"
                          :horizontal="true"
                        >
                        <v-select v-model="position" placeholder="เลือกตำแหน่ง" label="pos_name" :options="items_pos"></v-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="12">
                        <b-form-group
                          label="หน่วยงาน"
                          label-for="phone"
                          :horizontal="true"
                        >
                          <b-form-input
                            type="text"
                            :readonly="true"
                            v-model="form.dep_name"
                          ></b-form-input>
                        </b-form-group>
                        <!-- required -->
                      </b-col>
                    </b-row>
                </b-card-body>
                <div slot="footer">
                    <b-button type="submit" size="sm" variant="primary">
                        <i class="fa fa-save"></i> บันทึก
                    </b-button>&nbsp;&nbsp;
                </div>
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
      userLogin: JSON.parse(window.localStorage.getItem('user-login')),
      items_pos:JSON.parse(window.localStorage.getItem('position')),
      form:{
          fname: "",
          lname: "",
          pos_no: "",
          dep_name: "",
          idcard: "",
      },
      position: null,
    }
  },
  computed: {},
  methods: {
    onSubmit(evt){
        if(this.position != null){
            this.form.pos_no = this.position.pos_no
            this.form.idcard = this.userLogin[0].idcard
            axios
                .post(this.HOST+"/hrd/profile",{
                    profile: this.form,
                })
                .then(res => {
                  let data = res.data
                  //console.log(data);
                  if(data[0].status == 200){
                    this.$swal({
                      position: 'top-end',
                      type: 'success',
                      title: 'Your work has been saved.',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    this.$router.push('/profile/Profiles');
                  }else{
                        this.$swal({
                            title: 'แจ้งเตือน', 
                            text: data, 
                            type: 'Error',
                            timer: 2000
                        }) 
                  }
                }) 
                .catch(error => console.log("Error :", error));
        }else{
            this.$swal({
                title: 'แจ้งเตือน', 
                text: 'กรุณาเลือกตำแหน่งของคุณ !', 
                type: 'warning',
                timer: 2000
            }) 
        }
        evt.preventDefault();
    },
    loadData(){
        this.form.fname = this.userLogin[0].fname
        this.form.lname = this.userLogin[0].lname
        this.form.dep_name = this.userLogin[0].dep_name
        this.updateNewdata()
    },
    updateNewdata(){
        let idcard = this.userLogin[0].idcard
        axios
        .get(this.HOST+"/hrd/profile/"+idcard)
        .then(res => {
            let data = res.data
            if(data.length > 0){
                this.position = data[0].pos_name
            }
        })
        .catch(error => console.log("Error", error));
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
