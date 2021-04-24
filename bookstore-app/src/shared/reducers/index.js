import { combineReducers } from 'redux';
import post from '../../reducers/postReducer';
import auth from '../../reducers/authReducer';
import formsReducer from '../../reducers/formsReducer';

const rootReducer = combineReducers({
  post,
  auth,
  ...formsReducer(),
});

export default rootReducer;
