"use client";

import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  
  if (totalPages <= 1) return null;

  const getPageNumbers = (isMobile: boolean) => {
    const pages: (number | string)[] = [];
    const maxPages = isMobile ? 3 : 7;
    
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        if (currentPage === 1) {
          pages.push(1, 2, '...', totalPages);
        } else if (currentPage === totalPages) {
          pages.push(1, '...', totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage, '...', totalPages);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 5; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        }
      }
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 px-2" dir={isArabic ? 'rtl' : 'ltr'}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={isArabic ? 'الصفحة السابقة' : 'Previous page'}
        className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDarkMode 
            ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="hidden sm:inline">{isArabic ? 'السابق' : 'Previous'}</span>
        <span className="sm:hidden">{isArabic ? '‹' : '‹'}</span>
      </button>
      
      <div className="flex gap-1 sm:gap-2">
        {getPageNumbers(typeof window !== 'undefined' && window.innerWidth < 640).map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              aria-label={isArabic ? `الصفحة ${page}` : `Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors min-w-[36px] sm:min-w-[44px] ${
                currentPage === page
                  ? 'bg-[#B39E7A] text-white'
                  : isDarkMode
                  ? 'border border-gray-700 text-gray-300 hover:bg-gray-800'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className={`px-1 sm:px-2 flex items-center ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              {page}
            </span>
          )
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={isArabic ? 'الصفحة التالية' : 'Next page'}
        className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDarkMode 
            ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="hidden sm:inline">{isArabic ? 'التالي' : 'Next'}</span>
        <span className="sm:hidden">{isArabic ? '›' : '›'}</span>
      </button>
    </div>
  );
}
