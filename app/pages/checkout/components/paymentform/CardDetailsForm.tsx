import { motion } from 'framer-motion';
import{CardDetailsFormProps}from '../../types/checkout'


export default function CardDetailsForm({ cardDetails, setCardDetails }: CardDetailsFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl border-2 bg-white border-blue-200"
    >
      <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800">Card Information</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Card Number"
          value={cardDetails.number}
          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 bg-white border-gray-300 text-gray-900"
          maxLength={19}
        />
        <input
          type="text"
          placeholder="Cardholder Name"
          value={cardDetails.name}
          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 bg-white border-gray-300 text-gray-900"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 bg-white border-gray-300 text-gray-900"
            maxLength={5}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 bg-white border-gray-300 text-gray-900"
            maxLength={4}
          />
        </div>
      </div>
    </motion.div>
  );
}
