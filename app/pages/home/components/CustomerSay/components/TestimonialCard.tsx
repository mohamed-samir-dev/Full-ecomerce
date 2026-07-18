import { Star, Quote } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Testimonial } from '../../../types/home.types';

const accentColor = '#C9A84C';
const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isDarkMode
          ? 'bg-white/5 border-white/10 hover:border-white/20'
          : 'bg-white border-black/5 hover:border-black/10'
      }`}
    >
      {/* Quote icon */}
      <div
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-60"
        style={{ background: `${accentColor}20` }}
      >
        <Quote size={14} style={{ color: accentColor }} />
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={14}
            className={i < testimonial.rating ? '' : isDarkMode ? 'text-white/20' : 'text-gray-200'}
            style={i < testimonial.rating ? { fill: accentColor, color: accentColor } : {}}
          />
        ))}
      </div>

      {/* Comment */}
      <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
        &ldquo;{testimonial.comment}&rdquo;
      </p>

      {/* Divider */}
      <div
        className="h-px w-full mb-4"
        style={{ background: `linear-gradient(to right, ${accentColor}40, transparent)` }}
      />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
          style={{ background: accentGradient }}
        >
          {testimonial.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {testimonial.name}
          </p>
          <p className={`text-[11px] ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
            Verified Customer
          </p>
        </div>
      </div>
    </div>
  );
};
