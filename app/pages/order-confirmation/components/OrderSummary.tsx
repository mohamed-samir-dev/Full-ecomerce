
import {OrderSummaryProps}from '../types/types'
export default function OrderSummary({ totalPrice, isPrivateView, isDarkMode }: OrderSummaryProps) {
  return (
    <div className={`rounded-lg border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Subtotal</span>
          <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
            ${isPrivateView ? '••••' : (totalPrice * 0.85).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Tax (8%)</span>
          <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
            ${isPrivateView ? '••••' : (totalPrice * 0.08).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Discount</span>
          <span className="text-green-600">-${isPrivateView ? '••' : (totalPrice * 0.07).toFixed(2)}</span>
        </div>
        <div className={`border-t pt-3 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          <div className="flex justify-between">
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Total</span>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              ${isPrivateView ? '••••••' : totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
