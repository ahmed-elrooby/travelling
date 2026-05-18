"use client";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import React, { useContext, useState, useEffect } from "react";
import { FaUsers, FaChartLine, FaCalendarAlt } from "react-icons/fa";

const Table = () => {
  const { User } = useContext(Admin);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table");
  const [animateItems, setAnimateItems] = useState(false);
  const itemsPerPage = 6;

  // تصفية المستخدمين الذين role = b2c
  const b2cUsers = User?.data?.filter((user) => user.role === "b2c") || [];
  
  const totalPages = Math.ceil(b2cUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = b2cUsers.slice(startIndex, endIndex);

  // تأثير حركة للعناصر
  useEffect(() => {
    setAnimateItems(true);
    const timer = setTimeout(() => setAnimateItems(false), 500);
    return () => clearTimeout(timer);
  }, [currentPage, viewMode]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // إحصائيات
  const activeCount = b2cUsers.filter(u => u.status === "active").length;
  const inactiveCount = b2cUsers.filter(u => u.status !== "active").length;

  return (
    <div className="min-h-screen p-2 md:p-6 lg:p-8 " >
      <div className="mx-auto ">
        
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">
          <div className="p-6 transition-all duration-300 transform border rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border-purple-500/30 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">إجمالي العملاء</p>
                <p className="mt-2 text-3xl font-bold text-white">{b2cUsers.length}</p>
              </div>
              <FaUsers className="text-4xl text-purple-400" />
            </div>
          </div>
          
          <div className="p-6 transition-all duration-300 transform border rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-500/30 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-300">نشطون</p>
                <p className="mt-2 text-3xl font-bold text-white">{activeCount}</p>
              </div>
              <FaChartLine className="text-4xl text-green-400" />
            </div>
          </div>
          
          <div className="p-6 transition-all duration-300 transform border rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-700/20 backdrop-blur-md border-gray-500/30 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">غير نشطون</p>
                <p className="mt-2 text-3xl font-bold text-white">{inactiveCount}</p>
              </div>
              <FaCalendarAlt className="text-4xl text-gray-400" />
            </div>
          </div>
        </div>

        {/* الجدول الرئيسي */}
        <div className="overflow-hidden transition-all duration-300 border rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:shadow-2xl">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text sm:text-3xl">
                  🎯 عملاء B2C
                </h1>
                <p className="mt-1 text-sm text-gray-400">إدارة العملاء والتحكم في حساباتهم</p>
              </div>
              
              {/* Switch View Mode */}
              <div className="flex gap-2 p-1 rounded-lg bg-white/10 backdrop-blur-sm">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    viewMode === "table"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/20"
                  }`}
                >
                  📊 جدول
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/20"
                  }`}
                >
                  🎴 جريد
                </button>
              </div>
            </div>
          </div>

          {/* Table View */}
          {viewMode === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="border-b bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-white/10">
                  <tr>
                    <th className="px-4 py-4 text-sm font-medium text-purple-200 sm:px-6">المعرف</th>
                    <th className="px-4 py-4 text-sm font-medium text-purple-200 sm:px-6">الاسم</th>
                    <th className="px-4 py-4 text-sm font-medium text-purple-200 sm:px-6">البريد الإلكتروني</th>
                    <th className="px-4 py-4 text-sm font-medium text-purple-200 sm:px-6">الدور</th>
                    <th className="px-4 py-4 text-sm font-medium text-purple-200 sm:px-6">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`border-b border-white/5 transition-all duration-300 hover:bg-white/10 ${
                          animateItems ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <td className="px-4 py-4 text-sm text-gray-300 sm:px-6">
                          <span className="font-mono text-xs">{user.id.slice(-8)}</span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-white sm:px-6">{user.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-300 sm:px-6">{user.email}</td>
                        <td className="px-4 py-4 sm:px-6">
                          <span className={`
                            inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                            ${user.role === "b2c" ? "bg-green-500/30 text-green-300 border border-green-500/50" : ""}
                            ${user.role === "admin" ? "bg-red-500/30 text-red-300 border border-red-500/50" : ""}
                            ${user.role === "b2b" ? "bg-blue-500/30 text-blue-300 border border-blue-500/50" : ""}
                          `}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {user.role === "admin" ? "مدير" : user.role === "b2b" ? "وكيل B2B" : "عميل B2C"}
                          </span>
                        </td>
                        <td className="px-4 py-4 sm:px-6">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === "active"
                                ? "bg-green-500/30 text-green-300 border border-green-500/50"
                                : "bg-gray-500/30 text-gray-300 border border-gray-500/50"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}></span>
                            {user.status === "active" ? "نشط" : "غير نشط"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-16 text-center text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-5xl">👥</div>
                          <p>لا يوجد عملاء B2C</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
               </table>
            </div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className={`group p-6 transition-all duration-500 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-purple-500/50 hover:shadow-2xl hover:scale-105 ${
                      animateItems ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 transition rounded-full opacity-50 bg-gradient-to-r from-purple-500 to-pink-500 blur-md group-hover:opacity-100"></div>
                        <div className="relative flex items-center justify-center text-xl font-bold text-white rounded-full shadow-lg w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600">
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-500/30 text-green-300 border border-green-500/50"
                            : "bg-gray-500/30 text-gray-300 border border-gray-500/50"
                        }`}
                      >
                        {user.status === "active" ? "🟢 نشط" : "⚫ غير نشط"}
                      </span>
                    </div>
                    
                    <h3 className="mb-2 text-xl font-bold text-white transition group-hover:text-purple-300">
                      {user.name}
                    </h3>
                    
                    <p className="mb-2 text-sm text-gray-300 break-all">
                      📧 {user.email}
                    </p>
                    
                    <p className="mb-4 font-mono text-xs text-gray-400">
                      🆔 {user.id}
                    </p>
                    
                    <div className="pt-4 mt-2 border-t border-white/10">
                      <span className={`
                        inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full
                        ${user.role === "b2c" ? "bg-green-500/30 text-green-300" : ""}
                        ${user.role === "admin" ? "bg-red-500/30 text-red-300" : ""}
                        ${user.role === "b2b" ? "bg-blue-500/30 text-blue-300" : ""}
                      `}>
                        {user.role === "admin" ? "👑 مدير" : user.role === "b2b" ? "🏢 وكيل B2B" : "👤 عميل B2C"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center text-gray-400 col-span-full">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-5xl">👥</div>
                    <p>لا يوجد عملاء B2C</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {b2cUsers.length > 0 && (
            <div className="p-4 border-t border-white/10 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="order-2 text-sm text-gray-400 sm:order-1">
                  عرض <span className="font-semibold text-white">{startIndex + 1}</span> -{" "}
                  <span className="font-semibold text-white">{Math.min(endIndex, b2cUsers.length)}</span> من{" "}
                  <span className="font-semibold text-white">{b2cUsers.length}</span> مستخدم
                </div>
                
                <div className="flex order-1 gap-2 sm:order-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === 1
                        ? "bg-white/5 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    → السابق
                  </button>
                  
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, idx) => {
                      const pageNum = idx + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                              currentPage === pageNum
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-110"
                                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        (pageNum === currentPage - 2 && currentPage > 3) ||
                        (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                      ) {
                        return <span key={pageNum} className="w-10 h-10 leading-10 text-center text-gray-400">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === totalPages
                        ? "bg-white/5 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    التالي ←
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;