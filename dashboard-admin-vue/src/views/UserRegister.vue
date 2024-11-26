<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <!-- Formulário de Registro -->
        <v-card class="pa-6" elevation="12" outlined>
          <v-card-title class="text-h5 justify-center">Registrar</v-card-title>

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
              v-model="senha"
              :rules="passwordRules"
              type="password"
              outlined
              dense
              color="primary"
              class="mb-4"
              prepend-icon="mdi-lock"
            ></v-text-field>

            <!-- Campo de Confirmar Senha -->
            <v-text-field
              label="Confirmar Senha"
              v-model="confirmSenha"
              :rules="confirmPasswordRules"
              type="password"
              outlined
              dense
              color="primary"
              class="mb-4"
              prepend-icon="mdi-lock"
            ></v-text-field>

            <!-- Botão de Registrar -->
            <v-btn
              :loading="isLoading"
              @click="registrar"
              color="primary"
              block
              rounded
              class="mb-4"
              elevation="2"
            >
              Registrar
            </v-btn>

            <!-- Link para Login -->
            <v-btn text @click="goToLogin" block>
              Já tem uma conta? Faça login
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth, createUserWithEmailAndPassword } from "../firebase"; // Importando o método de registro

export default {
  name: "UserRegister",
  data() {
    return {
      email: "",
      senha: "",
      confirmSenha: "",
      isLoading: false, // Controle do estado de carregamento
      emailRules: [
        (v) => !!v || "O email é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "Digite um email válido",
      ],
      passwordRules: [
        (v) => !!v || "A senha é obrigatória",
        (v) => v.length >= 6 || "A senha deve ter pelo menos 6 caracteres",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Por favor, confirme a senha",
        (v) => v === this.senha || "As senhas não coincidem",
      ],
    };
  },
  methods: {
    registrar() {
      if (this.senha !== this.confirmSenha) {
        alert("As senhas não coincidem!");
        return;
      }

      this.isLoading = true; // Ativa o carregamento

      createUserWithEmailAndPassword(auth, this.email, this.senha)
        .then((userCredential) => {
          const user = userCredential.user;

          // Exemplo: logando as informações do usuário
          console.log("Usuário registrado:", user);

          // Informar sucesso
          alert(`Usuário registrado com sucesso: ${user.email}`);
          this.$router.push("/login"); // Redireciona para o login
        })
        .catch((error) => {
          console.error("Erro ao registrar usuário:", error.message);
          alert("Erro ao registrar usuário");
        })
        .finally(() => {
          this.isLoading = false; // Desativa o carregamento após o registro
        });
    },
    goToLogin() {
      this.$router.push("/login"); // Redireciona para a página de login
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
