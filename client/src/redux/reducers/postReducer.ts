import {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  GET_POSTS_LOADING,
  GET_POST_LOADING,
  PostActionType,
  PostSchema,
  UPDATE_POST,
} from '../types/postTypes';

const initialState: PostSchema = {
  posts: [],
  getPostsLoading: false,
  post: [],
  getPostLoading: false,
  anotherPosts: [],
};

export const postReducer = (
  state = initialState,
  action: PostActionType
): PostSchema => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case GET_POSTS_LOADING:
      return {
        ...state,
        getPostsLoading: action.payload,
      };

    case GET_POST:
      return {
        ...state,
        post: [action.payload.post],
        anotherPosts: action.payload.anotherPosts,
      };

    case GET_POST_LOADING:
      return {
        ...state,
        getPostLoading: action.payload,
      };

    case CREATE_POST:
      return {
        ...state,
        post: [action.payload],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: action.payload,
        // posts: state.posts.filter(post => post._id !== action.payload),
      };

    case UPDATE_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};
