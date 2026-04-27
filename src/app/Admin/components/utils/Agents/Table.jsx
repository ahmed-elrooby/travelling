"use client";
import React, { useState } from 'react';
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaPercent,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaSearch,
  FaList,
  FaThLarge,
  FaChevronRight,
  FaChevronLeft,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
  FaTrophy,
  FaWallet,
} from 'react-icons/fa';

// ========== البيانات الثابتة للوكلاء B2B ==========
const initialAgentsData = [
  { id: 1, name: "السفر العربية", type: "شركة سياحة", email: "info@arabiatravel.com", phone: "+966 12 3456789", sales: 46200, bookings: 142, commission: 15, status: "active", rating: 4.8, joinDate: "2024-01-15", address: "الرياض، السعودية" },
  { id: 2, name: "ماس للسياحة", type: "شركة سياحة", email: "info@mastravel.com", phone: "+966 12 9876543", sales: 31750, bookings: 98, commission: 12, status: "active", rating: 4.7, joinDate: "2024-03-10", address: "جدة، السعودية" },
  { id: 3, name: "السفر الذهبي", type: "شركة Corporate", email: "info@goldentravel.com", phone: "+971 4 5678901", sales: 22300, bookings: 67, commission: 10, status: "pending", rating: 4.5, joinDate: "2024-05-20", address: "دبي، الإمارات" },
  { id: 4, name: "سفر الخليج", type: "فردي", email: "info@gulftravel.com", phone: "+974 4 123456", sales: 18500, bookings: 52, commission: 12, status: "active", rating: 4.6, joinDate: "2024-08-10", address: "الدوحة، قطر" },
  { id: 5, name: "الرحلات الحديثة", type: "شركة سياحة", email: "info@modern-travel.com", phone: "+966 5 11223344", sales: 15200, bookings: 45, commission: 12, status: "active", rating: 4.4, joinDate: "2024-10-01", address: "الدمام، السعودية" },
  { id: 6, name: "سفر الأعمال", type: "شركة Corporate", email: "info@businesstravel.com", phone: "+971 5 99887766", sales: 12800, bookings: 38, commission: 10, status: "active", rating: 4.3, joinDate: "2024-11-15", address: "أبوظبي، الإمارات" },
  { id: 7, name: "سياحة الماس", type: "فردي", email: "info@diamond-tourism.com", phone: "+966 5 55667788", sales: 9800, bookings: 29, commission: 12, status: "inactive", rating: 4.2, joinDate: "2024-12-20", address: "الخبر، السعودية" },
  { id: 8, name: "السفر الأوروبي", type: "شركة سياحة", email: "info@eurotravel.com", phone: "+971 5 44332211", sales: 8500, bookings: 24, commission: 12, status: "pending", rating: 4.1, joinDate: "2025-01-10", address: "الشارقة، الإمارات" },
];

export default function AgentsTable() {
  const [view, setView] = useState("cards");
  const [agents, setAgents] = useState(initialAgentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("sales");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const itemsPerPage = 6;

  // نموذج إضافة وكيل جديد
  const [newAgent, setNewAgent] = useState({
    name: "", type: "شركة سياحة", email: "", phone: "", commission: 12, address: ""
  });

  // دالة البحث والفلترة
  const getFilteredAgents = () => {
    let filtered = [...agents];

    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(agent => agent.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(agent => agent.type === typeFilter);
    }

    if (sortBy === "sales") filtered.sort((a, b) => b.sales - a.sales);
    else if (sortBy === "bookings") filtered.sort((a, b) => b.bookings - a.bookings);
    else if (sortBy === "commission") filtered.sort((a, b) => b.commission - a.commission);
    else if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  };

  const filteredAgents = getFilteredAgents();
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // إحصائيات
  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === "active").length,
    totalSales: agents.reduce((sum, a) => sum + a.sales, 0),
    totalBookings: agents.reduce((sum, a) => sum + a.bookings, 0),
    totalCommission: agents.reduce((sum, a) => sum + (a.sales * a.commission / 100), 0),
  };

  const handleSearch = () => setCurrentPage(1);

  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف هذا الوكيل؟")) {
      setAgents(agents.filter(agent => agent.id !== id));
    }
  };

  const handleAddAgent = () => {
    const newId = Math.max(...agents.map(a => a.id), 0) + 1;
    setAgents([...agents, { ...newAgent, id: newId, sales: 0, bookings: 0, rating: 0, status: "pending" }]);
    setShowAddModal(false);
    setNewAgent({ name: "", type: "شركة سياحة", email: "", phone: "", commission: 12, address: "" });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active": return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-green-400 border rounded-full bg-green-500/20 border-green-500/30"><FaCheckCircle className="text-xs" /> نشط</span>;
      case "pending": return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-yellow-400 border rounded-full bg-yellow-500/20 border-yellow-500/30"><FaTimesCircle className="text-xs" /> قيد الانتظار</span>;
      default: return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-400 border rounded-full bg-gray-500/20 border-gray-500/30"><FaTimesCircle className="text-xs" /> غير نشط</span>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "شركة سياحة": return <span className="px-2 py-1 text-xs text-purple-400 rounded-full bg-purple-500/20">شركة سياحة</span>;
      case "شركة Corporate": return <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-500/20">Corporate</span>;
      default: return <span className="px-2 py-1 text-xs text-green-400 rounded-full bg-green-500/20">فردي</span>;
    }
  };

  // مكون Pagination
  const Pagination = () => {
    if (totalPages <= 1) return null;
    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);
      if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    };
    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10"><FaChevronRight /></button>
        {getPageNumbers().map(page => (
          <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1.5 rounded-lg transition-all ${currentPage === page ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "text-gray-400 hover:bg-white/10"}`}>{page}</button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10"><FaChevronLeft /></button>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f0c29] via-[#1a1638] to-[#0a081c]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">الوكلاء B2B</h1>
            <p className="mt-1 text-gray-400">إدارة جميع وكلاء السفر وشركات السياحة</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
            <FaPlus /> وكيل جديد
          </button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-5">
        <div className="p-4 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20"><p className="text-sm text-gray-400">إجمالي الوكلاء</p><p className="text-2xl font-bold text-white">{stats.totalAgents}</p></div>
        <div className="p-4 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20"><p className="text-sm text-gray-400">الوكلاء النشطون</p><p className="text-2xl font-bold text-green-400">{stats.activeAgents}</p></div>
        <div className="p-4 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20"><p className="text-sm text-gray-400">إجمالي المبيعات</p><p className="text-2xl font-bold text-white">{stats.totalSales.toLocaleString()}$</p></div>
        <div className="p-4 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20"><p className="text-sm text-gray-400">إجمالي الحجوزات</p><p className="text-2xl font-bold text-white">{stats.totalBookings}</p></div>
        <div className="p-4 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20"><p className="text-sm text-gray-400">العمولات المستحقة</p><p className="text-2xl font-bold text-yellow-400">{stats.totalCommission.toLocaleString()}$</p></div>
      </div>

      {/* فلاتر البحث */}
      <div className="p-5 mb-6 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="relative"><FaSearch className="absolute text-gray-400 right-3 top-3" /><input type="text" placeholder="بحث بالاسم أو البريد..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); handleSearch(); }} className="w-full px-4 py-2 pr-10 text-white border bg-white/5 border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="px-4 py-2 text-white border bg-white/5 border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"><option value="all">جميع الحالات</option><option value="active">نشط</option><option value="pending">قيد الانتظار</option><option value="inactive">غير نشط</option></select>
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }} className="px-4 py-2 text-white border bg-white/5 border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"><option value="all">جميع الأنواع</option><option value="شركة سياحة">شركة سياحة</option><option value="شركة Corporate">شركة Corporate</option><option value="فردي">فردي</option></select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 text-white border bg-white/5 border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"><option value="sales">الترتيب حسب: المبيعات</option><option value="bookings">الترتيب حسب: الحجوزات</option><option value="commission">الترتيب حسب: العمولة</option><option value="name">الترتيب حسب: الاسم</option></select>
          <div className="flex gap-2"><button onClick={() => setView("cards")} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-all ${view === "cards" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}><FaThLarge /> بطاقات</button><button onClick={() => setView("table")} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-all ${view === "table" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}><FaList /> جدول</button></div>
        </div>
      </div>

      {/* عرض النتائج */}
      {filteredAgents.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-white/5"><FaBuilding className="mx-auto mb-4 text-5xl text-gray-500" /><p className="text-gray-400">لا يوجد وكلاء تطابق معايير البحث</p><button onClick={() => { setSearchTerm(""); setStatusFilter("all"); setTypeFilter("all"); }} className="px-4 py-2 mt-4 text-white rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">إعادة تعيين</button></div>
      ) : view === "cards" ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {paginatedAgents.map((agent) => (
            <div key={agent.id} className="overflow-hidden transition-all duration-300 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 group">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-3"><div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20"><FaBuilding className="text-xl text-purple-400" /></div><div><h3 className="text-lg font-bold text-white">{agent.name}</h3><p className="text-xs text-gray-400">{getTypeBadge(agent.type)}</p></div></div>{getStatusBadge(agent.status)}</div>
                <div className="space-y-2 text-sm"><p className="flex items-center gap-2 text-gray-400"><FaEnvelope className="text-purple-400" /> {agent.email}</p><p className="flex items-center gap-2 text-gray-400"><FaPhone className="text-purple-400" /> {agent.phone}</p></div>
                <div className="grid grid-cols-2 gap-3 pt-3 mt-4 border-t border-purple-500/20"><div><p className="text-xs text-gray-400">المبيعات</p><p className="text-lg font-bold text-white">{agent.sales.toLocaleString()}$</p></div><div><p className="text-xs text-gray-400">الحجوزات</p><p className="text-lg font-bold text-white">{agent.bookings}</p></div><div><p className="text-xs text-gray-400">العمولة</p><p className="text-lg font-bold text-green-400">{agent.commission}%</p></div><div><p className="text-xs text-gray-400">التقييم</p><div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <FaStar key={i} className={`text-xs ${i < Math.floor(agent.rating) ? "text-yellow-400" : "text-gray-600"}`} />)}</div></div></div>
                <div className="flex gap-2 mt-4"><button className="flex-1 py-2 text-sm text-purple-400 transition rounded-lg bg-purple-500/20 hover:bg-purple-500/30"><FaEye className="inline ml-1" /> تفاصيل</button><button className="p-2 text-green-400 transition rounded-lg bg-green-500/20 hover:bg-green-500/30"><FaEdit /></button><button onClick={() => handleDelete(agent.id)} className="p-2 text-red-400 transition rounded-lg bg-red-500/20 hover:bg-red-500/30"><FaTrashAlt /></button></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20">
          <table className="w-full">
            <thead className="bg-purple-500/10"><tr><th className="p-3 text-right text-gray-300">الوكيل</th><th className="p-3 text-right text-gray-300">النوع</th><th className="p-3 text-right text-gray-300">البريد</th><th className="p-3 text-right text-gray-300">المبيعات</th><th className="p-3 text-right text-gray-300">الحجوزات</th><th className="p-3 text-right text-gray-300">العمولة</th><th className="p-3 text-right text-gray-300">الحالة</th><th className="p-3 text-right text-gray-300">إجراءات</th></tr></thead>
            <tbody>
              {paginatedAgents.map((agent, idx) => (
                <tr key={agent.id} className={`border-t border-purple-500/20 transition-all duration-200 hover:bg-purple-500/10 ${idx !== paginatedAgents.length - 1 ? "border-b" : ""}`}>
                  <td className="p-3"><div><p className="font-medium text-white">{agent.name}</p><p className="text-xs text-gray-500">{agent.address}</p></div></td>
                  <td className="p-3">{getTypeBadge(agent.type)}</td>
                  <td className="p-3 text-gray-400">{agent.email}</td>
                  <td className="p-3 font-semibold text-white">{agent.sales.toLocaleString()}$</td>
                  <td className="p-3 text-white">{agent.bookings}</td>
                  <td className="p-3 text-green-400">{agent.commission}%</td>
                  <td className="p-3">{getStatusBadge(agent.status)}</td>
                  <td className="p-3"><div className="flex gap-2"><button className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"><FaEye size={14} /></button><button className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30"><FaEdit size={14} /></button><button onClick={() => handleDelete(agent.id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><FaTrashAlt size={14} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredAgents.length > 0 && <Pagination />}
      <div className="mt-4 text-sm text-center text-gray-500">عرض {paginatedAgents.length} من {filteredAgents.length} وكيل</div>

      {/* مودال إضافة وكيل */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md" onClick={() => setShowAddModal(false)}>
          <div className="w-full max-w-md p-6 mx-4 rounded-2xl bg-[#1a1638] border border-purple-500/30 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4 text-xl font-bold text-white">إضافة وكيل جديد</h3>
            <div className="space-y-4"><input type="text" placeholder="اسم الوكيل/الشركة" value={newAgent.name} onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })} className="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <select value={newAgent.type} onChange={(e) => setNewAgent({ ...newAgent, type: e.target.value })} className="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-purple-500/30"><option>شركة سياحة</option><option>شركة Corporate</option><option>فردي</option></select>
            <input type="email" placeholder="البريد الإلكتروني" value={newAgent.email} onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })} className="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-purple-500/30" />
            <input type="tel" placeholder="رقم الجوال" value={newAgent.phone} onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })} className="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-purple-500/30" />
            <input type="number" placeholder="نسبة العمولة (%)" value={newAgent.commission} onChange={(e) => setNewAgent({ ...newAgent, commission: parseInt(e.target.value) })} className="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-purple-500/30" />
            <input type="text" placeholder="العنوان" value={newAgent.address} onChange={(e) => setNewAgent({ ...newAgent, address: e.target.value })} className="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-purple-500/30" /></div>
            <div className="flex gap-3 mt-6"><button onClick={() => setShowAddModal(false)} className="flex-1 py-2 text-white rounded-lg bg-white/10 hover:bg-white/20">إلغاء</button><button onClick={handleAddAgent} className="flex-1 py-2 text-white rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">إضافة</button></div>
          </div>
        </div>
      )}
    </div>
  );
}