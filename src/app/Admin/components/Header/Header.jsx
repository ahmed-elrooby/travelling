"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaUser, FaSignOutAlt, FaUserCircle, FaMoon, FaSun, FaSearch } from "react-icons/fa";

const Header = ({ userName = "أحمد", userEmail = "admin@travel.com" }) => {
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [darkMode, setDarkMode] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  const handleNotificationClick = () => {
    setNotifications(0);
    // Add notification logic here
    console.log("Opening notifications...");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add dark mode logic here
  };

  return (
    <>
      <div
        className={` px-4 md:px-6 py-2 lg:px-8 transform transition-all  bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800
 duration-700 ease-out  shadow-lg `}
      >
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          
    

          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-transparent sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text animate-gradient">
              مرحباً، {userName}
            </h2>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              هذا هو ملخص أداء وكالة السفر اليوم
            </p>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            
        

      

            {/* Notifications */}
            <button
              onClick={handleNotificationClick}
              className="relative flex items-center justify-center transition-all duration-300 border w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-110 group"
            >
              <FaBell className="text-sm text-gray-400 transition-colors group-hover:text-purple-400 sm:text-base" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse ring-2 ring-gray-900">
                  {notifications > 9 ? "9+" : notifications}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div  ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className={`flex items-center gap-2 p-1 transition-all duration-300 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 group ${
                  openDropdown ? "border-purple-500 shadow-lg shadow-purple-500/20" : "border-purple-500/20"
                }`}
              >
                <div className="relative">
                  <img
                    src={`https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=${encodeURIComponent(userName)}&size=40&rounded=true&bold=true&length=2`}
                    alt={userName}
                    className="object-cover transition-all w-9 h-9 sm:w-10 sm:h-10 rounded-xl group-hover:ring-purple-500"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="hidden ml-1 text-right md:block">
                  <p className="text-sm font-semibold text-white">{userName}</p>
                  <p className="text-xs text-gray-400">{userEmail}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {openDropdown && (
                <div className="absolute left-0 z-50 w-64 mt-2 overflow-hidden border shadow-2xl rounded-2xl bg-gray-900/95 backdrop-blur-xl border-purple-500/20 shadow-purple-500/10 animate-slideDown">
                  
                  {/* User Info */}
                  <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=${encodeURIComponent(userName)}&size=50&rounded=true&bold=true&length=2`}
                        alt={userName}
                        className="w-12 h-12 rounded-xl ring-2 ring-purple-500"
                      />
                      <div>
                        <p className="font-bold text-white">{userName}</p>
                        <p className="text-xs text-gray-400">{userEmail}</p>
                        <span className="inline-block mt-1 text-[10px] text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full">
                          مدير
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-gray-300 transition-all duration-200 rounded-xl hover:bg-purple-500/10 hover:text-purple-400 group">
                      <FaUserCircle className="text-lg text-purple-400" />
                      <span className="flex-1 text-right">الملف الشخصي</span>
                    </button>

                    <button className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-gray-300 transition-all duration-200 rounded-xl hover:bg-purple-500/10 hover:text-purple-400 group">
                      <FaBell className="text-lg text-gray-400 group-hover:text-purple-400" />
                      <span className="flex-1 text-right">الإشعارات</span>
                      {notifications > 0 && (
                        <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-full">
                          {notifications}
                        </span>
                      )}
                    </button>

                    <div className="h-px my-2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-red-400 transition-all duration-200 rounded-xl hover:bg-red-500/10 group"
                    >
                      <FaSignOutAlt className="text-lg text-red-400" />
                      <span className="flex-1 text-right">تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Header;