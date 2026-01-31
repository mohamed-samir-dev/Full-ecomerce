interface ContactFormProps {
  formData: { name: string; email: string; subject: string; message: string };
  setFormData: (data: { name: string; email: string; subject: string; message: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export default function ContactForm({ formData, setFormData, handleSubmit, isSubmitting }: ContactFormProps) {
  return (
    <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white shadow-2xl">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-gray-900">
        Send us a message
      </h2>
      <p className="text-sm sm:text-base mb-6 sm:mb-8 text-gray-600">
        Fill out the form below and we&rsquo;ll get back to you shortly
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl bg-gray-50 text-gray-900 border-gray-200 border-2 focus:outline-none focus:border-[#B39E7A] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl bg-gray-50 text-gray-900 border-gray-200 border-2 focus:outline-none focus:border-[#B39E7A] transition-colors"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
            Subject
          </label>
          <input
            type="text"
            placeholder="How can we help?"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl bg-gray-50 text-gray-900 border-gray-200 border-2 focus:outline-none focus:border-[#B39E7A] transition-colors"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
            Message
          </label>
          <textarea
            placeholder="Tell us more about your inquiry..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={6}
            className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl bg-gray-50 text-gray-900 border-gray-200 border-2 focus:outline-none focus:border-[#B39E7A] transition-colors resize-none"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-linear-to-r from-[#B39E7A] to-[#9d8a68] hover:from-[#9d8a68] hover:to-[#8a7759] text-white text-sm sm:text-base font-bold py-4 sm:py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
