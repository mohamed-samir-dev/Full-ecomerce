import { useState } from 'react';
import { User } from '../types';

export const useUserActions = (showToast: (type: 'success' | 'error', message: string) => void, fetchUsers: () => void, isArabic: boolean) => {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);

  const deleteUser = async (userId: string, onSuccess?: () => void) => {
    setDeleting(userId);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        showToast('success', isArabic ? 'تم حذف المستخدم بنجاح' : 'User deleted successfully');
        fetchUsers();
        onSuccess?.();
      } else {
        showToast('error', isArabic ? 'فشل حذف المستخدم' : 'Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      showToast('error', isArabic ? 'خطأ في حذف المستخدم' : 'Error deleting user');
    } finally {
      setDeleting(null);
    }
  };

  const resetPassword = async (user: User, newPassword: string, onSuccess?: () => void) => {
    if (!user || !newPassword) return;
    
    setResetting(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}/reset-password`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
      });

      if (res.ok) {
        showToast('success', isArabic ? 'تم تحديث كلمة المرور بنجاح!' : 'Password updated successfully!');
        onSuccess?.();
      } else {
        showToast('error', isArabic ? 'فشل تحديث كلمة المرور' : 'Failed to update password');
      }
    } catch (error) {
      console.error('Failed to reset password:', error);
      showToast('error', isArabic ? 'خطأ في تحديث كلمة المرور' : 'Error updating password');
    } finally {
      setResetting(false);
    }
  };

  return { deleteUser, resetPassword, deleting, resetting };
};
