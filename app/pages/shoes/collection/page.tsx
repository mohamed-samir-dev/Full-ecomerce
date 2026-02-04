import CollectionPage from "@/app/components/CollectionPage";

export default function WomenCollectionPage() {
  return (
    <CollectionPage
      subCategory="Shoes"
      title="shoes's Collection"
      subtitle="Discover our complete range of elegant pieces"
      bannerImage="/images/shoes-collection.avif"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Women", href: "/pages/women" },
        { label: "Collection", href: "" }
      ]}
    />
  );
}
