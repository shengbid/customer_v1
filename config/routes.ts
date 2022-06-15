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
        icon: 'DesktopOutlined',
        routes: [
          {
            path: '/leaderPage',
            redirect: '/leaderPage/onlineManage',
          },
          {
            path: '/leaderPage/onlineManage',
            name: '在线经营贷',
            component: './leaderPage/onlineManage',
          },
        ],
      },
      {
        path: '/sys',
        name: '系统管理',
        icon: 'SettingOutlined',
        // access: 'canAdmin',
        routes: [
          {
            path: '/sys',
            redirect: '/sys/user',
          },
          {
            path: '/sys/user',
            name: '用户管理',
            icon: 'SettingOutlined',
            component: './sysManage/user',
          },
          {
            path: '/sys/role',
            name: '角色管理',
            icon: 'SettingOutlined',
            component: './sysManage/role',
          },
          {
            path: '/sys/role/user',
            name: '角色用户管理',
            icon: 'SettingOutlined',
            component: './sysManage/role/user',
          },
          {
            path: '/sys/menu',
            name: '菜单管理',
            icon: 'SettingOutlined',
            component: './sysManage/menu',
          },
          {
            path: '/sys/dept',
            name: '部门管理',
            icon: 'SettingOutlined',
            component: './sysManage/dept',
          },
          {
            path: '/sys/post',
            name: '岗位管理',
            icon: 'SettingOutlined',
            component: './sysManage/post',
          },
          {
            path: '/sys/dict',
            name: '字典管理',
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
            icon: 'SettingOutlined',
            component: './sysManage/parameter',
          },
          {
            path: '/sys/notice',
            name: '通知公告',
            icon: 'SettingOutlined',
            component: './sysManage/notice',
          },
          {
            path: '/sys/log',
            name: '日志管理',
            icon: 'SettingOutlined',
            routes: [
              {
                path: '/sys/log',
                redirect: '/sys/log/operate',
              },
              {
                path: '/sys/log/operate',
                name: '操作日志',
                icon: 'SettingOutlined',
                component: './sysManage/logManage/operateInfo',
              },
              {
                path: '/sys/log/login',
                name: '登录日志',
                icon: 'SettingOutlined',
                component: './sysManage/logManage/loginInfo',
              },
            ],
          },
        ],
      },
      {
        path: '/systemMonitor',
        name: '系统监控',
        icon: 'DesktopOutlined',
        routes: [
          {
            path: '/systemMonitor',
            redirect: '/systemMonitor/onlineUser',
          },
          {
            path: '/systemMonitor/onlineUser',
            name: '在线用户',
            component: './sysManage/systemMonitor/onlineUser',
          },
          {
            path: '/systemMonitor/timedTask',
            name: '定时任务',
            component: './sysManage/systemMonitor/timedTask',
          },
          {
            path: '/systemMonitor/timedTask/log',
            name: '日志',
            component: './sysManage/systemMonitor/timedTask/log',
          },
          {
            path: '/systemMonitor/sentinel',
            name: 'Sentinel控制台',
            target: '_blank',
          },
          {
            path: '/systemMonitor/nacos',
            name: 'Nacos控制台',
            target: '_blank',
          },
          {
            path: '/systemMonitor/admin',
            name: 'Admin控制台',
            target: '_blank',
          },
        ],
      },
      {
        path: '/systemTool',
        name: '系统工具',
        icon: 'DesktopOutlined',
        routes: [
          {
            path: '/systemTool',
            redirect: '/systemTool/code',
          },
          {
            path: '/systemTool/code',
            name: '代码生成',
            component: './sysManage/systemTool/code',
          },
          {
            path: '/systemTool/sysApi',
            name: '系统接口',
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
