"use client";

import { Clients } from "@/app/Providers/ClientContext/ClientsProviders";
import React, { useContext, useState, useMemo } from "react";
import {
  FaHotel,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaTable,
  FaThLarge,
  FaWallet,
  FaBed,
  FaChevronRight,
  FaChevronLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";

const Table = () => {
  const { BookingsHotels } = useContext(Clients);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // ✅ تنسيق التاريخ
  const formatDate = (date) => {
    if (!date) return "--";
    return new Date(date).toLocaleDateString("ar-EG");
  };

  // ✅ تنسيق السعر
  const formatPrice = (price) => {
    return Number(price || 0).toFixed(2);
  };

  // ✅ تنسيق الحالة
  const getStatus = (status) => {
    switch (status) {
      case "confirmed":
        return {
          text: "مؤكد",
          className: "bg-green-500/20 text-green-400",
          icon: <FaCheckCircle />,
        };
      case "pending":
        return {
          text: "قيد الانتظار",
          className: "bg-yellow-500/20 text-yellow-400",
          icon: <FaHourglassHalf />,
        };
      case "cancelled":
        return {
          text: "ملغي",
          className: "bg-red-500/20 text-red-400",
          icon: <FaTimesCircle />,
        };
      case "refunded":
        return {
          text: "مسترد",
          className: "bg-blue-500/20 text-blue-400",
          icon: <FaCheckCircle />,
        };
      default:
        return {
          text: "غير معروف",
          className: "bg-gray-500/20 text-gray-400",
          icon: <FaCheckCircle />,
        };
    }
  };

  // حساب الإحصائيات
  const stats = {
    total: BookingsHotels?.length || 0,
    totalSpent: BookingsHotels?.reduce((sum, b) => sum + (b.price || 0), 0) || 0,
    totalNights: BookingsHotels?.reduce((sum, b) => {
      if (b.checkIn && b.checkOut) {
        const nights = Math.ceil((new Date(b.checkOut) - new Date(b.checkIn)) / (1000 * 60 * 60 * 24));
        return sum + (nights > 0 ? nights : 1);
      }
      return sum;
    }, 0) || 0,
  };

  // Pagination logic
  const totalPages = Math.ceil((BookingsHotels?.length || 0) / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    if (!BookingsHotels || BookingsHotels.length === 0) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return BookingsHotels.slice(startIndex, endIndex);
  }, [BookingsHotels, currentPage, itemsPerPage]);

  // Reset to first page when itemsPerPage changes
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="mt-8">
      {/* Header with Stats */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <FaHotel className="text-2xl text-pink-400" />
          <h2 className="text-2xl font-bold text-white">حجوزات الفنادق</h2>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex gap-2 p-1 w-fit bg-white/10 rounded-xl">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              viewMode === "table"
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <FaTable />
            <span className="hidden text-sm sm:inline">جدول</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <FaThLarge />
            <span className="hidden text-sm sm:inline">شبكة</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {BookingsHotels && BookingsHotels.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
            <FaHotel className="text-pink-400" />
            <span className="text-gray-300">إجمالي الحجوزات:</span>
            <span className="font-bold text-white">{stats.total}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
            <FaWallet className="text-green-400" />
            <span className="text-gray-300">إجمالي الإنفاق:</span>
            <span className="font-bold text-green-400">${formatPrice(stats.totalSpent)}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
            <FaBed className="text-blue-400" />
            <span className="text-gray-300">إجمالي الليالي:</span>
            <span className="font-bold text-white">{stats.totalNights}</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!BookingsHotels || BookingsHotels.length === 0) && (
        <div className="py-16 text-center border bg-white/5 border-white/10 rounded-2xl">
          <FaHotel className="mx-auto mb-4 text-6xl text-gray-600" />
          <p className="text-lg text-gray-400">لا توجد حجوزات فنادق حالياً</p>
        </div>
      )}

      {/* Table View */}
      {BookingsHotels && BookingsHotels.length > 0 && viewMode === "table" && (
        <>
          <div className="overflow-hidden border bg-white/5 backdrop-blur-md border-white/10 rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full ">
                {/* Head */}
                <thead className="border-b bg-white/5 border-white/10">
                  <tr>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">العميل</th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">الفندق</th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">المدينة</th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">الدخول</th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">الخروج</th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">الضيوف</th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">السعر</th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">الحالة</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {paginatedData.map((booking, index) => {
                    const status = getStatus(booking.status);
                    return (
                      <tr
                        key={booking.id || index}
                        className="transition-all duration-200 border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-white">{booking.customer || "---"}</p>
                            <p className="text-xs text-gray-400">#{booking.id}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <FaHotel className="text-pink-400" />
                            <span className="text-white">{booking.hotel || "---"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-400" />
                            <span className="text-gray-300">{booking.city || "---"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaCalendarAlt className="text-green-400" />
                            {formatDate(booking.checkIn)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaCalendarAlt className="text-yellow-400" />
                            {formatDate(booking.checkOut)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaUsers className="text-blue-400" />
                            {booking.guests || 1}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-semibold text-green-400">
                            ${formatPrice(booking.price)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full ${status.className}`}
                          >
                            {status.icon}
                            {status.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Grid View */}
      {BookingsHotels && BookingsHotels.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedData.map((booking, index) => {
            const status = getStatus(booking.status);
            return (
              <div
                key={booking.id || index}
                className="overflow-hidden transition-all duration-300 border bg-white/5 backdrop-blur-md border-white/10 rounded-2xl hover:transform hover:scale-105 hover:border-pink-500/50"
              >
                {/* Header with Hotel Name */}
                <div className="p-4 border-b bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <FaHotel className="text-2xl text-pink-400" />
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${status.className}`}>
                      {status.icon}
                      {status.text}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{booking.hotel || "فندق غير محدد"}</h3>
                  <div className="flex items-center gap-1 mt-1 text-gray-400">
                    <FaMapMarkerAlt className="text-sm text-red-400" />
                    <span className="text-sm">{booking.city || "مدينة غير محددة"}</span>
                  </div>
                </div>

                {/* Body with Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">العميل:</span>
                    <span className="font-medium text-white">{booking.customer || "---"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">تاريخ الدخول:</span>
                    <div className="flex items-center gap-1 text-white">
                      <FaCalendarAlt className="text-sm text-green-400" />
                      <span className="text-sm">{formatDate(booking.checkIn)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">تاريخ الخروج:</span>
                    <div className="flex items-center gap-1 text-white">
                      <FaCalendarAlt className="text-sm text-yellow-400" />
                      <span className="text-sm">{formatDate(booking.checkOut)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">عدد الضيوف:</span>
                    <div className="flex items-center gap-1 text-white">
                      <FaUsers className="text-sm text-blue-400" />
                      <span className="text-sm">{booking.guests || 1}</span>
                    </div>
                  </div>
                  <div className="pt-2 mt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">السعر الإجمالي:</span>
                      <span className="text-xl font-bold text-green-400">
                        ${formatPrice(booking.price)}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 text-xs text-center text-gray-500">
                    #{booking.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {BookingsHotels && BookingsHotels.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 mt-6 sm:flex-row">
          {/* Items per page selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">عرض:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="px-3 py-1 text-white border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:border-pink-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-400">عناصر</span>
          </div>

          {/* Page info */}
          <div className="text-sm text-gray-400">
            عرض {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, BookingsHotels.length)} من{" "}
            {BookingsHotels.length} حجز
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaAngleDoubleRight />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight />
            </button>
            
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : page === '...'
                    ? "text-gray-400 cursor-default"
                    : "text-gray-400 hover:bg-white/10"
                }`}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaAngleDoubleLeft />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;