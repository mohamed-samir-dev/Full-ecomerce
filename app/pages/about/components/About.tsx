'use client';

export default function About() {
  const timeline = [
    { year: '2020', title: 'Founded', desc: 'Started with a vision to revolutionize online shopping' },
    { year: '2021', title: 'Growing Customer Base', desc: 'Reached thousands of satisfied customers worldwide' },
    { year: '2022', title: 'Market Expansion', desc: 'Expanded to new markets and product categories' },
    { year: '2023', title: 'Product Innovation', desc: 'Launched innovative products and features' },
    { year: '2024', title: 'Industry Leader', desc: 'Recognized as a leader in e-commerce excellence' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero */}
      <div className="py-12 md:py-20 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
            About <span className="text-[#B39E7A]">Global Shop</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Crafting exceptional shopping experiences with passion and dedication
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-gray-900">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#C1B092] hidden md:block"></div>
            
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative mb-8 md:mb-16 ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
                <div className={`md:flex ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                  {/* Content */}
                  <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="p-4 sm:p-6 rounded-xl bg-gray-50 hover:scale-105 transition-transform">
                      <div className="text-xl sm:text-2xl font-bold mb-2 text-[#8B7355]">
                        {item.year}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 rounded-full border-4 bg-[#8B7355] border-white"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="p-4 sm:p-6 rounded-xl text-center bg-white shadow-md hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✨</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900">Premium Quality</h3>
            <p className="text-xs sm:text-sm text-gray-600">Top-notch products carefully selected</p>
          </div>
          
          <div className="p-4 sm:p-6 rounded-xl text-center bg-white shadow-md hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚀</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900">Fast Shipping</h3>
            <p className="text-xs sm:text-sm text-gray-600">Quick delivery to your doorstep</p>
          </div>
          
          <div className="p-4 sm:p-6 rounded-xl text-center bg-white shadow-md hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💎</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900">Best Prices</h3>
            <p className="text-xs sm:text-sm text-gray-600">Competitive pricing guaranteed</p>
          </div>
          
          <div className="p-4 sm:p-6 rounded-xl text-center bg-white shadow-md hover:scale-105 transition-transform">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔒</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900">Secure Shopping</h3>
            <p className="text-xs sm:text-sm text-gray-600">Your data is safe with us</p>
          </div>
        </div>
      </div>

    </div>
  );
}
