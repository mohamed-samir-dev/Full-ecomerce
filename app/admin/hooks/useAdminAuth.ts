import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAdminAuth = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (!token || !userStr) {
      router.replace('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'admin') {
        router.replace('/login');
        return;
      }
      queueMicrotask(() => setIsAuthorized(true));
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.replace('/login');
    }
  }, [router]);

  return isAuthorized;
};
