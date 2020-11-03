import axios from 'axios';

const baseURL = 'http://192.168.10.4:3001';

const instance = axios.create({
  baseURL,
});

export const createStaticURL = (url) => {
  if (url) {
    return `${baseURL}${url}`;
  }
  return '';
};

export const registerToken = (token) => {
  instance.defaults.headers.common.Authorization = `bearer ${token}`;
};

export const flushToken = (token) => {
  instance.defaults.headers.common.Authorization = null;
};

export const validateSignupCredentials = (email, password) => {
  const payload = {
    email,
    password,
  };
  return instance.post('/users/verifySignupCred', payload);
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

export const getUserProfile = () => {
  return instance.get('/users/');
};

export const uploadUserPhoto = (imageUri) => {
  const payload = new FormData();
  payload.append('image', {
    uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
    name: 'profile.jpg',
    type: 'image/jpeg',
  });
  return instance.post('/users/photo', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      mimeType: 'multipart/form-data',
    },
  });
};

export const createEvent = (title, startTime, endTime, petId) => {
  const payload = {
    title,
    startTime,
    endTime,
    petId
  };
  return instance.post('/events/', payload);
};


export const fetchEvents = (date) => {
  return instance.get(`/events/user/${date}`);
};
