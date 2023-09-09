import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Text,  } from '../../components';
import { login } from '../../redux/actions/authActions';
import { useAppDispatch } from '../../redux/store';
import cls from './Auth.module.scss';

const LoginPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitChanges = (e: FormEvent) => {
    e.preventDefault();

    dispatch(login(userData, navigate));
  };

  return (
    <div className="container">
      <div className={cls.login}>
        <Text type="h1" className={cls.title}>Войти</Text>
        <Form className={cls.loginForm} onSubmit={submitChanges}>
          <Input type="text" className={cls.login_input} name="username" onChange={handleChanges} placeholder='Username'/>
          <Input type="password" className={cls.login_input} name="password" onChange={handleChanges} placeholder='Password'/>
          <div className={cls.forgot}>Забыли пароль?</div>
          <Button type="submit" max='true'>Войти</Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
