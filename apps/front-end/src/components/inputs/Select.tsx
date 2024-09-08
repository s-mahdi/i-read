import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  field: ControllerRenderProps<any, any>;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  field,
  options,
  error,
  ...props
}) => {
  return (
    <div className="flex-1">
      <select
        dir="rtl"
        className={`w-full h-12 border-l-8 border-transparent outline outline-1 rounded-lg outline-slate-300 px-2 text-black ${props.className}`}
        {...field}
        {...props}
      >
        <option selected value="" disabled>
          {props.placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};
