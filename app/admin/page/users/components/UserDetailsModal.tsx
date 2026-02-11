import { UserDetailsModalProps } from '../types';



export const UserDetailsModal = ({ user, isDarkMode, isArabic, onClose, onDelete }: UserDetailsModalProps) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className={`rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-blue-100 text-sm">{user.email}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-linear-to-br from-blue-900/50 to-indigo-900/50' : 'bg-linear-to-br from-blue-50 to-indigo-50'}`}>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'الدور' : 'Role'}</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? (user.role === 'admin' ? 'مسؤول' : 'مستخدم') : user.role.toUpperCase()}</p>
            </div>
            <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-linear-to-br from-green-900/50 to-emerald-900/50' : 'bg-linear-to-br from-green-50 to-emerald-50'}`}>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'إجمالي الطلبات' : 'Total Orders'}</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.orders?.length || 0}</p>
            </div>
            <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-linear-to-br from-pink-900/50 to-rose-900/50' : 'bg-linear-to-br from-pink-50 to-rose-50'}`}>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'عناصر المفضلة' : 'Wishlist Items'}</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.wishlist?.length || 0}</p>
            </div>
            <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-linear-to-br from-orange-900/50 to-amber-900/50' : 'bg-linear-to-br from-orange-50 to-amber-50'}`}>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'عناصر السلة' : 'Cart Items'}</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.cart?.length || 0}</p>
            </div>
          </div>

          <div className={`rounded-2xl p-4 space-y-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between text-sm">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'معرف المستخدم' : 'User ID'}</span>
              <span className={`font-mono text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{user._id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'تاريخ الانضمام' : 'Joined'}</span>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-900'}>{new Date(user.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'آخر تحديث' : 'Last Updated'}</span>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-900'}>{new Date(user.updatedAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</span>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
              <span>⚠️</span> {isArabic ? 'منطقة الخطر' : 'Danger Zone'}
            </h3>
            <p className="text-sm text-red-700 mb-3">{isArabic ? 'حذف هذا المستخدم نهائياً وجميع البيانات المرتبطة به.' : 'Permanently delete this user and all associated data.'}</p>
            <button onClick={() => onDelete(user)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              {isArabic ? 'حذف المستخدم' : 'Delete User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
