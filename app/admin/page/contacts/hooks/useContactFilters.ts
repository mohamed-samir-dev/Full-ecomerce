import { useState, useMemo } from 'react';
import { Contact } from '../types';

export const useContactFilters = (contacts: Contact[]) => {
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => 
    contacts.filter(contact =>
      (statusFilter === '' || contact.status === statusFilter) &&
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       contact.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [contacts, statusFilter, searchTerm]
  );

  const stats = useMemo(() => ({
    total: contacts.length,
    pending: contacts.filter(c => c.status === 'pending').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length
  }), [contacts]);

  return {
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    filteredContacts,
    stats
  };
};
