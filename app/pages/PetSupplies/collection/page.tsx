import CollectionPage from "@/app/components/CollectionPage";

export default function MenCollectionPage() {
  return (
    <CollectionPage
      category="pet"
      title="pet's Collection"
      titleColor="#839A7E"
      subtitle="Discover our complete range of sophisticated pieces"
      subtitleColor="#10E6E6"
      bannerImage="/images/pet-page.avif"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "pet", href: "/pages/PetSupplies" },
        { label: "Collection", href: "" }
      ]}
    />
  );
}
