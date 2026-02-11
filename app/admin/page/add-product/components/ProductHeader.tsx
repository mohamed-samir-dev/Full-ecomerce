interface ProductHeaderProps {
  isDarkMode: boolean;
  isArabic: boolean;
  onBack: () => void;
}

export default function ProductHeader({ isDarkMode, isArabic, onBack }: ProductHeaderProps) {
  return (
    <div className={`rounded-xl shadow-lg mb-4 sm:mb-6 overflow-hidden ${isDarkMode ? 'bg-linear-to-r from-blue-900 to-blue-800' : 'bg-linear-to-r from-blue-600 to-blue-500'}`}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
              ✨ {isArabic ? 'إضافة منتج جديد' : 'Add New Product'}
            </h1>
            <p className="text-sm sm:text-base text-blue-100">
              {isArabic ? 'إنشاء منتج جديد في متجرك' : 'Create a new product in your store'}
            </p>
          </div>
          <button 
            onClick={onBack} 
            className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all backdrop-blur-sm whitespace-nowrap"
          >
            {isArabic ? 'رجوع' : '← Back'}
          </button>
        </div>
      </div>
    </div>
  );
}
