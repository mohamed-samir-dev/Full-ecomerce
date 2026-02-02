import { CheckCircleIcon, TruckIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case 'shipped':
      return <TruckIcon className="w-5 h-5 text-blue-500" />;
    case 'cancelled':
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    default:
      return <ClockIcon className="w-5 h-5 text-orange-500" />;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-700';
    case 'shipped':
      return 'bg-blue-100 text-blue-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-orange-100 text-orange-700';
  }
};
