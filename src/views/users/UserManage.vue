<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="8">
        <b-card>
          <div slot="header">
            <strong>ข้อมูลบุคลากร</strong>
          </div>
          <b-row>
            <b-col sm="12">
              <template>
                <div>
                  <b-form @submit.prevent="onSearch">
                    <b-form-group>
                      <b-input-group>
                        <!-- Attach Left button -->
                        <b-form-input type="text" v-model="form.keyword" placeholder="ค้นหาชื่อหรือนามสกุล..."></b-form-input>
                        <b-input-group-append>
                          <b-button variant="primary" type="submit">
                            <i class="fa fa-search"></i> ค้นหา
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-form>
                  <b-table
                    striped
                    hover
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                  >
                    <template slot="cid" slot-scope="data">
                      <strong>{{data.item.cid}}</strong>
                    </template>
                    <template slot="fname" slot-scope="data">
                      {{data.item.pname+""+data.item.fname+" "+data.item.lname}}
                    </template>
                    <!-- <template slot="lname" slot-scope="data">
                      {{data.item.lname}}
                    </template> -->
                    <template slot="position_name" slot-scope="data">
                      {{data.item.position_name}}
                    </template>
                    <template slot="pos_degree" slot-scope="data">
                      {{data.item.pos_degree}}
                    </template>
                    <template slot="actions" slot-scope="data">
                      <span v-if="data.item.active !== 1">
                      <b-button type="button" size="sm" variant="primary" v-on:click="onClickChange(data.item)">
                        เพิ่ม
                      </b-button>
                      </span>
                      <span v-else>
                      <b-button type="button" size="sm" variant="warning" v-on:click="onClickChange(data.item)">
                        <span class="text-light">แก้ไข</span> 
                      </b-button>
                      </span>
                    </template>
                  </b-table>
                  <b-pagination
                    size="sm"
                    :total-rows="getRowCount(items)"
                    :per-page="perPage"
                    v-model="currentPage"
                    prev-text="Prev"
                    next-text="Next"
                    hide-goto-end-buttons
                  />
                </div>
              </template>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col sm="4" v-if="showFormEdit">
        <b-card>
          <div slot="header">
            <strong>ข้อมูลบุคลากร</strong>
          </div>
          <b-row>
            <b-col sm="12">
              <template>
                <div>
                  <b-form @submit.prevent="onSubmit">
                    <b-row>
                      <b-col sm="12">
                        <b-form-group
                            label="เลขบัตรประชาชน"
                            label-class="text-sm-right"
                            label-for="cid"
                            label-cols="5"
                        >
                            <b-form-input
                                type="text"
                                v-model="formAdd.cid"
                                :readonly="true"
                            ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col sm="12">
                        <b-form-group
                            label="ชื่อ"
                            label-class="text-sm-right"
                            label-for="first_name"
                            label-cols="3"
                        >
                            <b-form-input
                                type="text"
                                v-model="formAdd.first_name"
                                :readonly="true"
                            ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col sm="12">
                        <b-form-group
                            label="นามสกุล"
                            label-class="text-sm-right"
                            label-for="last_name"
                            label-cols="3"
                        >
                            <b-form-input
                                type="text"
                                v-model="formAdd.last_name"
                                :readonly="true"
                            ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col sm="12">
                        <b-form-group
                            label="ตำแหน่ง"
                            label-class="text-sm-right"
                            label-for="position_name"
                            label-cols="3"
                        >
                            <v-select
                              v-model="formAdd.position_name"
                              placeholder="เลือกตำแหน่ง"
                              label="position_name"
                              :options="itemPosition"
                          ></v-select>
                        </b-form-group>
                      </b-col>
                      <b-col sm="12">
                        <small class="text-danger">(ไม่เลือกก็ได้)</small>
                        <b-form-group
                            label="ระดับ"
                            label-class="text-sm-right"
                            label-for="pos_degree"
                            label-cols="3"
                        >
                            <v-select
                              v-model="formAdd.degree"
                              placeholder="เลือกระดับ"
                              label="degree_name"
                              :options="itemDegree"
                          ></v-select>
                        </b-form-group>
                      </b-col>
                      <b-col sm="12">
                        <b-button type="submit" size="sm" variant="primary">
                            <i class="fa fa-save"></i> บันทึก
                        </b-button>&nbsp;&nbsp;
                        <b-button type="button" size="sm" variant="danger" @click="showFormEdit = false">
                            <i class="fa fa-ban"></i> ยกเลิก
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-form>
                </div>
              </template>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
import degree from "../../controllers/DataDegree.json"
export default {
  name: "UserManage",
  props: {
    caption: {
      type: String,
      default: "จัดการข้อมูลผู้ใช้งาน"
    }
  },
  data() {
    return {
      // userLogin: JSON.parse(window.localStorage.getItem("user-login")),
      currentPage: 1,
      perPage: 25,
      totalRows: 0,
      form: {
        keyword: ""
      },
      formAdd:{
        cid: "",
        fix_name: "",
        first_name: "",
        last_name: "",
        position_name: "",
        degree: "",
        is_active: "",
      },
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "cid",
          label: "เลขบัตรประชาชน",
          sortable: true
        },
        {
          key: "fname",
          label: "ชื่อ - สกุล",
          sortable: true
        },
        {
          key: "position_name",
          label: "ตำแหน่ง",
          sortable: true
        },
        {
          key: "pos_degree",
          label: "ระดับ",
          sortable: true
        },
        {
          key: "actions",
          label: "จัดการ",
          sortable: false
        }
      ],
      items: [],
      itemList: [],
      showFormEdit: false,
      itemPosition: [],
      itemDegree: degree.items
    };
  },
  methods: {
    loadData() {
      this.getUserManage();
    },
    onSearch(evt) {
      let keywords = this.form.keyword;
      const dataItem = JSON.parse(window.localStorage.getItem("reh-employee"));
      const filteredSets = dataItem.filter((item) =>
        item.fname.toLowerCase().match(keywords.toLowerCase()) ||
        item.lname.toLowerCase().match(keywords.toLowerCase()) ||
        item.cid.toLowerCase().match(keywords.toLowerCase()) 
      )
      this.items = filteredSets;

      evt.preventDefault();
    },
    onSubmit(evt) {
      let url;
      if(this.formAdd.is_active === 0){
        url = this.HOST + "/hrd/positions/create";
      }else if(this.formAdd.is_active === 1){
        url = this.HOST + "/hrd/positions/update";
      }
      if(this.formAdd.position_name !== null){
        if(this.formAdd.position_name.position_name !== undefined){
          this.formAdd.position_name = this.formAdd.position_name.position_name;
        }
        if(this.formAdd.degree === null){
          this.formAdd.degree = "";
        }else if(this.formAdd.degree.degree_name !== undefined){
          this.formAdd.degree = this.formAdd.degree.degree_name
        }

        axios
          .post(url, {
            position: this.formAdd
          })
          .then(res => {
            let data = res.data;
            if (data.code == 200) {
              this.$swal({
                position: "top-end",
                type: data.type,
                title: data.text,
                text: data.msg,
                showConfirmButton: false,
                timer: 1500
              });
              this.form.keyword = "";
              this.showFormEdit = false;
              setTimeout(()=>{
                this.getUserManage();
              }, 1000)
              
            } else {
                  this.$swal({
                    position: "top-end",
                    type: data.type,
                    title: data.text,
                    text: data.msg,
                  });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }else{
        this.$swal({
                    position: "top-end",
                    type: "warning",
                    title: "กรุณาเลือกตำแหน่ง"
                  });
      }
      evt.preventDefault();
    },
    onChange(evt){
      axios
        .put(this.HOST + "/hrd/dep/update", {
          depId: this.formEdit.departId,
          depName: this.formEdit.depart
        })
        .then(res => {
          let data = res.data;
          if (data[0].status == 200) {
            this.$swal({
              position: "top-end",
              type: "success",
              title: "Your work has been saved update data.",
              showConfirmButton: false,
              timer: 1500
            });
            this.getDepartment();
            this.showFormEdit = false
            this.show = false
          } else {
            this.$swal("เกิดข้อผิดพลาด !!!", data[0].msg, "error");
          }
        })
        .catch(error => console.log("Error :", error));
      evt.preventDefault();
    },
    
    getRowCount(items) {
      return items.length;
    },
    getUserManage() {
      axios
        .get(this.HOST + "/hrd/reh-employee")
        .then(res => {
          let parsed = JSON.stringify(res.data);
          window.localStorage.setItem("reh-employee", parsed);
          const dataItem = JSON.parse(window.localStorage.getItem("reh-employee"));
          this.items = dataItem;
        })
        .catch(error => console.log("Error", error));
    },
    getPositions() {
      axios
        .get(this.HOST + "/hrd/positions")
        .then(res => {
          let parsed = JSON.stringify(res.data);
          window.localStorage.setItem("positions", parsed);
        })
        .catch(error => console.log("Error", error));
    },
    onClickChange(data){
      this.showFormEdit = true;
      this.formAdd.cid = data.cid
      this.formAdd.fix_name = data.pname
      this.formAdd.first_name = data.fname
      this.formAdd.last_name = data.lname
      this.formAdd.position_name = data.position_name
      this.formAdd.degree = data.pos_degree
      this.formAdd.is_active = data.active
    }
  },
  mounted() {
    this.loadData();
    // console.log(this.itemDegree);
    if(window.localStorage.getItem("positions") === null){
      this.getPositions();
    }else{
      this.itemPosition = JSON.parse(window.localStorage.getItem("positions"));
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.bold{
  font-weight: bold;
}
</style>