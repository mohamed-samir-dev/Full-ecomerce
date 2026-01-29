import Image from 'next/image';
import { PromoItem } from '../../../../types/types';

interface PromoCardProps {
  item: PromoItem;
}

export const PromoCard = ({ item }: PromoCardProps) => {
  return (
    <div className="flex items-center rounded-lg p-4 sm:p-6 bg-gray-50">
      <div className="flex-1 pr-4">
        <h3 className="text-base sm:text-xl lg:text-2xl font-bold mb-2 text-gray-900">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm lg:text-lg mb-3 sm:mb-4 text-gray-600">
          {item.description}
        </p>
        <button 
          className="bg-[#020204] text-white px-2 sm:px-4 lg:px-6 py-1 sm:py-2 rounded-full hover:bg-gray-800 transition-colors text-xs sm:text-sm lg:text-base"
          aria-label={item.buttonText}
        >
          {item.buttonText}
        </button>
      </div>
      <div className="shrink-0">
        <Image 
          src={item.imageUrl} 
          alt={item.imageAlt} 
          width={128}
          height={128}
          className="w-20 h-20 sm:w-32 sm:h-35 object-cover" 
        />
      </div>
    </div>
  );
};
