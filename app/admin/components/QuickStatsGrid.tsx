import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface QuickStat {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

interface QuickStatsGridProps {
  stats: QuickStat[];
  isDarkMode: boolean;
}

export default function QuickStatsGrid({ stats, isDarkMode }: QuickStatsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.05 }}
          className={`rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-all ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
