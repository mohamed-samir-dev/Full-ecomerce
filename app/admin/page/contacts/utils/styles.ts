export const contactsStyles = `
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
  .contacts-scrollbar::-webkit-scrollbar {
    width: 10px;
  }
  .contacts-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
  }
  .contacts-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #2563eb);
    border-radius: 10px;
  }
  .contacts-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #1d4ed8);
  }
`;
