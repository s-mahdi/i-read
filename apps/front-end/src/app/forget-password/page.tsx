'use client';

import { IForgetPasswordParams } from '@/@types/IForgetPasswordParams';
import { Input } from '@/components';
import MemoLogo from '@/components/Logo';
import { authAPI } from '@/httpClient/authAPI';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function Index() {
  const router = useRouter();
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
      await authAPI.forgetPassword({
        username,
        nationalCode,
        newPassword,
      });
      router.replace('/login');
    } catch (e) {
      console.error(e);
    }
  };

  const onLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="flex mx-auto h-screen">
      <div className="hidden md:flex flex-col w-1/2 bg-primary px-20 py-40 bg-[linear-gradient(to_left,#32B7C5,rgba(0,0,0,0)),url('/login-bg.png')] bg-cover">
        <div className="flex items-center gap-x-2">
          <MemoLogo fontSize={120} />
          <h1 className="text-white">من قرآن می‌خوانم</h1>
        </div>
        <p className="mt-auto text-white">
          تولید شده در عقیدتی سیاسی فرماندهی انتظامی استان همدان
        </p>
      </div>

      <div className="w-96 p-4 mx-auto my-auto flex flex-col">
        <div className="space-y-4">
          <h2 className="font-bold">بازیابی کلمه عبور</h2>

          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'شماره پرسنلی الزامی است' }}
                render={({ field }) => (
                  <Input {...field} placeholder="شماره پرسنلی" />
                )}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="nationalCode"
                control={control}
                rules={{ required: 'کد ملی الزامی است' }}
                render={({ field }) => (
                  <Input {...field} placeholder="کد ملی" />
                )}
              />
              {errors.nationalCode && (
                <p className="text-red-500">{errors.nationalCode.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="newPassword"
                control={control}
                rules={{ required: 'کلمه عبور جدید الزامی است' }}
                render={({ field }) => (
                  <Input {...field} placeholder="کلمه عبور جدید" />
                )}
              />
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-primary w-full h-12 rounded-lg text-white"
            >
              تغییر کلمه عبور
            </button>
            <button
              type="button"
              onClick={onLoginClick}
              className="text-primary hover:underline w-full text-center mt-4"
            >
              بازگشت به صفحه ورود
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
