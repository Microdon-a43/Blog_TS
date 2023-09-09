import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/index';
import {
  AddPostPage,
  HomePage,
  LoginPage,
  MyPostsPage,
  PostPage,
  ProfilePage,
  RegisterPage,
} from './pages';

import { getUser } from './redux/actions/authActions';
import { useAppDispatch } from './redux/store';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/addpost" element={<AddPostPage />}></Route>
          <Route path="/:id" element={<PostPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/myPosts" element={<MyPostsPage />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
