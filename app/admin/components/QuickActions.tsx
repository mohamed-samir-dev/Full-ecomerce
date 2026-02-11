import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface QuickActionsProps {
  actions: any[];
  isDarkMode: boolean;
  isArabic: boolean;
}

export default function QuickActions({ actions, isDarkMode, isArabic }: QuickActionsProps) {
  return (
    <div className={`rounded-2xl shadow-sm p-4 sm:p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
      </h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <Link key={action.href} href={action.href} className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-linear-to-r ${action.color} text-white hover:shadow-lg transition-all group`}>
            <action.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm sm:text-base">{action.label}</span>
            <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}
