import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebase'; // Importa o auth do Firebase

// Configuração das rotas
const routes = [
  {
    path: '/',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: { requiresAdmin: true }, // Apenas admins podem acessar
  },
  {
    path: '/usuarios',
    name: 'AdminUserManagement',
    component: () => import('../views/AdminUserManagement.vue'),
    meta: { requiresAdmin: true }, // Apenas admins podem acessar
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    meta: { requiresAuth: true }, // Rota que requer autenticação
  },
  {
    path: '/settings',
    name: 'UserSettings',
    component: () => import('../views/UserSettings.vue'),
    meta: { requiresAuth: true }, // Rota que requer autenticação
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import('../views/UserLogin.vue'),
    meta: { isPublic: true }, // Rota pública
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: () => import('../views/UserRegister.vue'),
    meta: { isPublic: true }, // Rota pública
  },
  {
    path: '/acesso-negado',
    name: 'PermissionDenied',
    component: () => import('../views/PermissionDenied.vue'),
    meta: { isPublic: true }, // Rota pública
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guarda de rota para autenticação e autorização
router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    const token = user ? user.uid : null;
    const role = localStorage.getItem('role'); // Exemplo: salvar role após login

    // Redireciona para login caso não esteja autenticado e a rota não seja pública
    if (!token && !to.meta.isPublic) {
      return next({ name: 'UserLogin' });
    }

    // Verifica se o usuário tem permissão de admin para acessar rotas restritas
    if (to.meta.requiresAdmin && role !== 'admin') {
      return next({ path: '/acesso-negado' });
    }

    // Permite navegação para rotas que requerem autenticação
    if (to.meta.requiresAuth && !token) {
      return next({ name: 'UserLogin' });
    }

    next(); // Permite navegação
  });
});

export default router;
