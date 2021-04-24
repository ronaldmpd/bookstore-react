import { request, received, error } from '../shared/redux/baseActions';

import UserService from '../services/UserService';
import { DO_LOGIN_ERROR, DO_LOGIN_REQUEST, DO_LOGIN_SUCCESS, DO_REGISTER_REQUEST } from './actionTypes';

export const doLogin = (email, password) => async (dispatch) => {
  dispatch(request(DO_LOGIN_REQUEST));
  try {
    const response = await UserService.doLogin(email, password);
    dispatch(received(DO_LOGIN_SUCCESS, response.data));
  } catch (e) {
    dispatch(error(DO_LOGIN_ERROR));
    // eslint-disable-next-line no-console
    console.log('AXIOS_ERROR', e);
  }
};

export const doRegister = () => async (dispatch) => {
  dispatch(request(DO_REGISTER_REQUEST));
};
