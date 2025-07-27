// src/api/axios-instance.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://chia-tien-be.onrender.com', // URL backend NestJS
  withCredentials: true, // nếu dùng cookie/session
});

export default instance;
