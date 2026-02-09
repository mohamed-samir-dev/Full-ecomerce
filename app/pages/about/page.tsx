'use client';

import About from './components/About';
import DynamicMetadata from '@/app/components/DynamicMetadata';

export default function AboutPage() {
  return (
    <>
      <DynamicMetadata
        titleAr="من نحن - عن Global Shop"
        titleEn="About Us - About Global Shop"
        descriptionAr="تعرف على Global Shop، متجرك الإلكتروني الموثوق للتسوق أونلاين. نوفر أفضل المنتجات بأسعار تنافسية وخدمة عملاء مميزة"
        descriptionEn="Learn about Global Shop, your trusted online shopping destination. We offer the best products at competitive prices with excellent customer service"
        keywordsAr={['من نحن', 'عن الشركة', 'Global Shop', 'متجر إلكتروني']}
        keywordsEn={['about us', 'about company', 'Global Shop', 'ecommerce store']}
      />
      <About />
    </>
  );
}
