'use client';

import { IForgetPasswordParams } from '@/@types/IForgetPasswordParams';
import { Input } from '@/components';
import Button from '@/components/Button';
import MemoLogo from '@/components/icons/Logo';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Alert from '@/components/Alert';
import { api } from '@/httpClient/api';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';

export default function Index() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isIntranet = process.env.NEXT_PUBLIC_IS_INTRANET_MODE === 'true';

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IForgetPasswordParams>();

  const onSubmit = async ({
    username,
    newPassword,
    nationalCode,
  }: IForgetPasswordParams) => {
    try {
      await api.auth.forgetPassword({
        username,
        nationalCode,
        newPassword,
      });
      router.replace('/login');
    } catch (e: any) {
      setErrorMessage(e?.response?.data?.message);
    }
  };

  const handleClose = () => {
    setErrorMessage(null);
  };

  return (
    <AuthLayout>
      <div className="space-y-4">
        <div className="flex flex-col md:hidden justify-center items-center py-8 space-y-2">
          <MemoLogo fontSize={120} primary />
          <h1 className="text-primary">من قرآن می‌خوانم</h1>
        </div>
        <div>
          <h2 className="font-bold">بازیابی کلمه عبور</h2>
        </div>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="username"
            control={control}
            rules={{
              required: isIntranet
                ? 'شماره پرسنلی الزامی است'
                : 'شماره تلفن همراه الزامی است',
            }}
            render={({ field }) => (
              <Input
                field={field}
                placeholder={isIntranet ? 'شماره پرسنلی' : 'شماره تلفن همراه'}
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            name="nationalCode"
            control={control}
            rules={{ required: 'کد ملی الزامی است' }}
            render={({ field }) => (
              <Input
                field={field}
                type="number"
                placeholder="کد ملی"
                error={errors.nationalCode?.message}
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            rules={{ required: 'کلمه عبور جدید الزامی است' }}
            render={({ field }) => (
              <Input
                field={field}
                type="password"
                placeholder="کلمه عبور جدید"
                error={errors.newPassword?.message}
              />
            )}
          />
          <Button type="submit" className="w-full h-12 mt-2 rounded-lg">
            تغییر کلمه عبور
          </Button>
          <Link
            href="/login"
            className="text-primary bg-inherit hover:underline w-full text-center mt-4"
          >
            بازگشت به صفحه ورود
          </Link>
        </form>
      </div>

      <Alert message={errorMessage} onClose={handleClose} />
    </AuthLayout>
  );
}
