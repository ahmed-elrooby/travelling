"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import React, { useContext } from "react";
import { FaPlane } from "react-icons/fa";
import { FiDollarSign, FiTrendingUp, FiUsers } from "react-icons/fi";

const Cards = () => {
  const { flights } = useContext(Admin);

  const kpis = flights?.data?.kpis;

  if (!kpis) return null;

  const stats = [
    {
      title: "إجمالي حجوزات الطيران",
      value: kpis.totalFlightBookings,
      icon: FaPlane,
      color: "purple",
    },
    {
      title: "إيرادات الطيران",
      value: `$${kpis.flightRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: "green",
    },
    {
      title: "معدل الإشغال",
      value: `${kpis.occupancyRate}%`,
      icon: FiTrendingUp,
      color: "yellow",
    },
    {
      title: "شركاء الطيران",
      value: kpis.partnerAirlines,
      icon: FiUsers,
      color: "pink",
    },
  ];

  const styles = {
    purple:
      "from-purple-500/10 border-purple-500/30 text-purple-400 bg-purple-500/20",
    green:
      "from-green-500/10 border-green-500/30 text-green-400 bg-green-500/20",
    yellow:
      "from-yellow-500/10 border-yellow-500/30 text-yellow-400 bg-yellow-500/20",
    pink:
      "from-pink-500/10 border-pink-500/30 text-pink-400 bg-pink-500/20",
  };

  return (
    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        gap-4 sm:gap-6
        mt-6 mb-8
      "
    >
      {stats.map((item, i) => (
        <div
          key={i}
          className={`
            p-4 sm:p-5
            bg-gradient-to-br ${styles[item.color].split(" ")[0]}
            backdrop-blur-md
            border ${styles[item.color].split(" ")[1]}
            rounded-2xl
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-lg
          `}
        >
          <div className="flex items-center justify-between">
            {/* Text */}
            <div>
              <p className="text-xs sm:text-sm text-gray-400">
                {item.title}
              </p>

              <p className="mt-1 text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {item.value}
              </p>
            </div>

            {/* Icon */}
            <div
              className={`p-2 sm:p-3 rounded-xl ${styles[item.color]
                .split(" ")[3]
                }`}
            >
              <item.icon
                className={`text-lg sm:text-xl ${styles[item.color]
                  .split(" ")[2]
                  }`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;