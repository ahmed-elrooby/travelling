"use client"
import { Auth } from "@/app/Providers/AuthContext/AuthProvider"
import Link from "next/link"
import React, { useContext, useState, useRef, useEffect } from "react"
import { FaHome, FaChevronLeft, FaBell, FaCog, FaUserCircle, FaSignOutAlt, FaUser, FaTachometerAlt } from "react-icons/fa"

const Header = () => {
  const [openUser, setOpenUser] = useState(false)
  const [openNotif, setOpenNotif] = useState(false)
  const { profile, handleLogoutFun } = useContext(Auth)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenUser(false)
        setOpenNotif(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "صباح الخير"
    if (hour < 18) return "مساء الخير"
    return "مساء النور"
  }

  return (
    <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left Section - Welcome Message */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
          <h2 className="text-2xl font-bold text-transparent md:text-3xl lg:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
            {getGreeting()}، {profile?.name || "عميلنا العزيز"}
          </h2>
        </div>
        
        <p className="flex items-center gap-2 text-sm text-gray-400 md:text-base">
          <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          مرحباً بعودتك! هذا ملخص أداء حسابك اليوم
        </p>
      </div>

      {/* Right Section - Actions */}
      <div className="relative flex items-center gap-3">
        {/* Dashboard Link (Optional) */}
     

      

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setOpenUser(!openUser)
              setOpenNotif(false)
            }}
            className="flex items-center gap-3 p-2 transition-all duration-300 border rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 hover:scale-105 border-purple-500/20 hover:border-purple-500/40"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <FaUserCircle className="text-xl text-white" />
            </div>
            <div className="hidden text-right md:block">
              <p className="text-sm font-medium text-white">{profile?.name?.split(' ')[0] || "عميل"}</p>
              <p className="text-xs text-gray-400">عميل B2C</p>
            </div>
          </button>

          {/* User Dropdown Menu */}
          {openUser && (
            <div className="absolute left-0 mt-3 w-64 bg-[#1a1f2e] border border-purple-500/20 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-sm">
              {/* User Info Header */}
              <div className="p-4 text-center border-b border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-transparent">
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <FaUserCircle className="text-4xl text-white" />
                </div>
                <h4 className="mt-2 font-bold text-white">{profile?.name || "عميل"}</h4>
                <p className="text-xs text-gray-400">{profile?.email || "example@mail.com"}</p>
                <div className="flex justify-center gap-2 mt-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    نشط
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    عميل
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <Link 
                  href="/Client/ProfilePage" 
                  className="flex items-center gap-3 p-3 text-sm text-gray-300 transition-all duration-200 rounded-lg hover:bg-purple-500/10 hover:text-purple-400 group"
                  onClick={() => setOpenUser(false)}
                >
                  <FaUser className="text-gray-400 group-hover:text-purple-400" />
                  الملف الشخصي
                </Link>
                
            

                <div className="h-px my-2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                
                <button 
                  onClick={() => {
                    handleLogoutFun()
                    setOpenUser(false)
                  }} 
                  className="flex items-center w-full gap-3 p-3 text-sm text-red-400 transition-all duration-200 rounded-lg hover:bg-red-500/10 group"
                >
                  <FaSignOutAlt className="text-red-400 group-hover:text-red-300" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header