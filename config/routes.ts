export default [
  {
    layout: false,
    name: 'login',
    path: '/login',
    component: './Login',
  },
  {
    layout: false,
    name: 'login',
    path: '/sign',
    component: './Docusign',
  },
  {
    layout: false,
    name: 'login',
    path: '/complete',
    component: './Docusign/complete',
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
          {
            path: '/sys/config',
            name: '参数设置',
            access: 'hasMenu',
            icon: 'SettingOutlined',
            component: './sysManage/parameter',
          },
        ],
      },
      {
        path: '/process',
        name: '流程中心',
        access: 'hasMenu',
        icon: 'DesktopOutlined',
        routes: [
          {
            path: '/process',
            redirect: '/process/create',
          },
          {
            path: '/process/create',
            name: '流程设计',
            access: 'hasMenu',
            component: './sysManage/processManage/create',
          },
          {
            path: '/process/list',
            name: '流程管理',
            access: 'hasMenu',
            component: './sysManage/processManage/list',
          },
        ],
      },
      {
        path: '/customerManage',
        name: '客户管理',
        access: 'hasMenu',
        icon: 'DesktopOutlined',
        routes: [
          {
            path: '/customerManage',
            redirect: '/customerManage/loan',
          },
          {
            path: '/customerManage/loan',
            name: '借款客户管理',
            access: 'hasMenu',
            component: './customerManage/loan',
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
