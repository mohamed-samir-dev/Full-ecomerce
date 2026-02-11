'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTestimonials } from './hooks/useTestimonials';
import { LoadingSpinner } from './components/LoadingSpinner';
import { StatsCards } from './components/StatsCards';
import { SearchFilterBar } from './components/SearchFilterBar';
import { TestimonialCard } from './components/TestimonialCard';
import { TestimonialModal } from './components/TestimonialModal';
import { CustomerSay } from './types';

export default function CustomerSaysPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const { testimonials, loading, stats, toggleApproval, removeTestimonial } = useTestimonials();
  const [selectedTestimonial, setSelectedTestimonial] = useState<CustomerSay | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    const success = await toggleApproval(id, currentStatus);
    if (success && selectedTestimonial?._id === id) {
      setSelectedTestimonial({ ...selectedTestimonial, isApproved: !currentStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isArabic ? 'هل تريد حذف هذا التقييم؟' : 'Delete this testimonial?')) return;
    const success = await removeTestimonial(id);
    if (success) setSelectedTestimonial(null);
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

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>
            {isArabic ? 'آراء العملاء' : 'Customer Testimonials'}
          </h1>
          <p className={`mt-1 sm:mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isArabic ? 'إدارة وموافقة على تقييمات العملاء' : 'Manage and approve customer reviews'}
          </p>
        </div>

        <StatsCards stats={stats} isDarkMode={isDarkMode} isArabic={isArabic} />

        <SearchFilterBar 
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
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 testimonials-scrollbar">
            {filteredTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
                isDarkMode={isDarkMode}
                isArabic={isArabic}
                onToggleApproval={handleToggleApproval}
                onView={setSelectedTestimonial}
              />
            ))}
          </div>
        )}
      </div>

      {selectedTestimonial && (
        <TestimonialModal
          testimonial={selectedTestimonial}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          onClose={() => setSelectedTestimonial(null)}
          onToggleApproval={handleToggleApproval}
          onDelete={handleDelete}
        />
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
