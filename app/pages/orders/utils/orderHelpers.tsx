import React from 'react';
import { CheckCircleIcon, TruckIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface StatusConfig {
  color: string;
  icon: React.ReactElement;
  labelKey: string;
}

export const getStatusConfig = (status: string): StatusConfig => {
  switch (status.toLowerCase()) {
    case 'delivered': return { color: 'text-emerald-600 bg-emerald-100 border-emerald-200', icon: <CheckCircleIcon className="w-5 h-5" />, labelKey: 'orders.status.delivered' };
    case 'shipped': return { color: 'text-blue-600 bg-blue-100 border-blue-200', icon: <TruckIcon className="w-5 h-5" />, labelKey: 'orders.status.shipped' };
    case 'processing': return { color: 'text-orange-600 bg-orange-100 border-orange-200', icon: <ClockIcon className="w-5 h-5" />, labelKey: 'orders.status.processing' };
    case 'cancelled': return { color: 'text-red-600 bg-red-100 border-red-200', icon: <XCircleIcon className="w-5 h-5" />, labelKey: 'orders.status.cancelled' };
    default: return { color: 'text-slate-600 bg-slate-100 border-slate-200', icon: <ClockIcon className="w-5 h-5" />, labelKey: 'orders.status.processing' };
  }
};
