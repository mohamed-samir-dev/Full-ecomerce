import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { OrderItemsProps } from '../types/types';



export default function OrderItems({ products, isPrivateView, isDarkMode }: OrderItemsProps) {
  return (
    <div className={`rounded-lg border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Order Items ({products.length})</h3>
      <div className="space-y-4">
        {products.map((item, index) => (
          <div key={index} className={`flex gap-4 pb-4 ${index !== products.length - 1 ? 'border-b' : ''} ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className={`w-20 h-20 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <DocumentTextIcon className={`w-10 h-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            </div>
            <div className="flex-1">
              <h4 className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {isPrivateView ? '••••••••••••••' : item.name}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Quantity: {item.quantity}</p>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Unit Price: ${isPrivateView ? '••••' : item.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ${isPrivateView ? '••••' : (item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
