'use client';

import DynamicMetadata from '@/app/components/DynamicMetadata';
import LoginContainer from './components/LoginContainer';

export default function LoginPage() {
  return (
    <>
      <DynamicMetadata
        titleAr="تسجيل الدخول - ادخل إلى حسابك"
        titleEn="Login - Access Your Account"
        descriptionAr="سجل الدخول إلى حسابك في Global Shop للوصول إلى طلباتك وقائمة الأمنيات"
        descriptionEn="Login to your Global Shop account to access your orders and wishlist"
        keywordsAr={['تسجيل الدخول', 'حساب', 'دخول']}
        keywordsEn={['login', 'account', 'sign in']}
      />
      <LoginContainer />
    </>
  );
}
