'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface CustomerSay {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export default function CustomerSaysPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [testimonials, setTestimonials] = useState<CustomerSay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<CustomerSay | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-say/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setTestimonials(data.data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-say/${id}/approval`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ isApproved: !currentStatus })
      });
      if (res.ok) {
        fetchTestimonials();
        if (selectedTestimonial?._id === id) {
          setSelectedTestimonial({ ...selectedTestimonial, isApproved: !currentStatus });
        }
      }
    } catch (error) {
      console.error('Failed to update approval:', error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm(isArabic ? 'هل تريد حذف هذا التقييم؟' : 'Delete this testimonial?')) return;
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer-say/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchTestimonials();
        setSelectedTestimonial(null);
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  const getApprovalStyle = (isApproved: boolean) => {
    return isApproved 
      ? 'bg-gradient-to-r from-green-400 to-green-600' 
      : 'bg-gradient-to-r from-amber-400 to-orange-500';
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesFilter = statusFilter === '' || 
      (statusFilter === 'approved' && testimonial.isApproved) ||
      (statusFilter === 'pending' && !testimonial.isApproved);
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: testimonials.length,
    approved: testimonials.filter(t => t.isApproved).length,
    pending: testimonials.filter(t => !t.isApproved).length,
    avgRating: testimonials.length > 0 
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : '0'
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>
            {isArabic ? 'آراء العملاء' : 'Customer Testimonials'}
          </h1>
          <p className={`mt-1 sm:mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isArabic ? 'إدارة وموافقة على تقييمات العملاء' : 'Manage and approve customer reviews'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className={`rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>{stats.total}</div>
            <div className={`text-xs mt-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'إجمالي التقييمات' : 'Total Reviews'}</div>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-white">{stats.approved}</div>
            <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'معتمدة' : 'Approved'}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-white">{stats.pending}</div>
            <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'قيد المراجعة' : 'Pending'}</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-white">{stats.avgRating}</div>
            <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'متوسط التقييم' : 'Avg Rating'}</div>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg border p-5 mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isArabic ? 'بحث في التقييمات...' : 'Search testimonials...'}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600'}`}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-6 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-gray-800 border-gray-700 text-white focus:ring-gray-600'}`}
            >
              <option value="">{isArabic ? 'جميع الحالات' : 'All Status'}</option>
              <option value="approved">{isArabic ? 'معتمدة' : 'Approved'}</option>
              <option value="pending">{isArabic ? 'قيد المراجعة' : 'Pending'}</option>
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
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 testimonials-scrollbar">
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial._id} className={`backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-white/50'}`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${getApprovalStyle(testimonial.isApproved)} flex items-center justify-center shadow-lg`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.email}</div>
                      <div className="flex gap-1 mt-1">{renderStars(testimonial.rating)}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-center">
                      <div className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'التاريخ' : 'Date'}</div>
                      <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(testimonial.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</div>
                    </div>
                    <button
                      onClick={() => toggleApproval(testimonial._id, testimonial.isApproved)}
                      className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                        testimonial.isApproved 
                          ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white' 
                          : 'bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white'
                      }`}
                    >
                      {testimonial.isApproved 
                        ? (isArabic ? '✓ معتمد' : '✓ Approved')
                        : (isArabic ? '⏳ اعتماد' : '⏳ Approve')}
                    </button>
                    <button
                      onClick={() => setSelectedTestimonial(testimonial)}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {isArabic ? 'عرض' : 'View'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={() => setSelectedTestimonial(null)}>
          <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideUp ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className={`p-8 text-white ${getApprovalStyle(selectedTestimonial.isApproved)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-3">{isArabic ? 'تفاصيل التقييم' : 'Review Details'}</h2>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-lg ${selectedTestimonial.isApproved ? 'bg-white/20' : 'bg-black/20'}`}>
                      {selectedTestimonial.isApproved ? (isArabic ? '✓ معتمد' : '✓ Approved') : (isArabic ? '⏳ قيد المراجعة' : '⏳ Pending')}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedTestimonial(null)} className="hover:bg-white/20 rounded-xl p-3 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className={`overflow-y-auto max-h-[calc(90vh-180px)] p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
              <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'معلومات العميل' : 'Customer Info'}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'الاسم:' : 'Name:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTestimonial.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'البريد:' : 'Email:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTestimonial.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'التقييم:' : 'Rating:'}</span>
                    <div className="flex gap-1">{renderStars(selectedTestimonial.rating)}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'التاريخ:' : 'Date:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(selectedTestimonial.createdAt).toLocaleString(isArabic ? 'ar-EG' : 'en-US')}</span>
                  </div>
                </div>
              </div>

              <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                  </div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'التعليق' : 'Comment'}</h3>
                </div>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedTestimonial.comment}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleApproval(selectedTestimonial._id, selectedTestimonial.isApproved)}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                    selectedTestimonial.isApproved 
                      ? 'bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white' 
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                  }`}
                >
                  {selectedTestimonial.isApproved 
                    ? (isArabic ? '✗ إلغاء الاعتماد' : '✗ Unapprove')
                    : (isArabic ? '✓ اعتماد' : '✓ Approve')}
                </button>
                <button
                  onClick={() => deleteTestimonial(selectedTestimonial._id)}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg"
                >
                  {isArabic ? '🗑️ حذف' : '🗑️ Delete'}
                </button>
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
        .testimonials-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .testimonials-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        .testimonials-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #2563eb);
          border-radius: 10px;
        }
        .testimonials-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
        }
      `}</style>
    </div>
  );
}
