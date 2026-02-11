import { Contact } from '../types';

const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

export const contactAPI = {
  fetchAll: async (): Promise<Contact[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await res.json();
    return data.success ? data.data : [];
  },

  updateStatus: async (id: string, status: string): Promise<boolean> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${getToken()}` 
      },
      body: JSON.stringify({ status })
    });
    return res.ok;
  }
};
