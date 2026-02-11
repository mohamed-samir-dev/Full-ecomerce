import { useState, useEffect } from 'react';
import { Contact } from '../types';
import { contactAPI } from '../utils/api';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await contactAPI.fetchAll();
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const success = await contactAPI.updateStatus(id, status);
      if (success) {
        fetchContacts();
        if (selectedContact?._id === id) {
          setSelectedContact({ ...selectedContact, status: status as Contact['status'] });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedContact(null);
    };
    if (selectedContact) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedContact]);

  return {
    contacts,
    loading,
    selectedContact,
    setSelectedContact,
    updateStatus
  };
};
