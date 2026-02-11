import { ContactCardProps } from '../types';
import { getStatusStyle, getStatusLabel } from '../utils/helpers';



export const ContactCard = ({ contact, isDarkMode, isArabic, onViewDetails }: ContactCardProps) => (
  <div className={`backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-white/50'}`}>
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${getStatusStyle(contact.status)} flex items-center justify-center shadow-lg`}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <div className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{contact.email}</div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-6">
        <div className="text-center">
          <div className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'الموضوع' : 'Subject'}</div>
          <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{contact.subject.substring(0, 20)}...</div>
        </div>
        <div className="text-center">
          <div className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'التاريخ' : 'Date'}</div>
          <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(contact.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</div>
        </div>
        <span className={`px-4 py-2 rounded-lg text-sm font-semibold text-white ${getStatusStyle(contact.status)} shadow-md`}>
          {getStatusLabel(contact.status, isArabic)}
        </span>
        <button
          onClick={() => onViewDetails(contact)}
          className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isArabic ? 'عرض التفاصيل' : 'View Details'}
        </button>
      </div>
    </div>
  </div>
);
