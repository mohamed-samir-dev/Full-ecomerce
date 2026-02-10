"use client";

import { useRef } from "react";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/context/ThemeContext";
import { useTestimonials } from "../../hooks/useTestimonials";
import {
  LoadingSkeleton,
  SectionHeader,
  TestimonialCard,
  ReviewFormModal,
  SuccessModal
} from "./components";

export default function CustomerSaySection() {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    testimonials,
    loading,
    isFormOpen,
    setIsFormOpen,
    showSuccess,
    isSubmitting,
    isLoggedIn,
    formData,
    setFormData,
    handleSubmit
  } = useTestimonials();

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      <section className={`py-8 sm:py-12 md:py-16 lg:py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader isLoggedIn={isLoggedIn} onOpenForm={() => setIsFormOpen(true)} />

          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {isArabic ? "لا توجد تقييمات بعد. كن أول من يترك تقييماً!" : "No reviews yet. Be the first to leave a review!"}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div 
                ref={scrollRef}
                className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] snap-center">
                  <TestimonialCard testimonial={testimonial} />
                </div>
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
