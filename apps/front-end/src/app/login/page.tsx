'use client';

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

interface IForm {
  username: string;
  password: string;
}

export default function Index() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isIntranet, setIsIntranet] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IForm>();

  useEffect(() => {
    setIsIntranet(process.env.NEXT_PUBLIC_IS_INTRANET_MODE === 'true');
  }, []);

  const onSubmit = async ({ username, password }: IForm) => {
    try {
      const { data } = await api.auth.login(username, password);
      localStorage.setItem('jwtToken', data.access_token);
      router.replace('/');
    } catch (e: any) {
      console.error(e);
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
          <h2 className="font-bold">خوش آمدید</h2>
          <p className="text-neutral-500">قرائت روزانه ۵۰ آیه از قرآن کریم</p>
        </div>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="username"
            control={control}
            rules={{
              required: isIntranet ? 'شماره پرسنلی الزامی است' : 'نام کاربری',
            }}
            render={({ field }) => (
              <Input
                field={field}
                placeholder={isIntranet ? 'شماره پرسنلی' : 'شماره تلفن همراه'}
                error={errors.username?.message}
              />
            )}
          />

          <div className="flex flex-col">
            <Controller
              name="password"
              control={control}
              rules={{ required: 'کلمه عبور الزامی است' }}
              render={({ field }) => (
                <Input
                  field={field}
                  placeholder="کلمه عبور"
                  type="password"
                  error={errors.password?.message}
                />
              )}
            />
            <Link
              href="/forget-password"
              className="text-primary bg-inherit hover:underline w-full text-left text-sm mt-1"
            >
              کلمه عبور خود را فراموش کرده اید؟
            </Link>
          </div>

          <Button type="submit" className="w-full h-12 mt-2 rounded-lg">
            ورود
          </Button>

          <p className="text-center font-light">
            هنوز عضو نیستید؟{' '}
            <Link
              href="/signup"
              className="text-primary bg-inherit hover:underline"
            >
              ثبت نام کنید
            </Link>
          </p>
        </form>
      </div>

      <div className="block md:hidden mt-auto">
        <p className="text-center font-thin text-sm">
          سازمان عقیدتی سیاسی فرماندهی انتظامی جمهوری اسلامی ایران
        </p>
      </div>

      <Alert message={errorMessage} onClose={handleClose} />
    </AuthLayout>
  );
}
