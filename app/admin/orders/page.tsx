'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface Order {
  _id: string;
  userId: { _id: string; name: string; email: string };
  products: Array<{
    productId: { _id: string; name: string; mainImage?: string };
    name: string;
    quantity: number;
    price: number;
    selectedOptions?: { size?: string; color?: string };
  }>;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, shipped: 0, delivered: 0, cancelled: 0, revenue: 0 });

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const params = new URLSearchParams({ limit: '100', ...(statusFilter && { status: statusFilter }) });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const calculateStats = (ordersData: Order[]) => {
    setStats({
      total: ordersData.length,
      pending: ordersData.filter(o => o.status === 'pending').length,
      confirmed: ordersData.filter(o => o.status === 'confirmed').length,
      shipped: ordersData.filter(o => o.status === 'shipped').length,
      delivered: ordersData.filter(o => o.status === 'delivered').length,
      cancelled: ordersData.filter(o => o.status === 'cancelled').length,
      revenue: ordersData.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.totalPrice, 0)
    });
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus as Order['status'] });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-cyan-500',
      shipped: 'bg-indigo-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500'
    };
    return colors[status as keyof typeof colors];
  };

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Orders Management
          </h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600 mt-1">Total Orders</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
            <div className="text-sm text-gray-600 mt-1">Pending</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.confirmed}</div>
            <div className="text-sm text-gray-600 mt-1">Confirmed</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.shipped}</div>
            <div className="text-sm text-gray-600 mt-1">Shipped</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.delivered}</div>
            <div className="text-sm text-gray-600 mt-1">Delivered</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.cancelled}</div>
            <div className="text-sm text-gray-600 mt-1">Cancelled</div>
          </div>
          <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-lg p-4 shadow-sm text-white hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold">{stats.revenue.toFixed(0)}</div>
            <div className="text-sm mt-1">Revenue (EGP)</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search orders..."
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900 transition-all"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900 transition-all"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></div>
                    <div>
                      <div className="font-semibold text-gray-900">#{order._id.slice(-8).toUpperCase()}</div>
                      <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-xs text-gray-500">Customer</div>
                      <div className="font-medium text-gray-900">{order.userId?.name || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Items</div>
                      <div className="font-medium text-gray-900">{order.products.length}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="font-semibold text-green-600">{order.totalPrice.toFixed(2)} EGP</div>
                    </div>
                    <div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium text-white ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp" onClick={(e) => e.stopPropagation()}>
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Order Details</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono bg-white/20 px-3 py-1 rounded-lg">#{selectedOrder._id.slice(-8).toUpperCase()}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="hover:bg-white/20 rounded-lg p-2 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Customer Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{selectedOrder.userId?.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900 text-xs">{selectedOrder.userId?.email || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Shipping Address
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium text-gray-900">{selectedOrder.shippingAddress.fullName}</p>
                    <p className="text-gray-600">{selectedOrder.shippingAddress.address}</p>
                    <p className="text-gray-600">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                    <p className="text-gray-600">{selectedOrder.shippingAddress.country}</p>
                    <p className="text-gray-600 font-medium mt-2">{selectedOrder.shippingAddress.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  Products ({selectedOrder.products.length})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm">
                      {item.productId?.mainImage && (
                        <Image src={item.productId.mainImage} alt={item.name} width={64} height={64} className="w-16 h-16 object-cover rounded-lg" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity} × {item.price.toFixed(2)} EGP</p>
                        {item.selectedOptions && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.selectedOptions.size && `Size: ${item.selectedOptions.size}`}
                            {item.selectedOptions.color && ` • Color: ${item.selectedOptions.color}`}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{(item.quantity * item.price).toFixed(2)}</p>
                        <p className="text-xs text-gray-500">EGP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-100 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  Payment & Info
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium text-gray-900">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium text-gray-900">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {selectedOrder.notes && (
                  <div className="mt-3 pt-3 border-t border-yellow-200">
                    <p className="text-sm text-gray-700"><span className="font-medium">Notes:</span> {selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-lg p-5 text-white mb-6 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-3xl font-bold">{selectedOrder.totalPrice.toFixed(2)} EGP</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Update Order Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedOrder._id, status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedOrder.status === status
                          ? `${getStatusColor(status)} text-white shadow-md`
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </div>
  );
}
