
import {FormInputProps}from '../../types/checkout'
export default function FormInput({ 
  label, 
  type = 'text', 
  required = false, 
  value, 
  onChange, 
  placeholder, 
  icon,
  helperText,
  pattern,
  maxLength,
  onKeyPress
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 flex items-center text-gray-700">
        {icon}
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors bg-white border-gray-200 text-black"
      />
      {helperText && <p className="text-xs mt-2 text-gray-500">{helperText}</p>}
    </div>
  );
}
