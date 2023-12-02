import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bank-system-binarynumbers.vercel.app/', 
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});


export default api;