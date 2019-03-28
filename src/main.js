import 'core-js/es6/promise';
import 'core-js/es6/string';
import 'core-js/es7/array';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.prototype.HOST = 'http://webapp2.intranet:8000/api';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
