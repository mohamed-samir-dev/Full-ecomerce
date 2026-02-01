'use client';

import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import {ClearCartModalProps}from '../../types/cart'

export default function ClearCartModal({ isOpen, isDarkMode, isArabic, onConfirm, onCancel }: ClearCartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl transform transition-all animate-scaleIn ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <button
          onClick={onCancel}
          className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="p-6 text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
          }`}>
            <TrashIcon className="w-8 h-8 text-red-500" />
          </div>

          <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {isArabic ? 'إفراغ السلة؟' : 'Clear Cart?'}
          </h3>
          
          <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isArabic ? 'سيتم حذف جميع المنتجات من سلة التسوق. لا يمكن التراجع عن هذا الإجراء.' : 'All items will be removed from your cart. This action cannot be undone.'}
          </p>

          <div className={`flex gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={onCancel}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                isDarkMode 
                  ? 'bg-slate-700 text-white hover:bg-slate-600' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
            >
              {isArabic ? 'إفراغ السلة' : 'Clear Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
