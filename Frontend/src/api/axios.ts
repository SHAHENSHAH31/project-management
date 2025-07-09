import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await API.post('/auth/login', { email, password });
console.log('==============> hi',response);
    return response.data; 
  } catch (error: any) {
    console.log('==============> hi',error);
    return {
      success: false,
      message:
        error.response?.data?.message || 'Login failed. Please try again.',
    };
  }
};

export const registerApi = async (email: string, password: string) => {
  try {
    const response = await API.post('/auth/register', { email, password });
console.log('==============> hi',response);
    return response.data; 
  } catch (error: any) {
     console.log('==============> hi',error);
    return {
      success: false,
      message:
        error.response?.data?.message || 'Login failed. Please try again.',
    };
  }
};


