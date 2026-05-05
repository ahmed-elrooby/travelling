import React from 'react'
import { FiHome, FiChevronLeft, FiPlusCircle } from 'react-icons/fi'
import { FaHotel } from 'react-icons/fa'

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
          <FiHome className="text-purple-400" />
          <span>الرئيسية</span>
          <FiChevronLeft className="text-xs" />
          <span>الحجوزات</span>
          <FiChevronLeft className="text-xs" />
          <span className="text-white">حجوزات الفنادق</span>
        </div>
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text neon-text">
          حجوزات الفنادق
        </h2>
        <p className="mt-2 text-gray-400">إدارة ومتابعة جميع حجوزات الفنادق والمنتجعات لعملائك</p>
      </div>
      <button className="relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] text-white px-5 py-2.5 rounded-xl flex items-center gap-2">
        <FiPlusCircle />
        حجز فندق جديد
      </button>
    </div>
  )
}

export default Header
