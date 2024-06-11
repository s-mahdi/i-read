'use client';

import { Input } from '@/components';
import MemoLogo from '@/components/Logo';
import { authAPI } from '@/httpClient/authAPI';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface IForm {
  username: string;
  password: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Index() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IForm>();

  const isIntranet = process.env.NEXT_PUBLIC_IS_INTRANET_MODE === 'true';

  const onSubmit = async ({ username, password }: IForm) => {
    try {
      const { data } = await authAPI.login(username, password);
      localStorage.setItem('jwtToken', data.access_token);
      router.replace('/');
    } catch (e: any) {
      console.error(e);
      setErrorMessage(e?.response?.data?.message);
      setOpen(true);
    }
  };

  const onSignUpClick = () => {
    router.push('/signup');
  };

  const onForgotPasswordClick = () => {
    router.push('/forget-password');
  };

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex flex-col w-1/2 bg-primary px-20 py-40 bg-[linear-gradient(to_left,#32B7C5,rgba(0,0,0,0)),url('/login-bg.png')] bg-cover">
        <div className="flex items-center gap-x-2">
          <MemoLogo fontSize={120} />
          <h1 className="text-white">من قرآن می‌خوانم</h1>
        </div>
        <p className="mt-auto text-white">
          سازمان عقیدتی سیاسی فرماندهی انتظامی جمهوری اسلامی ایران
        </p>
      </div>

      <div className="w-96 p-4 mx-auto md:my-auto flex flex-col">
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
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: isIntranet
                    ? 'شماره پرسنلی الزامی است'
                    : 'نام کاربری',
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={
                      isIntranet ? 'شماره پرسنلی' : 'شماره تلفن همراه'
                    }
                  />
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
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-primary hover:underline w-full text-left text-sm"
              >
                کلمه عبور خود را فراموش کرده اید؟
              </button>
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

        <div className="block md:hidden mt-auto">
          <p className="text-center font-thin text-sm">
            سازمان عقیدتی سیاسی فرماندهی انتظامی جمهوری اسلامی ایران
          </p>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
