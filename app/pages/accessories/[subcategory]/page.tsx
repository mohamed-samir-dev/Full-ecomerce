"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";

const subCategoryData: { [key: string]: { title: string; description: string; secondtype: string } } = {
  'jewelry': {
    title: " Jewelry Collection",
    description: "Sophisticated jewelry pieces crafted for a bold and refined look",
    secondtype: "Jewelry"
  },
  'silk': {
    title: "Silk & Scarves Collection",
    description: "Elegant silk pieces and scarves designed to add a refined finishing touch",
    secondtype: "Silk"
  },
  'sunglasses': {
    title: " Sunglasses Collection",
    description: "Stylish sunglasses designed for a confident and refined look",
    secondtype: "Sunglasses"
  },
  'watches': {
    title: " Watches Collection",
    description: "Precision-crafted watches designed for timeless style and confidence",
    secondtype: "Watches"
  }
};

export default function AccessoriesSubCategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory as string;
  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      subCategory="accessories"
      secondtype={data.secondtype}
      title={data.title}
      description={data.description}
    />
  );
}
