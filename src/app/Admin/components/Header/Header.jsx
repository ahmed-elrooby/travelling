"use client";

import { Auth } from "@/app/Providers/AuthContext/AuthProvider";
import Link from "next/link";
import React, { useState, useEffect, useRef, useContext } from "react";
import { FaBell, FaUser, FaSignOutAlt, FaUserCircle, FaMoon, FaSun, FaSearch } from "react-icons/fa";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [darkMode, setDarkMode] = useState(true);
  const dropdownRef = useRef(null);
  const {profile,handleLogoutFun}=useContext(Auth)
console.log(profile)
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



  return (
    <>
      {/* Add fixed position and higher z-index to the header container if needed */}
      <div
        className={`relative z-50 px-4 md:px-6 py-2 lg:px-8 transform transition-all bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 duration-700 ease-out shadow-lg`}
      >
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-transparent sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text animate-gradient">
              مرحباً، {profile?.name}
            </h2>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              هذا هو ملخص أداء وكالة السفر اليوم
            </p>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className={`flex items-center gap-2 p-1 transition-all duration-300 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 group ${
                  openDropdown ? "border-purple-500 shadow-lg shadow-purple-500/20" : "border-purple-500/20"
                }`}
              >
                <div className="relative">
                  <img
                    src={`https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=${encodeURIComponent(profile?.name)}&size=40&rounded=true&bold=true&length=2`}
                    alt={profile?.name}
                    className="object-cover transition-all w-9 h-9 sm:w-10 sm:h-10 rounded-xl group-hover:ring-purple-500"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="hidden ml-1 text-right md:block">
                  <p className="text-sm font-semibold text-white">{profile?.name}</p>
                  <p className="text-xs text-gray-400">{profile?.email}</p>
                </div>
              </button>

              {/* Dropdown Menu - NOW WITH HIGHER Z-INDEX */}
              {openDropdown && (
                <div className="absolute z-[9999] w-64 mt-2 overflow-hidden border rounded-lg shadow-2xl left-3 bg-gray-900/95 backdrop-blur-xl border-purple-500/20 shadow-purple-500/10 animate-slideDown">
                  
                  {/* User Info */}
                  <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=${encodeURIComponent(profile?.name)}&size=50&rounded=true&bold=true&length=2`}
                        alt={profile?.name}
                        className="w-12 h-12 "
                      />
                      <div>
                        <p className="font-bold text-white">{profile?.name}</p>
                        <p className="text-xs text-gray-400">{profile?.email}</p>
                        <span className="inline-block mt-1 text-[10px] text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full">
                          مدير
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link href="/Admin/ProfilePAge" className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-gray-300 transition-all duration-200 rounded-xl hover:bg-purple-500/10 hover:text-purple-400 group">
                      <FaUserCircle className="text-lg text-purple-400" />
                      <span className="flex-1 text-right">الملف الشخصي</span>
                    </Link>

                    <div className="h-px my-2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>

                    <button
                      onClick={handleLogoutFun}
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