import Image from 'next/image';
import { OrderDetailsModalProps } from '../types';
import { getStatusStyle, getStatusLabel } from '../utils/orderHelpers';
import { ORDER_STATUSES } from '../constants';

export default function OrderDetailsModal({ order, isDarkMode, isArabic, onClose, onUpdateStatus }: OrderDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
      <div className={`rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-slideUp ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
        <div className="bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3">{isArabic ? 'تفاصيل الطلب' : 'Order Details'}</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">#{order._id.slice(-8).toUpperCase()}</span>
                <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusStyle(order.status)} shadow-lg`}>
                  {getStatusLabel(order.status, isArabic)}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 rounded-xl p-3 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className={`overflow-y-auto max-h-[calc(90vh-180px)] p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className={`rounded-xl p-6 shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'العميل' : 'Customer'}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'الاسم:' : 'Name:'}</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.userId?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'البريد:' : 'Email:'}</span>
                  <span className={`font-semibold text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.userId?.email || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-6 shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                </div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'عنوان الشحن' : 'Shipping Address'}</h3>
              </div>
              <div className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="font-semibold mt-2">{order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'المنتجات' : 'Products'} ({order.products.length})</h3>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {order.products.map((item, idx) => (
                <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-linear-to-r from-gray-50 to-purple-50'}`}>
                  {item.productId?.mainImage && (
                    <Image src={item.productId.mainImage} alt={item.name} width={70} height={70} className="w-[70px] h-[70px] object-cover rounded-lg shadow-md" />
                  )}
                  <div className="flex-1">
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{isArabic ? 'الكمية' : 'Qty'}: {item.quantity} × {item.price.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}</p>
                    {item.selectedOptions && (
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.selectedOptions.size && `${isArabic ? 'المقاس' : 'Size'}: ${item.selectedOptions.size}`}
                        {item.selectedOptions.color && ` • ${isArabic ? 'اللون' : 'Color'}: ${item.selectedOptions.color}`}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{(item.quantity * item.price).toFixed(2)}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'جنيه' : 'EGP'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'معلومات الدفع' : 'Payment Info'}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'الطريقة:' : 'Method:'}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'التاريخ:' : 'Date:'}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(order.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</span>
              </div>
            </div>
            {order.notes && (
              <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-amber-100'}`}>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className="font-semibold">{isArabic ? 'ملاحظات:' : 'Notes:'}</span> {order.notes}</p>
              </div>
            )}
          </div>

          <div className="bg-linear-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white mb-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">{isArabic ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
              <span className="text-4xl font-bold">{order.totalPrice.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}</span>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'تحديث الحالة' : 'Update Status'}</h3>
            <div className="flex flex-wrap gap-3">
              {ORDER_STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => onUpdateStatus(order._id, status)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    order.status === status
                      ? `${getStatusStyle(status)} text-white shadow-lg scale-105`
                      : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getStatusLabel(status, isArabic)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
