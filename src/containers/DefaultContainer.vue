<template>
    <div class="app">
        <AppHeader fixed>
            <SidebarToggler class="d-lg-none" display="md" mobile />
            <b-link class="navbar-brand" to="#">
                <img class="navbar-brand-full" src="img/hrd.jpg" width="89" height="35" />
                <img class="navbar-brand-minimized" src="img/hrd.jpg" width="30" height="30" />
            </b-link>
            <SidebarToggler class="d-md-down-none" display="lg" />
            <b-navbar-nav class="d-md-down-none">
                <p>version {{VERSION_APP}}</p>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <DefaultHeaderDropdownAccnt />
            </b-navbar-nav>
            <AsideToggler class="d-none d-lg-block" />
        </AppHeader>
        <div class="app-body">
            <AppSidebar fixed>
                <SidebarHeader />
                <SidebarForm />
                <SidebarNav :navItems="nav"></SidebarNav>
                <SidebarFooter></SidebarFooter>
                <SidebarMinimizer />
            </AppSidebar>
            <main class="main">
                <Breadcrumb :list="list" />
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
            <AppAside fixed>
                <!--aside-->
                <DefaultAside />
            </AppAside>
        </div>
        <TheFooter>
            <!--footer-->
            <div>
                <a href="#">โรงพยาบาลร้อยเอ็ด</a>
                <span class="ml-1">&copy; 2019 Roi-Et Hospital</span>
            </div>
            <div class="ml-auto">
                <span class="mr-1">Powered by</span>
                <a href="#">ศูนย์คอมพิวเตอร์</a>
            </div>
        </TheFooter>
    </div>
</template>

<script>
import navuser from "@/_navuser";
import navadmin from "@/_navadmin";
import {
    Header as AppHeader,
    SidebarToggler,
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    Aside as AppAside,
    AsideToggler,
    Footer as TheFooter,
    Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
import decode from "jwt-decode";
export default {
    name: "DefaultContainer",
    components: {
        AsideToggler,
        AppHeader,
        AppSidebar,
        AppAside,
        TheFooter,
        Breadcrumb,
        DefaultAside,
        DefaultHeaderDropdownAccnt,
        SidebarForm,
        SidebarFooter,
        SidebarToggler,
        SidebarHeader,
        SidebarNav,
        SidebarMinimizer
    },
    data() {
        return {
            userLogin: "",
            nav: navuser.items
        };
    },
    computed: {
        name() {
            return this.$route.name;
        },
        list() {
            return this.$route.matched.filter(
                route => route.name || route.meta.label
            );
        }
    },
    methods: {
        checkRole() {
            if (window.localStorage.getItem("user-login")) {
                this.userLogin = window.localStorage.getItem("user-login");
                let decoded = decode(this.userLogin);
                if (this.userLogin != null && decoded.data[0].role == 5) {
                    this.nav = navadmin.items;
                } else {
                    this.nav = navuser.items;
                }
            }
        }
    },
    mounted() {
        this.checkRole();
    }
};
</script>
