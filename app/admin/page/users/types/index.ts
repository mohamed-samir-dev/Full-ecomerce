export interface User {
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

export interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

export interface UserStats {
  total: number;
  admins: number;
  users: number;
  withOrders: number;
}


export interface DeleteConfirmModalProps {
  user: User | null;
  isDarkMode: boolean;
  isArabic: boolean;
  deleting: string | null;
  onConfirm: (userId: string) => void;
  onClose: () => void;
}
export interface ResetPasswordModalProps {
  user: User | null;
  isDarkMode: boolean;
  isArabic: boolean;
  newPassword: string;
  setNewPassword: (value: string) => void;
  resetting: boolean;
  onReset: () => void;
  onClose: () => void;
}

export interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface UsersTableProps {
  users: User[];
  isDarkMode: boolean;
  isArabic: boolean;
  onViewUser: (user: User) => void;
  onResetPassword: (user: User) => void;
  onDeleteUser: (user: User) => void;
}
export interface UserDetailsModalProps {
  user: User | null;
  isDarkMode: boolean;
  isArabic: boolean;
  onClose: () => void;
  onDelete: (user: User) => void;
}