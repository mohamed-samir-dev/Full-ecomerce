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
