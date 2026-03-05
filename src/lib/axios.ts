import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const createInstance = (baseURL: string) => {
  const instance = axios.create({ baseURL, timeout: 10000 });
  instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) useAuthStore.getState().logout();
      return Promise.reject(error.response?.data?.message || error.message || 'Something went wrong');
    }
  );
  return instance;
};

export const authApi  = createInstance(import.meta.env.VITE_AUTH_API_URL  || 'http://localhost:5270');
export const menuApi  = createInstance(import.meta.env.VITE_MENU_API_URL  || 'http://localhost:5271');
export const orderApi = createInstance(import.meta.env.VITE_ORDER_API_URL || 'http://localhost:5272');