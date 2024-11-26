<template>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              <span class="headline">Gerenciamento de Usuários</span>
            </v-card-title>
            
            <!-- Formulário de Cadastro de Novo Usuário -->
            <v-form v-if="role === 'admin'">
              <v-text-field label="Nome" v-model="novoUsuario.nome" outlined></v-text-field>
              <v-text-field label="Email" v-model="novoUsuario.email" outlined></v-text-field>
              <v-text-field label="Senha" v-model="novoUsuario.senha" type="password" outlined></v-text-field>
              <v-select label="Função" v-model="novoUsuario.role" :items="roles" outlined></v-select>
              <v-btn @click="cadastrarUsuario" color="primary">Cadastrar</v-btn>
            </v-form>
  
            <!-- Tabela de Usuários -->
            <v-data-table :headers="headers" :items="usuarios" item-key="id" class="elevation-1">
              <template v-slot:[`item.acoes`]="{ item }">
                <v-btn icon @click="editarUsuario(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="excluirUsuario(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  // Importações necessárias do Firebase
  import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
  
  const db = getFirestore();
  
  export default {
    name: "AdminUserManagement",
    data() {
      return {
        usuarios: [], // Lista de usuários
        novoUsuario: { nome: "", email: "", senha: "", role: "" }, // Dados do novo usuário
        roles: ["admin", "user"], // Funções para atribuição
        headers: [
          { text: "Nome", value: "nome" },
          { text: "Email", value: "email" },
          { text: "Função", value: "role" },
          { text: "Ações", value: "acoes", sortable: false },
        ],
        role: "admin", // Role do usuário logado, pode ser recuperada via Firebase ou Vuex
      };
    },
    mounted() {
      this.fetchUsuarios();
    },
    methods: {
      // Função para buscar os usuários do Firestore
      async fetchUsuarios() {
        try {
          const usersCollection = collection(db, "users");
          const querySnapshot = await getDocs(usersCollection);
          this.usuarios = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      },
      
      // Função para cadastrar um novo usuário
      async cadastrarUsuario() {
        try {
          // Criando o novo usuário no Firestore
          const docRef = await addDoc(collection(db, "users"), {
            nome: this.novoUsuario.nome,
            email: this.novoUsuario.email,
            senha: this.novoUsuario.senha, // Não use a senha diretamente, crie um processo de segurança para armazená-la de forma segura.
            role: this.novoUsuario.role,
          });
          console.log("Usuário criado com ID: ", docRef.id);
          
          // Atualiza a lista de usuários
          this.fetchUsuarios();
  
          // Limpa o formulário
          this.novoUsuario = { nome: "", email: "", senha: "", role: "" };
        } catch (e) {
          console.error("Erro ao adicionar usuário: ", e);
        }
      },
  
      // Função para editar um usuário
      async editarUsuario(usuario) {
        console.log("Editar usuário:", usuario);
        // Adicionar lógica de edição aqui, por exemplo, mostrar um formulário de edição.
      },
  
      // Função para excluir um usuário
      async excluirUsuario(id) {
        try {
          const userDocRef = doc(db, "users", id);
          await deleteDoc(userDocRef); // Deleta o usuário no Firestore
          this.usuarios = this.usuarios.filter(user => user.id !== id); // Atualiza a lista de usuários no front-end
          alert("Usuário excluído com sucesso.");
        } catch (e) {
          console.error("Erro ao excluir usuário:", e);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionais para melhorar o layout */
  </style>
  