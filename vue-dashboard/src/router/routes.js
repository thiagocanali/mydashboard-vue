export default [  
  
  {
    name: 'Master',
    path: '/',
    component: import('../pages/layout/xMaster.vue'),
    redirect: '/dashboard',
    children: [
{
    name:'dashboard',
    path:'/dashboard',
    component: import('../pages/xDashboard.vue'),
}
    ],
  },

]