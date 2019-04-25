<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <ul v-for="(items,key) in userLogin" v-bind:key="key" id="user-nav">
        <li><i class="fa fa-user" /> {{items.fullname}}</li>
      </ul>
    </template>
    <template slot="dropdown">
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item to="/profile/Profiles"><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item v-on:click="logout"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
      itemsCount: 42 ,
      userLogin: JSON.parse(window.localStorage.getItem('user-login'))
    }
  },
  methods: {
    logout(){
      window.localStorage.clear();
      this.$router.push('/pages/login')
    }
  },
  mounted() {
    //console.log(this.userLogin);
  }
}
</script>
