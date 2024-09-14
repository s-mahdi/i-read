'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { ISignUpEmployeeFormParams } from '@/@types/ISignUpEmployeeFormParams';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import { api } from '@/httpClient/api';
import AuthLayout from '@/components/AuthLayout';
import { ProvinceSelect } from '@/components/inputs/ProvinceSelect';
import { CountySelect } from '@/components/inputs/CountySelect';
import { UnitSelect } from '@/components/inputs/UnitSelect';
import { IUpdateUser } from '@/@types/IUpdateUser';

export default function CompleteSignUpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alertKey, setAlertKey] = useState<number>(0);

  const methods = useForm<IUpdateUser>();
  const { handleSubmit, watch } = methods;

  const [isPending, setIsPending] = useState(false);
  const provinceId = watch('province');

  const onSubmit = async (variables: IUpdateUser) => {
    setIsPending(true);
    try {
      await api.user.updateProfile({
        province: Number(variables.province),
        county: Number(variables.county),
        unit: Number(variables.unit),
      });

      router.replace('/');
    } catch (e: any) {
      setErrorMessage(e?.response?.data?.message);
      setAlertKey((prevKey) => prevKey + 1);
      console.error(e);
    } finally {
      setIsPending(false);
    }
  };

  const handleClose = () => {
    setErrorMessage(null);
  };

  return (
    <AuthLayout>
      <div className="w-96 p-4 mx-auto md:my-auto flex flex-col">
        <div className="space-y-4">
          <h2 className="font-bold">تکمیل اطلاعات</h2>
          <p>لطفا اطلاعات زیر را تکمیل کنید</p>
          <FormProvider {...methods}>
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-4">
                <ProvinceSelect />
                <CountySelect provinceId={provinceId} />
              </div>

              <UnitSelect />

              <Button
                type="submit"
                className="w-full h-12 rounded-lg"
                disabled={isPending}
              >
                {isPending ? '...' : 'ثبت'}
              </Button>
            </form>
          </FormProvider>
        </div>

        <Alert key={alertKey} message={errorMessage} onClose={handleClose} />
      </div>
    </AuthLayout>
  );
}
