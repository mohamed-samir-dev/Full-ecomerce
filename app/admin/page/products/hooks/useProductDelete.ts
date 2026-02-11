import { useState } from 'react';

export const useProductDelete = (onSuccess: () => void, isArabic: boolean) => {
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm(isArabic ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) return;
    
    setDeleteLoading(id);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        onSuccess();
      } else {
        alert(isArabic ? 'فشل حذف المنتج' : 'Failed to delete product');
      }
    } catch {
      alert(isArabic ? 'فشل حذف المنتج' : 'Failed to delete product');
    } finally {
      setDeleteLoading(null);
    }
  };

  return { handleDelete, deleteLoading };
};
