import { useRouter } from 'next/navigation';

interface OrderActionsProps {
  isDarkMode: boolean;
}

export default function OrderActions({ isDarkMode }: OrderActionsProps) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      <button
        onClick={() => router.push('/pages/shop')}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Continue Shopping
      </button>
      <button
        onClick={() => window.print()}
        className={`w-full py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
          isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-gray-300 text-slate-700 hover:bg-gray-50'
        }`}
      >
        Print Receipt
      </button>
    </div>
  );
}
