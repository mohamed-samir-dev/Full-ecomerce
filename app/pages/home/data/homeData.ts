import { HeroSlide,PromoItem } from '../types/home.types';

export const heroSlides: HeroSlide[] = [
  {
    titleKey: 'home.hero.newSeasonArrivals',
    descriptionKey: 'home.hero.newSeasonDescription',
    image: "/images/hero-1.webp",
    buttonTextKey: 'home.hero.shopNow',
    buttonLink: "/products"
  },
  {
    titleKey: 'home.hero.premiumCollection',
    descriptionKey: 'home.hero.premiumDescription',
    image: "/images/hero-5.webp",
    buttonTextKey: 'home.hero.explore',
    buttonLink: "/products"
  },
  {
    titleKey: 'home.hero.summerSale',
    descriptionKey: 'home.hero.summerSaleDescription',
    image: "/images/hero-2.webp",
    buttonTextKey: 'home.hero.saveNow',
    buttonLink: "/sale"
  },
  {
    titleKey: 'home.hero.exclusiveDeals',
    descriptionKey: 'home.hero.exclusiveDealsDescription',
    image: "/images/hero--4.webp",
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

export const categories = [
  { id: 1, name: 'Women', image: '/images/woman2.avif', link: '/pages/women', color: 'from-rose-50 to-pink-50' },
  { id: 2, name: 'Men', image: '/images/man.avif', link: '/pages/men', color: 'from-slate-50 to-gray-50' },
  { id: 3, name: 'Kids', image: '/images/kid.avif', link: '/pages/kids', color: 'from-amber-50 to-yellow-50' },
  { id: 4, name: 'Shoes', image: '/images/shoes.avif', link: '/pages/shoes', color: 'from-blue-50 to-cyan-50' },
  { id: 5, name: 'Accessories', image: '/images/accessories.avif', link: '/pages/accessories', color: 'from-purple-50 to-violet-50' },
  { id: 6, name: 'electronic', image: '/images/technology.avif', link: '/pages/technology', color: 'from-teal-50 to-emerald-50' },
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

