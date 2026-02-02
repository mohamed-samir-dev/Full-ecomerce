const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const contactService = {
  async sendMessage(data: { name: string; email: string; subject: string; message: string }) {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  }
};
