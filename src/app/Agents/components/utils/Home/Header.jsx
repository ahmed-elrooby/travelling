"use client"
import { Auth } from "@/app/Providers/AuthContext/AuthProvider"
import Link from "next/link"
import React, { useContext, useState, useRef, useEffect } from "react"
import { FaHome, FaChevronLeft, FaBell, FaCog, FaUserCircle, FaSignOutAlt, FaUser, FaMoon, FaSun } from "react-icons/fa"

const Header = () => {
  const [openNotif, setOpenNotif] = useState(false)
  const [openUser, setOpenUser] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { handleLogoutFun, profile } = useContext(Auth)
  
  const userMenuRef = useRef(null)
  const notifMenuRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setOpenUser(false)
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target)) {
        setOpenNotif(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sample notifications
  const notifications = [
    { id: 1, title: "عقد جديد", message: "تم إضافة عقد جديد للعميل أحمد", time: "منذ 5 دقائق", read: false },
    { id: 2, title: "تحديث النظام", message: "تم تحديث النظام إلى الإصدار الجديد", time: "منذ ساعة", read: true },
    { id: 3, title: "تذكير", message: "لديك اجتماع بعد ساعة", time: "منذ ساعتين", read: false },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative flex flex-col gap-4 p-4 border border-gray-700 shadow-xl md:flex-row md:items-center md:justify-between md:p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl">
      
      {/* Left Section */}
      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <FaHome className="text-purple-400 transition-colors hover:text-purple-300" />
          <Link href="/" className="text-gray-400 transition-colors hover:text-gray-300">
            الرئيسية
          </Link>
          <FaChevronLeft className="text-xs text-gray-500" />
          <span className="font-medium text-gray-300">لوحة التحكم</span>
        </div>

        {/* Greeting */}
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-transparent md:text-4xl lg:text-5xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text animate-gradient">
            مرحباً، {profile?.name || 'الزائر'}
          </h2>
          <p className="text-sm text-gray-400 md:text-base">
            مرحباً بعودتك! هذا ملخص أداء وكالتك اليوم
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        
   

  

     

        {/* User Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setOpenUser(!openUser)
              setOpenNotif(false)
            }}
            className="flex items-center gap-3 px-3 py-2 transition-all duration-300 border border-gray-600 rounded-full bg-gray-800/50 backdrop-blur-sm hover:border-purple-500 group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <FaUserCircle className="text-xl text-white" />
            </div>
            <div className="hidden text-right md:block">
              <p className="text-sm font-medium text-white">{profile?.name?.split(' ')[0] || 'مستخدم'}</p>
              <p className="text-xs text-gray-400">وكيل عقاري</p>
            </div>
          </button>

          {openUser && (
            <div className="absolute left-0 z-50 w-64 mt-3 overflow-hidden bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl animate-slideDown">
              <div className="p-4 text-center bg-gradient-to-r from-purple-600 to-pink-600">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-2 rounded-full bg-white/20">
                  <FaUserCircle className="text-4xl text-white" />
                </div>
                <h4 className="font-bold text-white">{profile?.name}</h4>
                <p className="text-xs text-gray-200">{profile?.email || 'agent@example.com'}</p>
              </div>

              <div className="p-2">
                <Link
                  href="/Agents/ProfilePage"
                  className="flex items-center w-full gap-3 p-3 text-gray-300 transition-all duration-200 rounded-xl hover:bg-purple-600/20 hover:text-purple-400 group"
                >
                  <FaUser className="text-lg transition-transform group-hover:scale-110" />
                  <span>الملف الشخصي</span>
                </Link>

             

                <div className="my-2 border-t border-gray-700"></div>

                <button
                  onClick={handleLogoutFun}
                  className="flex items-center w-full gap-3 p-3 text-red-400 transition-all duration-200 rounded-xl hover:bg-red-600/20 group"
                >
                  <FaSignOutAlt className="text-lg transition-transform group-hover:translate-x-1" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Header