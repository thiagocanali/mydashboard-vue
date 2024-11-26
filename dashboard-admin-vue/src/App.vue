<template>
  <v-app>
    <div v-if="isAuthChecked">
      <!-- Navegação lateral -->
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

      <!-- Cabeçalho -->
      <AppHeader :user="user" @logout="logout" @toggle-drawer="drawer = !drawer" />
      <!-- Referência ao AppHeader -->

      <v-main>
        <router-view></router-view>
      </v-main>
    </div>

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
import AppHeader from './components/AppHeader.vue'; // Importando o componente de cabeçalho

export default {
  name: "App",
  components: {
    AppHeader, // Registrando o AppHeader como um componente
  },
  data() {
    return {
      isAuthChecked: false,
      drawer: false,
      role: null,
      user: null, // Informações do usuário
    };
  },
  methods: {
    logout() {
      auth.signOut()
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          this.user = null; // Limpa as informações do usuário após logout
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
        this.user = user; // Obtém as informações do usuário logado
        this.role = localStorage.getItem("role") || 'user'; // Obtém o papel do usuário
      } else {
        this.$router.push("/login"); // Se o usuário não estiver logado, redireciona para login
      }
      this.isAuthChecked = true; // Marca que a verificação de autenticação foi concluída
    });
  },
};
</script>
