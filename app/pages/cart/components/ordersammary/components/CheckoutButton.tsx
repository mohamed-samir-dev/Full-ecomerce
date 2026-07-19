import { LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { CheckoutButtonProps } from '../../../types/cart';

export default function CheckoutButton({ isDarkMode, isArabic, user, onClearCart }: CheckoutButtonProps) {
  return (
    <div className="space-y-3">
      {user ? (
        <Link
          href="/pages/checkout"
          className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-95 ${isArabic ? 'flex-row-reverse' : ''}`}
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          <LockClosedIcon className="w-4 h-4" />
          {isArabic ? 'إتمام الطلب' : 'Proceed to Checkout'}
        </Link>
      ) : (
        <div className="space-y-2.5">
          <div
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border ${isArabic ? 'flex-row-reverse' : ''} ${
              isDarkMode ? 'border-white/10 bg-white/3 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500'
            }`}
          >
            <LockClosedIcon className="w-4 h-4" />
            <span className="text-xs font-medium">
              {isArabic ? 'يجب تسجيل الدخول للمتابعة' : 'Login required to checkout'}
            </span>
          </div>
          <Link
            href="/pages/login"
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-95 ${isArabic ? 'flex-row-reverse' : ''}`}
            style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
          >
            <LockClosedIcon className="w-4 h-4" />
            {isArabic ? 'تسجيل الدخول للمتابعة' : 'Login to Continue'}
          </Link>
        </div>
      )}

      <button
        onClick={onClearCart}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-sm border transition-all hover:border-red-400 hover:text-red-500 active:scale-95 ${
          isDarkMode ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'
        }`}
      >
        {isArabic ? 'إفراغ السلة' : 'Clear Cart'}
      </button>
    </div>
  );
}
