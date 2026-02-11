import { useTheme } from '@/context/ThemeContext';

export default function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`rounded-lg border p-5 mb-5 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className={`text-lg font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
        {title}
      </h2>
      {children}
    </div>
  );
}
