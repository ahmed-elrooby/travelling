"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext } from "react";
import {
  FaCarSide,
  FaDollarSign,
  FaCalendarWeek,
  FaBuilding,
} from "react-icons/fa";

export default function CarRentalStats() {
  const { Cars } = useContext(Admin);

  const kpis = Cars?.data?.kpis || {};

  const stats = [
    {
      title: "إجمالي حجوزات السيارات",
      value: kpis.totalCarBookings || 0,
      icon: <FaCarSide />,
      color: "blue",
    },
    {
      title: "إيرادات التأجير",
      value: `${kpis.carRevenue || 0}$`,
      icon: <FaDollarSign />,
      color: "green",
    },
    {
      title: "متوسط مدة الإيجار",
      value: `${kpis.avgRentalDays || 0} يوم`,
      icon: <FaCalendarWeek />,
      color: "yellow",
    },
    {
      title: "شركات التأجير",
      value: kpis.carPartners || 0,
      icon: <FaBuilding />,
      color: "purple",
    },
  ];

  return (
    <div className="w-full px-2 mt-6 sm:px-4 lg:px-0">
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl p-4 sm:p-5 bg-white/5 backdrop-blur-md border border-white/10 
            hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 sm:text-sm">
                  {stat.title}
                </p>
                <p className="mt-1 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                  {stat.value}
                </p>
              </div>

              <div
                className={`p-2 sm:p-3 rounded-xl bg-${stat.color}-500/20`}
              >
                <span
                  className={`text-lg sm:text-xl text-${stat.color}-400`}
                >
                  {stat.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}