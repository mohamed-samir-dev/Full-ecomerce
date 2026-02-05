interface Category {
  image: string;
  title: string;
  link: string;
  size: 'large' | 'small';
}

interface BrowseCategoriesProps {
  categories: Category[];
}

export default function BrowseCategories({ categories }: BrowseCategoriesProps) {
  const [large1, small1, small2, large2] = categories;

  return (
    <div className="max-w-[1400px] mx-auto mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="col-span-2 h-64 bg-cover bg-center rounded-2xl relative overflow-hidden" style={{backgroundImage: `url('${large1.image}')`}}>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
              <p className="text-white text-2xl font-bold">{large1.title}</p>
              <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Discover More</button>
            </div>
          </div>
          <div className="h-48 bg-cover bg-center rounded-2xl relative overflow-hidden" style={{backgroundImage: `url('${small1.image}')`}}>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
              <p className="text-white text-xl font-bold">{small1.title}</p>
              <button className="bg-white text-black px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition text-sm">Discover More</button>
            </div>
          </div>
          <div className="h-48 bg-cover bg-center rounded-2xl relative overflow-hidden" style={{backgroundImage: `url('${small2.image}')`}}>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
              <p className="text-white text-xl font-bold">{small2.title}</p>
              <button className="bg-white text-black px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition text-sm">Discover More</button>
            </div>
          </div>
        </div>
        <div className="h-64 lg:h-full bg-cover bg-center rounded-2xl relative overflow-hidden" style={{backgroundImage: `url('${large2.image}')`}}>
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
            <p className="text-white text-3xl font-bold">{large2.title}</p>
            <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Discover More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
