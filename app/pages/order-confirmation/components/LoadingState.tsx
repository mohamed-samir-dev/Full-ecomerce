import { motion } from 'framer-motion';

interface LoadingStateProps {
  isDarkMode: boolean;
}

export default function LoadingState({ isDarkMode }: LoadingStateProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'
    }`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="rounded-full h-12 w-12 border-4 border-t-transparent"
        style={{ borderColor: '#C9A84C', borderTopColor: 'transparent' }}
      />
    </div>
  );
}
