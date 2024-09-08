import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from '@/components';
import { useProvincesAPI } from '@/state';
import { ISignUpEmployeeFormParams } from '@/@types/ISignUpEmployeeFormParams';

interface IOptions {
  label: string;
  value: string;
}

export const ProvinceSelect = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ISignUpEmployeeFormParams>();
  const { data } = useProvincesAPI();
  const [provinces, setProvinces] = useState<IOptions[]>([]);

  useEffect(() => {
    if (data && data.data) {
      const provinceOptions = data.data.map((province) => ({
        value: province.id.toString(),
        label: province.name,
      }));
      setProvinces(provinceOptions);
    }
  }, [data]);

  const errorMessage = errors.province?.message as string | undefined;

  return (
    <Controller
      name="province"
      control={control}
      rules={{ required: 'استان الزامی است' }}
      render={({ field }) => (
        <Select
          field={field}
          placeholder="استان"
          options={provinces}
          error={errorMessage}
        />
      )}
    />
  );
};
