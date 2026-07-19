import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { useTranslation } from '@/i18n/hooks/useTranslation';

interface CheckoutProgressProps {
  currentStep: number;
  isDarkMode: boolean;
}

export default function CheckoutProgress({ currentStep, isDarkMode }: CheckoutProgressProps) {
  const { t } = useTranslation();

  const steps = [
    { num: 1, label: t('checkout.shipping') },
    { num: 2, label: t('checkout.payment') },
  ];

  return (
    <div className="flex items-center justify-center mb-8 sm:mb-10">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ scale: currentStep >= step.num ? 1 : 0.9 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all ${
                currentStep > step.num
                  ? 'text-white'
                  : currentStep === step.num
                  ? 'text-white'
                  : isDarkMode
                  ? 'bg-white/10 text-gray-500'
                  : 'bg-gray-100 text-gray-400'
              }`}
              style={
                currentStep >= step.num
                  ? { background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }
                  : {}
              }
            >
              {currentStep > step.num ? <CheckIcon className="w-4 h-4" /> : step.num}
            </motion.div>
            <span
              className={`mt-2 text-xs font-medium whitespace-nowrap ${
                currentStep >= step.num
                  ? ''
                  : isDarkMode
                  ? 'text-gray-500'
                  : 'text-gray-400'
              }`}
              style={currentStep >= step.num ? { color: '#C9A84C' } : {}}
            >
              {step.label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              className={`w-20 sm:w-32 h-0.5 mx-3 mb-5 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-white/10' : 'bg-gray-200'
              }`}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(to right, #8B6914, #C9A84C)' }}
                initial={{ width: '0%' }}
                animate={{ width: currentStep >= 2 ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
