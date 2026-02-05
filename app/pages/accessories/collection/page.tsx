import CollectionPage from "@/app/components/CollectionPage";

export default function MenCollectionPage() {
  return (
    <CollectionPage
    subCategory="Accessories"
      title="Accessories's Collection"
      subtitle="Refined accessories designed to elevate your everyday style"
      subtitleColor="#F13B3B"
      bannerImage="/images/top-view-beautiful-rpg-still-life-items.avif"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "accessories", href: "/pages/accessories" },
        { label: "Collection", href: "" }
      ]}
    />
  );
}
