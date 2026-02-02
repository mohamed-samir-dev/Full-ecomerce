'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import AccountInfo from './components/AccountInfo';
import OrdersHistory from './components/OrdersHistory';
import AddressesSection from './components/AddressesSection';
import { User } from './types/types';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        router.push('/pages/login');
        return;
      }

      try {
        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Server returned non-JSON response. Please restart the backend server.');
          router.push('/pages/login');
          return;
        }

        const data = await response.json();
        
        if (response.ok && data.success) {
          setUser(data.data);
        } else {
          console.error('Profile fetch failed:', data);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          router.push('/pages/login');
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/pages/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="animate-pulse space-y-3 sm:space-y-4 md:space-y-6">
            <div className={`h-24 sm:h-28 md:h-32 rounded-xl sm:rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`h-20 sm:h-24 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div className={`h-80 sm:h-96 rounded-xl sm:rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`} />
              <div className={`h-80 sm:h-96 rounded-xl sm:rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-3 sm:space-y-4 md:space-y-6">
        <ProfileHeader user={user} isDarkMode={isDarkMode} isArabic={isArabic} />
        <ProfileStats user={user} isDarkMode={isDarkMode} isArabic={isArabic} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <AccountInfo user={user} setUser={(u) => setUser(u)} isDarkMode={isDarkMode} isArabic={isArabic} />
          <AddressesSection user={user} setUser={(u) => setUser(u)} isDarkMode={isDarkMode} isArabic={isArabic} />
        </div>
        <OrdersHistory isDarkMode={isDarkMode} isArabic={isArabic} />
      </div>
    </div>
  );
}