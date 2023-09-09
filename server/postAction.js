import { $api } from '../../../api';

export const createPost = (finalData, navigate) => async (dispatch) => {
  const accToken = localStorage.getItem('token');
  try {
    const response = await $api.post('/createPost', finalData, {
      headers: {
        Authorization: accToken,
      },
    });
    if (response.data) {
      dispatch({
        type: 'CREATE_POST',
        payload: {
          post: response.data.post,
        },
      });
      navigate('/');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const response = await $api.get(`/post/${id}`);
    if (response.data) {
      dispatch({
        type: 'GET_POST',
        payload: {
          post: response.data.post,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteOnePost = (id) => async (dispatch) => {
  const accToken = localStorage.getItem('token');
  try {
    const response = await $api.delete(`/posts/${id}`, {
      headers: {
        Authorization: accToken,
      },
    });
    if (response.data) {
      console.log(response.data);
      dispatch({
        type: 'DELETE_POST',
        payload: {
          post: response.data.post,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await $api.get('/posts');
    if (response.data) {
      dispatch({
        type: 'GET_POSTS',
        payload: {
          posts: response.data.posts,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
