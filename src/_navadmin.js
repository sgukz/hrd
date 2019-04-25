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
        },
        {
          name: 'อัพเดทรายชื่อ',
          url: '/users',
          icon: 'icon-refresh',
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
    }
  ]
};
