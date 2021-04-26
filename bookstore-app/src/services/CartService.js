import API from '../api/api';
import { itemsPerPage } from '../shared/utils/constants';

const URL_CARTS = '/carts';


const addCart = async (cart) => {  
  const response = await API.post(`${URL_CARTS}`, cart);
  if (response.error) {
    throw new Error('No se ha podido crear el cart');
  }
  return response;
};

export default {  
  addCart,  
};