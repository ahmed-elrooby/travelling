import React from 'react'
import { FaHome, FaChevronLeft, FaPlusCircle } from 'react-icons/fa'

const Header = ({ 
    title = "حجوزات الطيران", 
    subtitle = "إدارة ومتابعة جميع حجوزات رحلات الطيران لعملائك",
    onAddBooking 
}) => {
    
    return (
        <div className="mb-8 " >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Left Section */}
                <div>
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-gray-400">
                        <FaHome className="text-purple-400" />
                        <span>الرئيسية</span>
                        <FaChevronLeft className="text-xs text-gray-600" />
                        <span>الحجوزات</span>
                        <FaChevronLeft className="text-xs text-gray-600" />
                        <span className="font-medium text-white">{title}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
                        {title}
                    </h2>
                    
                    {/* Subtitle */}
                    <p className="mt-2 text-sm text-gray-400 md:text-base">
                        {subtitle}
                    </p>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                    <button 
                        onClick={onAddBooking}
                        className="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/25"
                    >
                        <FaPlusCircle className="text-lg" />
                        <span>حجز جديد</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header