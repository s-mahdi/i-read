import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: ControllerRenderProps<any, any>;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ field, error, ...props }) => {
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const persianToEnglishMap: { [key: string]: string } = {
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9',
    };

    const value = e.target.value;
    let filteredValue = '';

    for (let i = 0; i < value.length; i++) {
      const val = value[i] as string;
      if (persianNumbers.includes(val)) {
        filteredValue += persianToEnglishMap[val];
      } else if (englishNumbers.includes(val)) {
        filteredValue += value[i];
      }
    }

    e.target.value = filteredValue;
    field.onChange(e);
  };

  return (
    <div>
      <input
        dir="rtl"
        className={`w-full h-12 border-solid border rounded-lg border-slate-300 px-2 text-black ${props.className}`}
        {...field}
        {...props}
        type={props.type === 'number' ? 'text' : props.type}
        onInput={props.type === 'number' ? handleNumberInput : props.onInput}
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};
