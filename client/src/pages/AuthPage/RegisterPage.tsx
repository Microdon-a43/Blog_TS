import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Text,  } from '../../components';
import { register } from '../../redux/actions/authActions';
import { useAppDispatch } from '../../redux/store';
import { IStateUserData } from '../../types/auth';
import cls from './Auth.module.scss';

const RegisterPage = () => {
  const [userData, setUserData] = useState<IStateUserData>({
    username: '',
    password: '',
    confirmedPass: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitChanges = (e: FormEvent) => {
    e.preventDefault();

    if (userData.password !== userData.confirmedPass) {
      alert('Пароли не совпадают');
    }

    const registerData = {
      username: userData.username,
      password: userData.password,
    };

    dispatch(register(registerData, navigate));
  };
  return (
    <div className="container">
      <div className={cls.register}>
        <Text type="h1" className={cls.title}>
          Регистрация
        </Text>
        <Form className={cls.registerForm} onSubmit={submitChanges}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChanges}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChanges}
          />
          <Input
            type="password"
            name="confirmedPass"
            placeholder="Confirm Password"
            onChange={handleChanges}
          />
          <Button type="submit" max="true">
            Зарегистрироваться
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
