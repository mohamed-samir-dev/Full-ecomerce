export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
}

export interface ContactStats {
  total: number;
  pending: number;
  read: number;
  replied: number;
}

export interface ContactCardProps {
  contact: Contact;
  isDarkMode: boolean;
  isArabic: boolean;
  onViewDetails: (contact: Contact) => void;
}
export interface ContactModalProps {
  contact: Contact;
  isDarkMode: boolean;
  isArabic: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => void;
}
export interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  isDarkMode: boolean;
  isArabic: boolean;
}