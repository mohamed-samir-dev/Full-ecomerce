'use client';

import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './LoginForm';
import ErrorMessage from '@/app/components/common/ErrorMessage';
import { useLoginForm } from '../hooks/useLoginForm';

export default function LoginContainer() {
  const {
    formData,
    showPassword,
    rememberMe,
    loading,
    error,
    handleChange,
    handleSubmit,
    setShowPassword,
    setRememberMe,
  } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 bg-gray-50">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-2xl bg-white">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8">
            <div className="hidden lg:flex shrink-0 w-full lg:w-80 xl:w-96">
              <Image
                src="/images/login-image.webp"
                alt="Login"
                width={400}
                height={400}
                className="w-full h-full min-h-[320px] object-cover rounded-lg"
                unoptimized
              />
            </div>
            <div className="hidden lg:block w-px self-stretch bg-gray-300"></div>
            <div className="w-full lg:flex-1 lg:max-w-md">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-sans text-center mb-4 sm:mb-6 md:mb-8 text-gray-900">
              Welcome Back
              </h1>
              
              <ErrorMessage message={error} />
              
              <LoginForm
                formData={formData}
                showPassword={showPassword}
                rememberMe={rememberMe}
                loading={loading}
                onSubmit={handleSubmit}
                onShowPasswordToggle={() => setShowPassword(!showPassword)}
                onRememberMeChange={setRememberMe}
                onChange={handleChange}
              />
              
              <div className="mt-4 sm:mt-5 md:mt-6 text-center">
                <Link href="/pages/register" className="text-xs sm:text-sm cursor-pointer transition-colors text-gray-600 hover:text-blue-600">
                  Don&rsquo;t have an account? Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}