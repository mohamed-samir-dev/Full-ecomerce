"use client";

import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";
import { useTestimonials } from "../../hooks/useTestimonials";
import {
  LoadingSkeleton,
  SectionHeader,
  TestimonialCard,
  ReviewFormModal,
  SuccessModal
} from "./components";

export default function CustomerSaySection() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
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
      <section className={`py-8 sm:py-12 md:py-16 lg:py-20 ${isDarkMode ? "bg-[#191C21]" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader isLoggedIn={isLoggedIn} onOpenForm={() => setIsFormOpen(true)} />

          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {isArabic ? "لا توجد تقييمات بعد. كن أول من يترك تقييماً!" : "No reviews yet. Be the first to leave a review!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} />
              ))}
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
