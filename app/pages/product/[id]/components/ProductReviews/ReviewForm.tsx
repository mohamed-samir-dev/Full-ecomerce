import { Star } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ReviewFormProps {
  productId: string;
  onCancel: () => void;
}

export default function ReviewForm({ productId, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert('Please select a rating');
    
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const response = await fetch(`https://backend-for-global-shop-production-a385.up.railway.app/api/products/${productId}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comment })
      });
      
      if (response.ok) {
        toast.success('Review submitted! It will appear after admin approval.');
        setRating(0);
        setComment('');
        onCancel();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to submit review');
      }
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h4 className="font-semibold mb-3 text-gray-900">Write Your Review</h4>
      
      <div className="mb-3">
        <label className="block text-sm font-medium mb-2 text-gray-700">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              className={`w-6 h-6 cursor-pointer ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-3">
        <label className="block text-sm font-medium mb-2 text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full border rounded px-3 py-2 h-20 text-gray-900"
          required
        />
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
