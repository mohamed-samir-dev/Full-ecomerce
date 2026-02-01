import { LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {CheckoutButtonProps}from '../../../types/cart'


export default function CheckoutButton({ isDarkMode, isArabic, user, onClearCart }: CheckoutButtonProps) {
  return (
    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
      {user ? (
        <Link 
          href="/pages/checkout"
          className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
        >
          <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          {isArabic ? 'إتمام الطلب' : 'Proceed to Checkout'}
        </Link>
      ) : (
        <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
          <div className={`flex items-center justify-center gap-2 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 border-dashed ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'border-slate-600 bg-slate-700/30 text-slate-300' : 'border-slate-300 bg-slate-50 text-slate-600'
          }`}>
            <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">
              {isArabic ? 'يجب تسجيل الدخول للمتابعة' : 'Login required to checkout'}
            </span>
          </div>
          <Link 
            href="/pages/login"
            className={`w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            {isArabic ? 'تسجيل الدخول للمتابعة' : 'Login to Continue'}
          </Link>
        </div>
      )}
      
      <button
        onClick={onClearCart}
        className={`w-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 border-2 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold hover:scale-105 text-xs sm:text-sm md:text-base ${
          isDarkMode 
            ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
            : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
        }`}
      >
        {isArabic ? 'إفراغ السلة' : 'Clear Cart'}
      </button>
    </div>
  );
}
