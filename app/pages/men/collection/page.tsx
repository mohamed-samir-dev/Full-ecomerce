import CollectionPage from "@/app/components/CollectionPage";

export default function MenCollectionPage() {
  return (
    <CollectionPage
      category="men"
      title="Men's Collection"
      subtitle="Discover our complete range of sophisticated pieces"
      subtitleColor="#6563D2"
      bannerImage="/images/men-collection.avif"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Men", href: "/pages/men" },
        { label: "Collection", href: "" }
      ]}
    />
  );
}
