<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <b-card>
                    <div slot="header">
                        <strong>ข้อมูลขออนุมัตืไปราชการ</strong>
                    </div>
                    <b-row>
                        <b-col sm="12">
                            <template>
                                <div>
                                    <b-form @submit.prevent="onSearch">
                                        <b-form-group>
                                            <b-input-group>
                                                <!-- Attach Left button -->
                                                <b-form-input
                                                    type="text"
                                                    v-model="formSearch.keyword"
                                                    placeholder="Search..."
                                                    class="bold"
                                                ></b-form-input>
                                                <b-input-group-append>
                                                    <b-button variant="primary" type="submit">
                                                        <i class="fa fa-search"></i> ค้นหา
                                                    </b-button>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-form>
                                    <h6 class="bold">ทั้งหมด {{items.length}} รายการ</h6>
                                    <div v-if="items == 0 && formSearch.keyword != ''">
                                        <h5>ไม่มีข้อมูลที่ค้นหา...!</h5>
                                    </div>
                                    <div v-if="formSearch.keyword != ''">
                                        <h6>
                                            คำที่คุณค้นหา -
                                            <b>'{{ formSearch.keyword }}'</b>
                                            - ผลลัพธ์ {{items.length}} รายการ
                                        </h6>
                                    </div>
                                    <div>
                                        <b-table
                                            striped
                                            hover
                                            :items="items"
                                            :fields="fields"
                                            :current-page="currentPage"
                                            :per-page="perPage"
                                        >
                                            <template slot="id" slot-scope="data">
                                                <strong>{{data.item.re_id}}</strong>
                                            </template>
                                            <template slot="created_at" slot-scope="data">
                                                <strong>{{formateDateTH(data.item.created_at)}}</strong>
                                            </template>
                                            <template slot="datemeeting" slot-scope="data">
                                                <b-button variant="light" size="sm">
                                                    <strong>{{formateDate(data.item.datemeeting)}}</strong>
                                                </b-button>
                                            </template>
                                            <template slot="re_id" slot-scope="data">
                                                <!-- <a
                                                    :href="'http://localhost/printreport/main/printreport.php?re_id='+data.item.re_id"
                                                    target="_BLANK"
                                                >
                                                    <img src="img/document.png" alt />
                                                </a> -->
                                                <a
                                                    :href="'http://webapp2.intranet:88/printreport/main/printreport.php?re_id='+data.item.re_id"
                                                    target="_BLANK"
                                                >
                                                    <img src="img/document.png" alt />
                                                </a>
                                            </template>
                                            <template slot="actions" slot-scope="data">
                                                <span
                                                    v-if="data.item.cid_your==data.item.cid_partner"
                                                >
                                                    <b-dropdown variant="link" size="lg" no-caret>
                                                        <template slot="button-content">
                                                            <i class="fa fa-cogs"></i>
                                                            <span class="sr-only">Search</span>
                                                        </template>
                                                        <b-dropdown-item
                                                            v-on:click="editRegister(data.item.cid_your,data.item.re_id)"
                                                        >
                                                            <i class="fa fa-edit"></i> แก้ไข
                                                        </b-dropdown-item>
                                                        <b-dropdown-item
                                                            v-on:click="deleteRegister(data.item.re_id)"
                                                        >
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
import decode from "jwt-decode";
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
    name: "register-all",
    props: {
        caption: {
            type: String,
            default: "ข้อมูลขออนุมัติไปราชการ"
        }
    },
    data() {
        return {
            userLogin: window.localStorage.getItem("user-login"),
            currentPage: 1,
            perPage: 10,
            totalRows: 0,
            formSearch: {
                keyword: ""
            },
            // Note 'isActive' is left out and will not appear in the rendered table
            fields: [
                {
                    key: "id",
                    label: "เลขที่",
                    sortable: true
                },
                {
                    key: "created_at",
                    label: "วันที่บันทึก",
                    sortable: true
                },
                {
                    key: "meeting_type_name",
                    label: "ประเภท",
                    sortable: true
                },
                {
                    key: "meeting_story",
                    label: "เรื่อง",
                    sortable: true
                },
                {
                    key: "datemeeting",
                    label: "ระหว่างวันที่ - ถึงวันที่",
                    sortable: true
                },
                {
                    key: "re_id",
                    label: "PDF",
                    sortable: true
                },
                {
                    key: "actions",
                    label: "จัดการ",
                    sortable: false
                }
            ],
            items: []
        };
    },
    methods: {
        decoded() {
            let decoded = decode(this.userLogin);
            return decoded;
        },
        loadData() {
            let idcard = this.decoded().data[0].idcard;
            axios
                .get(this.HOST + "/hrd/" + idcard)
                .then(res => {
                    this.items = res.data;
                    //console.log(this.items);

                    window.localStorage.removeItem("update");
                    window.localStorage.removeItem("meeting_register");
                    window.localStorage.removeItem("meeting_register_partner");
                })
                .catch(error => console.log(error));
        },
        onSearch(evt) {
            // let decoded = decode(this.userLogin);
            let idcard = this.decoded().data[0].idcard;
            axios
                .post(this.HOST + "/hrd/search", {
                    keyword: this.formSearch.keyword,
                    idcard: idcard
                })
                .then(res => {
                    let data = res.data;
                    this.items = data;
                })
                .catch(error => console.log("Error :", error));
            evt.preventDefault();
        },
        editRegister(cid, re_id) {
            let data = [
                {
                    cid,
                    re_id
                }
            ];
            localStorage.setItem("update", JSON.stringify(data));
            let dataUpdate = JSON.parse(localStorage.getItem("update"));
            axios
                .get(
                    this.HOST +
                        "/hrd/view/" +
                        dataUpdate[0].cid +
                        "/" +
                        dataUpdate[0].re_id
                )
                .then(res => {
                    let parsed = JSON.stringify(res.data);
                    localStorage.setItem("meeting_register", parsed);
                    setTimeout(() => {
                        this.$router.push("/services/register-edit");
                    }, 1000);
                })
                .catch(error => console.log("Error", error));
        },
        deleteRegister(id) {
            this.$swal({
                title: "คุณต้องการลบข้อมูลหรือไม่ ?",
                text: "ยืนยันการลบข้อมูลขอไปราชการ",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                showCloseButton: true
            }).then(result => {
                if (result.value) {
                    axios
                        .delete(this.HOST + "/hrd/delete/" + id)
                        .then(res => {
                            let data = res.data;
                            if (data[0].status == 200) {
                                this.$swal(
                                    "Deleted",
                                    "You successfully deleted this data",
                                    "success"
                                );
                                this.loadData();
                                this.getHRDPlan();
                            } else {
                                this.$swal(
                                    "เกิดข้อผิดพลาด !!!",
                                    data[0].msg,
                                    "error"
                                );
                            }
                        })
                        .catch(error => console.log(error));
                }
            });
        },
        getRowCount(items) {
            return items.length;
        },
        formateDateTH(dateTime) {
            let newdate = dateTime.split(",");
            let date_1 = newdate[0].split("-");
            let day_1 = date_1[2].split(" ");
            let day_num = day_1[0];
            let time_1 = day_1[1].split(":");
            let timer = `${time_1[0]}:${time_1[1]}`;
            let year_1 = parseInt(date_1[0]) + 543;
            let createdDate =
                day_num +
                " " +
                thmonthShort[date_1[1]] +
                " " +
                year_1 +
                " " +
                timer;
            return `${createdDate}`;
        },
        formateDate(dateTime) {
            let newdate = dateTime.split(",");
            let date_1 = newdate[0].split("-");
            let date_2 = newdate[1].split("-");
            let year_1 = parseInt(date_1[0]) + 543;
            let year_2 = parseInt(date_2[0]) + 543;
            let startDate =
                date_1[2] + " " + thmonthShort[date_1[1]] + " " + year_1;
            let endDate =
                date_2[2] + " " + thmonthShort[date_2[1]] + " " + year_2;
            return `${startDate} - ${endDate}`;
        },
        getHRDPlan() {
            axios
                .post(this.HOST + "/hrd/hrdplan", {
                    year: 2563,
                    dep: this.decoded().data[0].dep_name
                })
                .then(res => {
                    window.localStorage.setItem(
                        "hrdplan",
                        JSON.stringify(res.data.data)
                    );
                })
                .catch(error => console.log("Error", error));
        }
    },
    mounted() {
        this.loadData();
        this.getHRDPlan();
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
</style>