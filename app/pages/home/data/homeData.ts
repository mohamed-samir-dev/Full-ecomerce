import { HeroSlide,PromoItem } from '../types/home.types';

export const heroSlides: HeroSlide[] = [
  {
    titleKey: 'home.hero.newSeasonArrivals',
    descriptionKey: 'home.hero.newSeasonDescription',
    image: "/images/hero-1.webp",
    buttonTextKey: 'home.hero.shopNow',
    buttonLink: "/pages/banner-pages/products"
  },
  {
    titleKey: 'home.hero.premiumBadge',
    descriptionKey: 'home.hero.premiumSlideDescription',
    image: "/images/hero-2.png",
    buttonTextKey: 'home.hero.premiumButton',
    buttonLink: "/pages/banner-pages/products"
  },
  {
    titleKey: 'home.hero.summerBadge',
    descriptionKey: 'home.hero.summerSlideDescription',
    image: "/images/hero-3.webp",
    buttonTextKey: 'home.hero.summerButton',
    buttonLink: "/pages/banner-pages/products"
  }
];

export const categories = [
  { id: 1, nameKey: 'category.women', image: '/images/woman2.avif', link: '/pages/women', color: 'from-rose-50 to-pink-50' },
  { id: 2, nameKey: 'category.men', image: '/images/man.avif', link: '/pages/men', color: 'from-slate-50 to-gray-50' },
  { id: 3, nameKey: 'category.kids', image: '/images/kid.avif', link: '/pages/kids', color: 'from-amber-50 to-yellow-50' },
  { id: 4, nameKey: 'category.shoes', image: '/images/shoes.avif', link: '/pages/shoes', color: 'from-blue-50 to-cyan-50' },
  { id: 5, nameKey: 'category.accessories', image: '/images/accessories (2).avif', link: '/pages/accessories', color: 'from-purple-50 to-violet-50' },
  { id: 6, nameKey: 'category.electronic', image: '/images/technology.avif', link: '/pages/electronic', color: 'from-teal-50 to-emerald-50' },
  { id: 7, nameKey: 'category.petSupplies', image: '/images/PetSupplies.avif', link: '/pages/PetSupplies', color: 'from-fuchsia-50 to-purple-50' }
];


export const promoItems: PromoItem[] = [
  {
    id: 1,
    titleKey: 'home.promo.freeShipping',
    descriptionKey: 'home.promo.freeShippingDesc',
    buttonTextKey: 'home.promo.shopNow',
    imageUrl: '/images/card1.webp',
    imageAlt: 'Free Shipping'
  },
  {
    id: 2,
    titleKey: 'home.promo.easyReturns',
    descriptionKey: 'home.promo.easyReturnsDesc',
    buttonTextKey: 'home.promo.learnMore',
    imageUrl: '/images/card2.webp',
    imageAlt: 'Easy Returns'
  },
  {
    id: 3,
    titleKey: 'home.promo.securePayment',
    descriptionKey: 'home.promo.securePaymentDesc',
    buttonTextKey: 'home.promo.shopSafe',
    imageUrl: '/images/card3.webp',
    imageAlt: 'Secure Payment'
  }
];

