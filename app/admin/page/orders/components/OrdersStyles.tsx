export default function OrdersStyles() {
  return (
    <style jsx global>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      .animate-slideUp { animation: slideUp 0.4s ease-out; }
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #a855f7;
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #9333ea;
      }
      .orders-scrollbar::-webkit-scrollbar {
        width: 10px;
      }
      .orders-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
      }
      .orders-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #3b82f6, #2563eb);
        border-radius: 10px;
      }
      .orders-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #2563eb, #1d4ed8);
      }
    `}</style>
  );
}
