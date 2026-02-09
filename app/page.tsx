import { Metadata } from 'next';
import HomePage from './pages/home/page';

export const metadata: Metadata = {
  title: 'Global Shop - متجر عالمي للتسوق الإلكتروني',
  description: 'متجر إلكتروني شامل يوفر أفضل المنتجات من ملابس رجالية ونسائية وأطفال، أحذية، إكسسوارات، إلكترونيات ومستلزمات الحيوانات الأليفة بأسعار تنافسية وجودة عالية',
};

export default function Home() {
  return <HomePage />;
}
