'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useContacts } from './hooks/useContacts';
import { useContactFilters } from './hooks/useContactFilters';
import { StatsCards } from './components/StatsCards';
import { SearchFilter } from './components/SearchFilter';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ContactCard } from './components/ContactCard';
import { ContactModal } from './components/ContactModal';
import { contactsStyles } from './utils/styles';

export default function ContactsPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const { contacts, loading, selectedContact, setSelectedContact, updateStatus } = useContacts();
  const { statusFilter, setStatusFilter, searchTerm, setSearchTerm, filteredContacts, stats } = useContactFilters(contacts);

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>
            {isArabic ? 'إدارة الرسائل' : 'Contact Messages'}
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isArabic ? 'عرض وإدارة رسائل العملاء' : 'View and manage customer messages'}
          </p>
        </div>

        <StatsCards stats={stats} isDarkMode={isDarkMode} isArabic={isArabic} />

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
        />

        {loading ? (
          <LoadingSpinner isDarkMode={isDarkMode} />
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 contacts-scrollbar">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                isDarkMode={isDarkMode}
                isArabic={isArabic}
                onViewDetails={setSelectedContact}
              />
            ))}
          </div>
        )}
      </div>

      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          onClose={() => setSelectedContact(null)}
          onUpdateStatus={updateStatus}
        />
      )}

      <style jsx>{contactsStyles}</style>
    </div>
  );
}
