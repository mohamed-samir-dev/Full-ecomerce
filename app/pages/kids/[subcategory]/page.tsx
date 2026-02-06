"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function KidsSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
    'apparel': {
      title: t('kids.subcategory.apparel.title'),
      description: t('kids.subcategory.apparel.description'),
      subCategory: "Apparel"
    },
    'shoes': {
      title: t('kids.subcategory.shoes.title'),
      description: t('kids.subcategory.shoes.description'),
      subCategory: "Shoes"
    },
    'bags': {
      title: t('kids.subcategory.bags.title'),
      description: t('kids.subcategory.bags.description'),
      subCategory: "Bags"
    },
    'toys': {
      title: t('kids.subcategory.toys.title'),
      description: t('kids.subcategory.toys.description'),
      subCategory: "Toys & Games"
    }
  };

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
