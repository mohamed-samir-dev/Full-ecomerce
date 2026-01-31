interface ImageCounterProps {
  currentIndex: number;
  totalImages: number;
}

export default function ImageCounter({ currentIndex, totalImages }: ImageCounterProps) {
  if (totalImages <= 1) return null;

  return (
    <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm">
      {currentIndex + 1} / {totalImages}
    </div>
  );
}
