<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Perfil do Usuário</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ user.displayName || "Nome não disponível" }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-email</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ user.email }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ user.role || "Sem função atribuída" }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { auth } from "../firebase"; // Importando Firebase Authentication
  
  export default {
    name: "UserProfile",
    data() {
      return {
        user: auth.currentUser, // Obtém os dados do usuário logado
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionais */
  </style>
  