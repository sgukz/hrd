export default {
  items: [
    {
      title: true,
      name: 'บันทึกข้อมูล',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'ข้อมูลไปราชการ',
      url: '/services',
      icon: 'icon-options-vertical',
      children: [
        {
          name: 'ขออนุมัติไปราชการ',
          url: '/services/register-add',
          icon: 'icon-pencil',
        },
        {
          name: 'รายการทั้งหมด',
          url: '/services/register-all',
          icon: 'icon-list'
        }
      ]
    },

    {
      title: true,
      name: 'Admin',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'รายการทั้งหมด',
      url: '/services/admin-register-all',
      icon: 'icon-list'
    },
    {
      name: 'จัดการข้อมูลหน่วยงาน',
      url: '/department/showall',
      icon: 'icon-list',
    },
    {
      name: 'จัดการข้อมูลบุคลากร',
      url: '/users/manage',
      icon: 'icon-list',
    }
    // {
    //   name: 'รายงาน',
    //   url: '/report',
    //   icon: 'icon-printer',
    //   children: [
    //     {
    //       name: 'การอบรมรายบุคคล',
    //       url: '/report/report-person',
    //       icon: 'icon-book-open',
    //     },
    //   ]
    // },
    // {
    //   name: 'อัพเดทรายชื่อ',
    //   url: '/users',
    //   icon: 'icon-refresh',
    // }
  ]
};
