"use client";

import React, { useContext } from "react";
import { FaPlane, FaArrowLeft } from "react-icons/fa";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import Link from "next/link";

const Booking = () => {
  const { overview } = useContext(Admin);

  const bookings = overview?.data?.recentFlightBookings;

  if (!bookings) return null;

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();

    if (s?.includes("مؤكد"))
      return "bg-green-500/20 text-green-400 border-green-500/30";

    if (s?.includes("انتظار"))
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";

    if (s?.includes("تم"))
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";

    return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  return (
    <div
      className="
        overflow-hidden 
        lg:col-span-2 
        bg-gradient-to-br from-[#0f0c29]/80 to-[#1a1a2e]/80
        backdrop-blur-md
        border border-white/10 
        rounded-2xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b sm:px-6 border-white/10">
        <h3 className="flex items-center text-sm font-bold text-white sm:text-lg">
          <FaPlane className="ml-2 text-purple-400" />
          أحدث حجوزات الطيران
        </h3>

        <Link
          href="/Admin/BookingPage"
          className="flex items-center gap-1 text-xs text-purple-400 transition sm:text-sm hover:text-pink-400"
        >
          عرض الكل <FaArrowLeft className="text-xs" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-[600px]">
          <thead className="text-xs text-gray-300 sm:text-sm bg-white/5">
            <tr>
              <th className="px-4 py-3 sm:px-6">العميل</th>
              <th className="px-4 py-3 sm:px-6">الرحلة</th>
              <th className="px-4 py-3 sm:px-6">التاريخ</th>
              <th className="px-4 py-3 sm:px-6">السعر</th>
              <th className="px-4 py-3 sm:px-6">الحالة</th>
            </tr>
          </thead>

          <tbody className="text-xs text-gray-300 sm:text-sm">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="transition border-b border-white/5 hover:bg-white/5"
              >
                {/* Customer */}
                <td className="px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${booking.customer}&background=8b5cf6&color=fff`}
                      alt={booking.customer}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="truncate max-w-[120px]">
                      {booking.customer}
                    </span>
                  </div>
                </td>

                {/* Route */}
                <td className="px-4 py-3 text-gray-300 sm:px-6">
                  {booking.route}
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-gray-400 sm:px-6">
                  {booking.date}
                </td>

                {/* Price */}
                <td className="px-4 py-3 font-semibold text-white sm:px-6">
                  ${booking.price}
                </td>

                {/* Status */}
                <td className="px-4 py-3 sm:px-6">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs border ${getStatusStyles(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;