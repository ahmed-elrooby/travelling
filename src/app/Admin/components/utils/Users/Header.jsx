"use client";

import { FaChevronLeft, FaUserPlus } from "react-icons/fa";

export default function UsersHeader({ openUserModal }) {
  return (
    <div className="mb-8" data-aos="fade-down">
      
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">

        {/* Left Side */}
        <div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <a
              href="#"
              className="hover:text-purple-400 transition"
            >
              لوحة التحكم
            </a>

            <FaChevronLeft className="text-xs" />

            <span className="text-white">المستخدمين</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            جميع المستخدمين
          </h2>

          {/* Description */}
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            إدارة ومتابعة جميع حسابات المستخدمين والوكلاء والعملاء
          </p>

        </div>

        {/* Button */}
        <button
          onClick={openUserModal}
          className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg"
        >
          <FaUserPlus />
          مستخدم جديد
        </button>

      </div>
    </div>
  );
}