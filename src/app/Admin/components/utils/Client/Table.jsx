"use client";

import { Admin } from '@/app/Providers/AdminContext/AdminProvider';
import React, { useContext, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { CgLayoutGrid } from 'react-icons/cg';
import { CiViewTable } from 'react-icons/ci';

const Table = () => {
  const { B2C } = useContext(Admin);
  console.log(B2C)
  const [viewMode, setViewMode] = useState('grid');

  const kpis = B2C?.data?.kpis || {
    totalCustomers: 0,
    totalValue: 0,
    newThisMonth: 0,
    avgSpend: 0,
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Format number
  const formatNumber = (value) => {
    return new Intl.NumberFormat('ar-EG').format(value);
  };

  // بيانات الجدول
  const kpisData = [
    { label: 'إجمالي العملاء', value: formatNumber(kpis.totalCustomers), icon: '👥', color: 'from-blue-500 to-blue-600' },
    { label: 'إجمالي المبيعات', value: formatCurrency(kpis.totalValue), icon: '💰', color: 'from-green-500 to-green-600' },
    { label: 'عملاء جدد هذا الشهر', value: formatNumber(kpis.newThisMonth), icon: '🆕', color: 'from-purple-500 to-purple-600' },
    { label: 'متوسط الإنفاق', value: formatCurrency(kpis.avgSpend), icon: '📊', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header مع أزرار التبديل */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">لوحة المؤشرات الرئيسية</h2>
        <div className="flex gap-2 p-1 bg-white/10 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <CgLayoutGrid size={18} />
            <span>شبكة</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              viewMode === 'table'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <CiViewTable  size={18} />
            <span>جدول</span>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpisData.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative p-6 transition-all duration-300 border rounded-2xl bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-2 text-sm text-gray-400">{item.label}</p>
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                  </div>
                  <div className="text-3xl">{item.icon}</div>
                </div>
                <div className="w-full h-1 mt-4 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-hidden border rounded-2xl bg-white/5 backdrop-blur-md border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 font-semibold text-right text-gray-300">#</th>
                  <th className="p-4 font-semibold text-right text-gray-300">المؤشر</th>
                  <th className="p-4 font-semibold text-right text-gray-300">القيمة</th>
                  <th className="p-4 font-semibold text-right text-gray-300">الأيقونة</th>
                </tr>
              </thead>
              <tbody>
                {kpisData.map((item, index) => (
                  <tr
                    key={index}
                    className="transition-colors duration-200 border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="p-4 text-gray-400">{index + 1}</td>
                    <td className="p-4 font-medium text-white">{item.label}</td>
                    <td className="p-4 text-white">
                      <span className="px-2 py-1 text-sm rounded-lg bg-white/10">
                        {item.value}
                      </span>
                    </td>
                    <td className="p-4 text-2xl">{item.icon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer with pagination example */}
          <div className="flex items-center justify-between p-4 border-t border-white/10">
            <p className="text-sm text-gray-400">
              عرض 4 من أصل {kpisData.length} مؤشر
            </p>
            <div className="flex gap-2">
              <button className="p-2 transition-colors rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50" disabled>
                <BiChevronRight size={18} className="text-white" />
              </button>
              <button className="px-3 py-1 text-white rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                1
              </button>
              <button className="p-2 transition-colors rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50" disabled>
                <BiChevronLeft size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* معلومات إضافية عن البيانات */}
      <div className="p-4 border rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border-white/10">
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>📅 آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</span>
          <span>📊 إجمالي العملاء: {formatNumber(kpis.totalCustomers)}</span>
          <span>💰 إجمالي المبيعات: {formatCurrency(kpis.totalValue)}</span>
        </div>
      </div>
    </div>
  );
};

export default Table;