import { CheckCircleIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import {OrderHeaderProps}from '../types/types'

export default function OrderHeader({ orderId, createdAt, isPrivateView, isDarkMode, onTogglePrivacy }: OrderHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <CheckCircleIcon className="w-10 h-10 text-green-600" />
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Order Confirmed
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Order #{isPrivateView ? '••••••••' : orderId.slice(-8)}
            </p>
          </div>
        </div>
        <button
          onClick={onTogglePrivacy}
          className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}
        >
          <EyeSlashIcon className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
        </button>
      </div>
      <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
        Order placed on {new Date(createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  );
}
