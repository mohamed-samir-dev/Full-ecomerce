'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  orders: string[];
  wishlist: string[];
  cart: string[];
  createdAt: string;
  updatedAt: string;
}

interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

export default function UsersPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetting, setResetting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
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
        setSelectedUser(null);
        setDeleteConfirm(null);
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

  const resetPassword = async () => {
    if (!resetPasswordUser || !newPassword) return;
    
    setResetting(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${resetPasswordUser._id}/reset-password`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
      });

      if (res.ok) {
        showToast('success', isArabic ? 'تم تحديث كلمة المرور بنجاح!' : 'Password updated successfully!');
        setResetPasswordUser(null);
        setNewPassword('');
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

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter === '' || user.role === roleFilter)
  );

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length,
    withOrders: users.filter(u => u.orders?.length > 0).length
  };

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'إدارة المستخدمين' : 'Users Management'}</h1>
            <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'إدارة جميع المستخدمين المسجلين' : 'Manage all registered users'}</p>
          </div>
          <div className="text-4xl sm:text-5xl">👥</div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'إجمالي المستخدمين' : 'Total Users'}</p>
                <p className={`text-2xl sm:text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>👥</div>
            </div>
          </div>

          <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'المسؤولين' : 'Admins'}</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1">{stats.admins}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>👑</div>
            </div>
          </div>

          <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'المستخدمين العاديين' : 'Regular Users'}</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">{stats.users}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${isDarkMode ? 'bg-green-900/50' : 'bg-green-100'}`}>🙋</div>
            </div>
          </div>

          <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'لديهم طلبات' : 'With Orders'}</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-1">{stats.withOrders}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${isDarkMode ? 'bg-orange-900/50' : 'bg-orange-100'}`}>📦</div>
            </div>
          </div>
        </div>

        <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isArabic ? 'البحث بالاسم أو البريد الإلكتروني...' : 'Search by name or email...'}
                className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-200 text-gray-900'}`}
              />
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200 text-gray-900'}`}
            >
              <option value="">{isArabic ? 'جميع الأدوار' : 'All Roles'}</option>
              <option value="admin">{isArabic ? 'مسؤول' : 'Admin'}</option>
              <option value="user">{isArabic ? 'مستخدم' : 'User'}</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className={`flex items-center justify-center h-64 rounded-2xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`animate-spin rounded-full h-12 w-12 border-4 ${isDarkMode ? 'border-gray-700 border-t-blue-400' : 'border-blue-500 border-t-transparent'}`}></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className={`rounded-2xl p-12 text-center shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{isArabic ? 'لم يتم العثور على مستخدمين' : 'No Users Found'}</h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'حاول تعديل معايير البحث' : 'Try adjusting your search criteria'}</p>
          </div>
        ) : (
          <div className={`rounded-xl sm:rounded-2xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">{isArabic ? 'المستخدم' : 'User'}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold hidden lg:table-cell">{isArabic ? 'البريد الإلكتروني' : 'Email'}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">{isArabic ? 'الدور' : 'Role'}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold hidden md:table-cell">{isArabic ? 'الطلبات' : 'Orders'}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold hidden md:table-cell">{isArabic ? 'المفضلة' : 'Wishlist'}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold hidden xl:table-cell">{isArabic ? 'تاريخ الانضمام' : 'Joined'}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold">{isArabic ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className={`font-semibold text-xs sm:text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</span>
                        </div>
                      </td>
                      <td className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm hidden lg:table-cell ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        {user.role === 'admin' ? (
                          <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-purple-100 text-purple-700 whitespace-nowrap">{isArabic ? 'مسؤول' : 'ADMIN'}</span>
                        ) : (
                          <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">{isArabic ? 'مستخدم' : 'USER'}</span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center hidden md:table-cell">
                        <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-bold">
                          {user.orders?.length || 0}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center hidden md:table-cell">
                        <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-pink-50 text-pink-700 rounded-lg text-xs sm:text-sm font-bold">
                          {user.wishlist?.length || 0}
                        </span>
                      </td>
                      <td className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm hidden xl:table-cell ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {new Date(user.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap"
                          >
                            {isArabic ? 'عرض' : 'View'}
                          </button>
                          <button
                            onClick={() => setResetPasswordUser(user)}
                            className="px-2 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap hidden sm:inline-block"
                          >
                            {isArabic ? 'إعادة تعيين' : 'Reset'}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(user)}
                            className="px-2 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-[10px] sm:text-sm font-medium whitespace-nowrap"
                          >
                            {isArabic ? 'حذف' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedUser(null)}>
          <div className={`rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                    <p className="text-blue-100 text-sm">{selectedUser.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="w-10 h-10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
                  <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'الدور' : 'Role'}</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? (selectedUser.role === 'admin' ? 'مسؤول' : 'مستخدم') : selectedUser.role.toUpperCase()}</p>
                </div>
                <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50' : 'bg-gradient-to-br from-green-50 to-emerald-50'}`}>
                  <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'إجمالي الطلبات' : 'Total Orders'}</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.orders?.length || 0}</p>
                </div>
                <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-gradient-to-br from-pink-900/50 to-rose-900/50' : 'bg-gradient-to-br from-pink-50 to-rose-50'}`}>
                  <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'عناصر المفضلة' : 'Wishlist Items'}</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.wishlist?.length || 0}</p>
                </div>
                <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-gradient-to-br from-orange-900/50 to-amber-900/50' : 'bg-gradient-to-br from-orange-50 to-amber-50'}`}>
                  <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'عناصر السلة' : 'Cart Items'}</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.cart?.length || 0}</p>
                </div>
              </div>

              <div className={`rounded-2xl p-4 space-y-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'معرف المستخدم' : 'User ID'}</span>
                  <span className={`font-mono text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{selectedUser._id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'تاريخ الانضمام' : 'Joined'}</span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-900'}>{new Date(selectedUser.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'آخر تحديث' : 'Last Updated'}</span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-900'}>{new Date(selectedUser.updatedAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</span>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span>⚠️</span> {isArabic ? 'منطقة الخطر' : 'Danger Zone'}
                </h3>
                <p className="text-sm text-red-700 mb-3">{isArabic ? 'حذف هذا المستخدم نهائياً وجميع البيانات المرتبطة به.' : 'Permanently delete this user and all associated data.'}</p>
                <button
                  onClick={() => setDeleteConfirm(selectedUser)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  {isArabic ? 'حذف المستخدم' : 'Delete User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {resetPasswordUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => { setResetPasswordUser(null); setNewPassword(''); }}>
          <div className={`rounded-3xl shadow-2xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">🔑</div>
                  <div>
                    <h2 className="text-xl font-bold">{isArabic ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}</h2>
                    <p className="text-green-100 text-sm">{resetPasswordUser.name}</p>
                  </div>
                </div>
                <button onClick={() => { setResetPasswordUser(null); setNewPassword(''); }} className="w-10 h-10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{isArabic ? 'كلمة المرور الجديدة' : 'New Password'}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={isArabic ? 'أدخل كلمة المرور الجديدة' : 'Enter new password'}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-200 text-gray-900'}`}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetPassword}
                  disabled={!newPassword || resetting}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resetting ? (isArabic ? 'جاري التحديث...' : 'Updating...') : (isArabic ? 'تحديث كلمة المرور' : 'Update Password')}
                </button>
                <button
                  onClick={() => { setResetPasswordUser(null); setNewPassword(''); }}
                  className={`px-4 py-3 rounded-xl transition-colors font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setDeleteConfirm(null)}>
          <div className={`rounded-3xl shadow-2xl max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">⚠️</div>
                  <div>
                    <h2 className="text-xl font-bold">{isArabic ? 'تأكيد الحذف' : 'Confirm Delete'}</h2>
                    <p className="text-red-100 text-sm">{deleteConfirm.name}</p>
                  </div>
                </div>
                <button onClick={() => setDeleteConfirm(null)} className="w-10 h-10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
                  {isArabic ? 'هل أنت متأكد من حذف هذا المستخدم؟ سيتم حذف جميع البيانات المرتبطة به نهائياً ولا يمكن التراجع عن هذا الإجراء.' : 'Are you sure you want to delete this user? All associated data will be permanently removed and this action cannot be undone.'}
                </p>
              </div>

              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'الاسم:' : 'Name:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{deleteConfirm.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'البريد:' : 'Email:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{deleteConfirm.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{isArabic ? 'الطلبات:' : 'Orders:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{deleteConfirm.orders?.length || 0}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => deleteUser(deleteConfirm._id)}
                  disabled={deleting === deleteConfirm._id}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting === deleteConfirm._id ? (isArabic ? 'جاري الحذف...' : 'Deleting...') : (isArabic ? 'نعم، احذف' : 'Yes, Delete')}
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className={`px-4 py-3 rounded-xl transition-colors font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-4 right-4 z-[60] space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-sm border animate-slide-in ${
              toast.type === 'success'
                ? 'bg-green-500/95 border-green-400 text-white'
                : 'bg-red-500/95 border-red-400 text-white'
            }`}
          >
            <div className="text-2xl">
              {toast.type === 'success' ? '✓' : '✕'}
            </div>
            <p className="font-medium">{toast.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
