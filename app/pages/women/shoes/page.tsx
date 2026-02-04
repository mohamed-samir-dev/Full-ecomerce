import { Suspense } from "react";

function ShoesPageFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B39E7A]"></div>
    </div>
  );
}

export default function ShoesPage() {
  return (
    <Suspense fallback={<ShoesPageFallback />}>
     
    </Suspense>
  );
}
