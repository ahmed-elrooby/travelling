"use client"
import React, { useContext } from 'react'
import { FiHome, FiChevronLeft, FiPlusCircle } from 'react-icons/fi'
import { Agent } from '@/app/Providers/AgentContext/AgentProvider';
import AddCarBooking from './AddCars';

const Header = () => {
  const {openAddCar,setOpenAddCar} =useContext(Agent);
  return <>
 {
  openAddCar && <AddCarBooking/>
 }
  <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
          <FiHome className="text-purple-400" />
          <span>الرئيسية</span>
          <FiChevronLeft className="text-xs" />
          <span className="font-semibold text-white">السيارات والتأجير</span>
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
          السيارات والتأجير
        </h2>
        <p className="mt-1 text-sm text-gray-400">إدارة حجوزات تأجير السيارات، العروض والعمولات.</p>
      </div>
           <button onClick={()=>setOpenAddCar(true)}
            className="relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] text-white px-5 py-2.5 rounded-xl flex items-center gap-2">
        <FiPlusCircle /> <span>حجز سيارة جديد</span>
      </button>
    </div>
  </>
    
}

export default Header


