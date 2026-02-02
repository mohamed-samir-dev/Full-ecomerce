import Link from 'next/link';

export function AdminSidebar() {
  const links = [
    { title: 'Dashboard', href: '/admin', icon: '📊' },
    { title: 'Add Product', href: '/admin/add-product', icon: '📦' },
    { title: 'Products', href: '/admin/products', icon: '🛍️' },
    { title: 'Orders', href: '/admin/orders', icon: '📋' },
    { title: 'Users', href: '/admin/users', icon: '👥' },
    { title: 'Categories', href: '/admin/categories', icon: '📂' },
    { title: 'Brands', href: '/admin/brands', icon: '🏷️' },
    { title: 'Promo Codes', href: '/admin/promo-codes', icon: '🎟️' },
    { title: 'Contacts', href: '/admin/contacts', icon: '✉️' },
    { title: 'Reviews', href: '/admin/reviews', icon: '⭐' }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="p-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
            <span className="text-xl">{link.icon}</span>
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
