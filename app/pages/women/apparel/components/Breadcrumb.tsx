import Link from "next/link";

export default function Breadcrumb() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          <Link href="/" className="hover:text-[#B39E7A] transition-colors">Home</Link>
          <span className="text-gray-300">•</span>
          <Link href="/pages/women" className="hover:text-[#B39E7A] transition-colors">Women</Link>
          <span className="text-gray-300">•</span>
          <span className="text-gray-900 font-medium">Apparel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-2 sm:mb-3 tracking-tight">Women&apos;s Apparel</h1>
        <p className="text-gray-600 text-base sm:text-lg font-light max-w-2xl">Curated elegance for the modern woman</p>
      </div>
    </div>
  );
}
