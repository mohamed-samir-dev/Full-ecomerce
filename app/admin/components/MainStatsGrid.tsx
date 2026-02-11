import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Stat {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  up: boolean;
  trend: string;
  prefix?: string;
}

interface MainStatsGridProps {
  stats: Stat[];
  isDarkMode: boolean;
}

export default function MainStatsGrid({ stats, isDarkMode }: MainStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.trend}
              </div>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</h3>
            <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {stat.prefix && <span className="text-xl">{stat.prefix} </span>}
              {stat.value.toLocaleString()}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
