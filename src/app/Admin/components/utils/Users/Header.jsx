"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext } from "react";
import { FaChevronLeft, FaUserPlus } from "react-icons/fa";
import AddUser from "./AddUser";

export default function UsersHeader() {
  const {setOpenUser,openUser}=useContext(Admin)
  return <>
  {
    openUser && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <AddUser/>
      </div>
    )
  }
   <div className="mb-8" data-aos="fade-down">
      
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">

        {/* Left Side */}
        <div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
            <a
              href="/Admin"
              className="transition hover:text-purple-400"
            >
              لوحة التحكم
            </a>

            <FaChevronLeft className="text-xs" />

            <span className="text-white">المستخدمين</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
            جميع المستخدمين
          </h2>

          {/* Description */}
          <p className="mt-2 text-sm text-gray-400 md:text-base">
            إدارة ومتابعة جميع حسابات المستخدمين والوكلاء والعملاء
          </p>

        </div>

        {/* Button */}
        <button
          onClick={()=>{
            setOpenUser(true)
          }}
          className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg"
        >
          <FaUserPlus />
          مستخدم جديد
        </button>

      </div>
    </div>
  </>
   

}