export interface CustomerSay {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Stats {
  total: number;
  approved: number;
  pending: number;
  avgRating: string;
}


export interface SearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface TestimonialCardProps {
  testimonial: CustomerSay;
  isDarkMode: boolean;
  isArabic: boolean;
  onToggleApproval: (id: string, currentStatus: boolean) => void;
  onView: (testimonial: CustomerSay) => void;
}
export interface TestimonialModalProps {
  testimonial: CustomerSay;
  isDarkMode: boolean;
  isArabic: boolean;
  onClose: () => void;
  onToggleApproval: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
}