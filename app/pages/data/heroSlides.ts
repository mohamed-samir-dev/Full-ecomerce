import { HeroSlide, PromoItem } from '../types/types';

export const heroSlides: HeroSlide[] = [
  {
    titleKey: 'home.hero.newSeasonArrivals',
    descriptionKey: 'home.hero.newSeasonDescription',
    image: "/images/hero--1.webp",
    buttonTextKey: 'home.hero.shopNow',
    buttonLink: "/products"
  },
  {
    titleKey: 'home.hero.premiumCollection',
    descriptionKey: 'home.hero.premiumDescription',
    image: "/images/hero--2.webp",
    buttonTextKey: 'home.hero.explore',
    buttonLink: "/products"
  },
  {
    titleKey: 'home.hero.summerSale',
    descriptionKey: 'home.hero.summerSaleDescription',
    image: "/images/hero--4.webp",
    buttonTextKey: 'home.hero.saveNow',
    buttonLink: "/sale"
  },
  {
    titleKey: 'home.hero.exclusiveDeals',
    descriptionKey: 'home.hero.exclusiveDealsDescription',
    image: "/images/hero--5.webp",
    buttonTextKey: 'home.hero.discover',
    buttonLink: "/deals"
  },
  {
    titleKey: 'home.hero.trendingNow',
    descriptionKey: 'home.hero.trendingDescription',
    image: "/images/hero--3.webp",
    buttonTextKey: 'home.hero.viewTrends',
    buttonLink: "/trending"
  }
];


export const promoItems: PromoItem[] = [
  {
    id: 1,
    title: 'Free Shipping',
    description: 'On orders over $50',
    buttonText: 'Shop Now',
    imageUrl: '/images/card1.webp',
    imageAlt: 'Free Shipping'
  },
  {
    id: 2,
    title: 'Easy Returns',
    description: '30-day return policy',
    buttonText: 'Learn More',
    imageUrl: '/images/card2.webp',
    imageAlt: 'Easy Returns'
  },
  {
    id: 3,
    title: 'Secure Payment',
    description: 'Safe & secure checkout',
    buttonText: 'Shop Safe',
    imageUrl: '/images/card3.webp',
    imageAlt: 'Secure Payment'
  }
];