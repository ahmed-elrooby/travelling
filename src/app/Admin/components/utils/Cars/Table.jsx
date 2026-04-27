"use client";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCalendarCheck,
  FaSearch,
} from "react-icons/fa";

export default function CarRentalSearchFilter() {
  return (
    <div
      className="rounded-2xl p-6 mb-8 bg-white/5 backdrop-blur-md border border-white/10"
      data-aos="fade-up"
    >
      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* Pickup Location */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            موقع الاستلام
          </label>

          <div className="relative">
            <FaMapMarkerAlt className="absolute right-3 top-3 text-blue-400 text-sm" />

            <input
              type="text"
              placeholder="المدينة أو المطار"
              className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Pickup Date */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            تاريخ الاستلام
          </label>

          <div className="relative">
            <FaCalendarAlt className="absolute right-3 top-3 text-purple-400 text-sm" />

            <input
              type="date"
              className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            تاريخ الإعادة
          </label>

          <div className="relative">
            <FaCalendarCheck className="absolute right-3 top-3 text-purple-400 text-sm" />

            <input
              type="date"
              className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Car Type */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            نوع السيارة
          </label>

          <select className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2.5 text-white">
            <option>جميع الفئات</option>
            <option>اقتصادية</option>
            <option>سيدان</option>
            <option>SUV / دفع رباعي</option>
            <option>فاخرة</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            className="w-full text-white py-2.5 rounded-xl flex items-center justify-center gap-2
            bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            <FaSearch />
            بحث
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mt-5 pt-3 border-t border-purple-500/20">
        {[
          "جميع السيارات",
          "دفع فوري",
          "سائق خاص",
          "توصيل مجاني",
          "تأمين شامل",
          "سيارات فاخرة",
        ].map((item, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 rounded-full text-sm cursor-pointer transition
              ${
                idx === 0
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}