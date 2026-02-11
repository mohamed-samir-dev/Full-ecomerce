import { Contact } from '../types';
import { getStatusStyle, getStatusLabel } from '../utils/helpers';

interface ContactModalProps {
  contact: Contact;
  isDarkMode: boolean;
  isArabic: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => void;
}

export const ContactModal = ({ contact, isDarkMode, isArabic, onClose, onUpdateStatus }: ContactModalProps) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
    <div className={`rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-slideUp ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
      <div className="bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">{isArabic ? 'تفاصيل الرسالة' : 'Message Details'}</h2>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusStyle(contact.status)} shadow-lg`}>
                {getStatusLabel(contact.status, isArabic)}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 rounded-xl p-3 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <div className={`overflow-y-auto max-h-[calc(90vh-180px)] p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
        <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-100'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'معلومات المرسل' : 'Sender Info'}</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'الاسم:' : 'Name:'}</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'البريد:' : 'Email:'}</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{contact.email}</span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'التاريخ:' : 'Date:'}</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(contact.createdAt).toLocaleString(isArabic ? 'ar-EG' : 'en-US')}</span>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
            </div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'الموضوع' : 'Subject'}</h3>
          </div>
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{contact.subject}</p>
        </div>

        <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'الرسالة' : 'Message'}</h3>
          </div>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{contact.message}</p>
        </div>

        <div className={`rounded-xl p-6 shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'تحديث الحالة' : 'Update Status'}</h3>
          <div className="flex flex-wrap gap-3">
            {['pending', 'read', 'replied'].map((status) => (
              <button
                key={status}
                onClick={() => onUpdateStatus(contact._id, status)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  contact.status === status
                    ? `${getStatusStyle(status)} text-white shadow-lg scale-105`
                    : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getStatusLabel(status, isArabic)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
