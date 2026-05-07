import React from 'react'
import Link from 'next/link'
import { FiChevronLeft, FiUserPlus, FiBriefcase } from 'react-icons/fi'

const Header = () => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col items-start justify-between gap-4 p-6 border md:flex-row md:items-center bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-transparent backdrop-blur-sm rounded-2xl border-white/5">
        <div className="space-y-2">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link 
              href="/Admin" 
              className="transition-colors duration-200 hover:text-purple-400"
            >
              لوحة التحكم
            </Link>
            <FiChevronLeft className="text-xs rotate-180" />
            <span className="text-white/80">الوكلاء B2B</span>
          </div>
          
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="p-3 border bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border-yellow-500/30">
              <FiBriefcase className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
              الوكلاء B2B
            </h2>
          </div>
          
          {/* Description */}
          <p className="mt-2 text-sm text-gray-400 md:text-base">
            إدارة ومتابعة جميع وكلاء السفر وشركات السياحة
          </p>
        </div>

        {/* Action Button */}
      
      </div>
    </div>
  )
}

export default Header
