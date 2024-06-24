'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { ISignUpEmployeeFormParams } from '@/@types/ISignUpEmployeeFormParams';
import { Input } from '@/components';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import { api } from '@/httpClient/api';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';

export default function SignUpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alertKey, setAlertKey] = useState<number>(0);
  const isIntranet = process.env.NEXT_PUBLIC_IS_INTRANET_MODE === 'true';

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ISignUpEmployeeFormParams>();

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (variables: ISignUpEmployeeFormParams) => {
    setIsPending(true);
    try {
      const { data } = isIntranet
        ? await api.auth.signUpEmployee(variables)
        : await api.auth.signUp(variables);

      localStorage.setItem('jwtToken', data.access_token);
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
      <div className="space-y-4">
        <h2 className="font-bold">ثبت نام</h2>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: 'نام الزامی است' }}
            render={({ field }) => (
              <Input
                field={field}
                placeholder="نام"
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'نام خانوادگی الزامی است' }}
            render={({ field }) => (
              <Input
                field={field}
                placeholder="نام خانوادگی"
                error={errors.lastName?.message}
              />
            )}
          />
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
                type="number"
                placeholder={isIntranet ? 'شماره پرسنلی' : 'شماره تلفن همراه'}
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            name="nationalCode"
            control={control}
            rules={{ required: 'کد ملی الزامی است.' }}
            render={({ field }) => (
              <Input
                field={field}
                type="number"
                placeholder="کد ملی"
                error={errors.nationalCode?.message}
              />
            )}
          />
          {isIntranet && (
            <Controller
              name="rank"
              control={control}
              rules={{ required: 'درجه الزامی است' }}
              render={({ field }) => (
                <Input
                  field={field}
                  placeholder="درجه"
                  error={errors.rank?.message}
                />
              )}
            />
          )}
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
          <Button
            type="submit"
            className="w-full h-12 rounded-lg"
            disabled={isPending}
          >
            {isPending ? '...' : 'ثبت نام'}
          </Button>
          <p className="text-center font-light">
            عضو هستید؟
            <Link
              href={isPending ? '' : '/login'}
              className="text-primary bg-inherit hover:underline"
            >
              وارد شوید
            </Link>
          </p>
        </form>
      </div>

      <Alert key={alertKey} message={errorMessage} onClose={handleClose} />
    </AuthLayout>
  );
}
