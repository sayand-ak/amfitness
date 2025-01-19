import axios from 'axios';

const gymApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/gym`,
});

const gymLogin = async(formData: Record<string, string>) => {
    const response = await gymApi.post('/login', formData);
    console.log(response);
    return response.data;
}

export {
    gymLogin
}
