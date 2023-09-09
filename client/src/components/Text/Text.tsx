import React, { FC } from 'react';
import cls from './Text.module.scss';

interface TextProps {
  type: string;
  className?: string;
  children: React.ReactNode;
}

const Text: FC<TextProps> = ({ type, className, children }) => {
  return (
    <>
      {type === 'span' && (
        <span className={`${cls.title} ${className}`}>{children}</span>
      )}
      {type === 'h1' && (
        <h1 className={`${cls.title}  ${className}`}>{children}</h1>
      )}
      {type === 'h2' && (
        <h2 className={`${cls.title}  ${className}`}>{children}</h2>
      )}
      {type === 'p' && (
        <p className={`${cls.title}  ${className}`}>{children}</p>
      )}
    </>
  );
};

export default Text;
