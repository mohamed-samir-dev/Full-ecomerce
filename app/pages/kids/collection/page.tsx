import CollectionPage from "@/app/components/CollectionPage";

export default function KidCollectionPage() {
  return (
    <CollectionPage
      category="kid"
      title="Kids' Collection"
      subtitle="Playful styles and essentials made for everyday adventures"
      subtitleColor="#EB1369"
      bannerImage="/images/kid-collection.avif"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Kids", href: "/pages/kids" },
        { label: "Collection", href: "" }
      ]}
    />
  );
}
