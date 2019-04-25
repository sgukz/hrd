<template>
  <b-row>
    <b-col cols="12" xl="6">
      
      <transition name="slide">
        <b-card :header="caption">
          <b-form-group>
            <b-input-group>
              <!-- Attach Left button -->
              <b-button size="lg" variant="primary" v-on:click="updateMember" block><i class="icon-refresh"></i> อัพเดทรายชื่อ</b-button>
            </b-input-group>
          </b-form-group>
          <b-table
            :hover="hover"
            :striped="striped"
            :bordered="bordered"
            :small="small"
            responsive="sm"
            :items="results"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
          >
            <template slot="idcard" slot-scope="data">
              <strong>{{data.item.idcard}}</strong>
            </template>
            <template slot="fullname" slot-scope="data">
              <strong>{{data.item.fullname}}</strong>
            </template>
            <template slot="is_expire" slot-scope="data">
              <b-badge :variant="getBadge(data.item.is_expire)">
                <div v-if="data.item.is_expire == 'N'">Active</div>
                <div v-else>Expire</div>
              </b-badge>
            </template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(results)"
              :per-page="perPage"
              v-model="currentPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
            />
          </nav>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";
import { error } from "util";
export default {
  name: "users",
  props: {
    caption: {
      type: String,
      default: "ข้อมูลผู้ใช้งาน"
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      results: JSON.parse(window.localStorage.getItem('rehuser')),
      fields: [
        { key: "idcard" , label: "เลขบัตรประชาชน", sortable: true},
        { key: "fullname" , label: "ชื่่อ-สกุล", sortable: true},
        { key: "is_expire" , label: "สถานะ", sortable: false}
      ],
      currentPage: 1,
      perPage: 20,
      totalRows: 0
    };
  },
  computed: {},
  methods: {
    getRowCount(results) {
      return results.length;
    },
    getBadge(status) {
      return status === "N" ? "success" : status === "Y" ? "danger" : "";
    },
    updateMember(){
      axios
      .get(this.HOST+"/hrd/personal")
      .then(res => {
        let data = res.data
          if(data[0].status == 200){
            this.$swal({
              position: 'top-end',
              type: 'success',
              title: 'Update complete',
              showConfirmButton: false,
              timer: 1500
            })
          }
      })
      .catch(error => console.log("Error", error));
    }
  },
  mounted() {
  }
};

</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
