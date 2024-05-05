'use client';

import { Input } from '@/components';
import MemoLogo from '@/components/Logo';
import { authAPI } from '@/httpClient/authAPI';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface IForm {
  username: string;
  password: string;
}

export default function Index() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IForm>();

  const onSubmit = async ({ username, password }: IForm) => {
    try {
      const { data } = await authAPI.login(username, password);
      localStorage.setItem('jwtToken', data.access_token);
      router.replace('/');
    } catch (e) {
      console.error(e);
    }
  };

  const onSignUpClick = () => {
    router.push('/signup');
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
          <div>
            <h2 className="font-bold">خوش آمدید</h2>
            <p className="text-neutral-500">قرائت روزانه ۵۰ آیه از قرآن کریم</p>
          </div>
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
                name="password"
                control={control}
                rules={{ required: 'کلمه عبور الزامی است' }}
                render={({ field }) => (
                  <Input {...field} placeholder="کلمه عبور" type="password" />
                )}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-primary w-full h-12 rounded-lg text-white"
            >
              ورود
            </button>
            <p className="text-center font-light">
              هنوز عضو نیستید؟{' '}
              <button
                type="button"
                onClick={onSignUpClick}
                className="text-primary hover:underline hover"
              >
                ثبت نام کنید
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
