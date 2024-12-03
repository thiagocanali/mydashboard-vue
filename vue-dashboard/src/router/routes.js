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
},
{
  name:'profile',
  path:'/profile',
  component: import('../pages/xProfile.vue'),
},
{
  name:'product',
  path:'/product',
  component: import('../pages/xProduct.vue'),
},
{
  name:'contact',
  path:'/contact',
  component: import('../pages/xContact.vue'),
},
{
  name:'customer',
  path:'/customer',
  component: import('../pages/xCustomer.vue'),
},
{
  name:'activation',
  path:'/activation',
  component: import('../pages/xActivation.vue'),
},
{
  name:'settings',
  path:'/settings',
  component: import('../pages/xSettings.vue'),
}
    ],
  },

]