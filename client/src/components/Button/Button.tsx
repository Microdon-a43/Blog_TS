import React, { FC, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  max?: string;
  outline?: string;
  children: React.ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ to, max, outline, children }) => {
  return (
    <>
      {to ? (
        <Link
          to={to}
          className={`${cls.btn} ${max && cls.max} ${outline && cls[outline]}`}
        >
          {children}
        </Link>
      ) : (
        <button className={`${cls.btn} ${max && cls.max}`}>{children}</button>
      )}
    </>
  );
};

export default Button;
