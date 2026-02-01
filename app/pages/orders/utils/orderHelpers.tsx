import React from 'react';
import { CheckCircleIcon, TruckIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';

export const getStatusConfig = (status: string): { color: string; icon: React.ReactElement; label: string } => {
  switch (status.toLowerCase()) {
    case 'delivered': return { color: 'text-emerald-600 bg-emerald-100 border-emerald-200', icon: <CheckCircleIcon className="w-5 h-5" />, label: 'Delivered' };
    case 'shipped': return { color: 'text-blue-600 bg-blue-100 border-blue-200', icon: <TruckIcon className="w-5 h-5" />, label: 'Shipped' };
    case 'processing': return { color: 'text-orange-600 bg-orange-100 border-orange-200', icon: <ClockIcon className="w-5 h-5" />, label: 'Processing' };
    case 'cancelled': return { color: 'text-red-600 bg-red-100 border-red-200', icon: <XCircleIcon className="w-5 h-5" />, label: 'Cancelled' };
    default: return { color: 'text-slate-600 bg-slate-100 border-slate-200', icon: <ClockIcon className="w-5 h-5" />, label: status };
  }
};
