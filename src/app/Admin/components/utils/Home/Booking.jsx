"use client";

import React from "react";
import Image from "next/image";
import { FaPlane, FaArrowLeft } from "react-icons/fa";

const Booking = () => {
  const bookings = [
    {
      name: "محمد علي",
      initials: "MA",
      color: "8b5cf6",
      route: "جدة ← القاهرة",
      date: "2025-05-20",
      price: "320$",
      status: "مؤكد",
      statusColor: "green",
    },
    {
      name: "سارة أحمد",
      initials: "SA",
      color: "ec4899",
      route: "دبي ← لندن",
      date: "2025-05-22",
      price: "850$",
      status: "قيد الانتظار",
      statusColor: "yellow",
    },
    {
      name: "خالد يوسف",
      initials: "KY",
      color: "ef4444",
      route: "الرياض ← اسطنبول",
      date: "2025-05-25",
      price: "410$",
      status: "تم الإصدار",
      statusColor: "blue",
    },
    {
      name: "نورة خالد",
      initials: "NK",
      color: "10b981",
      route: "القاهرة ← نيويورك",
      date: "2025-06-01",
      price: "1,250$",
      status: "مؤكد",
      statusColor: "green",
    },
  ];

  const getStatusStyles = (color) => {
    const colors = {
      green: "bg-green-500/20 text-green-400 border-green-500/30",
      yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="overflow-hidden  lg:col-span-2 bg-[#0f0c2999] border border-[#8b5cf633] rounded-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20">
        <h3 className="flex items-center text-lg font-bold text-white">
          <FaPlane className="ml-2 text-purple-400" />
          أحدث حجوزات الطيران
        </h3>
        <a href="#" className="flex items-center gap-1 text-sm text-purple-400 transition hover:text-pink-400">
          عرض الكل <FaArrowLeft className="text-xs" />
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="text-sm text-gray-300 bg-purple-500/10">
            <tr>
              <th className="px-6 py-3">العميل</th>
              <th className="px-6 py-3">الرحلة</th>
              <th className="px-6 py-3">التاريخ</th>
              <th className="px-6 py-3">السعر</th>
              <th className="px-6 py-3">الحالة</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-300">
            {bookings.map((booking, index) => (
              <tr key={index} className="table-premium-row">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${booking.initials}&background=${booking.color}&color=fff&size=32&rounded=true`}
                      alt={booking.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{booking.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3">{booking.route}</td>
                <td className="px-6 py-3">{booking.date}</td>
                <td className="px-6 py-3 font-semibold text-white">{booking.price}</td>
                <td className="px-6 py-3">
                  <span className={`badge-glow px-3 py-1 rounded-full text-xs border ${getStatusStyles(booking.statusColor)}`}>
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
