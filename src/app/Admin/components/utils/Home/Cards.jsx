"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import React, { useContext } from "react";
import {
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiBriefcase,
  FiArrowUp,
} from "react-icons/fi";

const Cards = () => {
  const { overview } = useContext(Admin);

  const kpis = overview?.data?.kpis;

  if (!kpis) return null;

  const stats = [
    {
      title: "إجمالي الحجوزات",
      value: kpis?.totalBookings?.total,
      change: kpis?.totalBookings?.delta,
      icon: FiCalendar,
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20",
    },
    {
      title: "إجمالي الأرباح",
      value: kpis?.totalProfit?.formatted,
      change: kpis?.totalProfit?.delta,
      icon: FiDollarSign,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
      borderColor: "border-green-500/20",
    },
    {
      title: "العملاء B2C",
      value: kpis?.b2cCustomers?.total,
      change: kpis?.b2cCustomers?.delta,
      icon: FiUsers,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
    },
    {
      title: "الوكلاء B2B",
      value: kpis?.b2bAgencies?.total,
      change: kpis?.b2bAgencies?.delta,
      icon: FiBriefcase,
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
      borderColor: "border-yellow-500/20",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative p-4 overflow-hidden transition-all duration-300 border sm:p-5 md:p-6 bg-slate-900/60 backdrop-blur-sm border-white/5 rounded-2xl hover:-translate-y-1 hover:border-white/10 hover:shadow-xl hover:shadow-purple-500/10"
        >
          {/* Hover BG */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 hover:opacity-100 transition-opacity duration-500`}
          />

          <div className="relative z-10 flex flex-col gap-4">
            {/* Top */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-gray-400 sm:text-sm">
                  {stat.title}
                </p>

                <p className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  {stat.value}
                </p>

                <p className="flex items-center gap-1 text-[11px] sm:text-xs text-green-400">
                  <FiArrowUp className="w-3 h-3" />
                  {stat.change}
                </p>
              </div>

              <div
                className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${stat.gradient} border ${stat.borderColor}`}
              >
                <stat.icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.iconColor}`}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;