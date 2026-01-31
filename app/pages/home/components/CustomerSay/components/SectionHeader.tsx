import { Plus } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";

interface SectionHeaderProps {
  isLoggedIn: boolean;
  onOpenForm: () => void;
}

export const SectionHeader = ({ isLoggedIn, onOpenForm }: SectionHeaderProps) => {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();

  return (
    <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 ${isDarkMode ? "text-white" : "text-[#0D0D0D]"}`}>
        {isArabic ? "ماذا يقول العملاء" : "What Customers Say"}
      </h2>
      <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {isArabic ? "اقرأ تجارب عملائنا الراضين" : "Read what our satisfied customers have to say"}
      </p>
      
      {isLoggedIn ? (
        <button
          onClick={onOpenForm}
          className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base font-medium transition-all ${
            isDarkMode
              ? "bg-[#2A2D35] text-white hover:bg-[#3A3D45] border border-gray-600"
              : "bg-white text-[#0D0D0D] hover:bg-gray-50 border border-gray-200 shadow-sm"
          }`}
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          {isArabic ? "اترك تقييمك" : "Leave Your Review"}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {isArabic ? "يجب تسجيل الدخول لترك تقييم" : "Please log in to leave a review"}
          </p>
          <Link
            href="/pages/login"
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base font-medium transition-all ${
              isDarkMode
                ? "bg-[#2A2D35] text-white hover:bg-[#3A3D45] border border-gray-600"
                : "bg-white text-[#0D0D0D] hover:bg-gray-50 border border-gray-200 shadow-sm"
            }`}
          >
            {isArabic ? "تسجيل الدخول" : "Log In"}
          </Link>
        </div>
      )}
    </div>
  );
};
