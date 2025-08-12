import axios from 'axios';
import rawAxios from './rawAxios.js';
const API = 'http://localhost:8082/api/auth';

export const login = (data) => rawAxios.post(`${API}/login`, data);
export const register = (data) => rawAxios.post(`${API}/register`, data);
