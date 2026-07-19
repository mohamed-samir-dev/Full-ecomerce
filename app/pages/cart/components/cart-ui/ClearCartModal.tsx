'use client';

import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ClearCartModalProps } from '../../types/cart';

export default function ClearCartModal({ isOpen, isDarkMode, isArabic, onConfirm, onCancel }: ClearCartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-sm rounded-2xl shadow-2xl border ${
          isDarkMode ? 'bg-[#1F2329] border-white/10' : 'bg-white border-black/5'
        }`}
      >
        <button
          onClick={onCancel}
          className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} p-2 rounded-xl transition-colors ${
            isDarkMode ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="p-6 text-center">
          <div
            className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: isDarkMode ? '#ef444415' : '#fef2f2' }}
          >
            <TrashIcon className="w-8 h-8 text-red-500" />
          </div>

          <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {isArabic ? 'إفراغ السلة؟' : 'Clear Cart?'}
          </h3>

          <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {isArabic
              ? 'سيتم حذف جميع المنتجات من سلة التسوق. لا يمكن التراجع عن هذا الإجراء.'
              : 'All items will be removed from your cart. This action cannot be undone.'}
          </p>

          {/* Gold divider */}
          <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(to right, transparent, #C9A84C40, transparent)' }} />

          <div className={`flex gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={onCancel}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all border ${
                isDarkMode
                  ? 'border-white/10 text-gray-300 hover:bg-white/5'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition-all active:scale-95"
            >
              {isArabic ? 'إفراغ السلة' : 'Clear Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
