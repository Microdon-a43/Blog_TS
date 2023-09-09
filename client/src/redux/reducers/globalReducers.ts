import { GlobalSchema, GlobalAction } from '../types/globalTypes';

const initialState: GlobalSchema = {
  success: '',
  error: '',
};

export const globalReducer = (
  state = initialState,
  action: GlobalAction
): GlobalSchema => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        success: action.payload,
        error: ''
      };

    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        success:''
      };
    default:
      return state;
  }
};
