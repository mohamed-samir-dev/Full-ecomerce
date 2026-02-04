import CollectionPage from "@/app/components/CollectionPage";

export default function WomenCollectionPage() {
  return (
    <CollectionPage
      category="women"
      title="Women's Collection"
      subtitle="Discover our complete range of elegant pieces"
      bannerImage="/images/women-colection.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Women", href: "/pages/women" },
        { label: "Collection", href: "" }
      ]}
    />
  );
}
