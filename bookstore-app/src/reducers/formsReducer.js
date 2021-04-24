import { createForms } from 'react-redux-form';

const initialForm = {
  description: '',
  state: true,
  img: '',
  userId: null,
};

const loginForm = {
  email: '',
  password: '',
};

export default function formsReducer() {
  return createForms({
    postForm: initialForm,
    loginForm,
  });
}
