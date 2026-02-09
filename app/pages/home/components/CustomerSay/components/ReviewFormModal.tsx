import { X, Star } from "lucide-react";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/context/ThemeContext";
import {ReviewFormModalProps}from '../../../types/home.types'


export const ReviewFormModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isSubmitting
}: ReviewFormModalProps) => {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-lg p-6 max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-[#0D0D0D]'
          }`}>
            {isArabic ? "اترك تقييمك" : "Leave Your Review"}
          </h3>
          <button
            onClick={onClose}
            aria-label={isArabic ? 'إغلاق' : 'Close'}
            className={`p-1 ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {isArabic ? "الاسم" : "Name"} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {isArabic ? "البريد الإلكتروني" : "Email"} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {isArabic ? "التقييم" : "Rating"} *
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  aria-label={isArabic ? `${star} نجوم` : `${star} stars`}
                  className="focus:outline-none"
                >
                  <Star
                    size={24}
                    className={`${
                      star <= formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : isDarkMode ? "text-gray-600" : "text-gray-300"
                    } hover:text-yellow-400 transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {isArabic ? "التعليق" : "Comment"} *
            </label>
            <textarea
              required
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder={isArabic ? "شاركنا تجربتك..." : "Share your experience..."}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || formData.rating === 0}
            className={`w-full py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-[#0D0D0D] text-white hover:opacity-90'
            }`}
          >
            {isSubmitting
              ? (isArabic ? "جاري الإرسال..." : "Submitting...")
              : (isArabic ? "إرسال التقييم" : "Submit Review")
            }
          </button>
        </form>
      </div>
    </div>
  );
};
