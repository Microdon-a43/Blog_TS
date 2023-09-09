import React, { FC, InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  ref?: object;
}

const Input: FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  onChange,
  accept,
  name,
  className,
  id
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      accept={accept}
      name={name}
      id={id}
      className={`${cls.field} ${className}}`}
    />
  );
};

export default Input;
