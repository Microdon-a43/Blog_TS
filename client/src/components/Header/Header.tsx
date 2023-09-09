import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../index';
import cls from './Header.module.scss';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/postsImages/avatar.svg';
import arrowSvg from '../../assets/arrow-down.svg';
import { useAppSelector } from '../../redux/store';

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={cls.header}>
      <div className="container">
        <div className={cls.wrapper}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className={cls.buttons}>
            {user ? (
              <div className={cls.userpanel}>
                <Button to="/addpost">Добавить пост</Button>
                <img src={avatar} alt="avatar" className={cls.avatar} />
                <Link
                  to="#"
                  className={cls.profile_link}
                  onFocus={() => {
                    setIsOpen(!isOpen);
                  }}
                  onBlur={() => {
                    setIsOpen(false);
                  }}
                >
                  <img src={arrowSvg} alt="arrowDown" />
                  {isOpen && (
                    <ul className={`${cls.userMenu} ${isOpen && cls.active}`}>
                      <li className={cls.profile} onMouseDown={() => {navigate('/profile')}}>
                        <Link to="">Профиль</Link>
                      </li>
                      <li className={cls.edit} onMouseDown={() => {navigate('/myPosts')}}>
                        <Link to="">Мои посты</Link>
                      </li>
                      <li className={cls.favourite} onMouseDown={() => {navigate('/favourite')}}>
                        <Link to="">Избранное</Link>
                      </li>
                      <li className={cls.logout}>
                        <Link to="/">Выйти</Link>
                      </li>
                    </ul>
                  )}
                </Link>
              </div>
            ) : (
              <>
                <Button to="/login">Войти</Button>
                <Button to="/register" outline="outline">
                  Регистрация
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
