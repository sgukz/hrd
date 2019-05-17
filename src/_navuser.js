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
  ]
};
