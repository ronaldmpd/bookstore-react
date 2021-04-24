import { ADD_POST_SUCCESS, FETCH_POSTS_ERROR, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS } from '../actions/actionTypes';
import { getNewState } from '../shared/utils/frontend';

const initialState = {
  posts: [],
  total: 0,
  isLoading: false,
  errorMessage: null,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST: {
      return getNewState(state, {
        isLoading: true,
      });
    }
    case FETCH_POSTS_SUCCESS: {
      const {
        payload: { posts, count },
      } = action; // const posts = action.payload.posts
      // eslint-disable-next-line no-console
      console.log(posts);
      return getNewState(state, {
        posts,
        total: count,
        isLoading: false,
      });
    }
    case FETCH_POSTS_ERROR: {
      return getNewState(state, {
        isLoading: false,
      });
    }
    case ADD_POST_SUCCESS: {
      const {
        payload: { post },
      } = action;
      const newPosts = [...state.posts, post];
      return getNewState(state, {
        posts: newPosts,
        selectedPost: post,
      });
    }
    default: {
      return state;
    }
  }
}
