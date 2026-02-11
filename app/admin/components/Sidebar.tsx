import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  isDarkMode: boolean;
  isArabic: boolean;
  navItems: Array<{ href: string; icon: string; label: string }>;
  onClose: () => void;
}

export default function Sidebar({ isOpen, isDarkMode, isArabic, navItems, onClose }: SidebarProps) {
  return (
    <aside className={`
      fixed lg:static top-0 bottom-0 ${isArabic ? 'right-0' : 'left-0'}
      w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg
      transform transition-transform duration-300 ease-in-out z-50
      ${isOpen ? 'translate-x-0' : isArabic ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
      overflow-y-auto
    `}>
      <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {isArabic ? 'لوحة الإدارة' : 'Admin Panel'}
        </h1>
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 ${
              isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
            } rounded-lg mb-2`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
