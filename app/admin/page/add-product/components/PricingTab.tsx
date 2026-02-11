import { PricingTabProps } from '../types/product';



export default function PricingTab({ formData, isDarkMode, isArabic, onChange, onDiscountChange, onCheckboxChange }: PricingTabProps) {
  const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'}`;
  const labelClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>{isArabic ? 'السعر الأساسي *' : 'Base Price *'}</label>
          <input name="basePrice" type="number" value={formData.basePrice} onChange={onChange} placeholder="0.00" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'العملة' : 'Currency'}</label>
          <select name="currency" value={formData.currency} onChange={onChange} className={inputClass}>
            <option value="EGP">EGP</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'المخزون *' : 'Stock *'}</label>
          <input name="stock" type="number" value={formData.stock} onChange={onChange} placeholder="0" className={inputClass} required />
        </div>
      </div>
      <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
        <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>💸 {isArabic ? 'الخصم' : 'Discount'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{isArabic ? 'النوع' : 'Type'}</label>
            <select value={formData.discount.type} onChange={(e) => onDiscountChange('type', e.target.value)} className={inputClass}>
              <option value="percentage">{isArabic ? 'نسبة مئوية (%)' : 'Percentage (%)'}</option>
              <option value="fixed">{isArabic ? 'مبلغ ثابت' : 'Fixed Amount'}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{isArabic ? 'القيمة' : 'Value'}</label>
            <input type="number" value={formData.discount.value} onChange={(e) => onDiscountChange('value', Number(e.target.value))} placeholder="0" className={inputClass} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{isArabic ? 'التوفر' : 'Availability'}</label>
          <select name="availability" value={formData.availability} onChange={onChange} className={inputClass}>
            <option value="in_stock">{isArabic ? 'متوفر' : 'In Stock'}</option>
            <option value="out_of_stock">{isArabic ? 'غير متوفر' : 'Out of Stock'}</option>
            <option value="pre_order">{isArabic ? 'طلب مسبق' : 'Pre Order'}</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'المتجر' : 'Shop'}</label>
          <input name="shop" value={formData.shop} onChange={onChange} placeholder="Shop name" className={inputClass} />
        </div>
      </div>
      <div className="flex gap-4">
        <label className={`flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <input type="checkbox" checked={formData.isExclusive} onChange={(e) => onCheckboxChange('isExclusive', e.target.checked)} className="w-4 h-4 rounded" />
          <span>⭐ {isArabic ? 'حصري' : 'Exclusive'}</span>
        </label>
        <label className={`flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <input type="checkbox" checked={formData.toplay} onChange={(e) => onCheckboxChange('toplay', e.target.checked)} className="w-4 h-4 rounded" />
          <span>🔝 {isArabic ? 'عرض في الأعلى' : 'Top Display'}</span>
        </label>
      </div>
    </div>
  );
}
