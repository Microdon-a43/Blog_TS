import { Dispatch } from 'redux';
import { $api } from '../../api';
import { IStateUserData } from '../../types/auth';
import {
  AUTH_LOADING,
  LoginFetchData,
  RegisterFetchData,
} from '../types/authTypes';

export const login =
  (userData: IStateUserData, navigate: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: AUTH_LOADING, payload: { loading: true } });

      const res = await $api.post<LoginFetchData>('/login', userData);
      if (res.data) {
        localStorage.setItem('token', res.data.accessToken);
        dispatch({
          type: 'AUTH',
          payload: {
            user: res.data.user,
            token: res.data.accessToken,
          },
        });
        navigate('/');
      }

      dispatch({ type: AUTH_LOADING, payload: { loading: false } });
    } catch (error) {
      console.log(error);
      dispatch({ type: AUTH_LOADING, payload: { loading: false } });
    }
  };

export const register =
  (registerData: IStateUserData, navigate: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: AUTH_LOADING, payload: { loading: true } });

      const res = await $api.post<RegisterFetchData>('/register', registerData);
      if (res.data) {
        console.log(res.data);
        dispatch({
          type: 'REGISTER',
          payload: {
            user: res.data.user,
          },
        });
        navigate('/login');
      }
      dispatch({ type: AUTH_LOADING, payload: { loading: false } });
    } catch (error) {
      console.log(error);
      dispatch({ type: AUTH_LOADING, payload: { loading: false } });
    }
  };

export const getUser = () => async (dispatch: Dispatch<any>) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const res = await $api.get('/user');
      dispatch({
        type: 'AUTH',
        payload: {
          user: res.data.user,
          token: res.data.accessToken,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};


