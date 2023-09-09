import { AuthSchema, IAuthType } from '../types/authTypes';

const initialState: AuthSchema = {
  user: null,
  token: '',
  loading: false,
};

export const authReducer = (
  state = initialState,
  action: IAuthType
): AuthSchema => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case 'AUTH_LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      };
    case 'REGISTER':
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
};
