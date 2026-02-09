"use client";

import { useParams } from 'next/navigation';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function KidsSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string; titleAr: string; titleEn: string; descAr: string; descEn: string } } = {
    'apparel': {
      title: t('kids.subcategory.apparel.title'),
      description: t('kids.subcategory.apparel.description'),
      subCategory: "Apparel",
      titleAr: "ملابس أطفال",
      titleEn: "Kids Apparel",
      descAr: "اكتشف مجموعة متنوعة من ملابس الأطفال",
      descEn: "Discover a diverse collection of kids apparel"
    },
    'shoes': {
      title: t('kids.subcategory.shoes.title'),
      description: t('kids.subcategory.shoes.description'),
      subCategory: "Shoes",
      titleAr: "أحذية أطفال",
      titleEn: "Kids Shoes",
      descAr: "تسوق أحذية الأطفال",
      descEn: "Shop kids shoes"
    },
    'bags': {
      title: t('kids.subcategory.bags.title'),
      description: t('kids.subcategory.bags.description'),
      subCategory: "Bags",
      titleAr: "حقائب أطفال",
      titleEn: "Kids Bags",
      descAr: "اكتشف حقائب الأطفال",
      descEn: "Discover kids bags"
    },
    'toys': {
      title: t('kids.subcategory.toys.title'),
      description: t('kids.subcategory.toys.description'),
      subCategory: "Toys & Games",
      titleAr: "ألعاب أطفال",
      titleEn: "Kids Toys",
      descAr: "تسوق ألعاب الأطفال",
      descEn: "Shop kids toys"
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
        keywordsAr={['أطفال', data.titleAr]}
        keywordsEn={['kids', data.titleEn]}
      />
      <CategoryPage
        category="kids"
        subCategory={data.subCategory}
        title={data.title}
        description={data.description}
      />
    </>
  );
}
