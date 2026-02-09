'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { contactService } from '@/services/contactService';
import ContactHero from './components/ContactHero';
import ContactCards from './components/ContactCards';
import ContactForm from './components/ContactForm';
import ContactSidebar from './components/ContactSidebar';
import SuccessModal from './components/SuccessModal';

export default function Contact() {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await contactService.sendMessage(formData);
      setShowModal(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <ContactHero />
      <ContactCards />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 pb-12 sm:pb-16 lg:pb-20">
          <div className="lg:col-span-3">
            <ContactForm 
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
          <ContactSidebar />
        </div>
      </div>

      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
