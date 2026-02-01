import { TruckIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import {DeliveryInfoProps}from '../types/types'


export default function DeliveryInfo({ estimatedDelivery, isDarkMode }: DeliveryInfoProps) {
  return (
    <div className={`rounded-lg border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Delivery Information</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <TruckIcon className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Estimated Delivery</p>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
              {new Date(estimatedDelivery).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Secure Delivery</p>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Signature required</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ClockIcon className="w-5 h-5 text-orange-500 mt-0.5" />
          <div>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Tracking Available</p>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
