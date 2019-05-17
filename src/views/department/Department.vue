<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6">
        <b-card>
          <div slot="header">
            <strong>ข้อมูลหน่วยงาน</strong>
          </div>
          <b-row>
            <b-col sm="12">
              <template>
                <div>
                  <b-form @submit.prevent="onSearch">
                    <b-form-group>
                      <b-input-group>
                        <!-- Attach Left button -->
                        <b-form-input type="text" v-model="form.keyword" placeholder="Search..."></b-form-input>
                        <b-input-group-append>
                          <b-button variant="primary" type="submit">
                            <i class="fa fa-search"></i> ค้นหา
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-form>
                  <b-button block variant="primary" v-on:click="showForm()">เพิ่มหน่วยงาน</b-button>
                  <br>
                  <div v-if="show" class="animated fadeIn">
                    <b-form @submit.prevent="onSave">
                      <b-form-group>
                        <b-input-group>
                          <!-- Attach Left button -->
                          <b-form-input
                            type="text"
                            v-model="formEdit.depart"
                            placeholder="กรอกชื่อหน่วยงาน"
                            :required="true"
                            autofocus
                          class="bold"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="success" type="submit">
                              <i class="fa fa-plus"></i> บันทึก
                            </b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-form>
                  </div>
                  <div v-if="showFormEdit" class="animated fadeIn">
                    <b-form @submit.prevent="onChange">
                      <b-form-group>
                        <b-input-group>
                          <!-- Attach Left button -->
                          <b-form-input
                            type="text"
                            v-model="formEdit.depart"
                            :required="true"
                            autofocus
                          class="bold"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="success" type="submit">
                              <i class="fa fa-edit"></i> เปลี่ยนแปลง
                            </b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-form>
                  </div>
                  <b-table
                    striped
                    hover
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                  >
                    <template slot="dep_code_name" slot-scope="data">
                      <strong>{{data.item.dep_code_name}}</strong>
                    </template>
                    <template slot="actions" slot-scope="data">
                      <span>
                        <b-dropdown variant="link" size="lg" no-caret>
                          <template slot="button-content">
                            <i class="fa fa-cogs"></i>
                            <span class="sr-only">Search</span>
                          </template>
                          <b-dropdown-item v-on:click="editDepart(data.item.dep_code_id)">
                            <i class="fa fa-edit"></i> แก้ไข
                          </b-dropdown-item>
                          <b-dropdown-item v-on:click="deleteDepart(data.item.dep_code_id)">
                            <i class="fa fa-trash"></i> ลบ
                          </b-dropdown-item>
                        </b-dropdown>
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
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "department-all",
  props: {
    caption: {
      type: String,
      default: "ข้อมูลหน่วยงาน"
    }
  },
  data() {
    return {
      userLogin: JSON.parse(window.localStorage.getItem("user-login")),
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      form: {
        keyword: ""
      },
      formEdit:{
        depart: "",
        departId: "",
      },
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "dep_code_name",
          label: "หน่วยงาน",
          sortable: true
        },
        {
          key: "actions",
          label: "จัดการ",
          sortable: false
        }
      ],
      items: [],
      show: false,
      showFormEdit: false
    };
  },
  methods: {
    loadData() {
      this.getDepartment();
    },
    onSearch(evt) {
      axios
        .post(this.HOST + "/department/search", {
          keyword: this.form
        })
        .then(res => {
          let data = res.data;
          this.items = data;
        })
        .catch(error => console.log("Error :", error));
      evt.preventDefault();
    },
    onSave(evt) {
      axios
        .post(this.HOST + "/department/create", {
          department: this.formEdit.depart
        })
        .then(res => {
          let data = res.data;
          //console.log(data);
          if (data[0].status == 200) {
            this.$swal({
              position: "top-end",
              type: "success",
              title: "Your work has been saved.",
              showConfirmButton: false,
              timer: 1500
            });
            this.getDepartment();
            this.show = false;
            this.form.keyword = "";
          } else {
            this.$swal("เกิดข้อผิดพลาด !!!", data[0].msg, "error");
          }
        })
        .catch(error => console.log("Error :", error));
      evt.preventDefault();
    },
    onChange(evt){
      axios
        .put(this.HOST + "/department/update", {
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
    editDepart(id) {
      this.showFormEdit = true
      this.show = false
      axios
        .get(this.HOST + "/department/view/"+id)
        .then(res => {
          let data = res.data;
          this.formEdit.depart = data[0].dep_code_name
          this.formEdit.departId = data[0].dep_code_id
          window.scrollTo(0,0)
        })
        .catch(error => console.log("Error :", error));
    },
    deleteDepart(id) {
      this.$swal({
        title: "คุณต้องการลบข้อมูลหรือไม่ ?",
        text: "ยืนยันการลบข้อมูลหน่วยงาน",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        showCloseButton: true
      }).then(result => {
        if (result.value) {
          axios
            .delete(this.HOST + "/department/delete/" + id)
            .then(res => {
              let data = res.data;
              if (data[0].status == 200) {
                this.$swal(
                  "Deleted",
                  "You successfully deleted this data",
                  "success"
                );
                this.showFormEdit = false
                this.show = false
                this.loadData();
              } else {
                this.$swal("เกิดข้อผิดพลาด !!!", data[0].msg, "error");
              }
            })
            .catch(error => console.log(error));
        }
      });
    },
    getRowCount(items) {
      return items.length;
    },
    getDepartment() {
      axios
        .get(this.HOST + "/hrd/department")
        .then(res => {
          this.items = res.data;
          let parsed = JSON.stringify(res.data);
          window.localStorage.setItem("department", parsed);
        })
        .catch(error => console.log("Error", error));
    },
    showForm() {
      this.showFormEdit = false
      this.formEdit.depart = ""
      this.formEdit.departId = ""
      return (this.show = true);
    }
  },
  mounted() {
    this.loadData();
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