import { motion } from 'framer-motion';
import { PaymentMethodOptionProps } from '../../types/checkout';

export default function PaymentMethodOption({
  id, value, label, description, icon: Icon, badge,
  isSelected, onSelect, isDarkMode
}: PaymentMethodOptionProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(value)}
      className={`rounded-xl p-4 cursor-pointer transition-all border ${
        isSelected
          ? isDarkMode
            ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5'
            : 'border-[#C9A84C]/50 bg-[#C9A84C]/5'
          : isDarkMode
          ? 'border-white/5 hover:border-white/10'
          : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Custom radio */}
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
            isSelected ? 'border-[#C9A84C]' : isDarkMode ? 'border-white/20' : 'border-gray-300'
          }`}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#C9A84C' }} />
          )}
        </div>

        {/* Icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={isSelected ? { background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' } : {
            background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6'
          }}
        >
          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{label}</span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={isSelected
                ? { background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)', color: 'white' }
                : { background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6', color: isDarkMode ? '#9ca3af' : '#6b7280' }
              }
            >
              {badge}
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
