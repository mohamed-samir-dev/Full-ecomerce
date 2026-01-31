export default function ContactSidebar() {
  const benefits = [
    { title: 'Quick Response', description: 'We respond within 24 hours' },
    { title: 'Expert Support', description: 'Our team is here to help' },
    { title: 'Personalized Care', description: 'Tailored solutions for you' }
  ];

  const hours = [
    { day: 'Mon-Fri', time: '9:00 AM - 6:00 PM', active: true },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM', active: true },
    { day: 'Sunday', time: 'Closed', active: false }
  ];

  return (
    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
          Why Reach Out?
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#B39E7A]/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-sm sm:text-base text-[#B39E7A]">✓</span>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-semibold mb-1 text-gray-900">{benefit.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-linear-to-br from-[#B39E7A]/10 to-[#B39E7A]/5 border border-[#B39E7A]/20">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
          Business Hours
        </h3>
        <div className="space-y-2">
          {hours.map((hour) => (
            <div key={hour.day} className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-700">{hour.day}</span>
              <span className={`font-semibold ${hour.active ? 'text-[#8B7355]' : 'text-gray-500'}`}>
                {hour.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
