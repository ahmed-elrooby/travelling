"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaHome, 
  FaChevronLeft, 
  FaBell, 
  FaCog,
  FaSearch,
  FaUser,
  FaMoon,
  FaSun,
  FaSignOutAlt
} from 'react-icons/fa';

const Header = ({ 
  title = "حجوزاتي", 
  subtitle = "جميع حجوزات الرحلات والفنادق والسيارات في مكان واحد",
  userName = "محمد علي",
  userAvatar = "https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=Mohamed&size=32&rounded=true&bold=true"
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, message: "تم تأكيد حجز رحلتك إلى دبي", time: "منذ 5 دقائق", read: false },
    { id: 2, message: "عرض خاص على الفنادق الفاخرة", time: "منذ ساعة", read: false },
    { id: 3, message: "تذكير: رحلتك بعد غد", time: "منذ 3 ساعات", read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        {/* Left side - Title and Breadcrumb */}
        <div>
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-400">
            <Link href="/dashboard" className="transition-colors hover:text-purple-400">
              <FaHome className="text-purple-400" />
            </Link>
            <span>الرئيسية</span>
            <FaChevronLeft className="text-xs" />
            <span className="text-white">حجوزاتي</span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-transparent sm:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text animate-gradient">
            {title}
          </h2>
          
          {/* Subtitle */}
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            {subtitle}
          </p>
        </div>
        
        {/* Right side - Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
        
          
      
          
        
          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 transition-all duration-300 border rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:border-purple-500 border-purple-500/20 hover:scale-105 group"
            >
              <img 
                src={userAvatar} 
                alt={userName}
                className="w-8 h-8 rounded-full ring-2 ring-purple-500"
              />
              <span className="hidden text-sm text-white sm:inline">{userName}</span>
            </button>
            
            {/* User Menu Dropdown */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute left-0 z-50 w-64 mt-2 overflow-hidden bg-gray-800 border shadow-2xl rounded-xl border-purple-500/20">
                  <div className="p-4 border-b border-purple-500/20">
                    <div className="flex items-center gap-3">
                      <img src={userAvatar} alt={userName} className="w-12 h-12 rounded-full ring-2 ring-purple-500" />
                      <div>
                        <p className="font-bold text-white">{userName}</p>
                        <p className="text-xs text-gray-400">عميل B2C</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-700/50 hover:text-white">
                      <FaUser className="text-sm" />
                      <span>ملفي الشخصي</span>
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-700/50 hover:text-white">
                      <FaCog className="text-sm" />
                      <span>الإعدادات</span>
                    </Link>
                    <hr className="my-2 border-gray-700" />
                    <button className="flex items-center w-full gap-3 px-4 py-2 text-red-400 transition-colors hover:bg-red-500/10">
                      <FaSignOutAlt className="text-sm" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <style jsx>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-gradient {
            background-size: 200% auto;
            animation: gradient 3s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Header;