import API from '../api/api';
import firebase from './firebase';
import 'firebase/storage';

const URL_USERS = '/users';

const storage = firebase.storage();

const doLogin = async (email, password) => {
  const response = await API.post('/login', { email, password });
  if (response.error) {
    throw new Error('not authorized');
  }
  return response;
};

const getUsers = async (from = 0, limit = 5) => {
  const queryParams = `?from=${from}&limit=${limit}`; // ?from=0&limit=5
  const response = await API.get(`${URL_USERS}${queryParams}`, {
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.error) {
    throw new Error('ha ocurrido un error');
  }
  return response;
};

const uploadImage = async (image, name) => {
  const storageRef = storage.ref();
  const usersRef = storageRef.child(`images/${name}`);
  const snapshot = await usersRef.put(image);
  if (!snapshot) {
    throw new Error('file not found');
  }
};

const addUser = async (user, image) => {
  uploadImage(image, user.img);
  const response = await API.post(`${URL_USERS}`, user);
  if (response.error) {
    throw new Error('No se ha podido crear el usuario');
  }
  return response;
};

const getURLImage = async (name) => {
  const pathRef = storage.ref(`images/${name}`);
  const url = await pathRef.getDownloadURL();
  if (!url) {
    throw new Error('image not found');
  }
  return url;
};

export default {
  doLogin,
  getUsers,
  addUser,
  getURLImage,
};
