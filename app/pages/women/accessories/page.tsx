import { Suspense } from "react";
import ShopPageContent from "@/app/pages/shop/components/ShopPageContent";
import "@/app/pages/shop/styles/filters.css";

function AccessoriesPageFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B39E7A]"></div>
    </div>
  );
}

export default function AccessoriesPage() {
  return (
    <Suspense fallback={<AccessoriesPageFallback />}>
      <ShopPageContent 
        pageTitle="Women's Accessories"
        pageDescription="Complete your look with our accessories collection"
        defaultCategory={["Women", "Accessories"]}
      />
    </Suspense>
  );
}
