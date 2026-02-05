import CollectionPage from "@/app/components/CollectionPage";

export default function ShoesCollectionPage() {
  return (
    <CollectionPage
      subCategory="Shoes"
      title="Shoes Collection"
      subtitle="Elegant footwear designed for comfort and timeless style"
      bannerImage="/images/shoes-collection.avif"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "shoes", href: "/pages/shoes" },
        { label: "Collection", href: "" }
      ]}
    />
  );
}
