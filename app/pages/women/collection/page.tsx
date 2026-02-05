import CollectionPage from "@/app/components/CollectionPage";

export default function WomenCollectionPage() {
  return (
    <CollectionPage
      category="women"
      title="Women's Collection"
      subtitle="Timeless styles crafted for confidence and elegance"
      bannerImage="/images/women-colection.avif"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Women", href: "/pages/women" },
        { label: "Collection", href: "" }
      ]}
    />
  );
}
