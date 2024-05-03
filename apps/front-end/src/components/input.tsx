import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      dir="rtl"
      className={`w-full h-12 border-solid border rounded-lg border-slate-300 px-2 ${props.className}`}
      {...props}
    />
  );
};
