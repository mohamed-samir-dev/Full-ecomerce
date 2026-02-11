'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
}

export default function ContactsPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedContact(null);
    };
    if (selectedContact) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedContact]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setContacts(data.data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchContacts();
        if (selectedContact?._id === id) {
          setSelectedContact({ ...selectedContact, status: status as Contact['status'] });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusStyle = (status: string) => {
    const styles = {
      pending: 'bg-gradient-to-r from-amber-400 to-orange-500',
      read: 'bg-gradient-to-r from-blue-400 to-blue-600',
      replied: 'bg-gradient-to-r from-green-400 to-green-600'
    };
    return styles[status as keyof typeof styles];
  };

  const filteredContacts = contacts.filter(contact =>
    (statusFilter === '' || contact.status === statusFilter) &&
    (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: contacts.length,
    pending: contacts.filter(c => c.status === 'pending').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length
  };

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>{stats.total}</div>
            <div className={`text-xs mt-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'إجمالي الرسائل' : 'Total Messages'}</div>
          </div>
          <div className="bg-linear-to-br from-amber-400 to-orange-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-white">{stats.pending}</div>
            <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'قيد الانتظار' : 'Pending'}</div>
          </div>
          <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-white">{stats.read}</div>
            <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'مقروءة' : 'Read'}</div>
          </div>
          <div className="bg-linear-to-br from-green-400 to-green-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-white">{stats.replied}</div>
            <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'تم الرد' : 'Replied'}</div>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg border p-5 mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-linear-to-r from-gray-900 to-gray-800 border-gray-700'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isArabic ? 'بحث في الرسائل...' : 'Search messages...'}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600'}`}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-6 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-gray-800 border-gray-700 text-white focus:ring-gray-600'}`}
            >
              <option value="">{isArabic ? 'جميع الحالات' : 'All Status'}</option>
              <option value="pending">{isArabic ? 'قيد الانتظار' : 'Pending'}</option>
              <option value="read">{isArabic ? 'مقروءة' : 'Read'}</option>
              <option value="replied">{isArabic ? 'تم الرد' : 'Replied'}</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <div className={`animate-spin rounded-full h-16 w-16 border-4 ${isDarkMode ? 'border-gray-700' : 'border-blue-200'}`}></div>
              <div className={`animate-spin rounded-full h-16 w-16 border-4 border-t-transparent absolute top-0 left-0 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 contacts-scrollbar">
            {filteredContacts.map((contact) => (
              <div key={contact._id} className={`backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-white/50'}`}>
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
                      {isArabic ? (contact.status === 'pending' ? 'قيد الانتظار' : contact.status === 'read' ? 'مقروءة' : 'تم الرد') : contact.status}
                    </span>
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {isArabic ? 'عرض التفاصيل' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={() => setSelectedContact(null)}>
          <div className={`rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-slideUp ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-3">{isArabic ? 'تفاصيل الرسالة' : 'Message Details'}</h2>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusStyle(selectedContact.status)} shadow-lg`}>
                      {isArabic ? (selectedContact.status === 'pending' ? 'قيد الانتظار' : selectedContact.status === 'read' ? 'مقروءة' : 'تم الرد') : selectedContact.status}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedContact(null)} className="hover:bg-white/20 rounded-xl p-3 transition-all">
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
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedContact.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'البريد:' : 'Email:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedContact.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'التاريخ:' : 'Date:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(selectedContact.createdAt).toLocaleString(isArabic ? 'ar-EG' : 'en-US')}</span>
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
                <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedContact.subject}</p>
              </div>

              <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'الرسالة' : 'Message'}</h3>
                </div>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedContact.message}</p>
              </div>

              <div className={`rounded-xl p-6 shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'تحديث الحالة' : 'Update Status'}</h3>
                <div className="flex flex-wrap gap-3">
                  {['pending', 'read', 'replied'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedContact._id, status)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedContact.status === status
                          ? `${getStatusStyle(status)} text-white shadow-lg scale-105`
                          : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isArabic ? (status === 'pending' ? 'قيد الانتظار' : status === 'read' ? 'مقروءة' : 'تم الرد') : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .contacts-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .contacts-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        .contacts-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #2563eb);
          border-radius: 10px;
        }
        .contacts-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
        }
      `}</style>
    </div>
  );
}
