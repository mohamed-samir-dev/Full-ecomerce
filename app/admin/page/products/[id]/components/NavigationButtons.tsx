interface NavigationButtonsProps {
  activeTab: number;
  totalTabs: number;
  loading: boolean;
  isDarkMode: boolean;
  isArabic: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
}

export default function NavigationButtons({ activeTab, totalTabs, loading, isDarkMode, isArabic, onPrevious, onNext, onCancel }: NavigationButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6 pt-4 border-t border-gray-700">
      <button
        type="button"
        onClick={onPrevious}
        disabled={activeTab === 0}
        className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base ${
          activeTab === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
        } ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
      >
        {isArabic ? 'السابق →' : '← Previous'}
      </button>
      <div className="flex gap-2 sm:gap-3">
        <button 
          type="button" 
          onClick={onCancel} 
          className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg font-medium text-sm sm:text-base ${
            isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {isArabic ? 'إلغاء' : 'Cancel'}
        </button>
        {activeTab === totalTabs - 1 ? (
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium text-sm sm:text-base disabled:opacity-50"
          >
            {loading ? (isArabic ? '⏳ جاري التحديث...' : '⏳ Updating...') : (isArabic ? '✓ تحديث المنتج' : '✓ Update Product')}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm sm:text-base"
          >
            {isArabic ? '← التالي' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
