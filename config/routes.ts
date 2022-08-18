export default [
  {
    layout: false,
    name: 'login',
    path: '/login',
    component: './Login',
  },
  {
    path: '/',
    component: '../layouts/baseLayout',
    menu: {
      flatMenu: true,
    },
    layout: false,
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'home',
        icon: 'HomeOutlined',
        component: './Welcome',
      },
      {
        path: '/leaderPage',
        name: '领导驾驶舱',
        // access: 'hasMenu',
        icon: 'DesktopOutlined',
        routes: [
          {
            path: '/leaderPage',
            redirect: '/leaderPage/onlineManage',
          },
          {
            path: '/leaderPage/onlineManage',
            name: '在线经营贷',
            // access: 'hasMenu',
            component: './leaderPage/onlineManage',
          },
        ],
      },
      {
        path: '/sys',
        name: '系统管理',
        access: 'hasMenu',
        icon: 'SettingOutlined',
        routes: [
          {
            path: '/sys',
            redirect: '/sys/user',
          },
          {
            path: '/sys/user',
            name: '用户管理',
            access: 'hasMenu',
            icon: 'SettingOutlined',
            component: './sysManage/user',
          },
          {
            path: '/sys/role',
            name: '角色管理',
            access: 'hasMenu',
            icon: 'SettingOutlined',
            component: './sysManage/role',
          },
          {
            path: '/sys/role/user',
            name: '角色用户管理',
            // access: 'hasMenu',
            icon: 'SettingOutlined',
            component: './sysManage/role/user',
          },
          {
            path: '/sys/menu',
            name: '菜单管理',
            access: 'hasMenu',
            icon: 'SettingOutlined',
            component: './sysManage/menu',
          },
          {
            path: '/sys/dept',
            name: '部门管理',
            access: 'hasMenu',
            icon: 'SettingOutlined',
            component: './sysManage/dept',
          },
          {
            path: '/sys/post',
            name: '岗位管理',
            access: 'hasMenu',
            icon: 'SettingOutlined',
            component: './sysManage/post',
          },
          {
            path: '/sys/dict',
            name: '字典管理',
            access: 'hasMenu',
            icon: 'SettingOutlined',
            component: './sysManage/dict',
          },
          {
            path: '/sys/dict/type',
            name: '字典类型管理',
            icon: 'SettingOutlined',
            component: './sysManage/dict/dictKey',
          },
        ],
      },
      {
        path: '/finance',
        name: '企业融资',
        access: 'hasMenu',
        icon: 'DesktopOutlined',
        routes: [
          {
            path: '/finance',
            redirect: '/finance/create',
          },
          {
            path: '/finance/create',
            name: '产品授信开通',
            access: 'hasMenu',
            component: './CorporateFinance/createCredit',
          },
          {
            path: '/finance/create/form',
            name: '授信申请',
            // access: 'hasMenu',
            component: './CorporateFinance/applyForm',
          },
          {
            path: '/finance/apply',
            name: '融资申请',
            access: 'hasMenu',
            component: './CorporateFinance/applications',
          },
          {
            path: '/finance/apply/form',
            name: '融资申请',
            // access: 'hasMenu',
            component: './CorporateFinance/applications/applyForm',
          },
        ],
      },
      {
        path: '/repayment',
        name: '还款管理',
        access: 'hasMenu',
        icon: 'DesktopOutlined',
        routes: [
          {
            path: '/repayment',
            redirect: '/repayment/create',
          },
          {
            path: '/repayment/create',
            name: '还款管理',
            access: 'hasMenu',
            component: './repaymentManage/repayment',
          },
          {
            path: '/repayment/create/form',
            name: '还款管理申请',
            // access: 'hasMenu',
            component: './repaymentManage/repayment/applyForm',
          },
        ],
      },
      {
        path: '/assets',
        name: '资产管理',
        access: 'hasMenu',
        icon: 'DesktopOutlined',
        routes: [
          {
            path: '/assets',
            redirect: '/assets/create',
          },
          {
            path: '/assets/create',
            name: '库存质押管理',
            access: 'hasMenu',
            component: './assetsManage/inventoryManage',
          },
          {
            path: '/assets/create/form',
            name: '库存质押申请',
            // access: 'hasMenu',
            component: './assetsManage/inventoryManage/applyForm',
          },
        ],
      },
      {
        path: '/personal/center',
        name: '个人中心',
        icon: 'UserOutlined',
        component: './sysManage/personalCenter',
      },
    ],
  },
  {
    component: './404',
  },
]
