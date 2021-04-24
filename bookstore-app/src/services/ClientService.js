import API from '../api/api';
import { itemsPerPage } from '../shared/utils/constants';

const URL_CLIENTS = '/clients';

const getClients = async (from = 0, limit = itemsPerPage) => {
  const queryParams = `?from=${from}&limit=${limit}`; // ?from=0&limit=5
  const response = await API.get(`${URL_CLIENTS}${queryParams}`); // /posts ===> /posts?from=0&limit=5
  console.log("ClientService - getClients", response);
  if (!response) {
    throw new Error(response);
  }
  return response;
};

const addClient = async (client) => {  
  const response = await API.post(`${URL_CLIENTS}`, client);
  if (response.error) {
    throw new Error('No se ha podido crear el author');
  }
  return response;
};

export default {
  getClients,
  addClient,  
};
