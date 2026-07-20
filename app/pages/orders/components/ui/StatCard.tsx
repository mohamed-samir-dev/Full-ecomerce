import React from 'react';
import { StatCardProps } from '../../types/types';

const SCHEMES = {
  default: { icon: '#C9A84C', value: '#C9A84C' },
  orange:  { icon: '#f97316', value: '#f97316' },
  blue:    { icon: '#3b82f6', value: '#3b82f6' },
  emerald: { icon: '#10b981', value: '#10b981' },
};

export default function StatCard({ icon, label, value, colorScheme, isDarkMode }: StatCardProps) {
  const scheme = SCHEMES[colorScheme as keyof typeof SCHEMES] ?? SCHEMES.default;

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border transition-all hover:border-[#C9A84C]/30 ${
      isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'
    }`}>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ background: `${scheme.icon}18` }}
      >
        <div className="w-5 h-5" style={{ color: scheme.icon }}>{icon}</div>
      </div>
      <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className="text-3xl font-bold" style={{ color: scheme.value }}>{value}</p>
    </div>
  );
}
