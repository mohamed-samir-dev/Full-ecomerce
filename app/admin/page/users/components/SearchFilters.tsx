interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  isDarkMode: boolean;
  isArabic: boolean;
}

export const SearchFilters = ({ searchTerm, setSearchTerm, roleFilter, setRoleFilter, isDarkMode, isArabic }: SearchFiltersProps) => {
  return (
    <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isArabic ? 'البحث بالاسم أو البريد الإلكتروني...' : 'Search by name or email...'}
            className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-200 text-gray-900'}`}
          />
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200 text-gray-900'}`}
        >
          <option value="">{isArabic ? 'جميع الأدوار' : 'All Roles'}</option>
          <option value="admin">{isArabic ? 'مسؤول' : 'Admin'}</option>
          <option value="user">{isArabic ? 'مستخدم' : 'User'}</option>
        </select>
      </div>
    </div>
  );
};
