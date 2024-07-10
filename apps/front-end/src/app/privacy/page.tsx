import React from 'react';
import AuthLayout from '@/components/AuthLayout';

const PrivacyPolicy = () => {
  return (
    <AuthLayout>
      <div className="w-full md:w-1/2 mx-auto my-auto flex flex-col">
        <div className="p-8 font-sans text-right rtl bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold mb-6">سیاست حفظ حریم‌خصوصی</h1>
          <p className="mb-4">
            «من قرآن می‌خوانم» به حریم خصوصی کاربران خود احترام می‌گذارد و متعهد
            به حفاظت از اطلاعات شخصی است که شما در اختیار آن می‌گذارید. از آنجا
            که جمع‌آوری و پردازش اطلاعات شخصی بخش غیرقابل اجتنابی در فرایندهای
            مبتنی بر گوشی همراه و اینترنت است، لذا به منظور آگاهی کامل از سیاست
            و عملکرد «من قرآن می‌خوانم» در این زمینه، مطالعه این سند تحت عنوان
            «سیاست حفظ حریم‌خصوصی» ضروری است.
          </p>
          <h2 className="text-xl font-semibold mb-4">
            اطلاعاتی که ما جمع‌آوری می‌کنیم
          </h2>
          <p className="mb-4">ما اطلاعات زیر را از کاربران جمع‌آوری می‌کنیم:</p>
          <ul className="list-disc list-inside mb-4">
            <li>شماره ملی</li>
            <li>شماره تلفن</li>
          </ul>
          <h2 className="text-xl font-semibold mb-4">استفاده از اطلاعات</h2>
          <p className="mb-4">
            اطلاعات جمع‌آوری شده برای اهداف زیر استفاده می‌شود:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>تایید هویت کاربران</li>
            <li>ارتباط با کاربران در مورد بروزرسانی‌ها و اطلاعیه‌های مهم</li>
            <li>بهبود و شخصی‌سازی خدمات ما</li>
          </ul>
          <h2 className="text-xl font-semibold mb-4">محافظت از اطلاعات</h2>
          <p className="mb-4">
            ما تعهد می‌دهیم که اطلاعات شما را با استفاده از تدابیر امنیتی مناسب
            محافظت کنیم و از دسترسی، افشا یا سوءاستفاده غیرمجاز جلوگیری نماییم.
          </p>
          <h2 className="text-xl font-semibold mb-4">
            به اشتراک‌گذاری اطلاعات
          </h2>
          <p className="mb-4">
            ما اطلاعات شخصی شما را با هیچ شخص یا سازمان ثالثی به اشتراک
            نمی‌گذاریم، مگر در موارد قانونی و با رضایت شما.
          </p>
          <h2 className="text-xl font-semibold mb-4">حقوق کاربران</h2>
          <p className="mb-4">
            کاربران حق دارند به اطلاعات شخصی خود دسترسی داشته باشند و در صورت
            نیاز آن‌ها را تصحیح یا حذف کنند. برای استفاده از این حقوق می‌توانید
            با ما تماس بگیرید.
          </p>
          <h2 className="text-xl font-semibold mb-4">تماس با ما</h2>
          <p className="mb-4">
            در صورت داشتن هرگونه سوال یا نگرانی در مورد سیاست حفظ حریم‌خصوصی،
            لطفاً با ما تماس بگیرید.
          </p>
          <p className="mb-4">با احترام، تیم من قرآن می‌خوانم</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PrivacyPolicy;
