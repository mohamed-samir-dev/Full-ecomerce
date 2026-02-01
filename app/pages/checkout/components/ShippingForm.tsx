import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import FormInput from './shippingform/FormInput';
import FormSelect from './shippingform/FormSelect';
import {ShippingFormProps}from '../types/checkout'


export default function ShippingForm({ 
  shippingAddress, 
  setShippingAddress, 
  governorate, 
  setGovernorate, 
  governorates,
  onSubmit 
}: ShippingFormProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border bg-white border-gray-100"
    >
      <div className="flex items-center mb-4 sm:mb-6">
        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Shipping Address</h2>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        <FormInput
          label="Full Name"
          required
          value={shippingAddress.fullName}
          onChange={(value) => setShippingAddress(prev => ({ ...prev, fullName: value }))}
          placeholder="Enter your full name"
        />
        
        <FormInput
          label="Address"
          required
          value={shippingAddress.address}
          onChange={(value) => setShippingAddress(prev => ({ ...prev, address: value }))}
          placeholder="Street address"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <FormSelect
            label="Governorate"
            required
            value={governorate}
            onChange={(value) => {
              setGovernorate(value);
              setShippingAddress(prev => ({ ...prev, city: value }));
            }}
            options={governorates}
            placeholder="Select Governorate"
          />
          
          <FormInput
            label="Postal Code"
            required
            value={shippingAddress.postalCode}
            onChange={(value) => setShippingAddress(prev => ({ ...prev, postalCode: value }))}
            placeholder="12345"
          />
        </div>
        
        <FormInput
          label="District"
          required
          value={shippingAddress.country}
          onChange={(value) => setShippingAddress(prev => ({ ...prev, country: value }))}
          placeholder="Enter district"
        />
        
        <FormInput
          label="Phone Number"
          type="tel"
          required
          value={shippingAddress.phone}
          onChange={(value) => setShippingAddress(prev => ({ ...prev, phone: value }))}
          placeholder="+20 123 456 7890"
          icon={<Phone className="w-4 h-4 mr-2 text-blue-600" />}
          helperText="We'll call you to confirm delivery"
        />
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Continue to Payment
        </motion.button>
      </form>
    </motion.div>
  );
}
