import { motion } from 'framer-motion';
import {PaymentMethodOptionProps}from '../../types/checkout'


export default function PaymentMethodOption({
  id,
  value,
  label,
  description,
  icon: Icon,
  badge,
  isSelected,
  onSelect,
  colorScheme,
  isDarkMode
}: PaymentMethodOptionProps) {
  const colors = {
    green: {
      border: 'border-green-500',
      bg: 'bg-green-50',
      hover: 'hover:border-green-300',
      icon: 'text-green-600',
      badge: 'text-green-600'
    },
    blue: {
      border: 'border-blue-500',
      bg: 'bg-blue-50',
      hover: 'hover:border-blue-300',
      icon: 'text-blue-600',
      badge: 'text-blue-600'
    },
    purple: {
      border: 'border-purple-500',
      bg: 'bg-purple-50',
      hover: 'hover:border-purple-300',
      icon: 'text-purple-600',
      badge: 'text-purple-600'
    }
  };

  const scheme = colors[colorScheme];

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`border-3 rounded-xl p-4 sm:p-5 cursor-pointer transition-all ${
        isSelected 
          ? `${scheme.border} ${isDarkMode ? 'bg-[#191C21]' : scheme.bg} shadow-lg`
          : `${isDarkMode ? 'border-slate-600 hover:border-slate-500' : `border-gray-200 ${scheme.hover}`}`
      }`}
      onClick={() => onSelect(value)}
    >
      <div className="flex items-start">
        <input
          type="radio"
          id={id}
          name="payment"
          value={value}
          checked={isSelected}
          onChange={(e) => onSelect(e.target.value)}
          className="mt-1 mx-3 sm:mx-4"
        />
        <label htmlFor={id} className="flex-1 cursor-pointer">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className={`flex items-center gap-2 font-bold text-base sm:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${scheme.icon}`} />
              {label}
            </div>
            <span className={`text-xs sm:text-sm font-semibold ${scheme.badge}`}>{badge}</span>
          </div>
          <p className={`text-xs sm:text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{description}</p>
        </label>
      </div>
    </motion.div>
  );
}
