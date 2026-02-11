import { Toast } from '../types';

interface ToastListProps {
  toasts: Toast[];
}

export const ToastList = ({ toasts }: ToastListProps) => {
  return (
    <div className="fixed top-4 right-4 z-60 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-sm border animate-slide-in ${
            toast.type === 'success'
              ? 'bg-green-500/95 border-green-400 text-white'
              : 'bg-red-500/95 border-red-400 text-white'
          }`}
        >
          <div className="text-2xl">
            {toast.type === 'success' ? '✓' : '✕'}
          </div>
          <p className="font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
