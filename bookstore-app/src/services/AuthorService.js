import API from '../api/api';
import { itemsPerPage } from '../shared/utils/constants';

const URL_AUTHORS = '/authors';

const getAuthors = async (from = 0, limit = itemsPerPage) => {
  const queryParams = `?from=${from}&limit=${limit}`; // ?from=0&limit=5
  const response = await API.get(`${URL_AUTHORS}${queryParams}`); // /posts ===> /posts?from=0&limit=5
  console.log("AuthorSevcies - getAuthors", response);
  if (!response) {
    throw new Error(response);
  }
  return response;
};

const addAuthor = async (author) => {  
  const response = await API.post(`${URL_AUTHORS}`, author);
  if (response.error) {
    throw new Error('No se ha podido crear el author');
  }
  return response;
};

export default {
  getAuthors,
  addAuthor,  
};
