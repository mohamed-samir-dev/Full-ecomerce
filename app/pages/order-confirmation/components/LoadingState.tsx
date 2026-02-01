import { motion } from 'framer-motion';

interface LoadingStateProps {
  isDarkMode: boolean;
}

export default function LoadingState({ isDarkMode }: LoadingStateProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-slate-900' : 'bg-linear-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"
      />
    </div>
  );
}
