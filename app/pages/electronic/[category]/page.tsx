"use client";

import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  
  const categoryTitles: { [key: string]: string } = {
    'audio': 'Audio',
    'smart-home': 'Smart Home',
    'personal-tech': 'Personal Tech',
    'photography': 'Photography'
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {categoryTitles[category] || category}
        </h1>
        <p className="text-gray-600 text-lg">
          Products coming soon...
        </p>
      </div>
    </div>
  );
}
