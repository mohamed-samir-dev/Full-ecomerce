import { useState, useEffect } from 'react';
import { Review, Product } from '../types';

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      if (data.success) {
        const allReviews: Review[] = [];
        data.data.forEach((product: Product) => {
          if (product.reviews && product.reviews.length > 0) {
            product.reviews.forEach((review: Review) => {
              allReviews.push({
                ...review,
                productId: product._id,
                productName: product.name,
                productImage: product.mainImage
              });
            });
          }
        });
        setReviews(allReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (productId: string, reviewId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      if (data.success) {
        const product = data.data;
        const updatedReviews = product.reviews.map((r: Review) => 
          r._id === reviewId ? { ...r, approved: !currentStatus } : r
        );
        
        const updateRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ reviews: updatedReviews })
        });
        if (!updateRes.ok) throw new Error(`HTTP error: ${updateRes.status}`);
        
        fetchReviews();
        return !currentStatus;
      }
    } catch (error) {
      console.error('Failed to update approval:', error);
    }
  };

  const deleteReview = async (productId: string, reviewId: string, isArabic: boolean) => {
    if (!confirm(isArabic ? 'هل تريد حذف هذا التقييم؟' : 'Delete this review?')) return false;
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      if (data.success) {
        const product = data.data;
        const updatedReviews = product.reviews.filter((r: Review) => r._id !== reviewId);
        
        const deleteRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ reviews: updatedReviews })
        });
        if (!deleteRes.ok) throw new Error(`HTTP error: ${deleteRes.status}`);
        
        fetchReviews();
        return true;
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
    return false;
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return { reviews, loading, fetchReviews, toggleApproval, deleteReview };
};
