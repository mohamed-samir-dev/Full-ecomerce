import { DeleteConfirmModalProps } from '../types';



export const DeleteConfirmModal = ({ user, isDarkMode, isArabic, deleting, onConfirm, onClose }: DeleteConfirmModalProps) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className={`rounded-3xl shadow-2xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
        <div className="bg-linear-to-r from-red-600 to-rose-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">⚠️</div>
              <div>
                <h2 className="text-xl font-bold">{isArabic ? 'تأكيد الحذف' : 'Confirm Delete'}</h2>
                <p className="text-red-100 text-sm">{user.name}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
              {isArabic ? 'هل أنت متأكد من حذف هذا المستخدم؟ سيتم حذف جميع البيانات المرتبطة به نهائياً ولا يمكن التراجع عن هذا الإجراء.' : 'Are you sure you want to delete this user? All associated data will be permanently removed and this action cannot be undone.'}
            </p>
          </div>

          <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'الاسم:' : 'Name:'}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'البريد:' : 'Email:'}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'الطلبات:' : 'Orders:'}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.orders?.length || 0}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onConfirm(user._id)}
              disabled={deleting === user._id}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting === user._id ? (isArabic ? 'جاري الحذف...' : 'Deleting...') : (isArabic ? 'نعم، احذف' : 'Yes, Delete')}
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-3 rounded-xl transition-colors font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
