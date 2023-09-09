import { Dispatch } from 'redux';
import { $api } from '../../api';
import {
  ERROR,
  ErrorMessageType,
  SUCCESS,
  SuccessMessageType,
} from '../types/globalTypes';
import {
  CreateFetchData,
  CreatePost,
  CREATE_POST,
  DeletePost,
  DELETE_POST,
  GetPostLoadingType,
  GetPostsLoadingType,
  GetPostsType,
  GetPostType,
  GET_POST,
  GET_POSTS,
  GET_POSTS_LOADING,
  GET_POST_LOADING,
  PostSchema,
  UpdateFetchData,
  UpdatePost,
} from '../types/postTypes';

export const getPosts =
  () => async (dispatch: Dispatch<GetPostsType | GetPostsLoadingType>) => {
    try {
      dispatch({ type: GET_POSTS_LOADING, payload: true });

      const res = await $api.get('/posts');

      if (res.data) {
        dispatch({
          type: GET_POSTS,
          payload: res.data.posts,
        });
      }
      dispatch({ type: GET_POSTS_LOADING, payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_POSTS_LOADING, payload: false });
    }
  };

export const getPost =
  (id: string) =>
  async (dispatch: Dispatch<GetPostType | GetPostLoadingType>) => {
    try {
      dispatch({ type: GET_POST_LOADING, payload: true });

      const res = await $api.get(`/post/${id}`);
      if (res.data) {
        dispatch({
          type: GET_POST,
          payload: {
            post: res.data.post,
            anotherPosts: res.data.anotherPosts,
          },
        });
      }
      dispatch({ type: GET_POST_LOADING, payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_POST_LOADING, payload: false });
    }
  };

export const createPost =
  (responseData: CreateFetchData, navigate: any) =>
  async (
    dispatch: Dispatch<CreatePost | SuccessMessageType | ErrorMessageType>
  ) => {
    const token = localStorage.getItem('token');
    try {
      const res = await $api.post('/createPost', responseData, {
        headers: {
          Authorization: token,
        },
      });
      if (res.data) {
        if (res.data.message === 'Пост создан успешно') {
          setTimeout(() => {
            navigate('/');
          }, 1500);
          dispatch({ type: SUCCESS, payload: res.data.message });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

export const updatePost =
  (id: UpdateFetchData) => async (dispatch: Dispatch<UpdatePost>) => {
    const token = localStorage.getItem('token');
    try {
    } catch (error) {
      console.log(error);
    }
  };

export const deletePost =
  (id: string) => async (dispatch: Dispatch<DeletePost>) => {
    const token = localStorage.getItem('token');
    try {
      const res = await $api.delete(`/posts/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if(res.data) {
        dispatch({type: DELETE_POST, payload: res.data.posts})
      }
    } catch (error) {
      console.log(error);
    }
  };
