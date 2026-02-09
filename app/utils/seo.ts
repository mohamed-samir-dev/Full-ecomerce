import { Product } from '@/app/pages/shop/types';

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.shortDescription,
    image: product.imageGallery || [product.mainImage],
    sku: product._id,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Global Shop',
    },
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product._id}`,
      priceCurrency: 'USD',
      price: product.finalPrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: product.averageRating ? {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating,
      reviewCount: product.totalReviews || 0,
    } : undefined,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Global Shop',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://full-ecomerce-gamma.vercel.app',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://full-ecomerce-gamma.vercel.app'}/images/logo.avif`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Arabic', 'English'],
    },
    sameAs: [],
  };
}

export function generateWebPageSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
  };
}
