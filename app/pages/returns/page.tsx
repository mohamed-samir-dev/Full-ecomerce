"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";
import orderService from "@/services/orderService";
import { RotateCcw, ChevronDown, ChevronUp, CheckSquare, Square, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const gold = "#C9A84C";
const goldGradient = "linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)";

const RETURN_REASONS = {
  en: ["Wrong size", "Wrong item received", "Damaged/defective product", "Changed my mind", "Other"],
  ar: ["مقاس خاطئ", "منتج مختلف عما طلبت", "منتج تالف أو معيب", "غيرت رأيي", "سبب آخر"],
};

interface OrderItem {
  productId: string;
  name: string;
  nameAr?: string;
  quantity: number;
  price: number;
  selectedOptions?: { size?: string; color?: string };
}

interface Order {
  _id: string;
  products: OrderItem[];
  status: string;
  createdAt: string;
  totalPrice: number;
}

interface SelectedItem {
  productId: string;
  name: string;
  nameAr?: string;
  quantity: number;
  price: number;
  reason: string;
}

export default function ReturnsPage() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const reasons = isArabic ? RETURN_REASONS.ar : RETURN_REASONS.en;

  useEffect(() => {
    if (!user) { router.push("/pages/login"); return; }
    orderService.getUserOrders().then((res) => {
      if (res.success && res.data) {
        const all = (Array.isArray(res.data) ? res.data : [res.data]) as Order[];
        setOrders(all.filter((o) => o.status === "delivered"));
      }
    }).finally(() => setLoading(false));
  }, [user, router]);

  const toggleItem = (item: OrderItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);
      if (exists) return prev.filter((i) => i.productId !== item.productId);
      return [...prev, { productId: item.productId, name: item.name, nameAr: item.nameAr, quantity: item.quantity, price: item.price, reason: "" }];
    });
  };

  const setItemReason = (productId: string, r: string) => {
    setSelectedItems((prev) => prev.map((i) => i.productId === productId ? { ...i, reason: r } : i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !selectedItems.length || !reason) return;
    if (selectedItems.some((i) => !i.reason)) {
      setError(isArabic ? "يرجى تحديد سبب لكل منتج" : "Please select a reason for each item");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId: selectedOrder._id, items: selectedItems, reason, details }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  const card = `rounded-2xl border p-5 ${isDarkMode ? "bg-[#1A1A1A] border-white/8" : "bg-white border-gray-100"}`;
  const label = `text-sm font-medium mb-1.5 block ${isDarkMode ? "text-white/70" : "text-gray-700"}`;
  const inputCls = `w-full rounded-xl px-4 py-2.5 text-sm border outline-none transition-colors ${
    isDarkMode ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#C9A84C]/60" : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#C9A84C]/60"
  }`;

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? "bg-[#141414]" : "bg-[#F5F0EA]"}`}>
      <Loader2 size={32} className="animate-spin" style={{ color: gold }} />
    </div>
  );

  if (success) return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? "bg-[#141414]" : "bg-[#F5F0EA]"}`} dir={isArabic ? "rtl" : "ltr"}>
      <div className={`${card} max-w-md w-full mx-4 text-center space-y-4`}>
        <CheckCircle2 size={48} className="mx-auto" style={{ color: gold }} />
        <h2 className={`text-xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {isArabic ? "تم إرسال طلب الإرجاع!" : "Return Request Submitted!"}
        </h2>
        <p className={`text-sm ${isDarkMode ? "text-white/55" : "text-gray-500"}`}>
          {isArabic ? "سيراجع فريقنا طلبك ويتواصل معك خلال 2-3 أيام عمل." : "Our team will review your request and contact you within 2-3 business days."}
        </p>
        <button onClick={() => router.push("/pages/orders")} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: goldGradient }}>
          {isArabic ? "العودة لطلباتي" : "Back to My Orders"}
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#141414]" : "bg-[#F5F0EA]"}`} dir={isArabic ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: isDarkMode ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)" : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)" }} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-14 pb-10 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mx-auto" style={{ background: `${gold}15`, border: `1px solid ${gold}40` }}>
            <RotateCcw size={24} style={{ color: gold }} />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {isArabic ? "طلب إرجاع منتج" : "Return a Product"}
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}>
            {isArabic ? "اختر الطلب والمنتجات التي تريد إرجاعها" : "Select the order and items you want to return"}
          </p>
          <div className="flex justify-center pt-1">
            <div className="h-[2px] w-16 rounded-full" style={{ background: goldGradient }} />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16 space-y-6">
        {/* No delivered orders */}
        {orders.length === 0 && (
          <div className={`${card} text-center py-10`}>
            <AlertCircle size={36} className="mx-auto mb-3" style={{ color: gold }} />
            <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {isArabic ? "لا توجد طلبات مؤهلة للإرجاع" : "No eligible orders for return"}
            </p>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-white/45" : "text-gray-500"}`}>
              {isArabic ? "يمكن إرجاع الطلبات المُسلَّمة فقط خلال 30 يوماً." : "Only delivered orders can be returned within 30 days."}
            </p>
          </div>
        )}

        {/* Order selection */}
        {orders.length > 0 && (
          <div className="space-y-3">
            <p className={`text-sm font-bold ${isDarkMode ? "text-white/70" : "text-gray-700"}`}>
              {isArabic ? "١. اختر الطلب" : "1. Select Order"}
            </p>
            {orders.map((order) => {
              const isSelected = selectedOrder?._id === order._id;
              return (
                <div key={order._id} className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isSelected ? "border-[#C9A84C]/60" : isDarkMode ? "border-white/8 bg-[#1A1A1A]" : "border-gray-100 bg-white"}`}>
                  <button
                    type="button"
                    onClick={() => { setSelectedOrder(isSelected ? null : order); setSelectedItems([]); }}
                    className={`w-full flex items-center justify-between px-5 py-4 text-start ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    <div>
                      <p className="font-bold text-sm">
                        {isArabic ? "طلب رقم" : "Order"} #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className={`text-xs mt-0.5 ${isDarkMode ? "text-white/45" : "text-gray-500"}`}>
                        {new Date(order.createdAt).toLocaleDateString(isArabic ? "ar-EG" : "en-US")} — {order.totalPrice.toLocaleString()} {isArabic ? "جنيه" : "EGP"}
                      </p>
                    </div>
                    {isSelected ? <ChevronUp size={18} style={{ color: gold }} /> : <ChevronDown size={18} />}
                  </button>

                  {isSelected && (
                    <div className={`px-5 pb-4 border-t ${isDarkMode ? "border-white/8" : "border-gray-100"}`}>
                      <p className={`text-xs font-bold mt-3 mb-2 ${isDarkMode ? "text-white/50" : "text-gray-500"}`}>
                        {isArabic ? "اختر المنتجات:" : "Select items:"}
                      </p>
                      <div className="space-y-2">
                        {order.products.map((item) => {
                          const checked = selectedItems.some((i) => i.productId === item.productId);
                          const selItem = selectedItems.find((i) => i.productId === item.productId);
                          return (
                            <div key={item.productId} className={`rounded-xl p-3 border ${isDarkMode ? "border-white/8 bg-white/5" : "border-gray-100 bg-gray-50"}`}>
                              <button type="button" onClick={() => toggleItem(item)} className="flex items-center gap-3 w-full text-start">
                                {checked
                                  ? <CheckSquare size={18} style={{ color: gold }} />
                                  : <Square size={18} className={isDarkMode ? "text-white/30" : "text-gray-400"} />}
                                <div className="flex-1">
                                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    {isArabic && item.nameAr ? item.nameAr : item.name}
                                  </p>
                                  <p className={`text-xs ${isDarkMode ? "text-white/40" : "text-gray-500"}`}>
                                    x{item.quantity} — {item.price.toLocaleString()} {isArabic ? "جنيه" : "EGP"}
                                  </p>
                                </div>
                              </button>
                              {checked && (
                                <select
                                  value={selItem?.reason || ""}
                                  onChange={(e) => setItemReason(item.productId, e.target.value)}
                                  className={`mt-2 w-full rounded-lg px-3 py-2 text-xs border outline-none ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                                >
                                  <option value="">{isArabic ? "سبب الإرجاع..." : "Reason for return..."}</option>
                                  {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
                                </select>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Form */}
        {selectedOrder && selectedItems.length > 0 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className={`text-sm font-bold ${isDarkMode ? "text-white/70" : "text-gray-700"}`}>
              {isArabic ? "٢. تفاصيل الطلب" : "2. Request Details"}
            </p>

            <div className={card}>
              <div className="space-y-4">
                <div>
                  <label className={label}>{isArabic ? "السبب الرئيسي للإرجاع" : "Main Return Reason"}</label>
                  <select value={reason} onChange={(e) => setReason(e.target.value)} required className={inputCls}>
                    <option value="">{isArabic ? "اختر السبب..." : "Select reason..."}</option>
                    {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>{isArabic ? "تفاصيل إضافية (اختياري)" : "Additional Details (optional)"}</label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                    placeholder={isArabic ? "أخبرنا المزيد عن المشكلة..." : "Tell us more about the issue..."}
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
              style={{ background: goldGradient }}
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <RotateCcw size={18} />}
              {isArabic ? "إرسال طلب الإرجاع" : "Submit Return Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
