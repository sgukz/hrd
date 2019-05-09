<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header" variant="dark">
            <strong>
              <i class="fa fa-edit"></i> แก้ไขข้อมูลขออนุมัติไปราชการ
            </strong>
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
                      :readonly="true"
                      v-model="form.re_date"
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
                      placeholder="08x-xxxxxxx"
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
                    <v-select
                      v-model="travel_type"
                      placeholder="เลือกการเดินทาง"
                      label="travel_name"
                      :options="travel"
                    ></v-select>
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
                    <v-select
                      v-model="partner_name"
                      placeholder="เลือกรายชื่อ"
                      label="fullname"
                      :options="employee"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group
                    label="หน่วยงาน"
                    label-class="text-sm-right"
                    label-for="department_partner"
                    :horizontal="true"
                  >
                    <v-select
                      v-model="partner_dep"
                      placeholder="เลือกหน่วยงาน"
                      label="dep_code_name"
                      :options="department"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="3">
                  <b-form-group
                    label="เดินทางโดย"
                    label-class="text-sm-right"
                    label-for="travel_by"
                    :horizontal="true"
                  >
                    <v-select
                      v-model="partner_travel"
                      placeholder="เลือกการเดินทาง"
                      label="travel_name"
                      :options="travel"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="1">
                  <b-form-group>
                    <b-button
                      pressed
                      block
                      variant="primary"
                      size="sm"
                      aria-pressed="true"
                      v-on:click="addPerson()"
                      name="addPerson"
                    >
                      <i class="fa fa-plus" aria-pressed="true"></i> เพิ่ม
                    </b-button>
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- {{person_partner}} -->
              <div v-for="(person, key) in person_partner" v-bind:key="key">
                <div>
                  <b-row>
                    <b-col sm="4">
                      <b-form-group
                        label
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
                        <b-button
                          v-if="person.cid === ''"
                          variant="danger"
                          size="sm"
                          aria-pressed="true"
                          name="deletePerson"
                          v-on:click="deletePerson(key)"
                        >
                          <i class="fa fa-trash" aria-pressed="true"></i>
                        </b-button>
                        <b-button
                          v-else
                          variant="danger"
                          size="sm"
                          aria-pressed="true"
                          name="deletePerson"
                          v-on:click="deletePersonOld(key, person.cid, person.re_id)"
                        >
                          <i class="fa fa-trash" aria-pressed="true"></i>
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
                    <b-form-input
                      v-model="form.book_hos_id"
                      type="text"
                      id="book_hos_id"
                      name="book_hos_id"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="2">
                  <b-form-group :horizontal="true">
                    <b-form-select v-model="form.book_hos_year">
                      <option :value="null" selected disabled>ปี พ.ศ.</option>
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
                        name="book_owner_date"
                        :required="true"
                        sm="6"
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
                      :required="true"
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
                      <option value disabled>เลือกประเภทการประชุม</option>
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
                        placeholder="เลือกวันที่"
                        :bootstrap-styling="true"
                        :language="th"
                        v-model="form.start_date"
                        name="start_date"
                        :required="true"
                      ></datepicker>&nbsp;ถึง&nbsp;
                      <datepicker
                        placeholder="เลือกวันที่"
                        :bootstrap-styling="true"
                        :language="th"
                        v-model="form.end_date"
                        name="end_date"
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
                      id="meeting_place"
                      name="meeting_place"
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
                      <option value disabled>เลือกประเภทการประชุม</option>
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
                        placeholder="เลือกวันที่"
                        :bootstrap-styling="true"
                        :language="th"
                        v-model="form.start_travel"
                        name="start_travel"
                        :required="true"
                      ></datepicker>
                      <!-- <b-form-input type="text" v-model="form.start_travel" name="start_travel" id="start_travel" placeholder></b-form-input> -->
                    </b-input-group>
                    <!-- <b-form-input type="text" id="meeting_date" name="meeting_date" placeholder></b-form-input> -->
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
                        placeholder="เลือกวันที่"
                        :bootstrap-styling="true"
                        :language="th"
                        v-model="form.end_travel"
                        name="end_travel"
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
                    <b-form-select v-model="form.strategy" :required="true">
                      <option value disabled>เลือกประเด็นยุทธศาสตร์</option>
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
                    <b-form-select
                      v-model="form.meeting_is"
                      id="meeting_is"
                      name="meeting_is"
                      :required="true"
                    >
                      <option value disabled>เลือกประเภทการประชุม</option>
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
                    <b-form-select
                      v-model="form.budget_type"
                      id="budget_type"
                      name="budget_type"
                      :required="true"
                    >
                      <option value disabled>เลือกประเภทงบประมาณจัดสรร</option>
                      <option
                        v-for="(m_budget, key) in meetingBudget"
                        v-bind:key="key"
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
                      id="budget_other"
                      name="budget_other"
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
                        id="distance"
                        name="distance"
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
let year_TH = parseInt(today.getFullYear()) + 543;
let month = toTwoDigits(today.getMonth() + 1);
let day = toTwoDigits(today.getDate());
let ToDay = today.getDate();
let date_now = `${year}-${month}-${day}`;
let thmonth = {
  Jan: "มกราคม",
  Feb: "กุมภาพันธ์",
  Mar: "มีนาคม",
  Apr: "เมษายน",
  May: "พฤษภาคม",
  Jun: "มิถุนายน",
  Jul: "กรกฎาคม",
  Aug: "สิงหาคม",
  sep: "กันยายน",
  Oct: "ตุลาคม",
  Nov: "พฤศจิกายน",
  Dec: "ธันวาคม"
};
let monthEN = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12"
};
export default {
  name: "register-edit",
  components: {
    Datepicker
  },
  props: {
    value: String
  },
  data() {
    return {
      userLogin: JSON.parse(window.localStorage.getItem("user-login")),
      dataRegis: JSON.parse(window.localStorage.getItem("meeting_register")),
      dataUpdate: JSON.parse(window.localStorage.getItem("update")),
      full_name: "",
      depart: "",
      travel_type: "",
      department: JSON.parse(window.localStorage.getItem("department")),
      employee: JSON.parse(window.localStorage.getItem("rehuser")),
      travel: MeetingTravel,
      meetingType: MeetingType,
      meetingIs: MeetingIs,
      meetingStrategy: MeetingStrategy,
      meetingBudget: MeetingBudget,
      arrayYear: [
        { year: year_TH - 1 },
        { year: year_TH },
        { year: year_TH + 1 }
      ],
      selected: null,
      form: {
        re_date: "",
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
        book_hos_year: "",
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
        distance: "",
        residence: "",
        residence_num: "",
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
        re_id: ""
      },
      partner_name: null,
      partner_dep: null,
      partner_travel: null,
      person_partner: [],
      travel_chagne: [
        {
          travel_name: null
        }
      ],
      th: th,
      show: true,
      disabledDates: {},
      disabledFn: {
        ranges: [
          {
            // Disable dates in given ranges (exclusive).
            from: new Date(2016, 11, 25),
            to: new Date(2016, 11, 30)
          },
          {
            from: new Date(2017, 1, 12),
            to: new Date(2017, 2, 25)
          }
        ],
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
      },
      highlighted: {}
    };
  },
  computed: {},
  methods: {
    formatDateTH(DateTH) {
      let strDate = DateTH.split(",");
      let strTrim = strDate[1].trim();
      let subSpace = strTrim.split(" ");
      let yearTH = parseInt(subSpace[2]) + 543;
      let strDateNew = subSpace[0] + " " + thmonth[subSpace[1]] + " " + yearTH;
      return `${strDateNew}`;
    },
    formatDateEN(DateTH) {
      let strDate = DateTH.split(",");
      let strTrim = strDate[1].trim();
      let subSpace = strTrim.split(" ");
      let strDateNew =
        subSpace[2] + "-" + monthEN[subSpace[1]] + "-" + subSpace[0];
      return `${strDateNew}`;
    },
    setData() {
      // alert(this.dataRegis[0].book_hos_year)
      this.travel_type = this.dataRegis[0].travel_name;
      this.form.re_date =
        this.dataRegis[0].re_date != null
          ? this.formatDateTH(this.dataRegis[0].re_date)
          : "";
      this.form.phone = this.dataRegis[0].phone;
      this.form.meeting_type = this.dataRegis[0].meeting_type;
      this.form.meeting_story = this.dataRegis[0].meeting_story;
      this.form.start_date =
        this.dataRegis[0].start_date != null
          ? this.formatDateEN(this.dataRegis[0].start_date)
          : "";
      this.form.end_date =
        this.dataRegis[0].end_date != null
          ? this.formatDateEN(this.dataRegis[0].end_date)
          : "";
      this.form.meeting_place = this.dataRegis[0].meeting_place;
      this.form.meeting_place_type = this.dataRegis[0].meeting_place_type;
      this.form.meeting_host = this.dataRegis[0].meeting_host;
      this.form.start_travel =
        this.dataRegis[0].start_travel != null
          ? this.formatDateEN(this.dataRegis[0].start_travel)
          : "";
      this.form.end_travel =
        this.dataRegis[0].end_travel != null
          ? this.formatDateEN(this.dataRegis[0].end_travel)
          : "";
      this.form.strategy = this.dataRegis[0].strategy;
      this.form.meeting_is = this.dataRegis[0].meeting_is;
      this.form.meeting_owner = this.dataRegis[0].meeting_owner;
      this.form.book_owner = this.dataRegis[0].book_owner;
      this.form.book_owner_date =
        this.dataRegis[0].book_owner_date != null
          ? this.formatDateEN(this.dataRegis[0].book_owner_date)
          : "";
      this.form.book_hos_id = this.dataRegis[0].book_hos_id;
      this.form.book_hos_year =
        this.dataRegis[0].book_hos_year != "ปี พ.ศ."
          ? this.dataRegis[0].book_hos_year
          : null;
      this.form.budget_type = this.dataRegis[0].budget_type;
      this.form.budget_other = this.dataRegis[0].budget_other;
      this.form.travel_government_car = this.dataRegis[0].travel_government_car;
      this.form.travel_bus = this.dataRegis[0].travel_bus;
      this.form.expense_bus = this.dataRegis[0].expense_bus;
      this.form.travel_fuel = this.dataRegis[0].travel_fuel;
      this.form.expense_fuel = this.dataRegis[0].expense_fuel;
      this.form.travel_airplane = this.dataRegis[0].travel_airplane;
      this.form.expense_airplane = this.dataRegis[0].expense_airplane;
      this.form.travel_owncar = this.dataRegis[0].travel_owncar;
      this.form.register_owncar = this.dataRegis[0].register_owncar;
      this.form.expense_owncar = this.dataRegis[0].expense_owncar;
      this.form.distance = this.dataRegis[0].distance;
      this.form.residence = this.dataRegis[0].residence;
      this.form.residence_num = this.dataRegis[0].residence_num;
      this.form.expense_residence = this.dataRegis[0].expense_residence;
      this.form.register_meeting = this.dataRegis[0].register_meeting;
      this.form.expense_register_meeting = this.dataRegis[0].expense_register_meeting;
      this.form.allowance = this.dataRegis[0].allowance;
      this.form.expense_allowance = this.dataRegis[0].expense_allowance;
      this.form.others = this.dataRegis[0].others;
      this.form.others_detail = this.dataRegis[0].others_detail;
      this.form.expense_other = this.dataRegis[0].expense_other;
      this.form.expense_total = this.dataRegis[0].expense_total;
      this.form.cid_account = this.dataRegis[0].cid_account;
      this.form.re_id = this.dataRegis[0].re_id;
    },
    getPartner(cid, re_id) {
      let url = this.HOST + "/hrd/partner/" + cid + "/" + re_id;
      axios
        .get(url)
        .then(res => {
          let dataPartner = res.data;
          console.log(dataPartner);

          for (var i = 0; i < dataPartner.length; i++) {
            this.person_partner.push({
              id: i + 1,
              code_y: dataPartner[i].code_y,
              code_num: dataPartner[i].code_num,
              re_id: dataPartner[i].re_id,
              re_date:
                dataPartner[i].re_date != null
                  ? this.formatDateEN(dataPartner[i].re_date)
                  : "",
              fullname: dataPartner[i].fullname,
              dep: dataPartner[i].dep_code_name,
              travel: dataPartner[i].travel_name,
              recoder: this.userLogin[0].idcard,
              cid: dataPartner[i].cid_account
            });
          }
          //console.log(res.data);
          console.log(this.person_partner);
        })
        .catch(error => console.log("Error", error));
    },
    onSubmit(evt) {
      //console.log(JSON.stringify(this.form));
      this.travel_chagne[0].travel_name = this.travel_type.travel_name;
      console.log(JSON.stringify(this.travel_chagne));
      axios
        .post(this.HOST + "/hrd/update", {
          register: this.form,
          register_partner: this.person_partner,
          travel_chagne: this.travel_chagne
        })
        .then(res => {
          let data = res.data;
          console.log(data);

          if (data[0].status == 200) {
            this.$swal(
              "Updated",
              "You successfully updated this data",
              "success"
            );
            setTimeout(() => {
              this.$router.push("/services/register-all");
            }, 1000);
          } else {
            this.$swal("เกิดข้อผิดพลาด !!!", data[0].msg, "error");
          }
        })
        .catch(error => console.log("Error :", error));
      evt.preventDefault();
      //alert(JSON.stringify(this.form));
    },
    addPerson: function() {
      if (
        this.partner_name != null &&
        this.partner_dep != null &&
        this.partner_travel != null
      ) {
        var id_plus = this.person_partner.length + 1;
        this.person_partner.push({
          id: id_plus,
          re_id: this.dataRegis[0].re_id,
          re_date: date_now,
          fullname: this.partner_name.fullname,
          dep: this.partner_dep.dep_code_name,
          travel: this.partner_travel.travel_name,
          recoder: this.userLogin[0].idcard,
          cid: ""
        });
        this.partner_name = null;
        this.partner_dep = null;
        this.partner_travel = null;
      } else {
        console.log("No select data!!!");
      }
    },
    deletePerson(index) {
      this.person_partner.splice(index, 1);
    },
    deletePersonOld(index, cid, re_id) {
      axios
        .delete(this.HOST + "/hrd/deletepartner/" + cid + "/" + re_id)
        .then(res => {
          let data = res.data;
          if (data[0].status == 200) {
            this.$swal({
              position: "top-end",
              type: "success",
              title: "ลบข้อมูลเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 1500
            });
            this.person_partner.splice(index, 1);
            // this.getPartner(this.dataUpdate[0].cid, this.dataUpdate[0].codeMaster);
          } else {
            this.$swal({
              position: "top-end",
              type: "error",
              title: "เกิดข้อผิดพลาด !!!",
              text: data[0].msg
              // showConfirmButton: false,
              // timer: 1500
            });
          }
        })
        .catch(error => console.log("Error", error));
    }
  },
  mounted() {
    this.getPartner(this.dataUpdate[0].cid, this.dataUpdate[0].re_id);
    this.full_name = this.dataRegis[0].fullname;
    this.depart = this.dataRegis[0].dep_code_name;
    this.setData();
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