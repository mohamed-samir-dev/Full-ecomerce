interface SearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  isDarkMode: boolean;
  isArabic: boolean;
}

export default function SearchFilterBar({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, isDarkMode, isArabic }: SearchFilterBarProps) {
  return (
    <div className={`rounded-xl shadow-lg border p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-linear-to-r from-gray-900 to-gray-800 border-gray-700'}`}>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isArabic ? 'بحث في الطلبات...' : 'Search orders...'}
            className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600'}`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-gray-800 border-gray-700 text-white focus:ring-gray-600'}`}
        >
          <option value="">{isArabic ? 'جميع الحالات' : 'All Status'}</option>
          <option value="pending">{isArabic ? 'قيد الانتظار' : 'Pending'}</option>
          <option value="confirmed">{isArabic ? 'مؤكدة' : 'Confirmed'}</option>
          <option value="shipped">{isArabic ? 'قيد الشحن' : 'Shipped'}</option>
          <option value="delivered">{isArabic ? 'تم التوصيل' : 'Delivered'}</option>
          <option value="cancelled">{isArabic ? 'ملغاة' : 'Cancelled'}</option>
        </select>
      </div>
    </div>
  );
}
