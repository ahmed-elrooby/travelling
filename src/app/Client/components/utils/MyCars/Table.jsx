"use client";
import { Clients } from "@/app/Providers/ClientContext/ClientsProviders";
import React, { useContext, useState, useEffect, useMemo } from "react";
import {
  FaCarSide,
  FaTable,
  FaThLarge,
  FaSearch,
  FaSort,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaHashtag,
  FaExchangeAlt,
  FaUser
} from "react-icons/fa";

const CarRentalsTable = () => {
  const { carsSection } = useContext(Clients);

  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [sortField, setSortField] = useState("pickupDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const apiData = carsSection || [];

  // ✅ Mapping Clean
  const rentals = useMemo(() => {
    return apiData.map((item) => {
      const days = item.duration
        ? parseInt(item.duration)
        : Math.ceil(
            (new Date(item.returnDate) - new Date(item.pickupDate)) /
              (1000 * 60 * 60 * 24)
          );

      const statusMap = {
        confirmed: { text: "مؤكد", color: "green", icon: <FaCheckCircle /> },
        pending: { text: "قيد الانتظار", color: "yellow", icon: <FaClock /> },
        cancelled: { text: "ملغي", color: "red", icon: <FaTimesCircle /> },
      };

      return {
        id: item.id,
        bookingNumber: `#${String(item.id).padStart(6, "0")}`,
        customerName: item.customer,
        carModel: item.car,
        pickupDate: item.pickupDate,
        dropoffDate: item.returnDate,
        fromCity: item.fromCity,
        toCity: item.toCity,
        price: item.price,
        pricePerDay: Math.round(item.price / days),
        days,
        status: item.status,
        statusText: statusMap[item.status]?.text,
        statusColor: statusMap[item.status]?.color,
        statusIcon: statusMap[item.status]?.icon,
      };
    });
  }, [apiData]);

  // ✅ Status counts
  const statuses = [
    { id: "all", label: "الكل", count: rentals.length, icon: <FaCarSide /> },
    { id: "confirmed", label: "مؤكد", count: rentals.filter(r => r.status === "confirmed").length, icon: <FaCheckCircle />, color: "green" },
    { id: "pending", label: "قيد الانتظار", count: rentals.filter(r => r.status === "pending").length, icon: <FaClock />, color: "yellow" },
    { id: "cancelled", label: "ملغي", count: rentals.filter(r => r.status === "cancelled").length, icon: <FaTimesCircle />, color: "red" }
  ];

  // ✅ Filters
  const filtered = rentals
    .filter(
      (r) =>
        r.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.carModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.bookingNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((r) => selectedStatus === "all" || r.status === selectedStatus);

  // ✅ Sort
  const sortedRentals = [...filtered].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === "pickupDate") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    return sortDirection === "asc" ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  });

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = sortedRentals.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(sortedRentals.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status, text, color, icon) => {
    const colors = {
      green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      red: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };

    return (
      <span
        className={`px-2.5 py-1 text-xs rounded-full flex items-center gap-1.5 font-medium border ${colors[color]}`}
      >
        {icon} {text}
      </span>
    );
  };

  return (
    <div className="bg-[#0f0c29] p-2   md:p-6 rounded-xl">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <FaCarSide className="text-lg text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">حجوزات السيارات</h2>
          </div>
          <p className="mr-10 text-sm text-gray-400">إدارة ومتابعة جميع حجوزات السيارات</p>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:justify-between">
          <div className="relative flex-1">
            <FaSearch className="absolute text-sm text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
            <input
              className="w-full px-10 py-2.5 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:border-blue-500/50 focus:outline-none transition-all placeholder:text-gray-500"
              placeholder="بحث بالعميل، السيارة، أو رقم الحجز..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>

          <div className="flex gap-2 p-1 rounded-lg bg-white/5 w-fit">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-1.5 rounded-md transition-all flex items-center gap-2 text-sm ${
                viewMode === "table"
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FaTable className="text-xs" /> جدول
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-1.5 rounded-md transition-all flex items-center gap-2 text-sm ${
                viewMode === "cards"
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FaThLarge className="text-xs" /> بطاقات
            </button>
          </div>
        </div>

        {/* Status Filters */}
        {rentals.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {statuses.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStatus(s.id)}
                className={`px-3 py-1.5 rounded-lg transition-all text-sm flex items-center gap-1.5 ${
                  selectedStatus === s.id
                    ? s.id === "all"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : `bg-${s.color}-500/20 text-${s.color}-400 border border-${s.color}-500/30`
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {s.icon}
                {s.label}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs ${
                    selectedStatus === s.id ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  {s.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {rentals.length === 0 && (
          <div className="py-12 text-center bg-white/5 rounded-xl">
            <FaCarSide className="mx-auto mb-3 text-5xl text-gray-600" />
            <p className="text-gray-400">لا توجد حجوزات حالياً</p>
          </div>
        )}

        {/* TABLE VIEW */}
        {viewMode === "table" && rentals.length > 0 && (
          <div className="overflow-hidden bg-white/5 rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-white/5 border-white/10">
                  <tr>
                    <th className="px-4 py-3 text-xs font-medium text-right text-gray-400">
                      رقم الحجز
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-right text-gray-400">
                      العميل
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-right text-gray-400">
                      السيارة
                    </th>
                    <th
                      onClick={() => handleSort("pickupDate")}
                      className="px-4 py-3 text-xs font-medium text-right text-gray-400 transition-colors cursor-pointer hover:text-white"
                    >
                      <div className="flex items-center justify-end gap-1">
                        تاريخ الاستلام
                        <FaSort className="text-xs" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-right text-gray-400">
                      الموقع
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-right text-gray-400">
                      السعر
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-right text-gray-400">
                      المدة
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-right text-gray-400">
                      الحالة
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((r) => (
                    <tr
                      key={r.id}
                      className="transition-colors border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <FaHashtag className="text-xs text-gray-500" />
                          <span className="font-mono text-sm text-white">
                            {r.bookingNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center rounded-full w-7 h-7 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                            <FaUser className="text-xs text-blue-400" />
                          </div>
                          <span className="text-sm text-white">{r.customerName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <FaCarSide className="text-xs text-blue-400" />
                          <span className="text-sm text-white">{r.carModel}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-xs text-gray-500" />
                          <span className="text-sm text-gray-300">
                            {formatDate(r.pickupDate)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-xs text-gray-500" />
                          <span className="text-sm text-gray-300">{r.fromCity}</span>
                          <FaExchangeAlt className="text-xs text-gray-600" />
                          <span className="text-sm text-gray-300">{r.toCity}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="text-sm font-medium text-white">
                            {r.price?.toLocaleString()} ريال
                          </span>
                          <div className="text-xs text-gray-500">
                            {r.pricePerDay?.toLocaleString()} ريال/يوم
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <FaClock className="text-xs text-gray-500" />
                          <span className="text-sm text-gray-300">{r.days} أيام</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(r.status, r.statusText, r.statusColor, r.statusIcon)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CARDS VIEW */}
        {viewMode === "cards" && rentals.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((r) => (
              <div
                key={r.id}
                className="overflow-hidden transition-all border bg-white/5 rounded-xl border-white/5 hover:border-white/10"
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-center gap-2 pb-2 mb-3 border-b border-white/10">
                    <div className="flex items-center justify-center rounded-full w-9 h-9 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <FaUser className="text-sm text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{r.customerName}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-500">
                        <FaHashtag className="text-xs" /> {r.bookingNumber}
                      </p>
                    </div>
                    {getStatusBadge(r.status, r.statusText, r.statusColor, r.statusIcon)}
                  </div>

                  {/* Car Info */}
                  <div className="pb-2 mb-3 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <FaCarSide className="text-sm text-blue-400" />
                      <span className="text-sm font-medium text-white">{r.carModel}</span>
                    </div>
                  </div>

                  {/* Rental Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <FaCalendarAlt className="text-xs" />
                        <span className="text-xs">الاستلام</span>
                      </div>
                      <span className="text-xs text-gray-300">{formatDate(r.pickupDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <FaMapMarkerAlt className="text-xs" />
                        <span className="text-xs">الموقع</span>
                      </div>
                      <span className="text-xs text-gray-300">
                        {r.fromCity} → {r.toCity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <FaMoneyBillWave className="text-xs" />
                        <span className="text-xs">السعر</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-white">
                          {r.price?.toLocaleString()} ريال
                        </span>
                        <div className="text-xs text-gray-500">
                          {r.pricePerDay?.toLocaleString()} ريال/يوم
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronRight />
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  Math.abs(pageNumber - currentPage) <= 1
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-8 h-8 rounded-lg transition-colors text-sm ${
                        currentPage === pageNumber
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={i} className="text-sm text-gray-600">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronLeft />
            </button>
          </div>
        )}

        {/* Info Bar */}
        {rentals.length > 0 && (
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-500">
              عرض {currentItems.length} من {sortedRentals.length} حجز
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRentalsTable;