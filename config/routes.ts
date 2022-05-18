export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '首页',
    icon: 'home',
    component: './Welcome',
  },
  {
    path: '/sys',
    name: '系统管理',
    icon: 'SettingOutlined',
    // access: 'canAdmin',
    routes: [
      // {
      //   path: '/sys',
      //   redirect: '/sys/menu',
      // },
      {
        path: '/sys/menu',
        name: '菜单管理',
        icon: 'SettingOutlined',
        component: './sysManage/menu',
      },
      {
        path: '/sys/user',
        name: '用户管理',
        icon: 'SettingOutlined',
        component: './sysManage/user',
      },
    ],
  },
  {
    path: '/list',
    name: '列表',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/list/add',
        name: '添加',
        // access: 'canAdmin',
        icon: 'PlusCircleOutlined',
        component: './list/add',
      },
      {
        path: '/list/form',
        name: '表单',
        icon: 'PlusCircleOutlined',
        component: './list/form',
      },
      {
        path: '/list/list',
        name: '列表',
        icon: 'PlusCircleOutlined',
        component: './list/list',
      },
    ],
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
]
