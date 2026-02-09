import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(
  productId: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productPrice: number
): Promise<Metadata> {
  return {
    title: `${productName} | Global Shop`,
    description: productDescription,
    openGraph: {
      title: productName,
      description: productDescription,
      images: [productImage],
      url: `${SITE_URL}/pages/product/${productId}`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/pages/product/${productId}`,
    },
    other: {
      'product:price:amount': productPrice.toString(),
      'product:price:currency': 'USD',
    },
  };
}
