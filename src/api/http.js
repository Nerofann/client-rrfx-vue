import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
})

http.interceptors.request.use((config) => {
    const token = useLocalStorage('access_token', null).value;
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
})

http.interceptors.response.use(
    (response => response),
    (error) => {
        return Promise.reject(error);
    }
)
