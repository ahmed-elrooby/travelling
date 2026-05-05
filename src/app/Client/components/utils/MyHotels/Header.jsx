"use client";

import React from 'react';
import Link from 'next/link';
import { FaHome, FaChevronLeft, FaBell, FaCog, FaSearch } from 'react-icons/fa';

const Header = ({ 
  title = "فنادقي", 
  subtitle = "إدارة ومتابعة جميع حجوزات الفنادق والمنتجعات",
  notificationCount = 3
}) => {
  return (
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
          <span className="text-white">فنادقي</span>
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
      <div className="flex gap-3">
        {/* Search Button */}
        <div className="relative group">
          <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 border cursor-pointer rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:border-purple-500 border-purple-500/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/20">
            <FaSearch className="text-lg text-gray-400 transition-colors group-hover:text-purple-400" />
          </div>
        </div>
        
        {/* Notification Button */}
        <div className="relative group">
          <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 border cursor-pointer rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:border-purple-500 border-purple-500/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/20">
            <FaBell className="text-lg text-gray-400 transition-colors group-hover:text-purple-400" />
          </div>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-[10px] text-white flex items-center justify-center px-1 animate-pulse">
              {notificationCount}
            </span>
          )}
        </div>
        
        {/* Settings Button */}
        <Link href="/dashboard/settings">
          <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 border cursor-pointer rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:border-purple-500 border-purple-500/20 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 group">
            <FaCog className="text-lg text-gray-400 transition-colors duration-300 group-hover:text-purple-400 group-hover:rotate-90" />
          </div>
        </Link>
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
  );
};

export default Header;