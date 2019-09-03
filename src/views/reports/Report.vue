<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>รายงานการอบรม / ประชุม / สัมนารายบุคคล</strong>
          </div>
          <b-row>
            <b-col sm="12">
              <b-form @submit.prevent="onSubmit">
                <b-row>
                  <b-col sm="4">
                    <b-form-group>
                      <v-select
                        v-model="form.person"
                        placeholder="รายชื่อ"
                        label="fullname"
                        :options="employee"
                      ></v-select>
                    </b-form-group>
                  </b-col>
                  <b-col sm="3">
                    <b-form-group
                      label-class="text-sm-right"
                      label="ประเภท"
                      :label-cols="2"
                      label-for="meeting_place_type"
                    >
                      <b-form-select v-model="form.place">
                        <option value disabled>ประเภทการประชุม</option>
                        <option :value="1">ในเขตจังหวัด</option>
                        <option :value="2">นอกเขตจังหวัด</option>
                        <option :value="0">รวม</option>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col sm="2">
                    <b-form-group>
                      <b-button
                        pressed
                        block
                        variant="primary"
                        size="md"
                        aria-pressed="true"
                        class="bold"
                        type="submit"
                      >
                        <i class="icon-printer"></i> พิมพ์รายงาน
                      </b-button>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-table :items="items" :fields="fields">
                <template slot="order" slot-scope="data">
                  <strong>{{data.item.order}}</strong>
                </template>
                <template slot="meeting_story" slot-scope="data">
                  <strong>{{data.item.meeting_story}}</strong>
                </template>
                <template slot="start_date" slot-scope="data">
                  <strong>{{formateDateTH(data.item.start_date)}}</strong>
                </template>
                <template slot="end_date" slot-scope="data">
                  <strong>{{formateDateTH(data.item.end_date)}}</strong>
                </template>
                <template slot="expense_total" slot-scope="data">
                  <strong>{{formatPrice(data.item.expense_total)}}</strong>
                </template>
              </b-table>
              <p style="text-align:right;margin-right:50px;"><strong>รวม&nbsp;&nbsp;&nbsp;&nbsp; {{formatPrice(total)}}&nbsp;&nbsp;&nbsp;&nbsp;บาท</strong></p>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
//import 'jspdf-autotable';
let thmonthShort = {
  "01": "ม.ค.",
  "02": "ก.พ.",
  "03": "มี.ค.",
  "04": "เม.ย.",
  "05": "พ.ค.",
  "06": "มิ.ย.",
  "07": "ก.ค.",
  "08": "ส.ค.",
  "09": "ก.ย.",
  "10": "ต.ค",
  "11": "พ.ย.",
  "12": "ธ.ค."
};
export default {
  name: "report",
  props: {
    value: String
  },
  data() {
    return {
      userLogin: window.localStorage.getItem("user-login"),
      employee: JSON.parse(window.localStorage.getItem("rehuser")),
      form: {
        person: "",
        place: ""
      },
      items: [],
      fields: [
        {
          key: "order",
          label: "ลำดับ"
        },
        {
          key: "meeting_story",
          label: "เรื่อง"
        },
        {
          key: "start_date",
          label: "วันทีเริ่ม"
        },
        {
          key: "end_date",
          label: "ถึงวันที่"
        },
        {
          key: "meeting_place",
          label: "สถานที่จัด"
        },
        {
          key: "expense_total",
          label: "ค่าใช้จ่าย"
        }
      ],
      total: 0
    };
  },
  methods: {
    onSubmit(evt) {
      const idcard = this.form.person.idcard;
      const place = this.form.place;
      const doc = new jsPDF();
      axios
        .post(this.HOST + "/report/person", {
          idcard: idcard,
          place: place
        })
        .then(res => {
          let data = res.data;
          this.items = data;
          let totals = 0
          for(var i=0;i<this.items.length;i++){
            totals = totals + this.items[i].expense_total;
          }
          this.total = totals
          // console.log(JSON.stringify(data));
          // doc.text("Hello World", 10, 10);
          // doc.save(idcard + ".pdf");
        })
        .catch(error => console.log("Error :", error));
      evt.preventDefault();
    },
    formateDateTH(dateTime) {
      let newdate = dateTime.split(",");
      let date1 = newdate[0].split("-");
      let day1 = date1[2];
      let year1 = parseInt(date1[0]) + 543;
      let month1 = thmonthShort[date1[1]];
      let createdDate = day1 + " " + month1 + " " + year1;
      return `${createdDate}`;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  mounted() {}
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
.bold {
  font-weight: bold;
}
</style>