import apiClient from './apiClient';

const API_URL = process.env.REACT_APP_IAM_SERVICE_URL || 'http://localhost:8080/api/auth';

export const login = async (credentials) => {
  const response = await apiClient.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post(`${API_URL}/register`, userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
