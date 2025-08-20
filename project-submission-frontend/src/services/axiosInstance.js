import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE,
    timeout: 15000,
});

// attach token automatically from sessionStorage
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// handle expired token / 401 centrally
api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;
        const msg = error.response?.data?.message;
        if (status === 401 || msg === 'Token expired') {
            // clear and force redirect to login
            sessionStorage.clear();
            // optional: show a message to user
            window.location.href = '/'; // or specific login path
        }
        return Promise.reject(error);
    }
);

export default api;
