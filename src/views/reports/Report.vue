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
                                            <p style="color: #f86c6b;" v-if="this.isInvalid">
                                                <small>กรุณาเลือกชื่อที่ต้องการค้นหารายงาน</small>
                                            </p>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="4">
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
                                                variant="success"
                                                size="md"
                                                aria-pressed="true"
                                                class="bold"
                                                type="submit"
                                            >
                                                <i class="icon-magnifier"></i> ค้นหา
                                            </b-button>
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
                                                type="button"
                                                v-on:click="onExport"
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
                        <b-col v-if="this.show" sm="12">
                            <div ref="myData">
                                <div id="show-data">
                                    <h6
                                        class="head-report"
                                    >รายงานการประชุม/สัมมนา/อบรม {{(this.form.place==1)? "(ภายใน)" : ""}} {{(this.form.place==2)? "(ภายนอก)" : ""}} ของ {{this.form.person.fullname}}</h6>
                                    <h6 class="head-report">ปีงบประมาณ {{this.getFiscalYear()}}</h6>
                                    <h6 class="head-report">วันที่รายงาน: {{this.getToDay()}}</h6>
                                    <hr />
                                    <table class="table b-table">
                                        <thead>
                                            <tr role="row">
                                                <th
                                                    role="columnheader"
                                                    class="head-th"
                                                    width="5%"
                                                >ลำดับ</th>
                                                <th
                                                    role="columnheader"
                                                    class="head-th"
                                                    width="25%"
                                                >เรื่อง</th>
                                                <th
                                                    role="columnheader"
                                                    class="head-th"
                                                    width="10%"
                                                >วันที่เริ่ม</th>
                                                <th
                                                    role="columnheader"
                                                    class="head-th"
                                                    width="10%"
                                                >ถึงวันที่</th>
                                                <th
                                                    role="columnheader"
                                                    class="head-th"
                                                    width="15%"
                                                >ผู้จัด</th>
                                                <th
                                                    role="columnheader"
                                                    class="head-th"
                                                    width="15%"
                                                >สถานที่จัด</th>
                                                <th
                                                    role="columnheader"
                                                    class="head-th"
                                                    width
                                                >ค่าใช้จ่าย</th>
                                                <th role="columnheader" class="head-th" width>เครดิต</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                role="row"
                                                v-for="(val, key) in items"
                                                v-bind:key="key"
                                            >
                                                <td class="first-chid">{{val.order}}</td>
                                                <td>{{val.meeting_story}}</td>
                                                <td
                                                    class="datetime"
                                                >{{formateDateTH(val.start_date)}}</td>
                                                <td class="datetime">{{formateDateTH(val.end_date)}}</td>
                                                <td>{{val.meeting_host}}</td>
                                                <td>{{val.meeting_place}}</td>
                                                <td class="price">{{formatPrice(val.expense_total)}}</td>
                                                <td class="credit">0.00</td>
                                            </tr>
                                            <tr role="row">
                                                <td colspan="8">
                                                    <p
                                                        style="text-align:right;margin-right:50px;"
                                                    >รวม&nbsp;&nbsp;&nbsp;&nbsp; {{formatPrice(total)}}&nbsp;&nbsp;&nbsp;&nbsp;บาท</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import axios from "axios";
import XLSX from "xlsx";
import jsPDF from "jspdf";
// import 'jspdf-autotable';
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
let thmonth = {
    "01": "มกราคม",
    "02": "กุมภาพันธ์",
    "03": "มีนาคม",
    "04": "เมษายน",
    "05": "พฤษภาคม",
    "06": "มิถุนายน",
    "07": "กรกฎาคม",
    "08": "สิงหาคม",
    "09": "กันยายน",
    "10": "ตุลาคม",
    "11": "พฤศจิกายน",
    "12": "ธันวาคม"
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
            isInvalid: false,
            show: false,
            items: [],
            total: 0
        };
    },
    methods: {
        onSubmit(evt) {
            const idcard = this.form.person.idcard;
            //console.log(this.form.person);
            const place = this.form.place;
            if (idcard !== undefined) {
                axios
                    .post(this.HOST + "/hrd/report/person", {
                        idcard: idcard,
                        place: place
                    })
                    .then(res => {
                        let data = res.data;
                        //console.log(data);

                        this.items = data.data;
                        let totals = 0;
                        for (var i = 0; i < this.items.length; i++) {
                            totals = totals + this.items[i].expense_total;
                        }
                        this.total = totals;
                        this.show = true;
                        this.isInvalid = false;
                    })
                    .catch(error => console.log("Error :", error));
            } else {
                this.isInvalid = true;
            }
            evt.preventDefault();
        },
        getFiscalYear() {
            const toTwoDigits = num => (num < 10 ? "0" + num : num);
            let today = new Date();
            let year = today.getFullYear();
            let month = toTwoDigits(today.getMonth() + 1);
            let day = toTwoDigits(today.getDate());
            let dateNow = new Date(year, month - 1, day, 0, 0, 0);
            let nowFiscalYear = new Date(year, 9, 1, 0, 0, 0);
            let newFiscalYear = new Date(year + 1, 8, 30, 0, 0, 0);
            let fiscalYear = 0;
            if (dateNow >= nowFiscalYear && dateNow < newFiscalYear) {
                fiscalYear = year + 1 + 543;
            } else {
                fiscalYear = year + 543;
            }
            return `${fiscalYear}`;
        },
        getToDay() {
            const toTwoDigits = num => (num < 10 ? "0" + num : num);
            let today = new Date();
            let year = today.getFullYear() + 543;
            let month = thmonth[toTwoDigits(today.getMonth() + 1)];
            let day = today.getDate();

            return `${day} ${month} ${year}`;
        },
        onExport() {
            const pdf = jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4",
                putOnlyUsedFonts: true
            });
            pdf.text('รายงานการประชุม/สัมมนา/อบรม ของ นายปัสธร หวานอารมย์', 15, 15)
            pdf.save('two-by-four.pdf')
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
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '/dist/js/jspdf.customfonts.min.js')
        document.head.appendChild(recaptchaScript)
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
.bold {
    font-weight: bold;
}
</style>