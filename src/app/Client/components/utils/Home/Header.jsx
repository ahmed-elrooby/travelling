"use client"
import React, { useState } from "react"
import { FaHome, FaChevronLeft, FaBell, FaCog, FaUserCircle } from "react-icons/fa"

const Header = () => {
  const [openNotif, setOpenNotif] = useState(false)
  const [openUser, setOpenUser] = useState(false)

  return (
    <div className="relative flex items-center justify-between">
      {/* Left Section */}
      <div>
        

        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
          مرحباً، فيصل
        </h2>

        <p className="mt-2 text-gray-400">
          مرحباً بعودتك! هذا ملخص أداء وكالتك اليوم
        </p>
      </div>

      {/* Right Section */}
      <div className="relative flex items-center gap-3">

        {/* Notification */}
        <div className="relative">
          <div
            onClick={() => {
              setOpenNotif(!openNotif)
              setOpenUser(false)
            }}
            className="relative flex items-center justify-center w-10 h-10 transition rounded-full cursor-pointer bg-white/5 hover:bg-white/10"
          >
            <FaBell className="text-gray-300 hover:text-purple-400" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-[10px] text-white flex items-center justify-center">
              5
            </span>
          </div>

          {openNotif && (
            <div className="absolute left-0 mt-3 w-64 bg-[#111827] border border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="p-3 font-semibold text-white border-b border-white/10">
                الإشعارات
              </div>

              <div className="p-3 text-sm text-gray-300 cursor-pointer hover:bg-white/5">
                لديك حجز جديد
              </div>
              <div className="p-3 text-sm text-gray-300 cursor-pointer hover:bg-white/5">
                تم تأكيد الدفع
              </div>
              <div className="p-3 text-sm text-gray-300 cursor-pointer hover:bg-white/5">
                رسالة جديدة من العميل
              </div>
            </div>
          )}
        </div>

    

        {/* User Dropdown */}
        <div className="relative">
          <div
            onClick={() => {
              setOpenUser(!openUser)
              setOpenNotif(false)
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-gradient-to-br from-purple-500 to-pink-500"
          >
            <FaUserCircle className="text-xl text-white" />
          </div>

          {openUser && (
            <div className="absolute left-0 mt-3 w-48 bg-[#111827] border border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="p-3 text-white border-b border-white/10">
                فيصل أحمد
              </div>

              <div className="p-3 text-sm text-gray-300 cursor-pointer hover:bg-white/5">
                الملف الشخصي
              </div>
              <div className="p-3 text-sm text-gray-300 cursor-pointer hover:bg-white/5">
                الإعدادات
              </div>
              <div className="p-3 text-sm text-red-400 cursor-pointer hover:bg-white/5">
                تسجيل الخروج
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Header