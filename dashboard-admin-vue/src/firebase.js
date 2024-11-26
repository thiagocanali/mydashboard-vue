// Importando funções necessárias da versão modular do Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Importando Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCeUaxyOpo-L4HUhY3HbCB7Y_rjpYAinuU",
  authDomain: "mydashboardapp-50cc4.firebaseapp.com",
  projectId: "mydashboardapp-50cc4",
  storageBucket: "mydashboardapp-50cc4.firebasestorage.app",
  messagingSenderId: "608169228284",
  appId: "1:608169228284:web:963941e249f99842a9e479",
  measurementId: "G-7HBP17510V"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha a instância de autenticação e Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Instância do Firestore

// Função para obter a role do usuário no Firestore
async function getRoleFromFirestore(userId) {
  const userDoc = await getDoc(doc(db, "users", userId)); // Busca o documento do usuário no Firestore
  if (userDoc.exists()) {
    return userDoc.data().role; // Retorna a role do usuário
  }
  return "user"; // Caso o usuário não tenha uma role definida, retorna "user"
}

// Exportando as instâncias e a função para uso em outros arquivos
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getRoleFromFirestore };
