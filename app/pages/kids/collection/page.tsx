import CollectionPage from "@/app/components/CollectionPage";

export default function MenCollectionPage() {
  return (
    <CollectionPage
      category="kid"
      title="kid's Collection"
      subtitle="Discover our complete range of sophisticated pieces"
      subtitleColor="#EB1369"
      bannerImage="/images/kid-collection.avif"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Men", href: "/pages/men" },
        { label: "Collection", href: "" }
      ]}
    />
  );
}
