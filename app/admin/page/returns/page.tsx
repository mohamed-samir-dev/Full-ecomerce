"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { RotateCcw, Search, ChevronDown, ChevronUp, CheckCircle2, XCircle, Clock, PackageCheck, Loader2 } from "lucide-react";

const gold = "#C9A84C";

interface ReturnItem {
  productId: string;
  name: string;
  nameAr?: string;
  quantity: number;
  price: number;
  reason: string;
}

interface ReturnRequest {
  _id: string;
  userId: { _id: string; name: string; email: string };
  orderId: { _id: string; createdAt: string; totalPrice: number };
  items: ReturnItem[];
  reason: string;
  details: string;
  status: "pending" | "approved" | "rejected" | "completed";
  adminNote: string;
  createdAt: string;
}

const STATUS_CONFIG = {
  pending:   { color: "text-yellow-400", bg: "bg-yellow-400/10", icon: <Clock size={14} />, en: "Pending",   ar: "قيد المراجعة" },
  approved:  { color: "text-blue-400",   bg: "bg-blue-400/10",   icon: <CheckCircle2 size={14} />, en: "Approved",  ar: "مقبول" },
  rejected:  { color: "text-red-400",    bg: "bg-red-400/10",    icon: <XCircle size={14} />, en: "Rejected",  ar: "مرفوض" },
  completed: { color: "text-green-400",  bg: "bg-green-400/10",  icon: <PackageCheck size={14} />, en: "Completed", ar: "مكتمل" },
};

export default function AdminReturnsPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();

  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

  const fetchReturns = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const url = statusFilter !== "all" ? `/api/returns?status=${statusFilter}` : "/api/returns";
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setReturns(data.data);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetchReturns(); }, [fetchReturns]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await fetch(`/api/returns/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status, adminNote: adminNotes[id] || "" }),
      });
      const data = await res.json();
      if (data.success) {
        setReturns((prev) => prev.map((r) => r._id === id ? data.data : r));
      }
    } finally {
      setUpdating(null);
    }
  };

  const filtered = returns.filter((r) => {
    const q = search.toLowerCase();
    return !q || r.userId?.name?.toLowerCase().includes(q) || r.userId?.email?.toLowerCase().includes(q) || r._id.includes(q);
  });

  const stats = {
    total: returns.length,
    pending: returns.filter((r) => r.status === "pending").length,
    approved: returns.filter((r) => r.status === "approved").length,
    completed: returns.filter((r) => r.status === "completed").length,
  };

  const base = isDarkMode ? "bg-gray-900 text-white" : "bg-slate-50 text-gray-900";
  const card = `rounded-2xl border p-5 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`;
  const inputCls = `rounded-xl px-4 py-2.5 text-sm border outline-none transition-colors ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500/60" : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-yellow-500/60"}`;

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${base}`}>
      <div className="max-w-5xl mx-auto" dir={isArabic ? "rtl" : "ltr"}>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <RotateCcw size={22} style={{ color: gold }} />
            <h1 className="text-2xl font-black">{isArabic ? "إدارة المرتجعات" : "Returns Management"}</h1>
          </div>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {isArabic ? "مراجعة وإدارة طلبات إرجاع العملاء" : "Review and manage customer return requests"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: isArabic ? "الكل" : "Total", value: stats.total, color: "text-white" },
            { label: isArabic ? "قيد المراجعة" : "Pending", value: stats.pending, color: "text-yellow-400" },
            { label: isArabic ? "مقبول" : "Approved", value: stats.approved, color: "text-blue-400" },
            { label: isArabic ? "مكتمل" : "Completed", value: stats.completed, color: "text-green-400" },
          ].map((s, i) => (
            <div key={i} className={`${card} text-center`}>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-3" : "left-3"} ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isArabic ? "بحث بالاسم أو البريد..." : "Search by name or email..."}
              className={`${inputCls} w-full ${isArabic ? "pr-9" : "pl-9"}`}
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`${inputCls} sm:w-44`}>
            <option value="all">{isArabic ? "كل الحالات" : "All Status"}</option>
            <option value="pending">{isArabic ? "قيد المراجعة" : "Pending"}</option>
            <option value="approved">{isArabic ? "مقبول" : "Approved"}</option>
            <option value="rejected">{isArabic ? "مرفوض" : "Rejected"}</option>
            <option value="completed">{isArabic ? "مكتمل" : "Completed"}</option>
          </select>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={32} className="animate-spin" style={{ color: gold }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className={`${card} text-center py-12`}>
            <RotateCcw size={36} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">{isArabic ? "لا توجد طلبات إرجاع" : "No return requests found"}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => {
              const cfg = STATUS_CONFIG[r.status];
              const isOpen = expanded === r._id;
              return (
                <div key={r._id} className={`rounded-2xl border overflow-hidden transition-all ${isOpen ? "border-yellow-500/40" : isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
                  {/* Row */}
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : r._id)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-start ${isDarkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${cfg.color} ${cfg.bg}`}>
                        {cfg.icon}
                        {isArabic ? cfg.ar : cfg.en}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-bold text-sm truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {r.userId?.name || "—"}
                        </p>
                        <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {r.userId?.email} · #{r._id.slice(-6).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs hidden sm:block ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {new Date(r.createdAt).toLocaleDateString(isArabic ? "ar-EG" : "en-US")}
                      </span>
                      {isOpen ? <ChevronUp size={16} style={{ color: gold }} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {/* Details */}
                  {isOpen && (
                    <div className={`px-5 pb-5 border-t space-y-4 ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"}`}>
                      {/* Items */}
                      <div className="pt-4">
                        <p className={`text-xs font-bold mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {isArabic ? "المنتجات المُرجَعة:" : "Returned Items:"}
                        </p>
                        <div className="space-y-2">
                          {r.items.map((item, i) => (
                            <div key={i} className={`rounded-xl p-3 border text-sm ${isDarkMode ? "border-gray-700 bg-gray-700/50" : "border-gray-100 bg-gray-50"}`}>
                              <div className="flex justify-between">
                                <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {isArabic && item.nameAr ? item.nameAr : item.name}
                                </span>
                                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>x{item.quantity}</span>
                              </div>
                              <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {isArabic ? "السبب: " : "Reason: "}{item.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reason & Details */}
                      <div className={`rounded-xl p-3 border text-sm ${isDarkMode ? "border-gray-700 bg-gray-700/50" : "border-gray-100 bg-gray-50"}`}>
                        <p className={`font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {isArabic ? "السبب الرئيسي: " : "Main Reason: "}
                          <span className="font-normal">{r.reason}</span>
                        </p>
                        {r.details && (
                          <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>{r.details}</p>
                        )}
                      </div>

                      {/* Admin Note */}
                      <div>
                        <label className={`text-xs font-bold mb-1.5 block ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {isArabic ? "ملاحظة للعميل (اختياري):" : "Note to customer (optional):"}
                        </label>
                        <textarea
                          rows={2}
                          value={adminNotes[r._id] ?? r.adminNote}
                          onChange={(e) => setAdminNotes((prev) => ({ ...prev, [r._id]: e.target.value }))}
                          className={`${inputCls} w-full resize-none`}
                          placeholder={isArabic ? "أضف ملاحظة..." : "Add a note..."}
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {(["approved", "rejected", "completed"] as const).map((s) => {
                          const c = STATUS_CONFIG[s];
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(r._id, s)}
                              disabled={r.status === s || updating === r._id}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all disabled:opacity-40 ${
                                r.status === s
                                  ? `${c.bg} ${c.color} border-transparent`
                                  : isDarkMode ? "border-gray-600 text-gray-300 hover:border-gray-500" : "border-gray-200 text-gray-600 hover:border-gray-300"
                              }`}
                            >
                              {updating === r._id ? <Loader2 size={12} className="animate-spin" /> : c.icon}
                              {isArabic ? c.ar : c.en}
                            </button>
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
      </div>
    </div>
  );
}
