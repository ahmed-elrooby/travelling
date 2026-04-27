"use client";

import { FaSearch, FaUndoAlt } from "react-icons/fa";

export default function UsersFilter() {
  return (
    <div
      data-aos="fade-up"
      className="rounded-2xl p-6 mb-8 bg-white/5 backdrop-blur-md border border-white/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">بحث</label>

          <div className="relative">
            <FaSearch className="absolute right-3 top-3 text-purple-400 text-sm" />

            <input
              type="text"
              placeholder="الاسم أو البريد الإلكتروني..."
              className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            نوع المستخدم
          </label>

          <select className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none">
            <option value="all">جميع الأنواع</option>
            <option value="admin">مدير</option>
            <option value="b2b">وكيل B2B</option>
            <option value="b2c">عميل B2C</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">الحالة</label>

          <select className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none">
            <option value="all">الجميع</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition">
            <FaUndoAlt />
            إعادة تعيين
          </button>
        </div>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mt-5 pt-3 border-t border-purple-500/20">

        <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-white cursor-pointer">
          جميع المستخدمين
        </span>

        <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300 cursor-pointer">
          المديرين
        </span>

        <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300 cursor-pointer">
          الوكلاء B2B
        </span>

        <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300 cursor-pointer">
          العملاء B2C
        </span>

        <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300 cursor-pointer">
          نشطون
        </span>

        <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300 cursor-pointer">
          جدد (هذا الشهر)
        </span>

      </div>
    </div>
  );
}