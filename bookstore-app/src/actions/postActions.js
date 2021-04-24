import { actions } from 'react-redux-form';

import { request, received, error } from '../shared/redux/baseActions';
import {
  ADD_POST_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from './actionTypes';

import PostService from '../services/PostService';

export const fetchPosts = (from = 0, limit = 5) => async (dispatch) => {
  dispatch(request(FETCH_POSTS_REQUEST));
  try {
    const response = await PostService.getPosts(from, limit);
    dispatch(received(FETCH_POSTS_SUCCESS, response.data));
  } catch (err) {
    dispatch(error(FETCH_POSTS_ERROR));
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export const addPost = (post) => async (dispatch) => {
  dispatch(request(ADD_POST_REQUEST));
  try {
    const response = await PostService.addPost(post);
    dispatch(received(ADD_POST_SUCCESS, response.data));
  } catch (e) {
    dispatch(error(ADD_POST_ERROR));
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const resetPostForm = () => (dispatch) => {
  dispatch(actions.reset('postForm'));
};
