'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { contactService } from '@/services/contactService';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import ContactHero from './components/ContactHero';
import ContactCards from './components/ContactCards';
import ContactForm from './components/ContactForm';
import ContactSidebar from './components/ContactSidebar';
import SuccessModal from './components/SuccessModal';
import ErrorModal from './components/ErrorModal';

export default function Contact() {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DynamicMetadata
        titleAr="اتصل بنا - Global Shop"
        titleEn="Contact Us - Global Shop"
        descriptionAr="تواصل معنا للاستفسار عن منتجاتنا أو خدماتنا. فريق خدمة العملاء جاهز لمساعدتك"
        descriptionEn="Get in touch with us for inquiries about our products or services. Our customer service team is ready to help you"
        keywordsAr={['اتصل بنا', 'خدمة العملاء', 'دعم', 'تواصل']}
        keywordsEn={['contact us', 'customer service', 'support', 'get in touch']}
      />
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <ContactHero />
      <ContactCards />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form + Sidebar: stacked on mobile/tablet, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 pb-12 sm:pb-16 lg:pb-24">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <ContactForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
          {/* Sidebar comes first on mobile so user sees info before form */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <ContactSidebar />
          </div>
        </div>
      </div>

      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
      {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
      </div>
    </>
  );
}
