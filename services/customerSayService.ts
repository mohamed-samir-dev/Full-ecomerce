const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const customerSayService = {
  async createTestimonial(data: { name: string; email: string; rating: number; comment: string }) {
    const response = await fetch(`${API_URL}/api/customer-say`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit testimonial');
    }

    return response.json();
  },

  async getApprovedTestimonials() {
    try {
      const response = await fetch(`${API_URL}/api/customer-say/approved`, {
        method: 'GET',
        cache: 'no-store',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  }
};
