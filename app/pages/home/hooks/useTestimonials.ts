import { useState, useEffect } from "react";
import { customerSayService } from "@/services/customerSayService";
import { Testimonial, FormData } from "../types/home.types";

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    rating: 0,
    comment: ""
  });

  useEffect(() => {
    fetchTestimonials();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await customerSayService.getApprovedTestimonials();
      setTestimonials(response.data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) return;

    setIsSubmitting(true);
    try {
      await customerSayService.createTestimonial(formData);
      setShowSuccess(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", rating: 0, comment: "" });
        setShowSuccess(false);
        setIsFormOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit testimonial:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};
