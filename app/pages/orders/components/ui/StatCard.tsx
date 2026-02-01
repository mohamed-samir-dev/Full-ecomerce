import React from 'react';
import {StatCardProps}from '../../types/types'


export default function StatCard({ icon, label, value, colorScheme, isDarkMode }: StatCardProps) {
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'orange':
        return {
          container: isDarkMode ? 'bg-linear-to-br from-orange-900/20 to-slate-900 border-orange-500/30' : 'bg-linear-to-br from-orange-50 to-white border-orange-200',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          label: isDarkMode ? 'text-orange-400' : 'text-orange-600',
          value: 'text-orange-600'
        };
      case 'blue':
        return {
          container: isDarkMode ? 'bg-linear-to-br from-blue-900/20 to-slate-900 border-blue-500/30' : 'bg-linear-to-br from-blue-50 to-white border-blue-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          label: isDarkMode ? 'text-blue-400' : 'text-blue-600',
          value: 'text-blue-600'
        };
      case 'emerald':
        return {
          container: isDarkMode ? 'bg-linear-to-br from-emerald-900/20 to-slate-900 border-emerald-500/30' : 'bg-linear-to-br from-emerald-50 to-white border-emerald-200',
          iconBg: 'bg-emerald-100',
          iconColor: 'text-emerald-600',
          label: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
          value: 'text-emerald-600'
        };
      default:
        return {
          container: isDarkMode ? 'bg-linear-to-br from-slate-800 to-slate-900 border-slate-700' : 'bg-linear-to-br from-white to-slate-50 border-slate-200',
          iconBg: isDarkMode ? 'bg-slate-700' : 'bg-slate-100',
          iconColor: isDarkMode ? 'text-slate-300' : 'text-slate-600',
          label: isDarkMode ? 'text-slate-400' : 'text-slate-500',
          value: isDarkMode ? 'text-white' : 'text-slate-900'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl border-2 shadow-lg transition-all hover:shadow-xl ${colors.container}`}>
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl ${colors.iconBg}`}>
          <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${colors.iconColor}`}>
            {icon}
          </div>
        </div>
      </div>
      <p className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1 sm:mb-2 ${colors.label}`}>
        {label}
      </p>
      <p className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.value}`}>
        {value}
      </p>
    </div>
  );
}
