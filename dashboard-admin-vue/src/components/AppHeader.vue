<template>
  <v-app>
    <div v-if="isAuthChecked">
      <!-- Navegação lateral (Sidebar) -->
      <v-navigation-drawer app v-model="drawer">
        <v-list>
          <v-list-item>
            <router-link to="/" class="v-list-item-title">Dashboard</router-link>
          </v-list-item>
          <v-list-item v-if="role === 'admin'">
            <router-link to="/usuarios" class="v-list-item-title">Usuários</router-link>
          </v-list-item>
          <v-list-item>
            <v-btn @click="logout" color="red" class="mt-3">Logout</v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Cabeçalho (Navbar) -->
      <v-app-bar app>
        <!-- Ícone de Menu (para alternar a sidebar) -->
        <v-app-bar-nav-icon @click="toggleDrawer">
          <!-- Ícone com cor destacada -->
          <v-icon :style="{ color: '#ff5722' }">mdi-menu</v-icon> <!-- Cor laranja -->
        </v-app-bar-nav-icon>

        <v-toolbar-title>Admin Dashboard</v-toolbar-title>

        <!-- Foto do usuário com dropdown -->
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleDropdown">
          <v-avatar size="32">
            <img :src="user ? user.photoURL : ''" alt="User Avatar" />
          </v-avatar>
        </v-btn>

        <v-menu v-model="dropdown" bottom left>
          <v-list>
            <v-list-item @click="goToProfile">
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToSettings">
              <v-list-item-title>Configurações</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </div>

    <!-- Tela de carregamento enquanto a autenticação é verificada -->
    <div v-else>
      <v-container>
        <v-row justify="center" align="center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { auth } from "@/firebase";

export default {
  name: "App",
  data() {
    return {
      isAuthChecked: false,
      drawer: false, // Controla a sidebar
      role: null,
      user: null, // Para armazenar as informações do usuário
      dropdown: false, // Controla o dropdown de perfil
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer; // Alterna a visibilidade da sidebar
    },
    toggleDropdown() {
      this.dropdown = !this.dropdown; // Alterna o dropdown do usuário
    },
    goToProfile() {
      // Redireciona para a página de perfil
      this.$router.push("/perfil");
    },
    goToSettings() {
      // Redireciona para a página de configurações
      this.$router.push("/configuracoes");
    },
    logout() {
      auth.signOut()
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          this.user = null; // Limpa o usuário após logout
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Erro ao sair:", error.message);
        });
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user; // Salva as informações do usuário logado
        this.role = localStorage.getItem("role") || 'user'; // Obtém o role do localStorage
      } else {
        this.$router.push("/login"); // Se não estiver logado, redireciona para login
      }
      this.isAuthChecked = true;
    });
  },
};
</script>

<style scoped>
.v-app-bar {
  background-color: #1976d2;
  color: white;
}
.v-avatar {
  margin-left: 10px;
}
</style>
