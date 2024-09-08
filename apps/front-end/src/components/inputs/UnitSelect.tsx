import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from '@/components';
import { useUnitsAPI } from '@/state/useUnitsAPI';
import { ISignUpEmployeeFormParams } from '@/@types/ISignUpEmployeeFormParams';

interface IOptions {
  label: string;
  value: string;
}

export const UnitSelect = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ISignUpEmployeeFormParams>();
  const { data } = useUnitsAPI();
  const [units, setUnits] = useState<IOptions[]>([]);

  useEffect(() => {
    if (data && data.data) {
      const unitsOptions = data.data.map((u) => ({
        value: u.id.toString(),
        label: u.name,
      }));
      setUnits(unitsOptions);
    }
  }, [data]);

  const errorMessage = errors.unit?.message;

  return (
    <Controller
      name="unit"
      control={control}
      rules={{ required: 'یگان الزامی است' }}
      render={({ field }) => (
        <Select
          field={field}
          placeholder="یگان"
          options={units}
          error={errorMessage}
        />
      )}
    />
  );
};
