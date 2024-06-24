import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  ...props
}) => {
  const baseClass = `bg-primary text-white hover:text-white focus:text-white transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`;

  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
