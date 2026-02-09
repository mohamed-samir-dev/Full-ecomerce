"use client";

import { useParams } from 'next/navigation';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function PetSuppliesSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string; titleAr: string; titleEn: string; descAr: string; descEn: string } } = {
    'beds': { title: t('pet.subcategory.beds.title'), description: t('pet.subcategory.beds.description'), subCategory: "beds", titleAr: "أسرّة حيوانات", titleEn: "Pet Beds", descAr: "أسرّة مريحة للحيوانات", descEn: "Comfortable pet beds" },
    'care': { title: t('pet.subcategory.care.title'), description: t('pet.subcategory.care.description'), subCategory: "care", titleAr: "عناية الحيوانات", titleEn: "Pet Care", descAr: "منتجات عناية الحيوانات", descEn: "Pet care products" },
    'food': { title: t('pet.subcategory.food.title'), description: t('pet.subcategory.food.description'), subCategory: "food", titleAr: "طعام حيوانات", titleEn: "Pet Food", descAr: "طعام صحي للحيوانات", descEn: "Healthy pet food" },
    'toys': { title: t('pet.subcategory.toys.title'), description: t('pet.subcategory.toys.description'), subCategory: "toys", titleAr: "ألعاب حيوانات", titleEn: "Pet Toys", descAr: "ألعاب ممتعة للحيوانات", descEn: "Fun pet toys" }
  };

  const data = subCategoryData[subcategory];
  if (!data) return <div>Category not found</div>;

  return (
    <>
      <DynamicMetadata titleAr={data.titleAr} titleEn={data.titleEn} descriptionAr={data.descAr} descriptionEn={data.descEn} keywordsAr={['حيوانات', data.titleAr]} keywordsEn={['pets', data.titleEn]} />
      <CategoryPage category="pet" subCategory={data.subCategory} title={data.title} description={data.description} />
    </>
  );
}
