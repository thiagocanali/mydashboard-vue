import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    role: localStorage.getItem('role') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRole(state, role) {
      state.role = role;
    },
  },
  actions: {
    async login({ commit }, { user, role }) {
      commit('setUser', user);
      commit('setRole', role);
      localStorage.setItem('role', role);
      localStorage.setItem('token', user.uid);
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setRole', null);
      localStorage.removeItem('role');
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.role === 'admin',
  },
});
