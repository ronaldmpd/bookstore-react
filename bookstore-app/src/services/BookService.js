import API from '../api/api';
import { itemsPerPage } from '../shared/utils/constants';
import firebase from './firebase';
import 'firebase/storage';

const URL_BOOKS = '/books';
const storage = firebase.storage();

const getBooks = async (from = 0, limit = itemsPerPage) => {
  const queryParams = `?from=${from}&limit=${limit}`; // ?from=0&limit=5
  const response = await API.get(`${URL_BOOKS}${queryParams}`); // /posts ===> /posts?from=0&limit=5
  console.log("BookSevcies - getBooks", response);
  if (!response) {
    throw new Error(response);
  }
  return response;
};

const getBookById = async (id) => {
  const queryParams = `/${id}`; // /1
  const response = await API.get(`${URL_BOOKS}${queryParams}`); // /books ===> /books/1
  console.log("BookSevcies - getBookById: ", response);
  if (!response) {
    throw new Error(response);
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

const addBook = async (book, image) => {
  uploadImage(image, book.img);
  const response = await API.post(`${URL_BOOKS}`, book);
  if (response.error) {
    throw new Error('No se ha podido crear el book');
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
  getBooks,
  addBook,
  getURLImage,
  getBookById,
};
