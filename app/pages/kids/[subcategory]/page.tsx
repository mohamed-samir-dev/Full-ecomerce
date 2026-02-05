"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";

const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
  'apparel': {
    title: "Kids' Apparel Collection",
    description: "Comfortable and stylish apparel designed for everyday adventures",
    subCategory: "Apparel"
  },
  'shoes': {
    title: "Kids' Shoes Collection",
    description: "Comfortable and durable shoes made for active little feet",
    subCategory: "Shoes"
  },
  'bags': {
    title: "Kids' Bags Collection",
    description: "Fun, practical bags designed for school and everyday adventures",
    subCategory: "Bags"
  },
  'toys': {
    title: "Kids' Toys & Games",
    description: "Fun, educational toys and games designed to spark imagination",
    subCategory: "Toys & Games"
  }
};

export default function KidsSubCategoryPage() {
  const params = useParams();
  const subcategory = params.subcategory as string;
  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      category="kids"
      subCategory={data.subCategory}
      title={data.title}
      description={data.description}
    />
  );
}
