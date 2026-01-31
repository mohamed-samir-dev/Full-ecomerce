import { useEffect, useState } from 'react';
import { Review } from '../types/types';

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.data || data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
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
