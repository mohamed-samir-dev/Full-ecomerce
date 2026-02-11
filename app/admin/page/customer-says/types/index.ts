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
