import axios from 'axios';
const API = 'http://localhost:8081/api/projects';

const token = () => localStorage.getItem('token');

export const getMyProjects = () =>
    axios.get('http://localhost:8081/api/projects/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

export const createProject = (data) =>
    axios.post('http://localhost:8081/api/projects', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

export const getAllProjects = () =>
    axios.get(API, { headers: { Authorization: `Bearer ${token()}` } });
