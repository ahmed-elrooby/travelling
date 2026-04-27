"use client";

import { useState } from "react";
import { FaList, FaPlane, FaHotel, FaUmbrellaBeach, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";

const bookingsData = [
  {
    id: 1,
    name: "أحمد عيد",
    type: "Hotel",
    typeAr: "فندق",
    date: "2026-04-27",
    status: "Confirmed",
    statusAr: "مؤكد",
    price: 2500,
    icon: <FaHotel className="text-pink-400" />,
  },
  {
    id: 2,
    name: "سارة علي",
    type: "Flight",
    typeAr: "طيران",
    date: "2026-04-28",
    status: "Pending",
    statusAr: "قيد الانتظار",
    price: 4800,
    icon: <FaPlane className="text-purple-400" />,
  },
  {
    id: 3,
    name: "عمر حسن",
    type: "Tour",
    typeAr: "جولة سياحية",
    date: "2026-04-29",
    status: "Cancelled",
    statusAr: "ملغي",
    price: 1200,
    icon: <FaUmbrellaBeach className="text-blue-400" />,
  },
];

const getStatusStyles = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    case "Pending":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    case "Cancelled":
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Confirmed":
      return <FaCheckCircle className="ml-1 text-xs" />;
    case "Pending":
      return <FaClock className="ml-1 text-xs" />;
    case "Cancelled":
      return <FaTimesCircle className="ml-1 text-xs" />;
    default:
      return null;
  }
};

export default function BookingsView() {
  const [view, setView] = useState("table");

  // تنسيق التاريخ
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="p-6  rounded-xl bg-gradient-to-br from-[#0f0c29] via-[#1a1638] to-[#0a081c]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">حجوزاتي</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setView("table")}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              view === "table"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
            }`}
          >
            <FaList size={18} />
          </button>

          <button
            onClick={() => setView("cards")}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              view === "cards"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
            }`}
          >
            <IoGridOutline size={18} />
          </button>
        </div>
      </div>

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="overflow-x-auto border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20">
          <table className="w-full">
            <thead className="bg-purple-500/10">
              <tr>
                <th className="p-4 font-semibold text-right text-gray-300">العميل</th>
                <th className="p-4 font-semibold text-right text-gray-300">نوع الحجز</th>
                <th className="p-4 font-semibold text-right text-gray-300">التاريخ</th>
                <th className="p-4 font-semibold text-right text-gray-300">الحالة</th>
                <th className="p-4 font-semibold text-right text-gray-300">السعر</th>
              </tr>
            </thead>

            <tbody>
              {bookingsData.map((b, idx) => (
                <tr
                  key={b.id}
                  className={`border-t border-purple-500/20 transition-all duration-200 hover:bg-purple-500/10 ${
                    idx !== bookingsData.length - 1 ? "border-b" : ""
                  }`}
                >
                  <td className="p-4 font-medium text-white">{b.name}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {b.icon}
                      <span className="text-gray-300">{b.typeAr}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{formatDate(b.date)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getStatusStyles(
                        b.status
                      )}`}
                    >
                      {getStatusIcon(b.status)}
                      {b.statusAr}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-white">
                      {b.price.toLocaleString()} EGP
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CARDS VIEW */}
      {view === "cards" && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bookingsData.map((b) => (
            <div
              key={b.id}
              className="p-5 transition-all duration-300 border group rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-12 h-12 transition-transform rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:scale-110">
                  {b.icon}
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getStatusStyles(
                    b.status
                  )}`}
                >
                  {getStatusIcon(b.status)}
                  {b.statusAr}
                </span>
              </div>

              <h3 className="mb-1 text-xl font-bold text-white">{b.name}</h3>
              <p className="mb-3 text-sm text-gray-400">{b.typeAr}</p>

              <div className="pt-3 space-y-2 border-t border-purple-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">📅 التاريخ</span>
                  <span className="text-sm text-white">{formatDate(b.date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">💰 السعر</span>
                  <span className="text-lg font-bold text-white">
                    {b.price.toLocaleString()} EGP
                  </span>
                </div>
              </div>

              <button className="w-full py-2 mt-4 text-sm font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50">
                تفاصيل الحجز
              </button>
            </div>
          ))}
        </div>
      )}

      {/* حالة عدم وجود بيانات */}
      {bookingsData.length === 0 && (
        <div className="py-16 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-white/10">
            <FaList className="text-4xl text-gray-500" />
          </div>
          <p className="text-lg text-gray-400">لا توجد حجوزات حالياً</p>
          <button className="px-6 py-2 mt-4 text-white rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
            حجز رحلة جديدة
          </button>
        </div>
      )}
    </div>
  );
}