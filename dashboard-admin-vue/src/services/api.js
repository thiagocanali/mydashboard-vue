import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.exemplo.com', // Altere para sua API
});

export default api;
