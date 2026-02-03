import Image from 'next/image';

export default function HeroBanner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full max-w-[1400px] mx-auto rounded-lg sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
      <Image src="/images/women-page.avif" alt="Fashion" fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent flex items-center px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="text-white max-w-xs sm:max-w-md lg:max-w-lg">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight">Discover Your Style</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 leading-relaxed">Explore the latest trends and timeless classics in women&rsquo;s fashion. Your next favorite outfit awaits.</p>
          <button className="bg-[#C11069] cursor-pointer text-white px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg hover:bg-[#6D093B] transition-all shadow-lg">Shop The Collection</button>
        </div>
      </div>
    </div>
  );
}
