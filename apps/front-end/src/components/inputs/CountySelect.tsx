import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from '@/components';
import { useProvincesAPI } from '@/state';
import { ISignUpEmployeeFormParams } from '@/@types/ISignUpEmployeeFormParams';
import { useCountiesAPI } from '@/state/useCountiesAPI';

interface ProvinceSelectProps {
  provinceId?: string | number;
}

interface IOptions {
  label: string;
  value: string;
}

export const CountySelect: React.FC<ProvinceSelectProps> = ({ provinceId }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ISignUpEmployeeFormParams>();
  const { data } = useCountiesAPI({ provinceId });
  const [counties, setCounties] = useState<IOptions[]>([]);

  useEffect(() => {
    if (data && data.data) {
      const provinceOptions = data.data.map((province) => ({
        value: province.id.toString(),
        label: province.name,
      }));
      setCounties(provinceOptions);
    }
  }, [data]);

  const errorMessage = errors.province?.message;
  const isDisabled = data?.data === undefined;

  return (
    <Controller
      name="county"
      control={control}
      rules={{ required: 'شهرستان الزامی است' }}
      render={({ field }) => (
        <Select
          disabled={isDisabled}
          field={field}
          placeholder="شهرستان"
          options={counties}
          error={errorMessage}
        />
      )}
    />
  );
};
