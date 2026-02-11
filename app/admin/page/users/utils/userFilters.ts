import { User, UserStats } from '../types';

export const filterUsers = (users: User[], searchTerm: string, roleFilter: string): User[] => {
  return users.filter(user =>
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter === '' || user.role === roleFilter)
  );
};

export const calculateStats = (users: User[]): UserStats => {
  return {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length,
    withOrders: users.filter(u => u.orders?.length > 0).length
  };
};
