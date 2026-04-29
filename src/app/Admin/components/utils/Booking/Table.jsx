"use client";

import { useState, useContext } from "react";
import {
  FaList,
  FaPlane,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExchangeAlt,
} from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";

export default function BookingsView() {
  const [view, setView] = useState("table");

  const { flights } = useContext(Admin);

  const bookings = flights?.data?.recentBookings;

  if (!bookings) return null;

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

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0f0c29] to-[#1a1638] border border-white/10">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-white">
          ✈️ حجوزات الطيران
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-lg ${
              view === "table"
                ? "bg-purple-500 text-white"
                : "bg-white/10 text-gray-400"
            }`}
          >
            <FaList size={16} />
          </button>

          <button
            onClick={() => setView("cards")}
            className={`p-2 rounded-lg ${
              view === "cards"
                ? "bg-purple-500 text-white"
                : "bg-white/10 text-gray-400"
            }`}
          >
            <IoGridOutline size={16} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      {view === "table" && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-right">
            <thead className="bg-white/5 text-gray-300 text-sm">
              <tr>
                <th className="p-3">الخطوط</th>
                <th className="p-3">الرحلة</th>
                <th className="p-3">من → إلى</th>
                <th className="p-3">الوقت</th>
                <th className="p-3">السعر</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>

            <tbody className="text-gray-300 text-sm">
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-3 text-white font-medium">
                    {b.airline}
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <FaPlane className="text-purple-400" />
                      {b.flightNo}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {b.from}
                      <FaExchangeAlt className="text-gray-500 text-xs" />
                      {b.to}
                    </div>
                  </td>

                  <td className="p-3 text-gray-400">
                    {b.departureTime} → {b.arrivalTime}
                  </td>

                  <td className="p-3 font-semibold text-white">
                    ${b.price}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border inline-flex items-center ${getStatusStyles(
                        b.status
                      )}`}
                    >
                      {getStatusIcon(b.status)}
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CARDS */}
      {view === "cards" && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition"
            >
              <div className="flex justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold">
                    {b.airline}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {b.flightNo}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full border ${getStatusStyles(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  ✈️ {b.from} → {b.to}
                </p>
                <p>
                  ⏰ {b.departureTime} - {b.arrivalTime}
                </p>
                <p className="text-white font-bold">
                  💰 ${b.price}
                </p>
                <p className="text-gray-400 text-xs">
                  ID: {b.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}