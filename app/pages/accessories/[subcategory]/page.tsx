"use client";

import { useParams } from 'next/navigation';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function AccessoriesSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; secondtype: string; titleAr: string; titleEn: string; descAr: string; descEn: string } } = {
    'jewelry': { title: t('accessories.subcategory.jewelry.title'), description: t('accessories.subcategory.jewelry.description'), secondtype: "Jewelry", titleAr: "مجوهرات", titleEn: "Jewelry", descAr: "تسوق مجوهرات عصرية", descEn: "Shop modern jewelry" },
    'silk': { title: t('accessories.subcategory.silk.title'), description: t('accessories.subcategory.silk.description'), secondtype: "Silk", titleAr: "حرير وأوشحة", titleEn: "Silk & Scarves", descAr: "مجموعة الحرير", descEn: "Silk collection" },
    'sunglasses': { title: t('accessories.subcategory.sunglasses.title'), description: t('accessories.subcategory.sunglasses.description'), secondtype: "Sunglasses", titleAr: "نظارات شمسية", titleEn: "Sunglasses", descAr: "نظارات شمسية عصرية", descEn: "Modern sunglasses" },
    'watches': { title: t('accessories.subcategory.watches.title'), description: t('accessories.subcategory.watches.description'), secondtype: "Watches", titleAr: "ساعات", titleEn: "Watches", descAr: "ساعات أنيقة", descEn: "Elegant watches" }
  };

  const data = subCategoryData[subcategory];
  if (!data) return <div>Category not found</div>;

  return (
    <>
      <DynamicMetadata titleAr={data.titleAr} titleEn={data.titleEn} descriptionAr={data.descAr} descriptionEn={data.descEn} keywordsAr={['إكسسوارات', data.titleAr]} keywordsEn={['accessories', data.titleEn]} />
      <CategoryPage subCategory="accessories" secondtype={data.secondtype} title={data.title} description={data.description} />
    </>
  );
}
