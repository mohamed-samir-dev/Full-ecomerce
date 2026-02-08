
import {FormSelectProps} from '../../types/checkout'
export default function FormSelect({ 
  label, 
  required = false, 
  value, 
  onChange, 
  options, 
  placeholder = 'Select an option' 
}: FormSelectProps) {
  const isObjectArray = options.length > 0 && typeof options[0] === 'object';
  
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        {label} {required && '*'}
      </label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors bg-white border-gray-200 text-black"
      >
        <option value="">{placeholder}</option>
        {isObjectArray 
          ? (options as Array<{ key: string; label: string }>).map(option => (
              <option key={option.key} value={option.label}>{option.label}</option>
            ))
          : (options as string[]).map(option => (
              <option key={option} value={option}>{option}</option>
            ))
        }
      </select>
    </div>
  );
}
