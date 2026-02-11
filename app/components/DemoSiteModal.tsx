"use client";

import { useTranslation } from '@/i18n';

interface DemoSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoSiteModal({ isOpen, onClose }: DemoSiteModalProps) {
  const {  isArabic } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-linear-to-br from-[#C7AB6C] to-[#8B7355] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-white">
            {isArabic ? 'موقع تجريبي' : 'Demo Website'}
          </h3>
          
          <p className="text-gray-300 leading-relaxed">
            {isArabic 
              ? 'هذا الموقع للتجربة فقط وملك المطور' 
              : 'This website is for demonstration purposes only and owned by the developer'}
          </p>
          
          <div className="pt-2">
            <a
              href="https://my-newfrontend-portfolio.vercel.app/page/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-linear-to-r from-[#C7AB6C] to-[#8B7355] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              {isArabic ? '🔗 شاهد البورتفوليو' : '🔗 View Portfolio'}
            </a>
          </div>
          
          <button
            onClick={onClose}
            className="mt-4 text-gray-400 hover:text-white transition-colors text-sm"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
