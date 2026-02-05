"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";

const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
  'apparel': {
    title: "Men's Apparel Collection",
    description: "Timeless apparel crafted for the modern gentleman",
    subCategory: "Apparel"
  },
  'shoes': {
    title: "Men's Shoes Collection",
    description: "Well-crafted shoes designed for comfort, style, and confidence",
    subCategory: "shoes"
  },
  'bags': {
    title: "Men's Bags Collection",
    description: "Stylish and functional bags designed for everyday use",
    subCategory: "bags"
  },
  'accessories': {
    title: "Men's Accessories Collection",
    description: "Premium accessories designed to elevate the modern gentleman's style",
    subCategory: "accessories"
  }
};

export default function MenSubCategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory as string;
  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      category="men"
      subCategory={data.subCategory}
      title={data.title}
      description={data.description}
    />
  );
}
