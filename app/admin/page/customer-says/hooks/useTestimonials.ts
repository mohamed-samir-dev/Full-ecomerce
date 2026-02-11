import { useState, useEffect } from 'react';
import { CustomerSay, Stats } from '../types';
import { fetchTestimonials, updateApproval, deleteTestimonial } from '../utils/api';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<CustomerSay[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const data = await fetchTestimonials();
      if (data.success) setTestimonials(data.data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const res = await updateApproval(id, !currentStatus);
      if (res.ok) {
        loadTestimonials();
        return true;
      }
    } catch (error) {
      console.error('Failed to update approval:', error);
    }
    return false;
  };

  const removeTestimonial = async (id: string) => {
    try {
      const res = await deleteTestimonial(id);
      if (res.ok) {
        loadTestimonials();
        return true;
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
    return false;
  };

  const stats: Stats = {
    total: testimonials.length,
    approved: testimonials.filter(t => t.isApproved).length,
    pending: testimonials.filter(t => !t.isApproved).length,
    avgRating: testimonials.length > 0 
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : '0'
  };

  return { testimonials, loading, stats, toggleApproval, removeTestimonial };
};
