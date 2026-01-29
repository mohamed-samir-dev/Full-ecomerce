interface StrengthBarProps {
  score: number;
  colors: { bg: string };
}

export default function StrengthBar({ score, colors }: StrengthBarProps) {
  return (
    <div className="flex space-x-1 mb-2 sm:mb-3">
      {[0, 1, 2, 3, 4].map((level) => (
        <div
          key={level}
          className={`h-1.5 sm:h-2 flex-1 rounded-full transition-all duration-500 ease-out ${
            level <= score ? `${colors.bg} shadow-sm` : 'bg-gray-700'
          }`}
        />
      ))}
    </div>
  );
}
