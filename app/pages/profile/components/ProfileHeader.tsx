import { UserCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import {ProfileHeaderProps}from '../types/types'


export default function ProfileHeader({ user, isDarkMode }: ProfileHeaderProps) {
  const { t, isArabic } = useTranslation();
  
  const joinDate = new Date(user.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 md:p-6 shadow-xl ${
      isDarkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
        <div className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
          <UserCircleIcon className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
          {user.role === 'admin' && (
            <div className={`absolute -top-1 ${isArabic ? '-left-1' : '-right-1'} p-0.5 sm:p-1 bg-blue-500 rounded-full`}>
              <ShieldCheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className={`flex-1 text-center ${isArabic ? 'sm:text-right' : 'sm:text-left'}`}>
          <div className={`flex flex-col sm:flex-row items-center ${isArabic ? 'sm:items-end' : 'sm:items-start'} gap-2 sm:gap-3 mb-1 sm:mb-2 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
            <h1 className={`text-lg sm:text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {user.name}
            </h1>
            {user.role === 'admin' && (
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                {t('profile.admin')}
              </span>
            )}
          </div>
          
          <p className={`text-xs sm:text-sm mb-0.5 sm:mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {user.email}
          </p>
          
          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            {t('profile.memberSince')} {joinDate}
          </p>
        </div>
      </div>
    </div>
  );
}