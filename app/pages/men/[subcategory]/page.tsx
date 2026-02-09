"use client";

import { useParams } from 'next/navigation';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function MenSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string; titleAr: string; titleEn: string; descAr: string; descEn: string } } = {
    'apparel': {
      title: t('men.subcategory.apparel.title'),
      description: t('men.subcategory.apparel.description'),
      subCategory: "Apparel",
      titleAr: "ملابس رجالية",
      titleEn: "Men's Apparel",
      descAr: "اكتشف مجموعة متنوعة من الملابس الرجالية العصرية",
      descEn: "Discover a diverse collection of modern men's apparel"
    },
    'shoes': {
      title: t('men.subcategory.shoes.title'),
      description: t('men.subcategory.shoes.description'),
      subCategory: "Shoes",
      titleAr: "أحذية رجالية",
      titleEn: "Men's Shoes",
      descAr: "تسوق أحدث الأحذية الرجالية",
      descEn: "Shop the latest men's shoes"
    },
    'bags': {
      title: t('men.subcategory.bags.title'),
      description: t('men.subcategory.bags.description'),
      subCategory: "bags",
      titleAr: "حقائب رجالية",
      titleEn: "Men's Bags",
      descAr: "اكتشف مجموعة الحقائب الرجالية",
      descEn: "Discover men's bags collection"
    },
    'accessories': {
      title: t('men.subcategory.accessories.title'),
      description: t('men.subcategory.accessories.description'),
      subCategory: "accessories",
      titleAr: "إكسسوارات رجالية",
      titleEn: "Men's Accessories",
      descAr: "تسوق إكسسوارات رجالية عصرية",
      descEn: "Shop modern men's accessories"
    }
  };

  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <DynamicMetadata
        titleAr={data.titleAr}
        titleEn={data.titleEn}
        descriptionAr={data.descAr}
        descriptionEn={data.descEn}
        keywordsAr={['رجال', data.titleAr]}
        keywordsEn={['men', data.titleEn]}
      />
      <CategoryPage
        category="men"
        subCategory={data.subCategory}
        title={data.title}
        description={data.description}
      />
    </>
  );
}
