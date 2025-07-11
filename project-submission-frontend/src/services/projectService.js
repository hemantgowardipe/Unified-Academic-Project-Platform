import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/projects';

export const submitProject = (projectData) => {
    return axios.post(API_BASE_URL, projectData);
};
