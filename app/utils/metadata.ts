import { Metadata } from 'next';

interface MetadataContent {
  title: string;
  description: string;
  keywords?: string[];
}

interface BilingualMetadata {
  ar: MetadataContent;
  en: MetadataContent;
}

// Helper function to generate metadata based on language
export function generateMetadata(
  content: BilingualMetadata,
  lang: 'ar' | 'en' = 'ar',
  path: string = ''
): Metadata {
  const currentContent = content[lang];
  const locale = lang === 'ar' ? 'ar_SA' : 'en_US';
  const alternateLocale = lang === 'ar' ? 'en_US' : 'ar_SA';
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://full-ecomerce-gamma.vercel.app'}${path}`;

  return {
    title: currentContent.title,
    description: currentContent.description,
    keywords: currentContent.keywords,
    openGraph: {
      title: currentContent.title,
      description: currentContent.description,
      url: url,
      locale: locale,
      alternateLocale: [alternateLocale],
      type: 'website',
      siteName: 'Global Shop',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentContent.title,
      description: currentContent.description,
    },
    alternates: {
      canonical: url,
      languages: {
        'ar-SA': `${url}?lang=ar`,
        'en-US': `${url}?lang=en`,
      },
    },
  };
}

// Metadata content for different pages
export const homeMetadata: BilingualMetadata = {
  ar: {
    title: 'Global Shop - متجر عالمي للتسوق الإلكتروني',
    description: 'متجر إلكتروني شامل يوفر أفضل المنتجات من ملابس رجالية ونسائية وأطفال، أحذية، إكسسوارات، إلكترونيات ومستلزمات الحيوانات الأليفة بأسعار تنافسية وجودة عالية',
    keywords: ['تسوق أونلاين', 'متجر إلكتروني', 'ملابس رجالية', 'ملابس نسائية', 'ملابس أطفال', 'أحذية', 'إكسسوارات', 'إلكترونيات', 'مستلزمات حيوانات'],
  },
  en: {
    title: 'Global Shop - Your Premier Online Shopping Destination',
    description: 'Comprehensive online store offering the best products including men\'s, women\'s and children\'s clothing, shoes, accessories, electronics and pet supplies at competitive prices with high quality',
    keywords: ['online shopping', 'ecommerce', 'men\'s fashion', 'women\'s clothing', 'kids wear', 'shoes', 'accessories', 'electronics', 'pet supplies'],
  },
};

export const shopMetadata: BilingualMetadata = {
  ar: {
    title: 'متجر المنتجات - تسوق أونلاين',
    description: 'تصفح مجموعة واسعة من المنتجات عالية الجودة. ابحث وفلتر واشتري من مجموعة متنوعة من الملابس، الأحذية، الإكسسوارات والإلكترونيات',
    keywords: ['تسوق', 'منتجات', 'ملابس', 'أحذية', 'إكسسوارات', 'إلكترونيات'],
  },
  en: {
    title: 'Shop Products - Online Shopping',
    description: 'Browse a wide range of high-quality products. Search, filter and buy from a diverse collection of clothing, shoes, accessories and electronics',
    keywords: ['shop', 'products', 'clothing', 'shoes', 'accessories', 'electronics'],
  },
};

export const aboutMetadata: BilingualMetadata = {
  ar: {
    title: 'من نحن - عن Global Shop',
    description: 'تعرف على Global Shop، متجرك الإلكتروني الموثوق للتسوق أونلاين. نوفر أفضل المنتجات بأسعار تنافسية وخدمة عملاء مميزة',
    keywords: ['من نحن', 'عن الشركة', 'Global Shop', 'متجر إلكتروني'],
  },
  en: {
    title: 'About Us - About Global Shop',
    description: 'Learn about Global Shop, your trusted online shopping destination. We offer the best products at competitive prices with excellent customer service',
    keywords: ['about us', 'about company', 'Global Shop', 'ecommerce store'],
  },
};

export const contactMetadata: BilingualMetadata = {
  ar: {
    title: 'اتصل بنا - Global Shop',
    description: 'تواصل معنا للاستفسار عن منتجاتنا أو خدماتنا. فريق خدمة العملاء جاهز لمساعدتك',
    keywords: ['اتصل بنا', 'خدمة العملاء', 'دعم', 'تواصل'],
  },
  en: {
    title: 'Contact Us - Global Shop',
    description: 'Get in touch with us for inquiries about our products or services. Our customer service team is ready to help you',
    keywords: ['contact us', 'customer service', 'support', 'get in touch'],
  },
};

export const menCollectionMetadata: BilingualMetadata = {
  ar: {
    title: 'مجموعة الرجال - ملابس رجالية عصرية',
    description: 'اكتشف مجموعتنا الكاملة من الملابس الرجالية العصرية. قمصان، بنطلونات، بدلات وإكسسوارات بتصاميم أنيقة وجودة عالية',
    keywords: ['ملابس رجالية', 'أزياء رجالية', 'قمصان', 'بنطلونات', 'بدلات رجالية'],
  },
  en: {
    title: 'Men\'s Collection - Modern Men\'s Clothing',
    description: 'Discover our complete range of modern men\'s clothing. Shirts, pants, suits and accessories with elegant designs and high quality',
    keywords: ['men\'s clothing', 'men\'s fashion', 'shirts', 'pants', 'men\'s suits'],
  },
};

export const womenCollectionMetadata: BilingualMetadata = {
  ar: {
    title: 'مجموعة النساء - ملابس نسائية أنيقة',
    description: 'اكتشف مجموعتنا الكاملة من الملابس النسائية الأنيقة. فساتين، بلوزات، تنانير وإكسسوارات بتصاميم عصرية',
    keywords: ['ملابس نسائية', 'أزياء نسائية', 'فساتين', 'بلوزات', 'تنانير'],
  },
  en: {
    title: 'Women\'s Collection - Elegant Women\'s Clothing',
    description: 'Discover our complete range of elegant women\'s clothing. Dresses, blouses, skirts and accessories with modern designs',
    keywords: ['women\'s clothing', 'women\'s fashion', 'dresses', 'blouses', 'skirts'],
  },
};

export const kidsCollectionMetadata: BilingualMetadata = {
  ar: {
    title: 'مجموعة الأطفال - ملابس أطفال مريحة',
    description: 'اكتشف مجموعتنا الكاملة من ملابس الأطفال المريحة والعصرية. ملابس للبنات والأولاد بجودة عالية',
    keywords: ['ملابس أطفال', 'ملابس بنات', 'ملابس أولاد', 'أزياء أطفال'],
  },
  en: {
    title: 'Kids Collection - Comfortable Kids Clothing',
    description: 'Discover our complete range of comfortable and modern kids clothing. Clothing for girls and boys with high quality',
    keywords: ['kids clothing', 'girls clothing', 'boys clothing', 'children\'s fashion'],
  },
};

export const shoesCollectionMetadata: BilingualMetadata = {
  ar: {
    title: 'مجموعة الأحذية - أحذية عصرية ومريحة',
    description: 'اكتشف مجموعتنا الكاملة من الأحذية العصرية. أحذية رياضية، كاجوال، رسمية وأحذية للمناسبات',
    keywords: ['أحذية', 'أحذية رياضية', 'أحذية رسمية', 'أحذية كاجوال'],
  },
  en: {
    title: 'Shoes Collection - Modern and Comfortable Shoes',
    description: 'Discover our complete range of modern shoes. Sneakers, casual, formal and occasion shoes',
    keywords: ['shoes', 'sneakers', 'formal shoes', 'casual shoes'],
  },
};

export const accessoriesCollectionMetadata: BilingualMetadata = {
  ar: {
    title: 'مجموعة الإكسسوارات - إكسسوارات أنيقة',
    description: 'اكتشف مجموعتنا الكاملة من الإكسسوارات الأنيقة. حقائب، ساعات، نظارات ومجوهرات',
    keywords: ['إكسسوارات', 'حقائب', 'ساعات', 'نظارات', 'مجوهرات'],
  },
  en: {
    title: 'Accessories Collection - Elegant Accessories',
    description: 'Discover our complete range of elegant accessories. Bags, watches, sunglasses and jewelry',
    keywords: ['accessories', 'bags', 'watches', 'sunglasses', 'jewelry'],
  },
};

export const electronicsCollectionMetadata: BilingualMetadata = {
  ar: {
    title: 'مجموعة الإلكترونيات - أحدث التقنيات',
    description: 'اكتشف مجموعتنا من الإلكترونيات والأجهزة التقنية. هواتف، أجهزة لوحية، سماعات وملحقات',
    keywords: ['إلكترونيات', 'هواتف', 'أجهزة لوحية', 'سماعات', 'تقنية'],
  },
  en: {
    title: 'Electronics Collection - Latest Technology',
    description: 'Discover our collection of electronics and tech devices. Phones, tablets, headphones and accessories',
    keywords: ['electronics', 'phones', 'tablets', 'headphones', 'technology'],
  },
};

export const petSuppliesMetadata: BilingualMetadata = {
  ar: {
    title: 'مستلزمات الحيوانات الأليفة - كل ما يحتاجه حيوانك',
    description: 'اكتشف مجموعتنا الكاملة من مستلزمات الحيوانات الأليفة. طعام، ألعاب، أدوات العناية والإكسسوارات',
    keywords: ['مستلزمات حيوانات', 'طعام حيوانات', 'ألعاب حيوانات', 'أدوات العناية'],
  },
  en: {
    title: 'Pet Supplies - Everything Your Pet Needs',
    description: 'Discover our complete range of pet supplies. Food, toys, grooming tools and accessories',
    keywords: ['pet supplies', 'pet food', 'pet toys', 'grooming tools'],
  },
};
