"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";

const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
  'formal': {
    title: "Formal Shoes Collection",
    description: "Elegant formal shoes for every professional occasion",
    subCategory: "Formal Shoes"
  },
  'sandals': {
    title: "Summer Sandals Collection",
    description: "Comfortable and stylish sandals for warm weather",
    subCategory: "Summer sandals"
  },
  'casual': {
    title: "Casual Shoes Collection",
    description: "Relaxed and versatile shoes for everyday wear",
    subCategory: "Casual"
  },
  'sports': {
    title: "Sports Shoes Collection",
    description: "High-performance athletic footwear for active lifestyles",
    subCategory: "Luxury sports shoes"
  }
};

export default function ShoesSubCategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory as string;
  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      category="shoes"
      subCategory={data.subCategory}
      title={data.title}
      description={data.description}
    />
  );
}
