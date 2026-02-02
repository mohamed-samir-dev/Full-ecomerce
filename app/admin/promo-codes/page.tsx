'use client';

import { useCallback, useEffect, useState } from 'react';

export default function PromoCodesPage() {
  const [codes, setCodes] = useState([]);
  const [form, setForm] = useState({ code: '', discount: '', expiryDate: '', usageLimit: '' });
  const [editing, setEditing] = useState<string | null>(null);

  const fetchCodes = useCallback(async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promo-codes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setCodes(data);
    } catch {
      console.error('Failed to fetch promo codes');
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-compiler/react-compiler
    fetchCodes();
  }, [fetchCodes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const url = editing 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/promo-codes/${editing}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/promo-codes`;
    
    try {
      await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      setForm({ code: '', discount: '', expiryDate: '', usageLimit: '' });
      setEditing(null);
      fetchCodes();
    } catch {
      alert('Failed to save promo code');
    }
  };

  const deleteCode = async (id: string) => {
    if (!confirm('Delete this promo code?')) return;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promo-codes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCodes();
    } catch {
      alert('Failed to delete promo code');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Promo Codes</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-black">{editing ? 'Edit' : 'Add'} Promo Code</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={form.code} onChange={(e) => setForm({...form, code: e.target.value})} placeholder="Code" className="border rounded px-3 py-2 w-full text-black" required />
              <input type="number" value={form.discount} onChange={(e) => setForm({...form, discount: e.target.value})} placeholder="Discount %" className="border rounded px-3 py-2 w-full text-black" required />
              <input type="date" value={form.expiryDate} onChange={(e) => setForm({...form, expiryDate: e.target.value})} className="border rounded px-3 py-2 w-full text-black" required />
              <input type="number" value={form.usageLimit} onChange={(e) => setForm({...form, usageLimit: e.target.value})} placeholder="Usage Limit" className="border rounded px-3 py-2 w-full text-black" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                {editing ? 'Update' : 'Add'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Used</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {codes.map((code: { _id: string; code: string; discount: number; expiryDate: string; usedBy?: string[] }) => (
                  <tr key={code._id}>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{code.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{code.discount}%</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(code.expiryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{code.usedBy?.length || 0}</td>
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => deleteCode(code._id)} className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
