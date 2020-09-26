import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.10.2:3001',
});

export const registerToken = (token) => {
  instance.defaults.headers.common.Authorization = `bearer ${token}`;
};

export const signup = (email, password, name, contact) => {
  const payload = {
    email,
    password,
    name,
    contact,
  };
  return instance.post('/users/', payload);
};

export const login = (email, password) => {
  const payload = {
    email,
    password,
  };
  return instance.post('/users/login', payload);
};

export const verifyUserAccount = (verificationCode) => {
  const payload = {
    verificationCode,
  };
  return instance.post('/users/verify', payload);
};

export const getUserProfile = (token) => {
  return instance.get('/users/');
};
