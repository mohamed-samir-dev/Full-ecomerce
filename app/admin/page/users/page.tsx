'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useUsers } from './hooks/useUsers';
import { useUserActions } from './hooks/useUserActions';
import { filterUsers, calculateStats } from './utils/userFilters';
import { StatsCards } from './components/StatsCards';
import { SearchFilters } from './components/SearchFilters';
import { UsersTable } from './components/UsersTable';
import { UserDetailsModal } from './components/UserDetailsModal';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ToastList } from './components/ToastList';
import { User } from './types';

export default function UsersPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const { users, loading, toasts, showToast, fetchUsers } = useUsers();
  const { deleteUser, resetPassword, deleting, resetting } = useUserActions(showToast, fetchUsers, isArabic);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);

  const filteredUsers = filterUsers(users, searchTerm, roleFilter);
  const stats = calculateStats(users);

  const handleResetPassword = () => {
    if (resetPasswordUser) {
      resetPassword(resetPasswordUser, newPassword, () => {
        setResetPasswordUser(null);
        setNewPassword('');
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId, () => {
      setSelectedUser(null);
      setDeleteConfirm(null);
    });
  };

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'إدارة المستخدمين' : 'Users Management'}
            </h1>
            <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {isArabic ? 'إدارة جميع المستخدمين المسجلين' : 'Manage all registered users'}
            </p>
          </div>
          <div className="text-4xl sm:text-5xl">👥</div>
        </div>

        <StatsCards stats={stats} isDarkMode={isDarkMode} isArabic={isArabic} />

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
        />

        {loading ? (
          <div className={`flex items-center justify-center h-64 rounded-2xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`animate-spin rounded-full h-12 w-12 border-4 ${isDarkMode ? 'border-gray-700 border-t-blue-400' : 'border-blue-500 border-t-transparent'}`}></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className={`rounded-2xl p-12 text-center shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {isArabic ? 'لم يتم العثور على مستخدمين' : 'No Users Found'}
            </h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              {isArabic ? 'حاول تعديل معايير البحث' : 'Try adjusting your search criteria'}
            </p>
          </div>
        ) : (
          <UsersTable
            users={filteredUsers}
            isDarkMode={isDarkMode}
            isArabic={isArabic}
            onViewUser={setSelectedUser}
            onResetPassword={setResetPasswordUser}
            onDeleteUser={setDeleteConfirm}
          />
        )}
      </div>

      <UserDetailsModal
        user={selectedUser}
        isDarkMode={isDarkMode}
        isArabic={isArabic}
        onClose={() => setSelectedUser(null)}
        onDelete={setDeleteConfirm}
      />

      <ResetPasswordModal
        user={resetPasswordUser}
        isDarkMode={isDarkMode}
        isArabic={isArabic}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        resetting={resetting}
        onReset={handleResetPassword}
        onClose={() => {
          setResetPasswordUser(null);
          setNewPassword('');
        }}
      />

      <DeleteConfirmModal
        user={deleteConfirm}
        isDarkMode={isDarkMode}
        isArabic={isArabic}
        deleting={deleting}
        onConfirm={handleDeleteUser}
        onClose={() => setDeleteConfirm(null)}
      />

      <ToastList toasts={toasts} />
    </div>
  );
}
