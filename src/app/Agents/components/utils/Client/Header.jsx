import React from 'react'
import { FiHome, FiChevronLeft, FiUserPlus } from 'react-icons/fi'

const Header = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
          <FiHome className="text-purple-400" />
          <span>الرئيسية</span>
          <FiChevronLeft className="text-xs" />
          <span className="font-semibold text-white">قاعدة العملاء</span>
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
          قائمة العملاء
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          إدارة بيانات العملاء، تتبع الحجوزات، وتصنيف العملاء المميزين.
        </p>
      </div>
      <button
        className="btn-gradient-premium text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg"
      >
        <FiUserPlus /> <span>عميل جديد</span>
      </button>
    </div>
  )
}

export default Header