export const getStockBadge = (stock: number, isArabic: boolean) => {
  if (stock === 0) return <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700">{isArabic ? 'نفذ من المخزون' : 'Out of Stock'}</span>;
  if (stock < 10) return <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-700">{isArabic ? 'مخزون منخفض' : 'Low Stock'}</span>;
  return <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">{isArabic ? 'متوفر' : 'In Stock'}</span>;
};
