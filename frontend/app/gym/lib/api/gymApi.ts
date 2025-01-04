import axios from 'axios';

const gymApi = axios.create({
  baseURL: process.env.BACKEND_URL,
});

const gymLogin = async(formData: Record<string, string>) => {
    const response = await gymApi.post('/login', formData);
    return response.data;
}

export {
    gymLogin
}
