<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <!-- Formulário de Login -->
        <v-card class="pa-6" elevation="12" outlined>
          <v-card-title class="text-h5 justify-center">Entrar</v-card-title>

          <v-form>
            <!-- Campo de Email -->
            <v-text-field
              label="Email"
              v-model="email"
              :rules="emailRules"
              outlined
              dense
              color="primary"
              class="mb-4"
              prepend-icon="mdi-email"
            ></v-text-field>

            <!-- Campo de Senha -->
            <v-text-field
              label="Senha"
              v-model="password"
              :rules="passwordRules"
              type="password"
              outlined
              dense
              color="primary"
              class="mb-4"
              prepend-icon="mdi-lock"
            ></v-text-field>

            <!-- Botão de Login -->
            <v-btn
              :loading="isLoading"
              @click="login"
              color="primary"
              block
              rounded
              class="mb-4"
              elevation="2"
            >
              Entrar
            </v-btn>

            <!-- Link para Registro -->
            <v-btn text @click="goToRegister" block>
              Não tem uma conta? Registre-se
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth, signInWithEmailAndPassword, getRoleFromFirestore } from "../firebase"; // Importando a função de login e role

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      isLoading: false, // Controle do estado de carregamento
      emailRules: [
        (v) => !!v || "O email é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "Digite um email válido",
      ],
      passwordRules: [
        (v) => !!v || "A senha é obrigatória",
        (v) => v.length >= 6 || "A senha deve ter pelo menos 6 caracteres",
      ],
    };
  },
  methods: {
    login() {
      this.isLoading = true; // Ativa o carregamento

      signInWithEmailAndPassword(auth, this.email, this.password) // Usando o método modular
        .then(async (userCredential) => {
          const user = userCredential.user;

          // Obter a role do Firestore
          const userRole = await getRoleFromFirestore(user.uid); // Chamando a função de obtenção da role

          // Salvando o UID e a role do usuário no localStorage
          localStorage.setItem("token", user.uid); // Salvando o UID como "token"
          localStorage.setItem("role", userRole); // Salvando a role no localStorage

          // Verificando a role e redirecionando para o dashboard correto
          if (userRole === "admin") {
            this.$router.push("/admin-dashboard"); // Redireciona para o dashboard do admin
          } else {
            this.$router.push("/users-dashboard"); // Redireciona para o dashboard do usuário normal
          }
        })
        .catch((error) => {
          console.error("Erro no login:", error.message);
          alert("Credenciais inválidas!"); // Mensagem para o usuário em caso de erro
          this.email = ''; // Limpa os campos de input após erro
          this.password = ''; // Limpa os campos de input após erro
        })
        .finally(() => {
          this.isLoading = false; // Desativa o carregamento após o login
        });
    },
    goToRegister() {
      this.$router.push("/register"); // Redireciona para a página de registro
    },
  },
};
</script>

<style scoped>
/* Estilos adicionais para melhorar o design */
.v-card {
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-btn {
  font-weight: bold;
  text-transform: uppercase;
}

.v-form {
  padding-top: 20px;
}

.v-row {
  min-height: 100vh;
}

.v-col {
  display: flex;
  justify-content: center;
}
</style>
