import { PencilIcon, CheckIcon, XMarkIcon, UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import { ProfileInfoProps } from '../types/types';
import { useAccountInfo } from '../hooks/useAccountInfo';

export default function AccountInfo({ user, setUser, isDarkMode }: ProfileInfoProps) {
  const { t, isArabic } = useTranslation();
  const {
    isEditing,
    setIsEditing,
    editData,
    setEditData,
    loading,
    error,
    passwordStrength,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    handlePasswordChange,
    handleSave,
    handleCancel
  } = useAccountInfo(user, setUser);

  return (
    <div className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 md:p-6 shadow-xl ${
      isDarkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      <div className={`flex items-center justify-between mb-4 sm:mb-5 md:mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <h2 className={`text-base sm:text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {t('profile.accountInfo')}
        </h2>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
              isDarkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <PencilIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">
              {t('profile.edit')}
            </span>
          </button>
        ) : (
          <div className={`flex items-center gap-1.5 sm:gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 text-xs sm:text-sm"
            >
              <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium">
                {loading ? t('profile.saving') : t('profile.save')}
              </span>
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 disabled:opacity-50 text-xs sm:text-sm ${
                isDarkMode 
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <XMarkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium">
                {t('profile.cancel')}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {error && (
          <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm ${isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'}`}>
            {error}
          </div>
        )}
        
        <div>
          <label className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <UserIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            {t('profile.name')}
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all duration-300 text-sm sm:text-base ${isArabic ? 'text-right' : 'text-left'} ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          ) : (
            <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 text-sm sm:text-base ${
              isDarkMode ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              {user.name}
            </div>
          )}
        </div>

        <div>
          <label className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <EnvelopeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            {t('profile.email')}
          </label>
          {isEditing ? (
            <input
              type="email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all duration-300 text-sm sm:text-base ${isArabic ? 'text-right' : 'text-left'} ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          ) : (
            <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 text-sm sm:text-base break-all ${
              isDarkMode ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              {user.email}
            </div>
          )}
        </div>

        <div>
          <label className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <LockClosedIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            {t('profile.currentPassword')}
          </label>
          {isEditing ? (
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={editData.currentPassword}
                onChange={(e) => setEditData({ ...editData, currentPassword: e.target.value })}
                placeholder={t('profile.leaveBlank')}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all duration-300 text-sm sm:text-base ${isArabic ? 'text-right pr-10 sm:pr-12' : 'text-left pl-3 sm:pl-4 pr-10 sm:pr-12'} ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className={`absolute ${isArabic ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {showCurrentPassword ? <EyeSlashIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          ) : (
            <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 text-sm sm:text-base ${
              isDarkMode ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              ••••••••
            </div>
          )}
        </div>

        <div>
          <label className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <LockClosedIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            {t('profile.newPassword')}
          </label>
          {isEditing ? (
            <>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={editData.newPassword}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder={t('profile.leaveBlank')}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all duration-300 text-sm sm:text-base ${isArabic ? 'text-right pr-10 sm:pr-12' : 'text-left pl-3 sm:pl-4 pr-10 sm:pr-12'} ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={`absolute ${isArabic ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {showNewPassword ? <EyeSlashIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
              {editData.newPassword && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          level <= passwordStrength.score
                            ? passwordStrength.score <= 2
                              ? 'bg-red-500'
                              : passwordStrength.score <= 3
                              ? 'bg-orange-500'
                              : 'bg-green-500'
                            : isDarkMode
                            ? 'bg-slate-600'
                            : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${
                    passwordStrength.score <= 2
                      ? 'text-red-500'
                      : passwordStrength.score <= 3
                      ? 'text-orange-500'
                      : 'text-green-500'
                  }`}>
                    {passwordStrength.message} - {t('profile.passwordRequirement')}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 text-sm sm:text-base ${
              isDarkMode ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              ••••••••
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
