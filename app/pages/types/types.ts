export interface HeroSlide {
    titleKey: string;
    descriptionKey: string;
    image: string;
    buttonTextKey: string;
    buttonLink: string;
  }
  
  export interface HeroSectionProps {
    slides: HeroSlide[];
  }
  export interface BackgroundImageProps {
    slide: HeroSlide;
    currentSlide: number;
    altText: string;
  }

  export interface HeroContentProps {
    slide: HeroSlide;
    currentSlide: number;
    isDarkMode: boolean;
    isArabic: boolean;
    t: (key: string) => string | React.ReactNode;
  }
  export interface HeroImageProps {
    slide: HeroSlide;
    currentSlide: number;
    altText: string;
  }
  
  export interface NavigationIndicatorProps {
    totalSlides: number;
    currentSlide: number;
    onSlideChange: (index: number) => void;
  }
  export interface PromoItem {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    imageUrl: string;
    imageAlt: string;
  }
   export interface PromoItem {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    imageUrl: string;
    imageAlt: string;
  }
  