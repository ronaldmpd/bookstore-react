import API from '../api/api';
import { itemsPerPage } from '../shared/utils/constants';

const URL_CARTDETAILS = '/cartdetails';


const addCartDetail = async (cartDetail) => {  
  const response = await API.post(`${URL_CARTDETAILS}`, cartDetail);
  if (response.error) {
    throw new Error('No se ha podido crear el cart');
  }
  return response;
};

export default {  
  addCartDetail,  
};