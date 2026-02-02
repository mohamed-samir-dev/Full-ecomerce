import { useEffect, useState } from 'react';
import { Review } from '../types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${productId}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.data || data);
        }
      } catch (error) {
        // Silently fail - reviews are optional
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  return { reviews, loading };
};

export const useAuth = () => {
  const [isLoggedIn] = useState(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return !!token;
  });

  return { isLoggedIn };
};
