<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Configurações</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="Alterar Nome" v-model="nome" outlined></v-text-field>
                <v-text-field label="Alterar Email" v-model="email" outlined></v-text-field>
                <v-text-field label="Alterar Senha" v-model="senha" type="password" outlined></v-text-field>
                <v-btn @click="updateSettings" color="primary">Salvar Configurações</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { auth } from "../firebase"; // Importando Firebase Authentication
  
  export default {
    name: "UserSettings",
    data() {
      return {
        nome: this.user.displayName || "",
        email: this.user.email || "",
        senha: "",
        user: auth.currentUser, // Obtém os dados do usuário logado
      };
    },
    methods: {
      updateSettings() {
        // Atualizar as configurações do usuário
        if (this.senha) {
          // Atualizar a senha
        }
        // Atualizar nome ou email
        alert("Configurações salvas!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionais */
  </style>
  