import { UsersTableProps } from '../types';



export const UsersTable = ({ users, isDarkMode, isArabic, onViewUser, onResetPassword, onDeleteUser }: UsersTableProps) => {
  return (
    <div className={`rounded-xl sm:rounded-2xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">{isArabic ? 'المستخدم' : 'User'}</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold hidden lg:table-cell">{isArabic ? 'البريد الإلكتروني' : 'Email'}</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">{isArabic ? 'الدور' : 'Role'}</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold hidden md:table-cell">{isArabic ? 'الطلبات' : 'Orders'}</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold hidden md:table-cell">{isArabic ? 'المفضلة' : 'Wishlist'}</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold hidden xl:table-cell">{isArabic ? 'تاريخ الانضمام' : 'Joined'}</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold">{isArabic ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={`font-semibold text-xs sm:text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</span>
                  </div>
                </td>
                <td className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm hidden lg:table-cell ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  {user.role === 'admin' ? (
                    <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-purple-100 text-purple-700 whitespace-nowrap">{isArabic ? 'مسؤول' : 'ADMIN'}</span>
                  ) : (
                    <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">{isArabic ? 'مستخدم' : 'USER'}</span>
                  )}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center hidden md:table-cell">
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-bold">
                    {user.orders?.length || 0}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center hidden md:table-cell">
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-pink-50 text-pink-700 rounded-lg text-xs sm:text-sm font-bold">
                    {user.wishlist?.length || 0}
                  </span>
                </td>
                <td className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm hidden xl:table-cell ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {new Date(user.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <button onClick={() => onViewUser(user)} className="px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap">
                      {isArabic ? 'عرض' : 'View'}
                    </button>
                    <button onClick={() => onResetPassword(user)} className="px-2 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap hidden sm:inline-block">
                      {isArabic ? 'إعادة تعيين' : 'Reset'}
                    </button>
                    <button onClick={() => onDeleteUser(user)} className="px-2 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap">
                      {isArabic ? 'حذف' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
