export const AUTH= 'AUTH';
export const AUTH_LOADING = 'AUTH_LOADING';

export interface IUser {
  username: string;
  password: string;
  avatar: string;
  _v: any;
  _id: string;
}

export interface AuthSchema {
  user: IUser | null;
  token: string;
  loading?: boolean;
}

export interface LoginFetchData {
  msg: string;
  accessToken: string;
  user: IUser;
}

export interface RegisterFetchData {
  msg: string;
  user: IUser;
}

export interface IAuthType {
  type: string;
  payload: AuthSchema;
}


