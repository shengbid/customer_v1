export default [
  {
    title: 'home',
    name: 'home',
    icon: 'HomeOutlined',
    path: '/welcome',
  },
  {
    title: '个人中心',
    name: '个人中心',
    icon: 'UserOutlined',
    path: '/personal/center',
  },
  {
    path: '/leaderPage',
    name: '领导驾驶舱',
    title: '领导驾驶舱',
    icon: 'DesktopOutlined',
    children: [
      {
        path: '/leaderPage/onlineManage',
        name: '在线经营贷',
        title: '在线经营贷',
      },
    ],
  },
]
