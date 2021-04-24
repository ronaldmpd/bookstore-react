import {
  DO_LOGIN_ERROR,
  DO_LOGIN_REQUEST,
  DO_LOGIN_SUCCESS,
} from '../actions/actionTypes';
import { getNewState } from '../shared/utils/frontend';

const initialState = {
  isLogged: false,
  isLoading: false,
  token: localStorage.getItem('token') || null,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case DO_LOGIN_REQUEST: {
      return getNewState(state, {
        isLoading: true,
      });
    }
    case DO_LOGIN_SUCCESS: {
      const {
        payload: { token, user },
      } = action;
      localStorage.setItem('token', token);
      return getNewState(state, {
        token,
        user,
        isLogged: true,
        isLoading: false,
      });
    }
    case DO_LOGIN_ERROR: {
      localStorage.removeItem('token');
      return getNewState(state, {
        user: null,
        isLoading: false,
        isLogged: false,
        token: null,
      });
    }
    default:
      return state;
  }
}
