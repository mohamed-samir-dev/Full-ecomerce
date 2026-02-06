"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function PetSuppliesSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
    'beds': {
      title: t('pet.subcategory.beds.title'),
      description: t('pet.subcategory.beds.description'),
      subCategory: "beds"
    },
    'care': {
      title: t('pet.subcategory.care.title'),
      description: t('pet.subcategory.care.description'),
      subCategory: "care"
    },
    'food': {
      title: t('pet.subcategory.food.title'),
      description: t('pet.subcategory.food.description'),
      subCategory: "food"
    },
    'toys': {
      title: t('pet.subcategory.toys.title'),
      description: t('pet.subcategory.toys.description'),
      subCategory: "toys"
    }
  };

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
