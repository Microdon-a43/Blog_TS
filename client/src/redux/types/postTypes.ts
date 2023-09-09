export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_LOADING = 'GET_POSTS_LOADING';
export const GET_POST = 'GET_POST';
export const GET_POST_LOADING = 'GET_POST_LOADING';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export interface IPost {
  picture: string;
  title: string;
  category: string;
  description: string;
  likes: string[];
  createdAT: Date;
  views: number;
  _v: any;
  _id: string;
}

export interface CreateFetchData {
  title: string;
  description: string;
  category: string;
  picture: string;
}

export interface DeleteFetchData {
  id: string;
}
export interface UpdateFetchData {
  post: IPost[];
}

export interface PostSchema {
  posts: IPost[];
  getPostsLoading: boolean;
  post: IPost[];
  getPostLoading: boolean;
  anotherPosts: IPost[];
}

export interface GetPostsType {
  type: typeof GET_POSTS;
  payload: IPost[];
}

export interface GetPostsLoadingType {
  type: typeof GET_POSTS_LOADING;
  payload: boolean;
}

export interface GetPostType {
  type: typeof GET_POST;
  payload: {
    post: IPost;
    anotherPosts: IPost[];
  };
}

export interface GetPostLoadingType {
  type: typeof GET_POST_LOADING;
  payload: boolean;
}

export interface CreatePost {
  type: typeof CREATE_POST;
  payload: IPost;
}

export interface DeletePost {
  type: typeof DELETE_POST;
  payload: IPost[];
}

export interface UpdatePost {
  type: typeof UPDATE_POST;
  payload: IPost[];
}

export type PostActionType =
  | GetPostsType
  | GetPostsLoadingType
  | GetPostType
  | GetPostLoadingType
  | CreatePost
  | DeletePost
  | UpdatePost;
