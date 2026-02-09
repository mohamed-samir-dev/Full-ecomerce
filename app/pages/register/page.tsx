'use client';

import DynamicMetadata from '@/app/components/DynamicMetadata';
import RegisterContainer from './components/RegisterContainer';

export default function RegisterPage() {
  return (
    <>
      <DynamicMetadata
        titleAr="إنشاء حساب جديد - انضم إلينا"
        titleEn="Create New Account - Join Us"
        descriptionAr="أنشئ حساب جديد في Global Shop للاستمتاع بتجربة تسوق مميزة وعروض حصرية"
        descriptionEn="Create a new account at Global Shop to enjoy a unique shopping experience and exclusive offers"
        keywordsAr={['إنشاء حساب', 'تسجيل', 'انضمام']}
        keywordsEn={['create account', 'register', 'sign up']}
      />
      <RegisterContainer />
    </>
  );
}
