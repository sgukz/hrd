<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>ขออนุมัติไปราชการ</strong>
          </div>
          <b-form @submit.prevent="onSubmit" v-if="show">
            <b-card-body>
              <b-row>
                <b-col sm="4">
                  <b-form-group
                    label="วันที่"
                    label-class="text-sm-right"
                    label-for="re_date"
                    :horizontal="true"
                  >
                    <b-form-input
                      type="text"
                      id="re_date"
                      name="re_date"
                      placeholder
                      :value="getDate()"
                      :readonly="true"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group
                    label="โทรศัพท์"
                    label-class="text-sm-right"
                    label-for="phone"
                    :horizontal="true"
                  >
                    <b-form-input
                      type="text"
                      v-model="form.phone"
                      id="phone"
                      name="phone"
                      placeholder=""
                      :required="true"
                      autofocus
                    ></b-form-input>
                  </b-form-group>
                  <!-- required -->
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <b-form-group
                    label="ชื่อ-สกุล"
                    label-class="text-sm-right"
                    label-for="partnerlist"
                    :horizontal="true"
                  >
                    <b-form-input
                      type="text"
                      v-model="full_name"
                      id="partnerlist[]"
                      name="partnerlist[]"
                      placeholder="ชื่อ-สกุล"
                      :disabled="true"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group
                    label="หน่วยงาน"
                    label-class="text-sm-right"
                    label-for="partnerdepart"
                    :horizontal="true"
                  >
                  <b-form-input type="text" :disabled="true" v-model="depart"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group
                    label="เดินทางโดย"
                    label-class="text-sm-right"
                    label-for="travel_type"
                    :horizontal="true"
                  >
                  <v-select v-model="travel_type" :required="true" placeholder="เลือกการเดินทาง" label="travel_name" :options="travel"></v-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <b-form-group
                    label="พร้อมด้วย"
                    label-class="text-sm-right"
                    label-for="partner"
                    :horizontal="true"
                  >
                  <v-select v-model="partner_name" placeholder="เลือกรายชื่อ" label="fullname" :options="employee"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group
                    label="หน่วยงาน"
                    label-class="text-sm-right"
                    label-for="department_partner"
                    :horizontal="true"
                  >
                  <v-select v-model="partner_dep" placeholder="เลือกหน่วยงาน" label="dep_code_name" :options="department"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="3">
                  <b-form-group
                    label="เดินทางโดย"
                    label-class="text-sm-right"
                    label-for="travel_by"
                    :horizontal="true"
                  >
                  <v-select v-model="partner_travel" placeholder="เลือกการเดินทาง" label="travel_name" :options="travel"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="1">
                  <b-form-group>
                    <b-button pressed block variant="primary" size="sm" aria-pressed="true" v-on:click="addPerson()" name="addPerson">
                      <i class="fa fa-plus" aria-pressed="true" ></i> เพิ่ม
                    </b-button>
                  </b-form-group>
                </b-col>
              </b-row>
              <p v-if="noPartner"></p>
              <div v-for="(person, key) in person_partner" v-bind:key="key" v-else>
                <div v-if="person.id != 1">
                  <b-row>
                    <b-col sm="4">
                      <b-form-group
                        label=""
                        label-class="text-sm-right"
                        label-for="partnerlist"
                        :horizontal="true"
                      >
                      <b-form-input type="text" :disabled="true" :value="person.fullname"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group
                        label="หน่วยงาน"
                        label-class="text-sm-right"
                        label-for="partnerdepart"
                        :horizontal="true"
                      >
                      <b-form-input type="text" :disabled="true" :value="person.dep"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="3">
                      <b-form-group
                        label="เดินทางโดย"
                        label-class="text-sm-right"
                        label-for="travel_type"
                        :horizontal="true"
                      >
                      <b-form-input type="text" :disabled="true" :value="person.travel"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="1">
                      <b-form-group>
                        <b-button variant="danger" size="sm" aria-pressed="true" name="deletePerson" v-on:click="deletePerson(key)">
                          <i class="fa fa-trash" aria-pressed="true" ></i>
                        </b-button>
                      </b-form-group>
                    </b-col>
                  </b-row>              
                </div>
              </div>

              <b-row>
                <b-col sm="12">
                  <b-progress height="{}" class="progress-xs my-3" variant="success" :value="100"/>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="4">
                  <b-form-group
                    label="เลขที่รับ รพ ร้อยเอ็ด"
                    label-class="text-sm-right"
                    label-for="register-book-hos-id"
                    :horizontal="true"
                  >
                    <b-form-input v-model="form.book_hos_id" type="text" id="book_hos_id" name="book_hos_id"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="2">
                  <b-form-group  :horizontal="true">
                    <b-form-select v-model="form.book_hos_year">
                      <option value="" selected disabled>ปี พ.ศ.</option>
                      <option
                        v-for="(year, key) in arrayYear"
                        v-bind:key="key"
                        :value="year.year"
                      >{{year.year}}</option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group :horizontal="true">
                    <b-form-checkbox-group id="basicInlineCustomCheckboxes">
                      <div class="custom-control custom-checkbox custom-control-inline">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="no_id"
                          name="no_id"
                          value="1"
                        >
                        <label
                          class="custom-control-label"
                          for="no_id"
                        >ไม่มีเลขทะเบียนรับ รพ. (ไม่ผ่านธุรการกลาง)</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="ลงวันที่"
                    :label-cols="2"
                    label-for="book_owner_date"
                    :horizontal="true"
                  >
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>
                          <i class="fa fa-calendar"></i>
                        </b-input-group-text>
                      </b-input-group-prepend>
                      <datepicker
                        placeholder="เลือกวันที่"
                        :bootstrap-styling="true"
                        :language="th"
                        v-model="form.book_owner_date"
                        sm="6"
                        :required="true"
                      ></datepicker>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="หนังสือที่"
                    :label-cols="2"
                    label-for="book_owner"
                    :horizontal="true"
                    
                  >
                    <b-form-input
                      type="text"
                      v-model="form.book_owner"
                      id="book_owner"
                      name="book_owner"
                      
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="12">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เรื่อง"
                    :label-cols="1"
                    label-for="meeting_story"
                    :horizontal="true"
                  >
                    <b-form-input
                      type="text"
                      v-model="form.meeting_story"
                      id="meeting_story"
                      name="meeting_story"
                      :required="true"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="ของ"
                    :label-cols="2"
                    label-for="meeting_owner"
                    :horizontal="true"
                  >
                    <b-form-input
                      type="text"
                      v-model="form.meeting_owner"
                      id="meeting_owner"
                      name="meeting_owner"
                      :required="true"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="หน่วยงานผู้จัด"
                    :label-cols="2"
                    label-for="meeting_host"
                    :horizontal="true"
                  >
                    <b-form-input
                      type="text"
                      v-model="form.meeting_host"
                      id="meeting_host"
                      name="meeting_host"
                      :required="true"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="ประสงค์ที่จะเข้า"
                    :label-cols="2"
                    label-for="meeting_type"
                    :horizontal="true"
                  >
                    <b-form-select
                      v-model="form.meeting_type"
                      id="meeting_type"
                      name="meeting_type"
                      :required="true"
                    >
                      <option value="" disabled>เลือกประเภทการประชุม</option>
                      <option
                        v-for="(m_type, key) in meetingType"
                        v-bind:key="key"
                        :value="m_type.meeting_type_code"
                      >{{m_type.meeting_type_name}}</option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="ระหว่างวันที่"
                    :label-cols="2"
                    label-for="meeting_date"
                    :horizontal="true"
                  >
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>
                          <i class="fa fa-calendar"></i>
                        </b-input-group-text>
                      </b-input-group-prepend>
                      <datepicker
                        :disabledDates="disabledFn"
                        placeholder="เลือกวันที่"
                        :bootstrap-styling="true"
                        :language="th"
                        v-model="form.start_date"
                        :required="true"
                      ></datepicker> &nbsp;ถึง&nbsp;
                      <datepicker
                        :disabledDates="disabledFn"
                        placeholder="เลือกวันที่"
                        :bootstrap-styling="true"
                        :language="th"
                        v-model="form.end_date"
                        :required="true"
                        
                      ></datepicker>
                      
                    </b-input-group>
                    <!-- <b-form-input type="text" id="meeting_date" name="meeting_date" placeholder></b-form-input> -->
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="สถานที่"
                    :label-cols="2"
                    label-for="meeting_place"
                    :horizontal="true"
                  >
                    <b-form-input
                      type="text"
                      v-model="form.meeting_place"
                      :required="true"      
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="ประเภท"
                    :label-cols="2"
                    label-for="meeting_place_type"
                    :horizontal="true"
                  >
                    <b-form-select v-model="form.meeting_place_type" :required="true">
                      <option value="" disabled>เลือกประเภทการประชุม</option>
                      <option :value="1">ในเขตจังหวัด</option>
                      <option :value="2">นอกเขตจังหวัด</option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="ออกเดินทางวันที่"
                    :label-cols="2"
                    label-for="start_travel"
                    :horizontal="true"
                  >
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>
                          <i class="fa fa-calendar"></i>
                        </b-input-group-text>
                      </b-input-group-prepend>
                      <datepicker
                        :disabledDates="disabledFn"
                        placeholder="เลือกวันที่"
                        :bootstrap-styling="true"
                        :language="th"
                        v-model="form.start_travel"
                        :required="true"
                        
                      ></datepicker>                      
                    </b-input-group>                    
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="วันที่เดินทางกลับ"
                    :label-cols="2"
                    label-for="end_travel"
                    :horizontal="true"
                  >
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>
                          <i class="fa fa-calendar"></i>
                        </b-input-group-text>
                      </b-input-group-prepend>
                      <datepicker
                        :disabledDates="disabledFn"
                        placeholder="เลือกวันที่"
                        :bootstrap-styling="true"
                        :language="th"
                        v-model="form.end_travel"
                        :required="true"                        
                      ></datepicker>
                    </b-input-group>
                    <!-- <b-form-input type="text" id="meeting_date" name="meeting_date" placeholder></b-form-input> -->
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="ตอบสนองประเด็นยุทธศาสตร์"
                    :label-cols="2"
                    label-for="strategy"
                    :horizontal="true"
                  >
                    <b-form-select v-model="form.strategy" :required="true" >
                      <option value="" disabled>เลือกประเด็นยุทธศาสตร์</option>
                      <option
                        v-for="(str,key) in meetingStrategy"
                        v-bind:key="key"
                        :value="str.strategy_code"
                      >{{str.strategy_name}}</option>
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เป็นการประชุม"
                    :label-cols="2"
                    label-for="meeting_is"
                    :horizontal="true"
                  >
                    <b-form-select v-model="form.meeting_is" :required="true" >
                      <option value="" disabled>เลือกประเภทการประชุม</option>
                      <option
                        v-for="(m_is, key) in meetingIs"
                        v-bind:key="key"
                        :value="m_is.meeting_is_code"
                      >{{m_is.meeting_is_name}}</option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="4">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เบิกจากงบประมาณ"
                    :label-cols="3"
                    label-for="budget_type"
                    :horizontal="true"
                  >
                    <b-form-select v-model="form.budget_type" :required="true" >
                      <option value="" disabled>เลือกประเภทงบประมาณจัดสรร</option>
                      <option
                        v-for="(m_budget, key) in meetingBudget"
                        v-bind:key="key.budget_code"
                        :value="m_budget.budget_code"
                      >{{m_budget.budget_name}}</option>
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col sm="8">
                  <b-form-group
                    label-class="text-sm-right"
                    label
                    :label-cols="1"
                    label-for="budget_other"
                    :horizontal="true"
                  >
                    <b-form-input
                      type="text"
                      v-model="form.budget_other"                      
                      placeholder
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12">
                  <b-form-group
                    label-class="text-sm-right"
                    :label-cols="1"
                    label="ประเมินค่าใช้จ่าย"
                    :horizontal="true"
                  >
                    <b-form-checkbox-group id>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          v-model="form.travel_government_car"
                          class="custom-control-input"
                          id="travel_government_car"
                          name="travel_government_car"
                          value="1"
                        >
                        <label class="custom-control-label" for="travel_government_car">รถยนต์ราชการ</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group label-class="text-sm-right" :label-cols="2" :horizontal="true">
                    <b-form-checkbox-group id>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          v-model="form.travel_bus"
                          class="custom-control-input"
                          id="travel_bus"
                          name="travel_bus"
                          value="1"
                        >
                        <label class="custom-control-label" for="travel_bus">รถประจำทาง</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เป็นเงิน (บาท)"
                    :label-cols="4"
                    label-for="expense_bus"
                    :horizontal="true"
                  >
                    <div class="col-sm-6">
                      <b-form-input
                        type="number"
                        v-model="form.expense_bus"
                        id="expense_bus"
                        name="expense_bus"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group label-class="text-sm-right" :label-cols="2" :horizontal="true">
                    <b-form-checkbox-group id>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          v-model="form.travel_fuel"
                          class="custom-control-input"
                          id="travel_fuel"
                          name="travel_fuel"
                          value="1"
                        >
                        <label
                          class="custom-control-label"
                          for="travel_fuel"
                        >ค่ายานพาหนะ/เชื้อเพลิง (แท็กซี่/รถโดยสาร)</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เป็นเงิน (บาท)"
                    :label-cols="4"
                    label-for="expense_fuel"
                    :horizontal="true"
                  >
                    <div class="col-sm-6">
                      <b-form-input
                        type="number"
                        v-model="form.expense_fuel"
                        id="expense_fuel"
                        name="expense_fuel"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group label-class="text-sm-right" :label-cols="2" :horizontal="true">
                    <b-form-checkbox-group id>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          v-model="form.travel_airplane"
                          class="custom-control-input"
                          id="travel_airplane"
                          name="travel_airplane"
                          value="1"
                        >
                        <label class="custom-control-label" for="travel_airplane">เครื่องบิน</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เป็นเงิน (บาท)"
                    :label-cols="4"
                    label-for="expense_airplane"
                    :horizontal="true"
                  >
                    <div class="col-sm-6">
                      <b-form-input
                        type="number"
                        v-model="form.expense_airplane"
                        id="expense_airplane"
                        name="expense_airplane"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <b-form-group label-class="text-sm-right" :label-cols="4" :horizontal="true">
                    <b-form-checkbox-group id>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          v-model="form.travel_owncar"
                          class="custom-control-input"
                          id="travel_owncar"
                          name="travel_owncar"
                          value="1"
                        >
                        <label class="custom-control-label" for="travel_owncar">รถยนต์ส่วนตัว</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="3">
                  <b-form-group
                    label="ทะเบียน"
                    :label-cols="4"
                    label-for="register_owncar"
                    :horizontal="true"
                  >
                    <div class="col-sm-12">
                      <b-form-input
                        type="text"
                        v-model="form.register_owncar"
                        id="register_owncar"
                        name="register_owncar"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
                <b-col sm="3">
                  <b-form-group
                    label="ระยะทางไปกลับ (กม.)"
                    :label-cols="4"
                    label-for="distance"
                    :horizontal="true"
                  >
                    <div class="col-sm-12">
                      <b-form-input
                        type="text"
                        v-model="form.distance"
                        sm
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
                <b-col sm="3">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เป็นเงิน (บาท)"
                    :label-cols="3"
                    label-for="expense_owncar"
                    :horizontal="true"
                  >
                    <div class="col-sm-12">
                      <b-form-input
                        type="number"
                        v-model="form.expense_owncar"
                        id="expense_owncar"
                        name="expense_owncar"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="3">
                  <b-form-group label-class="text-sm-right" :label-cols="4" :horizontal="true">
                    <b-form-checkbox-group id>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          v-model="form.residence"
                          class="custom-control-input"
                          id="residence"
                          name="residence"
                          value="1"
                        >
                        <label class="custom-control-label" for="residence">ค่าที่พัก</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="3">
                  <b-form-group
                    label="จำนวน (คืน)"
                    :label-cols="4"
                    label-for="residence_num"
                    :horizontal="true"
                  >
                    <div class="col-sm-12">
                      <b-form-input
                        type="number"
                        v-model="form.residence_num"
                        id="residence_num"
                        name="residence_num"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เป็นเงิน (บาท)"
                    :label-cols="4"
                    label-for="expense_residence"
                    :horizontal="true"
                  >
                    <div class="col-sm-6">
                      <b-form-input
                        type="number"
                        v-model="form.expense_residence"
                        id="expense_residence"
                        name="expense_residence"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group label-class="text-sm-right" :label-cols="2" :horizontal="true">
                    <b-form-checkbox-group id>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          v-model="form.register_meeting"
                          class="custom-control-input"
                          id="register_meeting"
                          name="register_meeting"
                          value="1"
                        >
                        <label class="custom-control-label" for="register_meeting">ค่าลงทะเบียน</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เป็นเงิน (บาท)"
                    :label-cols="4"
                    label-for="expense_register_meeting"
                    :horizontal="true"
                  >
                    <div class="col-sm-6">
                      <b-form-input
                        type="number"
                        v-model="form.expense_register_meeting"
                        id="expense_register_meeting"
                        name="expense_register_meeting"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group label-class="text-sm-right" :label-cols="2" :horizontal="true">
                    <b-form-checkbox-group id>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          v-model="form.allowance"
                          class="custom-control-input"
                          id="allowance"
                          name="allowance"
                          value="1"
                        >
                        <label class="custom-control-label" for="allowance">ค่าเบี้ยเลี้ยง</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เป็นเงิน (บาท)"
                    :label-cols="4"
                    label-for="expense_allowance"
                    :horizontal="true"
                  >
                    <div class="col-sm-6">
                      <b-form-input
                        type="number"
                        v-model="form.expense_allowance"
                        id="expense_allowance"
                        name="expense_allowance"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="2">
                  <b-form-group label-class="text-sm-right" :label-cols="6" :horizontal="true">
                    <b-form-checkbox-group id>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          v-model="form.others"
                          class="custom-control-input"
                          id="others"
                          name="others"
                          value="1"
                        >
                        <label class="custom-control-label" for="others">อื่นๆ</label>
                      </div>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group label-for="others_detail" :horizontal="true">
                    <div class="col-sm-12">
                      <b-form-input
                        type="text"
                        v-model="form.others_detail"
                        id="others_detail"
                        name="others_detail"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label-class="text-sm-right"
                    label="เป็นเงิน (บาท)"
                    :label-cols="4"
                    label-for="expense_other"
                    :horizontal="true"
                  >
                    <div class="col-sm-6">
                      <b-form-input
                        type="number"
                        v-model="form.expense_other"
                        id="expense_other"
                        name="expense_other"
                        placeholder
                      ></b-form-input>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card-body>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary">
                <i class="fa fa-save"></i> บันทึก
              </b-button>&nbsp;&nbsp;
              <b-button type="reset" size="sm" variant="danger">
                <i class="fa fa-ban"></i> ยกเลิก
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import { th } from "vuejs-datepicker/dist/locale";
import MeetingType from "./data/MeetingType";
import MeetingTravel from "./data/MeetingTravel";
import MeetingIs from "./data/MeetingIs";
import MeetingStrategy from "./data/MeetingStrategy";
import MeetingBudget from "./data/MeetingBudget";

const toTwoDigits = num => (num < 10 ? "0" + num : num);
let today = new Date();
let year = today.getFullYear();
let year_TH = parseInt(today.getFullYear())+543;
let month = toTwoDigits(today.getMonth() + 1);
let day = toTwoDigits(today.getDate());
let ToDay = today.getDate();
let date_now = `${year}-${month}-${day}`;

export default {
  name: "register-add",
  components: {
    Datepicker
  },
  props: {
    value: String
  },
  data() {
    return {
      userLogin: JSON.parse(window.sessionStorage.getItem('user-login')),
      full_name: "",
      depart: "",
      travel_type: null,
      department: JSON.parse(window.sessionStorage.getItem('department')),
      employee: JSON.parse(window.sessionStorage.getItem('rehuser')),
      travel: MeetingTravel,
      meetingType: MeetingType,
      meetingIs: MeetingIs,
      meetingStrategy: MeetingStrategy,
      meetingBudget: MeetingBudget,
      arrayYear:[
        {year:year_TH-1},
        {year:year_TH},
        {year:year_TH+1},
      ],
      selected: null,
      form: {
        re_date: date_now,
        phone: "",
        meeting_type: "",
        meeting_story: "",
        start_date: "",
        end_date: "",
        meeting_place: "",
        meeting_place_type: "",
        meeting_host: "",
        start_travel: "",
        end_travel: "",
        strategy: "",
        meeting_is: "",
        meeting_owner: "",
        book_owner: "",
        book_owner_date: "",
        book_hos_id: "",
        book_hos_year:"",
        budget_type: "",
        budget_other: "",
        travel_government_car: "",
        travel_bus: "",
        expense_bus: 0,
        travel_fuel: "",
        expense_fuel: 0,
        travel_airplane: "",
        expense_airplane: 0,
        travel_owncar: "",
        register_owncar: "",
        expense_owncar: 0,
        distance: 0,
        residence: "",
        residence_num: 0,
        expense_residence: 0,
        register_meeting: "",
        expense_register_meeting: 0,
        allowance: "",
        expense_allowance: 0,
        others: "",
        others_detail: "",
        expense_other: 0,
        expense_total: 0,
        cid_account: "",
        cid_account_recoder: "",
      },
      partner_name: null,
      partner_dep: null,
      partner_travel: null,
      person_partner: [{
        id: 1, 
        re_date: date_now, 
        fullname: "", 
        dep: "", 
        travel: null ,
        recoder: ""
      }],
      th: th,
      show: true,
      disabledDates: {},
      disabledFn: {
        customPredictor(date) {
          if (date.getDate() < ToDay) {
            return true;
          }
        }
      },
      highlightedFn: {
        customPredictor(date) {
          if (date.getDate() == ToDay) {
            return true;
          }
        }
      }
    };
  },
  computed: {
    noPartner(){
      return this.person_partner.length === 1;
    }
  },
  methods: {
    onSubmit(evt) {
      if(this.travel_type == null){
        this.$swal('Warning !', 'กรุณาเลือกการเดินทาง' , 'warning')
      }else{
        this.person_partner[0].fullname = this.userLogin[0].fname+" "+this.userLogin[0].lname;
        this.person_partner[0].dep = this.depart;
        this.person_partner[0].travel = this.travel_type.travel_name;
        this.person_partner[0].recoder = this.userLogin[0].idcard
        this.form.cid_account = this.userLogin[0].idcard
        this.form.cid_account_recoder = this.userLogin[0].idcard
        this.form.start_date = this.formatdate(this.form.start_date)  
        this.form.end_date = this.formatdate(this.form.end_date)  
        this.form.start_travel = this.formatdate(this.form.start_travel)  
        this.form.end_travel = this.formatdate(this.form.end_travel)  
        this.form.book_owner_date = this.formatdate(this.form.book_owner_date)  
        axios
          .post(this.HOST+"/register/add",{
              register: this.form,
              register_partner: this.person_partner
          })
          .then(res => {
            let data = res.data
            console.log(data);

            if(data[0].status == 200){
              this.$swal({
                position: 'top-end',
                type: 'success',
                title: 'Your work has been saved.',
                showConfirmButton: false,
                timer: 1500
              })
              this.$router.push('/services/register-all');
            }else{
              this.$swal('เกิดข้อผิดพลาด !!!', data[0].msg , 'error')
            }
          }) 
          .catch(error => console.log("Error :", error));
      }
      evt.preventDefault();
      //console.log(JSON.stringify(this.form));
    },
    getDate() {
      let today = new Date();
      let year = today.getFullYear() + 543;
      let month = today.getMonth();
      let day = today.getDate();
      let thmonth = new Array(
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
      );
      let date_now = `${day} ${thmonth[month]} ${year}`;
      return date_now;
    },
    addPerson: function(){
      if(this.partner_name != null && this.partner_dep != null && this.partner_travel != null){
        var id_plus = this.person_partner.length + 1;
        this.person_partner.push({
          id: id_plus, 
          re_date: date_now,
          fullname: this.partner_name.fullname, 
          dep: this.partner_dep.dep_code_name, 
          travel: this.partner_travel.travel_name, 
          recoder:this.userLogin[0].idcard
        });
        //console.log(JSON.stringify(this.person_partner));
        
        this.partner_name = null
        this.partner_dep = null
        this.partner_travel = null
      }else{
        console.log("No select data!!!");
      }
    },
    deletePerson(index) {
      this.person_partner.splice(index, 1);
    },
    formatdate(dateTime){
      let dateNew = this.moment(dateTime).format('YYYY-MM-DD')
      return `${dateNew}`
    }
  },
  mounted() {
    this.full_name = this.userLogin[0].fullname;
    this.depart = this.userLogin[0].dep_name;
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
input[type=number]{
  text-align: center;
}
</style>