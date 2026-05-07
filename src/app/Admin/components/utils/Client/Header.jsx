"use client";

import { FaChevronLeft, FaUserPlus } from "react-icons/fa";

export default function AgentsHeader({ openAgentModal }) {
  return (
    <div className="flex flex-col gap-6 mb-8 md:flex-row md:justify-between md:items-center">

      {/* Left Side */}
      <div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
          <a
            href="/Admin"
            className="transition hover:text-purple-400"
          >
            لوحة التحكم
          </a>

          <FaChevronLeft className="text-xs" />

          <span className="text-white">الوكلاء B2B </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
          الوكلاء B2C
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-400 md:text-base">
          إدارة ومتابعة جميع وكلاء السفر وشركات السياحة
        </p>

      </div>

     

    </div>
  );
}