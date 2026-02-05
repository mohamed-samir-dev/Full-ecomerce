"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";

const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
  'beds': {
    title: "Pet Beds Collection",
    description: "Comfortable and cozy beds designed for restful sleep",
    subCategory: "beds"
  },
  'care': {
    title: "Pet Care Essentials",
    description: "Essential care products designed to keep pets healthy and comfortable",
    subCategory: "care"
  },
  'food': {
    title: "Pet Food Collection",
    description: "Nutritious food and treats crafted for healthy and happy pets",
    subCategory: "food"
  },
  'toys': {
    title: "Pet Toys Collection",
    description: "Fun and engaging toys designed to keep pets active and happy",
    subCategory: "toys"
  }
};

export default function PetSuppliesSubCategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory as string;
  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      category="pet"
      subCategory={data.subCategory}
      title={data.title}
      description={data.description}
    />
  );
}
