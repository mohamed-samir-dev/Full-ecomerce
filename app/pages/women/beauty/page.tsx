import { Suspense } from "react";
import ShopPageContent from "@/app/pages/shop/components/ShopPageContent";
import "@/app/pages/shop/styles/filters.css";

function BeautyPageFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B39E7A]"></div>
    </div>
  );
}

export default function BeautyPage() {
  return (
    <Suspense fallback={<BeautyPageFallback />}>
      <ShopPageContent 
        pageTitle="Women's Beauty"
        pageDescription="Enhance your natural beauty with our curated collection"
        defaultCategory={["Women", "Beauty"]}
      />
    </Suspense>
  );
}
