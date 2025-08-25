import axios from 'axios';
import api from './axiosInstance';

const API = import.meta.env.VITE_PROJECTS;
const token = () => sessionStorage.getItem('token');

export const getMyProjects = () => api.get('/projects/my');
export const createProject = (formData) =>
    axios.post(API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token()}`
        }
    });
export const getAllProjects = () => api.get('/projects');
export const getAllProjectsAdmin = () =>
    axios.get(`${API}/admin`, { headers: { Authorization: `Bearer ${token()}` } });
