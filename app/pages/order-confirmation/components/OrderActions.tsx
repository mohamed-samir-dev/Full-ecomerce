import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n';

interface OrderActionsProps {
  isDarkMode: boolean;
  onPrint: () => void;
}

export default function OrderActions({ isDarkMode, onPrint }: OrderActionsProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-3"
    >
      <button
        onClick={() => router.push('/pages/shop')}
        className="w-full py-3 px-4 rounded-xl text-white font-medium transition-all hover:opacity-90 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
      >
        {t('orderConfirmation.continueShopping')}
      </button>
      <button
        onClick={onPrint}
        className={`w-full py-3 px-4 rounded-xl border-2 font-medium transition-all active:scale-95 ${
          isDarkMode
            ? 'border-white/10 text-gray-300 hover:bg-white/5'
            : 'border-black/10 text-gray-700 hover:bg-gray-50'
        }`}
      >
        {t('orderConfirmation.printReceipt')}
      </button>
    </motion.div>
  );
}
