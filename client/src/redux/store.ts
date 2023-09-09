import {
  createStore,
  applyMiddleware,
  combineReducers,
  AnyAction,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducer';
import { postReducer } from './reducers/postReducer';
import { AuthSchema } from './types/authTypes';
import { PostSchema } from './types/postTypes';
import { globalReducer } from './reducers/globalReducers';

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
  global: globalReducer,
});
export interface StateSchema {
  auth: AuthSchema;
  post: PostSchema;
}

export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

type AppState = ReturnType<typeof rootReducers>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
