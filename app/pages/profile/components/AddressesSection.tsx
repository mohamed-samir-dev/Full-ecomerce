import { MapPinIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import { AddressesSectionProps, Address } from '../types/types';
import { useAddresses } from '../hooks/useAddresses';

export default function AddressesSection({ user, setUser, isDarkMode }: AddressesSectionProps) {
  const { t, isArabic } = useTranslation();
  const {
    showAddForm,
    setShowAddForm,
    newAddress,
    setNewAddress,
    loading,
    errors,
    handleAddAddress,
    handleDeleteAddress
  } = useAddresses(user, setUser);

  return (
    <div className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 md:p-6 shadow-xl ${
      isDarkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      <div className={`flex items-center justify-between mb-4 sm:mb-5 md:mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2 sm:gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
            <MapPinIcon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
          </div>
          <h2 className={`text-base sm:text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {t('profile.addresses')}
          </h2>
        </div>
        
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
              isDarkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">
              {t('profile.add')}
            </span>
          </button>
        )}
      </div>

      {showAddForm && (
        <div className={`mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 ${
          isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
            <div>
              <input
                type="text"
                placeholder={t('profile.label')}
                value={newAddress.label || ''}
                onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border-2 text-sm ${isArabic ? 'text-right' : 'text-left'} ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                } ${errors.label ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.label && <p className="text-red-500 text-xs mt-1">{errors.label}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder={t('profile.street')}
                value={newAddress.street || ''}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border-2 text-sm ${isArabic ? 'text-right' : 'text-left'} ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                } ${errors.street ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder={t('profile.governorate')}
                value={newAddress.governorate || ''}
                onChange={(e) => setNewAddress({ ...newAddress, governorate: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border-2 text-sm ${isArabic ? 'text-right' : 'text-left'} ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                } ${errors.governorate ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder={t('profile.postalCode')}
                value={newAddress.postalCode || ''}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border-2 text-sm ${isArabic ? 'text-right' : 'text-left'} ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                } ${errors.postalCode ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
            </div>
          </div>
          <div className={`flex gap-2 mt-3 sm:mt-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleAddAddress}
              disabled={loading}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-xs sm:text-sm font-medium disabled:opacity-50"
            >
              {loading ? t('profile.saving') : t('profile.save')}
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              disabled={loading}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium disabled:opacity-50 ${
                isDarkMode 
                  ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' 
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {t('profile.cancel')}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2 sm:space-y-3">
        {user.addresses?.length === 0 ? (
          <p className={`text-center py-6 sm:py-8 text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('profile.noAddresses')}
          </p>
        ) : (
          user.addresses?.map((address: Address) => (
            <div
              key={address._id}
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 ${
                isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className={`flex items-start justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={isArabic ? 'text-right' : ''}>
                  <p className={`font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {address.label}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {address.street}, {address.governorate} {address.postalCode}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteAddress(address._id)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'text-red-400 hover:bg-red-900/30' 
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
