"use client";

import { FaChevronLeft, FaPlusCircle } from "react-icons/fa";

export default function CarRentalHeader() {
  return (
    <div className="mb-8" data-aos="fade-down">
      <div className="flex justify-between items-center">

        {/* Left Content */}
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <a href="#" className="hover:text-purple-400 transition">
              لوحة التحكم
            </a>

            <FaChevronLeft className="text-xs" />

            <span className="text-white">السيارات والتأجير</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            السيارات والتأجير
          </h2>

          <p className="text-gray-400 mt-2">
            إدارة ومتابعة جميع حجوزات تأجير السيارات
          </p>
        </div>

        {/* Button */}
        <button
          className="text-white px-5 py-2.5 rounded-xl flex items-center gap-2
          bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
        >
          <FaPlusCircle />
          حجز سيارة جديد
        </button>
      </div>
    </div>
  );
}