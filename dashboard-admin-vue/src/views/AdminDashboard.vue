<template>
  <div>
    <h1 v-if="isAdmin">Bem-vindo ao Dashboard!</h1>
    <h1 v-else>Você não tem permissão para acessar esta página.</h1>

    <!-- Gráfico -->
    <line-chart v-if="isAdmin" :chart-data="chartData" :chart-options="chartOptions"></line-chart>

    <!-- Lista de Dados -->
    <ul v-if="isAdmin">
      <li v-for="item in dados" :key="item.id">{{ item.nome }}</li>
    </ul>

    <!-- Tabela -->
    <v-data-table v-if="isAdmin" :headers="headers" :items="dados" class="elevation-1"></v-data-table>

    <!-- Cards -->
    <v-container v-if="isAdmin" class="d-flex flex-column justify-center align-center">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Título</v-card-title>
            <v-card-text>Texto do card</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Botão de Logout -->
    <v-btn @click="logout" color="red" v-if="isAdmin">Logout</v-btn>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import api from '@/services/api';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default defineComponent({
  name: 'AdminDashboard',
  components: {
    LineChart,
  },
  data() {
    return {
      dados: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome' },
      ],
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Vendas',
            data: [30, 40, 50, 60, 70],
            borderColor: '#42A5F5',
            fill: false,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Vendas Mensais',
          },
        },
      },
      isAdmin: false, // Variável para controle da permissão
    };
  },
  mounted() {
    this.checkAdminRole();
    this.fetchData();
  },
  methods: {
    async checkAdminRole() {
      const user = getAuth().currentUser;
      if (!user) {
        // Se não houver um usuário autenticado, redireciona para a página de login
        this.$router.push('/login');
        return;
      }

      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists() && userDoc.data().role === "admin") {
        this.isAdmin = true; // Permissão concedida, o usuário é admin
      } else {
        this.isAdmin = false; // Se não for admin, redireciona ou mostra mensagem de erro
        this.$router.push('/'); // Ou redireciona para a página inicial
      }
    },
    fetchData() {
      api.get('/dados')
        .then((response) => {
          this.dados = response.data;
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
        });
    },
    logout() {
      auth.signOut()
        .then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error('Erro ao realizar logout:', error);
        });
    },
  },
});
</script>
