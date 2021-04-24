import API from '../api/api';
import { itemsPerPage } from '../shared/utils/constants';

const URL_POSTS = '/posts';

const getPosts = async (from = 0, limit = itemsPerPage) => {
  const queryParams = `?from=${from}&limit=${limit}`; // ?from=0&limit=5
  const response = await API.get(`${URL_POSTS}${queryParams}`); // /posts ===> /posts?from=0&limit=5
  console.log(response);
  if (!response) {
    throw new Error(response);
  }
  return response;
};

const addPost = async (post) => {
  const response = await API.post(`${URL_POSTS}`, post);
  if (response.error) {
    throw new Error('No se a podido crear el post');
  }
  return response;
};

export default {
  getPosts,
  addPost,
};
