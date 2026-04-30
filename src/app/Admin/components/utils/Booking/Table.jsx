"use client";

import { useState, useContext } from "react";
import {
  FaList,
  FaPlane,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExchangeAlt,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaEye,
  FaPrint,
  FaDownload,
} from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";

export default function BookingsView() {
  const [view, setView] = useState("table");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { flights } = useContext(Admin);
  console.log(flights);

  const bookings = flights?.data?.recentBookings;

  if (!bookings) return null;

  const statuses = [
    { id: "all", label: "الكل", count: bookings.length },
    { id: "confirmed", label: "مؤكد", count: bookings.filter(b => b.status === "confirmed").length },
    { id: "pending", label: "قيد الانتظار", count: bookings.filter(b => b.status === "pending").length },
    { id: "cancelled", label: "ملغي", count: bookings.filter(b => b.status === "cancelled").length },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
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
      default:
        return status;
    }
  };

  const formatTime = (time) => {
    return time;
  };

  const filteredBookings = selectedStatus === "all" 
    ? bookings 
    : bookings.filter(b => b.status === selectedStatus);

  return (
    <div className="w-full p-4 rounded-2xl sm:p-6 bg-gradient-to-br from-[#0f0c29] to-[#1a1638] border border-white/10">
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
            onClick={() => setSelectedStatus(status.id)}
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-right">
            <thead className="text-sm text-gray-300 bg-white/5">
              <tr className="border-b border-white/10">
                <th className="p-3 rounded-tr-2xl">الخطوط</th>
                <th className="p-3">الرحلة</th>
                <th className="p-3">من → إلى</th>
                <th className="p-3">وقت المغادرة</th>
                <th className="p-3">وقت الوصول</th>
                <th className="p-3">السعر</th>
                <th className="p-3 rounded-tl-2xl">الحالة</th>
               </tr>
            </thead>

            <tbody className="text-sm text-gray-300">
              {filteredBookings.map((b, index) => (
                <tr
                  key={b.id}
                  className="transition-all duration-300 border-b border-white/5 hover:bg-white/5 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="p-3 font-medium text-white">
                    <div className="flex items-center gap-2">
                      <FaPlane className="text-purple-400" />
                      {b.airline}
                    </div>
                   </td>

                  <td className="p-3">
                    <span className="px-2 py-1 font-mono text-xs rounded-lg bg-white/10">
                      {b.flightNo}
                    </span>
                   </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <MdFlightTakeoff className="text-purple-400" />
                      <span>{b.from}</span>
                      <FaExchangeAlt className="text-xs text-gray-500" />
                      <MdFlightLand className="text-green-400" />
                      <span>{b.to}</span>
                    </div>
                   </td>

                  <td className="p-3 text-gray-400">
                    {formatTime(b.departureTime)}
                   </td>

                  <td className="p-3 text-gray-400">
                    {formatTime(b.arrivalTime)}
                   </td>

                  <td className="p-3">
                    <span className="font-bold text-white">${b.price}</span>
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
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">✈️</div>
              <p className="text-gray-400">لا توجد حجوزات</p>
              <p className="mt-1 text-sm text-gray-500">
                لا توجد حجوزات تطابق المعايير المحددة
              </p>
            </div>
          )}
        </div>
      )}

      {/* CARDS VIEW */}
      {view === "cards" && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map((b) => (
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
                      <FaPlane className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{b.airline}</h3>
                      <p className="text-xs text-gray-500">{b.flightNo}</p>
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
                      <p className="text-lg font-bold text-white">{b.from}</p>
                      <p className="text-xs text-gray-500">
                        {formatTime(b.departureTime)}
                      </p>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="relative">
                        <div className="border-t border-gray-600 border-dashed"></div>
                        <FaPlane className="absolute text-xs text-purple-400 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{b.to}</p>
                      <p className="text-xs text-gray-500">
                        {formatTime(b.arrivalTime)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">رقم الرحلة:</span>
                    <span className="text-gray-300">{b.flightNo}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">السعر:</span>
                    <span className="text-lg font-bold text-white">
                      ${b.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">مدة الرحلة:</span>
                    <span className="text-gray-300">ساعتان</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex gap-1">
                    <span className="px-2 py-1 text-xs text-gray-400 rounded-lg bg-white/5">
                      {b.class || "درجة السياحة"}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-500/20">
                    <FaEye />
                    <span>عرض</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="py-12 text-center col-span-full">
              <div className="mb-4 text-6xl">✈️</div>
              <p className="text-gray-400">لا توجد حجوزات</p>
              <p className="mt-1 text-sm text-gray-500">
                لا توجد حجوزات تطابق المعايير المحددة
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}