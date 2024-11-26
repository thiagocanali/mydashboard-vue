<template>
    <div>
      <h1>Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <v-btn color="primary" @click="$router.push('/')">Voltar ao Dashboard</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PermissionDenied',
  };
  </script>
  