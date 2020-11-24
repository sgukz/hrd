import Vue from 'vue';
import Router from 'vue-router';

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer');

// Views
const Dashboard = () => import('@/views/Dashboard');

//Services - ขอไปราชการ
const ServicesRegisAdd = () => import('@/views/services/RegisterAdd');
const ServicesRegisEdit = () => import('@/views/services/RegisterEdit');
const ServicesRegisAll = () => import('@/views/services/RegisterAll');
const ServicesAdminRegisAll = () => import('@/views/services/AdminRegisterAll');

const Profiles = () => import('@/views/profile/Profiles');

const department = () => import('@/views/department/Department');

const report = () => import('@/views/reports/Report');


const Login = () => import('@/views/pages/Login');

// Users
const Users = () => import('@/views/users/Users');
const UserManage = () => import('@/views/users/UserManage');

Vue.use(Router);

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'services',
          redirect: '/services/register-add',
          name: 'บันทึกข้อมูล',
          component: {
            render(c) { return c('router-view'); }
          },
          children: [
            {
              path: 'register-add',
              name: 'ขออนุมัติไปราชการ',
              component: ServicesRegisAdd
            },
            {
              path: 'register-edit',
              name: 'แก้ไขข้อมูลขออนุมัติไปราชการ',
              component: ServicesRegisEdit
            },
            {
              path: 'register-all',
              name: 'ข้อมูลขออนุมัติไปราชการ',
              component: ServicesRegisAll
            },
            {
              path: 'admin-register-all',
              name: 'ข้อมูลขออนุมัติไปราชการทั้งหมด',
              component: ServicesAdminRegisAll
            }
          ]
        },
        {
          path: 'profile',
          redirect: '',
          name: 'ข้อมูลทั่วไป',
          component: {
            render(c) { return c('router-view'); }
          },
          children: [
            {
              path: 'profiles',
              name: 'ข้อมูลส่วนตัว',
              component: Profiles
            }
          ]
        },
        {
          path: 'department',
          redirect: '',
          name: 'ข้อมูลหน่วยงาน',
          component: {
            render(c) { return c('router-view'); }
          },
          children: [
            {
              path: 'showall',
              name: 'ข้อมูลหน่วยงานทั้งหมด',
              component: department
            }
          ]
        },
        {
          path: 'report',
          redirect: '',
          name: 'รายงานการขอไปราชการ',
          component: {
            render(c) { return c('router-view'); }
          },
          children: [
            {
              path: 'report-person',
              name: 'รายงานการอบรม / ประชุม / สัมนารายบุคคล',
              component: report
            }
          ]
        },
        {
          path: 'users',
          meta: { label: 'ข้อมูลผู้ใช้งาน'},
          component: {
            render (c) { return c('router-view'); }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: 'manage',
              meta: { label: 'จัดการข้อมูลผู้ใช้งาน'},
              name: 'UserManage',
              component: UserManage,
            },
          ]
        },
      ]
    },
    {
      path: '/pages',
      name: 'Pages',
      component: {
        render (c) { return c('router-view');}
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
});
