export default function ContactCards() {
  const cards = [
    { icon: '📧', title: 'Email', info: 'support@example.com' },
    { icon: '📞', title: 'Phone', info: '+1 (555) 123-4567' },
    { icon: '📍', title: 'Location', info: '123 Business St, City' },
    { icon: '⏰', title: 'Hours', info: 'Mon-Sat: 9AM-6PM' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
        {cards.map((card) => (
          <div key={card.title} className="p-6 sm:p-8 rounded-2xl text-center bg-white shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-[#B39E7A]/10 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">{card.icon}</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold mb-2 text-gray-900">{card.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{card.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
