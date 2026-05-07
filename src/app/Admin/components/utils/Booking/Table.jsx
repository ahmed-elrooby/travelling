"use client";

import { useState, useContext } from "react";

import { IoGridOutline } from "react-icons/io5";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaClock, 
  FaDollarSign, 
  FaDownload, 
  FaExchangeAlt, 
  FaEye, 
  FaList, 
  FaPlane, 
  FaTimesCircle, 
  FaUser,
  FaChevronRight,
  FaChevronLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft
} from "react-icons/fa";
import { HiMiniReceiptRefund } from "react-icons/hi2";

export default function BookingsView() {
  const [view, setView] = useState("table");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const { flightSection } = useContext(Admin);
  console.log(flightSection);

  const bookings = flightSection?.data;

  if (!bookings) return null;

  // تحديث حالات الحجز لتشمل refunded
  const statuses = [
    { id: "all", label: "الكل", count: bookings.length },
    { id: "confirmed", label: "مؤكد", count: bookings.filter(b => b.status === "confirmed").length },
    { id: "pending", label: "قيد الانتظار", count: bookings.filter(b => b.status === "pending").length },
    { id: "cancelled", label: "ملغي", count: bookings.filter(b => b.status === "cancelled").length },
    { id: "refunded", label: "مسترد", count: bookings.filter(b => b.status === "refunded").length },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "refunded":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle className="ml-1 text-xs" />;
      case "pending":
        return <FaClock className="ml-1 text-xs" />;
      case "cancelled":
        return <FaTimesCircle className="ml-1 text-xs" />;
      case "refunded":
        return <HiMiniReceiptRefund className="ml-1 text-xs" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "مؤكد";
      case "pending":
        return "قيد الانتظار";
      case "cancelled":
        return "ملغي";
      case "refunded":
        return "مسترد";
      default:
        return status;
    }
  };

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // استخراج المدن من route
  const parseRoute = (route) => {
    if (!route) return { from: "?", to: "?" };
    const parts = route.split(" - ");
    if (parts.length === 2) {
      return { from: parts[0], to: parts[1] };
    }
    return { from: route, to: "?" };
  };

  // تصفية الحجوزات بناءً على الحالة المختارة
  const filteredBookings = selectedStatus === "all" 
    ? bookings 
    : bookings.filter(b => b.status === selectedStatus);

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  const handleStatusChange = (statusId) => {
    setSelectedStatus(statusId);
    setCurrentPage(1);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Change items per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-white sm:text-2xl">
            ✈️ حجوزات الطيران
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            إدارة ومتابعة جميع حجوزات رحلات الطيران
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView("table")}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              view === "table"
                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/10 text-gray-400 hover:bg-white/20"
            }`}
          >
            <FaList size={16} />
          </button>

          <button
            onClick={() => setView("cards")}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              view === "cards"
                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/10 text-gray-400 hover:bg-white/20"
            }`}
          >
            <IoGridOutline size={16} />
          </button>

          <button className="p-2.5 rounded-lg transition-all duration-300 bg-white/10 text-gray-400 hover:bg-white/20">
            <FaDownload size={16} />
          </button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => handleStatusChange(status.id)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
              selectedStatus === status.id
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            {status.label}
            <span className="mr-1 text-xs">({status.count})</span>
          </button>
        ))}
      </div>

      {/* TABLE VIEW */}
      {view === "table" && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-right">
              <thead className="text-sm text-gray-300 bg-white/5">
                <tr className="border-b border-white/10">
                  <th className="p-3 rounded-tr-2xl">العميل</th>
                  <th className="p-3">الرحلة</th>
                  <th className="p-3">مسار الرحلة</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">السعر</th>
                  <th className="p-3 rounded-tl-2xl">الحالة</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-300">
                {currentBookings.map((b, index) => {
                  const { from, to } = parseRoute(b.route);
                  return (
                    <tr
                      key={b.id}
                      className="transition-all duration-300 border-b border-white/5 hover:bg-white/5 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-purple-400" />
                          <span className="font-medium text-white">{b.customer}</span>
                        </div>
                       </td>
                      <td className="p-3">
                        <span className="px-2 py-1 font-mono text-xs rounded-lg bg-white/10">
                          {b.flightNo || "رقم الرحلة غير متوفر"}
                        </span>
                       </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <MdFlightTakeoff className="text-purple-400" />
                          <span>{from}</span>
                          <FaExchangeAlt className="text-xs text-gray-500" />
                          <MdFlightLand className="text-green-400" />
                          <span>{to}</span>
                        </div>
                       </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-500" />
                          <span className="text-gray-400">{formatDate(b.date)}</span>
                        </div>
                       </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <FaDollarSign className="text-green-400" />
                          <span className="font-bold text-white">{b.price}</span>
                        </div>
                       </td>
                      <td className="p-3">
                        <span
                          className={`flex w-fit items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyles(
                            b.status
                          )}`}
                        >
                          {getStatusIcon(b.status)}
                          {getStatusText(b.status)}
                        </span>
                       </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {currentBookings.length === 0 && (
              <div className="py-12 text-center">
                <div className="mb-4 text-6xl">✈️</div>
                <p className="text-gray-400">لا توجد حجوزات</p>
                <p className="mt-1 text-sm text-gray-500">
                  لا توجد حجوزات تطابق المعايير المحددة
                </p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredBookings.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-4 mt-6 sm:flex-row">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>عرض</span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="px-2 py-1 text-white border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:border-purple-500"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
                <span>من أصل {filteredBookings.length} حجز</span>
              </div>

              <div className="flex items-center gap-2">
                {/* First Page */}
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 transition-all duration-300 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleDoubleRight />
                </button>

                {/* Previous Page */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 transition-all duration-300 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                    className={`min-w-[40px] h-10 px-3 rounded-lg transition-all duration-300 ${
                      currentPage === page
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                        : "text-gray-400 hover:bg-white/10"
                    } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
                    disabled={typeof page !== 'number'}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Page */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 transition-all duration-300 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>

                {/* Last Page */}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 transition-all duration-300 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleDoubleLeft />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* CARDS VIEW */}
      {view === "cards" && (
        <>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {currentBookings.map((b) => {
              const { from, to } = parseRoute(b.route);
              return (
                <div
                  key={b.id}
                  className="relative p-5 overflow-hidden transition-all duration-500 border cursor-pointer group rounded-2xl bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-purple-500/40 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 transition-opacity duration-700 opacity-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 group-hover:opacity-100"></div>

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <FaUser className="text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{b.customer}</h3>
                          <p className="text-xs text-gray-500">
                            {b.flightNo || "رقم الرحلة غير متوفر"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyles(
                          b.status
                        )}`}
                      >
                        {getStatusIcon(b.status)}
                        {getStatusText(b.status)}
                      </span>
                    </div>

                    {/* Flight Route */}
                    <div className="p-3 mb-4 rounded-lg bg-white/5">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-lg font-bold text-white">{from}</p>
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="relative">
                            <div className="border-t border-gray-600 border-dashed"></div>
                            <FaPlane className="absolute text-xs text-purple-400 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-white">{to}</p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">مسار الرحلة:</span>
                        <span className="text-gray-300">{b.route}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">التاريخ:</span>
                        <span className="text-gray-300">{formatDate(b.date)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">السعر:</span>
                        <span className="text-lg font-bold text-white">
                          ${b.price}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="flex gap-1">
                        <span className="px-2 py-1 text-xs text-gray-400 rounded-lg bg-white/5">
                          ID: {b.id}
                        </span>
                      </div>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-500/20">
                        <FaEye />
                        <span>عرض</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {currentBookings.length === 0 && (
              <div className="py-12 text-center col-span-full">
                <div className="mb-4 text-6xl">✈️</div>
                <p className="text-gray-400">لا توجد حجوزات</p>
                <p className="mt-1 text-sm text-gray-500">
                  لا توجد حجوزات تطابق المعايير المحددة
                </p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredBookings.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-4 mt-6 sm:flex-row">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>عرض</span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="px-2 py-1 text-white border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:border-purple-500"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
                <span>من أصل {filteredBookings.length} حجز</span>
              </div>

              <div className="flex items-center gap-2">
                {/* First Page */}
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 transition-all duration-300 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleDoubleRight />
                </button>

                {/* Previous Page */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 transition-all duration-300 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                    className={`min-w-[40px] h-10 px-3 rounded-lg transition-all duration-300 ${
                      currentPage === page
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                        : "text-gray-400 hover:bg-white/10"
                    } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
                    disabled={typeof page !== 'number'}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Page */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 transition-all duration-300 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>

                {/* Last Page */}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 transition-all duration-300 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleDoubleLeft />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}