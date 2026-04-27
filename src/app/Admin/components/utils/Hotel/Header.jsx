"use client";

import { FaChevronLeft, FaPlusCircle, FaHotel, FaBell, FaChartLine } from "react-icons/fa";
import { useState } from "react";

export default function HotelBookingsHeader() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mb-8" data-aos="fade-down">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        
        {/* Left Content */}
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center flex-wrap gap-2 text-sm text-gray-400 mb-3">
            <a href="#" className="transition-all duration-300 hover:text-purple-400 hover:translate-x-0.5">
              الرئيسية
            </a>
            <FaChevronLeft className="text-xs text-gray-500" />
            <a href="#" className="transition-all duration-300 hover:text-purple-400 hover:translate-x-0.5">
              الحجوزات
            </a>
            <FaChevronLeft className="text-xs text-gray-500" />
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
              حجوزات الفنادق
            </span>
          </div>

          {/* Title with Icon */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <FaHotel className="text-2xl text-purple-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                حجوزات الفنادق
              </h2>
              <p className="mt-1 text-sm text-gray-400 md:text-base">
                إدارة ومتابعة جميع حجوزات الفنادق والمنتجعات الفاخرة
              </p>
            </div>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Stats Badge */}
          {/* <div className="hidden px-4 py-2 rounded-xl bg-white/5 border border-purple-500/20 md:flex items-center gap-3">
            <div className="text-center">
              <p className="text-xs text-gray-400">الحجوزات النشطة</p>
              <p className="text-xl font-bold text-white">156</p>
            </div>
            <div className="w-px h-8 bg-purple-500/20"></div>
            <div className="text-center">
              <p className="text-xs text-gray-400">إجمالي الإيرادات</p>
              <p className="text-xl font-bold text-green-400">$42.5k</p>
            </div>
          </div> */}

          {/* Notification Button */}
          {/* <button className="relative p-3 transition-all duration-300 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-105 group">
            <FaBell className="text-gray-400 transition-colors group-hover:text-purple-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse"></span>
          </button> */}

          {/* Report Button */}
          {/* <button className="hidden p-3 transition-all duration-300 rounded-xl sm:flex bg-white/5 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-105 group">
            <FaChartLine className="text-gray-400 transition-colors group-hover:text-purple-400" />
          </button> */}

          {/* Add Hotel Booking Button */}
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95 group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <FaPlusCircle className={`relative z-10 transition-transform duration-300 ${isHovered ? "rotate-90" : ""}`} />
            <span className="relative z-10">حجز فندق جديد</span>
          </button>
        </div>
      </div>

      {/* Animated Gradient Underline */}
      <div className="h-px mt-6 overflow-hidden bg-gradient-to-r from-transparent via-purple-500 to-transparent">
        <div className="w-full h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-slide"></div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        .animate-slide {
          animation: slide 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}