import { CheckCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";

interface SuccessModalProps {
  isOpen: boolean;
}

export const SuccessModal = ({ isOpen }: SuccessModalProps) => {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-lg p-8 text-center ${
        isDarkMode ? "bg-[#2A2D35]" : "bg-white"
      }`}>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-[#0D0D0D]"}`}>
          {isArabic ? "شكراً لك!" : "Thank You!"}
        </h3>
        <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {isArabic
            ? "تم استلام تقييمك بنجاح. سيقوم فريق الإدارة بمراجعة رسالتك والموافقة عليها أو رفضها."
            : "Your review has been successfully submitted. Our admin team will review and approve it."}
        </p>
      </div>
    </div>
  );
};
