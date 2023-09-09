import React, { FC, FormHTMLAttributes } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  children: React.ReactNode;
}

const Form: FC<FormProps> = ({ className, children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={className || ''}>
      {children}
    </form>
  );
};
export default Form;
