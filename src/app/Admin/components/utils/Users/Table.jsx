"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext, useState } from "react";
import { FaSearch, FaUndoAlt } from "react-icons/fa";

export default function UsersFilter() {
  const { Users } = useContext(Admin);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [activeChip, setActiveChip] = useState("all");

  const resetFilters = () => {
    setSearch("");
    setRole("all");
    setStatus("all");
    setActiveChip("all");
  };

  const chips = [
    { label: "جميع المستخدمين", value: "all" },
    { label: "المديرين", value: "admin" },
    { label: "الوكلاء B2B", value: "b2b" },
    { label: "العملاء B2C", value: "b2c" },
    { label: "نشطون", value: "active" },
    { label: "جدد (هذا الشهر)", value: "new" },
  ];

  return (
    <div
      data-aos="fade-up"
      className="
        rounded-2xl p-4 sm:p-6 mb-8
        bg-white/5 backdrop-blur-md
        border border-white/10
      "
    >
      {/* ===== Filters ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Search */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            بحث
          </label>

          <div className="relative">
            <FaSearch className="absolute right-3 top-3 text-purple-400 text-sm" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="الاسم أو البريد الإلكتروني..."
              className="
                w-full bg-white/5
                border border-purple-500/30
                rounded-xl px-10 py-2.5
                text-white
                focus:outline-none focus:ring-1 focus:ring-purple-500
              "
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            نوع المستخدم
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="
              w-full bg-white/5
              border border-purple-500/30
              rounded-xl px-4 py-2.5
              text-white
              focus:outline-none
            "
          >
            <option value="all">جميع الأنواع</option>
            <option value="admin">مدير</option>
            <option value="b2b">وكيل B2B</option>
            <option value="b2c">عميل B2C</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            الحالة
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              w-full bg-white/5
              border border-purple-500/30
              rounded-xl px-4 py-2.5
              text-white
              focus:outline-none
            "
          >
            <option value="all">الجميع</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="
              w-full bg-white/10
              hover:bg-white/20
              text-white
              py-2.5 rounded-xl
              flex items-center justify-center gap-2
              transition
            "
          >
            <FaUndoAlt />
            إعادة تعيين
          </button>
        </div>
      </div>

      {/* ===== Chips ===== */}
      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-purple-500/20">

        {chips.map((chip) => (
          <span
            key={chip.value}
            onClick={() => setActiveChip(chip.value)}
            className={`
              px-3 py-1 rounded-full text-sm cursor-pointer transition
              ${
                activeChip === chip.value
                  ? "bg-purple-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }
            `}
          >
            {chip.label}
          </span>
        ))}

      </div>
    </div>
  );
}