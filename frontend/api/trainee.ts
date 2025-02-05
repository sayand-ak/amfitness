import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.20.3:6000/api/trainee', 
});

export default api;
