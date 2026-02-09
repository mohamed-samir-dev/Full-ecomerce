"use client";

import { useParams } from 'next/navigation';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function WomenSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string; titleAr: string; titleEn: string; descAr: string; descEn: string } } = {
    'apparel': {
      title: t('women.subcategory.apparel.title'),
      description: t('women.subcategory.apparel.description'),
      subCategory: "apparel",
      titleAr: "ملابس نسائية",
      titleEn: "Women's Apparel",
      descAr: "اكتشف مجموعة متنوعة من الملابس النسائية",
      descEn: "Discover a diverse collection of women's apparel"
    },
    'shoes': {
      title: t('women.subcategory.shoes.title'),
      description: t('women.subcategory.shoes.description'),
      subCategory: "shoes",
      titleAr: "أحذية نسائية",
      titleEn: "Women's Shoes",
      descAr: "تسوق أحدث الأحذية النسائية",
      descEn: "Shop the latest women's shoes"
    },
    'bags': {
      title: t('women.subcategory.bags.title'),
      description: t('women.subcategory.bags.description'),
      subCategory: "bags",
      titleAr: "حقائب نسائية",
      titleEn: "Women's Bags",
      descAr: "اكتشف مجموعة الحقائب النسائية",
      descEn: "Discover women's bags collection"
    },
    'accessories': {
      title: t('women.subcategory.accessories.title'),
      description: t('women.subcategory.accessories.description'),
      subCategory: "accessories",
      titleAr: "إكسسوارات نسائية",
      titleEn: "Women's Accessories",
      descAr: "تسوق إكسسوارات نسائية عصرية",
      descEn: "Shop modern women's accessories"
    },
    'beauty': {
      title: t('women.subcategory.beauty.title'),
      description: t('women.subcategory.beauty.description'),
      subCategory: "beauty",
      titleAr: "جمال وعناية",
      titleEn: "Beauty & Care",
      descAr: "منتجات الجمال والعناية",
      descEn: "Beauty and care products"
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
        keywordsAr={['نساء', data.titleAr]}
        keywordsEn={['women', data.titleEn]}
      />
      <CategoryPage
        category="women"
        subCategory={data.subCategory}
        title={data.title}
        description={data.description}
      />
    </>
  );
}
