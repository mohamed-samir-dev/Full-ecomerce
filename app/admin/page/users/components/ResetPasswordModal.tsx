import { ResetPasswordModalProps } from '../types';


export const ResetPasswordModal = ({ user, isDarkMode, isArabic, newPassword, setNewPassword, resetting, onReset, onClose }: ResetPasswordModalProps) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className={`rounded-3xl shadow-2xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
        <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">🔑</div>
              <div>
                <h2 className="text-xl font-bold">{isArabic ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}</h2>
                <p className="text-green-100 text-sm">{user.name}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{isArabic ? 'كلمة المرور الجديدة' : 'New Password'}</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={isArabic ? 'أدخل كلمة المرور الجديدة' : 'Enter new password'}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-200 text-gray-900'}`}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onReset}
              disabled={!newPassword || resetting}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resetting ? (isArabic ? 'جاري التحديث...' : 'Updating...') : (isArabic ? 'تحديث كلمة المرور' : 'Update Password')}
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
