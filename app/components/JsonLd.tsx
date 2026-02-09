'use client';

import Script from 'next/script';

type JsonLdId = 'organization' | 'website' | 'store';

interface JsonLdProps {
  id: JsonLdId;
  data: object;
}

export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <Script
      id={`jsonld-${id}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = 'https://full-ecomerce-gamma.vercel.app';

export const ecommerceSchemas = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Global Shop',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.avif`,
    description: 'متجر إلكتروني شامل يوفر أفضل المنتجات بأسعار تنافسية',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+201012486445',
      availableLanguage: ['ar', 'en'],
      areaServed: 'Worldwide',
    },
    sameAs: [
      'https://www.linkedin.com/in/mohammed-samier-mouawad/',
      "https://www.facebook.com/share/1GZtCVVXwh/","https://www.instagram.com/msamir.dev?igsh=b3Nra3hrd3QxMTc"
    ],
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Global Shop',
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },

  store: {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${SITE_URL}/#store`,
    name: 'Global Shop',
    url: SITE_URL,
    image: `${SITE_URL}/images/logo.avif`,
    telephone: '+201012486445',
    priceRange: 'EGP',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
    },
    parentOrganization: { '@id': `${SITE_URL}/#organization` },

  openingHoursSpecification: [
       {
         '@type': 'OpeningHoursSpecification',
         dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
         opens: '09:00',
         closes: '22:00',
       },
     ],
  },
};

export function HomePageSchemas() {
  return (
    <>
      <JsonLd id="organization" data={ecommerceSchemas.organization} />
      <JsonLd id="website" data={ecommerceSchemas.website} />
      <JsonLd id="store" data={ecommerceSchemas.store} />
    </>
  );
}
