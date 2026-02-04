import { Suspense } from "react";
import ShopPageContent from "@/app/pages/shop/components/ShopPageContent";
import "@/app/pages/shop/styles/filters.css";

function BagsPageFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B39E7A]"></div>
    </div>
  );
}

export default function BagsPage() {
  return (
    <Suspense fallback={<BagsPageFallback />}>
      <ShopPageContent 
        pageTitle="Women's Bags"
        pageDescription="Carry your essentials in style with our bag collection"
        defaultCategory={["Women", "Bags"]}
      />
    </Suspense>
  );
}
