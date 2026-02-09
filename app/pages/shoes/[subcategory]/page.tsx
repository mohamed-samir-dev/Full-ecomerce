"use client";

import { useParams } from 'next/navigation';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function ShoesSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string; secondtype?: string; titleAr: string; titleEn: string; descAr: string; descEn: string } } = {
    'formal': { title: t('shoes.subcategory.formal.title'), description: t('shoes.subcategory.formal.description'), subCategory: "Shoes", secondtype: "formal", titleAr: "أحذية رسمية", titleEn: "Formal Shoes", descAr: "أحذية رسمية أنيقة", descEn: "Elegant formal shoes" },
    'sandals': { title: t('shoes.subcategory.sandals.title'), description: t('shoes.subcategory.sandals.description'), subCategory: "Shoes", secondtype: "summer", titleAr: "صنادل", titleEn: "Sandals", descAr: "صنادل صيفية", descEn: "Summer sandals" },
    'casual': { title: t('shoes.subcategory.casual.title'), description: t('shoes.subcategory.casual.description'), subCategory: "Shoes", secondtype: "casual", titleAr: "أحذية كاجوال", titleEn: "Casual Shoes", descAr: "أحذية كاجوال مريحة", descEn: "Comfortable casual shoes" },
    'sports': { title: t('shoes.subcategory.sports.title'), description: t('shoes.subcategory.sports.description'), subCategory: "Shoes", secondtype: "athlete", titleAr: "أحذية رياضية", titleEn: "Sports Shoes", descAr: "أحذية رياضية عصرية", descEn: "Modern sports shoes" }
  };

  const data = subCategoryData[subcategory];
  if (!data) return <div>Category not found</div>;

  return (
    <>
      <DynamicMetadata titleAr={data.titleAr} titleEn={data.titleEn} descriptionAr={data.descAr} descriptionEn={data.descEn} keywordsAr={['أحذية', data.titleAr]} keywordsEn={['shoes', data.titleEn]} />
      <CategoryPage subCategory={data.subCategory} secondtype={data.secondtype} title={data.title} description={data.description} />
    </>
  );
}
