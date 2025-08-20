import axios from 'axios';
import rawAxios from './rawAxios.js';
const API = import.meta.env.VITE_AUTH;

export const login = (data) => rawAxios.post(`${API}/login`, data);
export const register = (data) => rawAxios.post(`${API}/register`, data);
