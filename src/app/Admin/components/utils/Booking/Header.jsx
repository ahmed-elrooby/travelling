"use client"
import React, { useContext } from 'react'
import Link from 'next/link'
import { FiChevronsLeft, FiPlusCircle } from 'react-icons/fi'
import { FaChevronLeft, FaPlane } from 'react-icons/fa'
import { Admin } from '@/app/Providers/AdminContext/AdminProvider'
import AddBooking from './AddBooking'

const Header = () => {
   const {setOpenAddFlight,openAddFlight}=useContext(Admin)
   console.log(openAddFlight)
  return <>
  {openAddFlight && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <AddBooking />
  </div>
)}
      <div className="flex flex-col items-start justify-between gap-4 p-6 border md:flex-row md:items-center bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-transparent backdrop-blur-sm rounded-2xl border-white/5">
      <div className="space-y-2">
        {/* Breadcrumb */}
         <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-gray-400">
            <Link href="/Admin" className="transition-all duration-300 hover:text-purple-400 hover:translate-x-0.5">
              الرئيسية
            </Link>
            <FaChevronLeft className="text-xs text-gray-500" />
            <Link href="/Admin/BookingPage" className="transition-all duration-300 hover:text-purple-400 hover:translate-x-0.5">
              الحجوزات
            </Link>
            <FaChevronLeft className="text-xs text-gray-500" />
            <span className="font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
             الطيران
            </span>
          </div>
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-3 border bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border-purple-500/30">
            <FaPlane className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
            حجوزات الطيران
          </h2>
        </div>
        
        {/* Description */}
        <p className="mt-2 text-sm text-gray-400 md:text-base">
          إدارة ومتابعة جميع حجوزات رحلات الطيران
        </p>
      </div>

      {/* Action Button */}
      <button onClick={()=>{
        console.log("clicked")
setOpenAddFlight(true)
      }} className="relative px-6 py-3 overflow-hidden font-medium text-white transition-all duration-300 group bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105">
        <span className="relative z-10 flex items-center gap-2">
          <FiPlusCircle className="w-5 h-5 group-hover:animate-bounce" />
          حجز جديد
        </span>
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:opacity-100" />
      </button>
    </div>
  </>

 
}

export default Header
