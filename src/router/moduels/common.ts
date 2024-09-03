import Layout from '@/layout/index.vue';

const commonRouter = [
  {
    path: '/menu',
    component: Layout,
    name: 'menu',
    meta: {
      title: '菜单',
      icon: 'School',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: { title: '主页', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: 'setting',
        component: () => import('@/views/menu/Setting.vue'),
        name: 'setting',
        meta: { title: '设置', keepAlive: true, icon: 'MenuIcon' },
      },
    ],
  },
];

export default commonRouter;
