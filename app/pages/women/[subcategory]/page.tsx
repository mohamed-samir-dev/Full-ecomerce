"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";

const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
  'apparel': {
    title: "Women's Apparel Collection",
    description: "Timeless styles designed for confidence, comfort, and elegance",
    subCategory: "apparel"
  },
  'shoes': {
    title: "Women's Shoes Collection",
    description: "Elegant footwear designed for comfort, confidence, and style",
    subCategory: "shoes"
  },
  'bags': {
    title: "Women's Bags Collection",
    description: "Stylish and functional bags designed for everyday elegance",
    subCategory: "bags"
  },
  'accessories': {
    title: "Women's Accessories Collection",
    description: "Elegant accessories designed to elevate the modern woman's style",
    subCategory: "accessories"
  },
  'beauty': {
    title: "Women's Beauty Collection",
    description: "Premium beauty essentials designed to enhance natural elegance",
    subCategory: "beauty"
  }
};

export default function WomenSubCategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory as string;
  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      category="women"
      subCategory={data.subCategory}
      title={data.title}
      description={data.description}
    />
  );
}
