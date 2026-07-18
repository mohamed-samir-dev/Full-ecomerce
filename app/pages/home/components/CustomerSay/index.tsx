'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { useTestimonials } from '../../hooks/useTestimonials';
import { LoadingSkeleton, SectionHeader, TestimonialCard, ReviewFormModal, SuccessModal } from './components';

const accentColor = '#C9A84C';

export default function CustomerSaySection() {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    testimonials, loading, isFormOpen, setIsFormOpen,
    showSuccess, isSubmitting, isLoggedIn, formData, setFormData, handleSubmit
  } = useTestimonials();

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      <section
        className={`relative py-16 sm:py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
          isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'
        }`}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, ${accentColor} 0%, transparent 60%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <SectionHeader isLoggedIn={isLoggedIn} onOpenForm={() => setIsFormOpen(true)} />
          </motion.div>

          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-base ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                {isArabic ? 'لا توجد تقييمات بعد. كن أول من يترك تقييماً!' : 'No reviews yet. Be the first to leave a review!'}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div
                ref={scrollRef}
                className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] snap-center"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ReviewFormModal
        isOpen={isFormOpen && !showSuccess}
        onClose={() => setIsFormOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <SuccessModal isOpen={showSuccess} />
    </>
  );
}
