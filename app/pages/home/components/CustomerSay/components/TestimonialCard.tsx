import { Star } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Testimonial } from "../../../types/home.types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-sm border transition-all hover:shadow-md ${
        isDarkMode ? 'bg-[#2d2d2d] border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center mb-3 sm:mb-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <span className={`text-base sm:text-lg font-bold ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {testimonial.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className={`font-semibold text-xs sm:text-sm ${
            isDarkMode ? 'text-white' : 'text-[#0D0D0D]'
          }`}>
            {testimonial.name}
          </p>
          <div className="flex gap-0.5 sm:gap-1 mt-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={14}
                className={`sm:w-4 sm:h-4 ${
                  index < testimonial.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : isDarkMode ? "text-gray-600" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className={`text-xs sm:text-sm leading-relaxed ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        &ldquo;{testimonial.comment}&rdquo;
      </p>
    </div>
  );
};
