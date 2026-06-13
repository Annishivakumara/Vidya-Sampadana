import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8082/api', // Centralized base url targeting your user-service
    headers: {
        'Content-Type': 'application/json',
    }
});

export default API;