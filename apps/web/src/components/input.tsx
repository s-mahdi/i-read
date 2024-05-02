import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<IProps> = ({ ...props }) => {
  return (
    <input
      dir="rtl"
      className={`w-full h-12 border-solid border rounded-lg border-slate-300 px-2 ${props.className}`}
      {...props}
    />
  );
};
