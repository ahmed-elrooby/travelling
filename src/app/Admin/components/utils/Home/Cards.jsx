"use client";

import React from "react";
import { 
  FaCalendarCheck, 
  FaDollarSign, 
  FaUserPlus, 
  FaUserFriends, 
  FaBuilding, 
  FaHandshake 
} from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";

const Cards = () => {
  const stats = [
    {
      title: "إجمالي الحجوزات",
      value: "1,284",
      change: "+12% عن الشهر الماضي",
      icon: FaCalendarCheck,
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      progress: "w-full",
    },
    {
      title: "إجمالي الأرباح",
      value: "348.5k$",
      change: "+8% عن الشهر الماضي",
      icon: FaDollarSign,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
      progress: "w-3/4",
    },
    {
      title: "العملاء B2C",
      value: "892",
      change: "+45 جديد",
      icon: FaUserFriends,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      progress: "w-2/3",
    },
    {
      title: "الوكلاء B2B",
      value: "47",
      change: "+6 وكلاء جدد",
      icon: FaHandshake,
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
      progress: "w-1/2",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-[#8b5cf64d] rounded-2xl"
          data-aos="fade-up"
          data-aos-delay={100 * (index + 1)}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <p className="mt-2 text-4xl font-bold text-white">{stat.value}</p>
              <p className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <FaArrowUp className="text-xs" />
                {stat.change}
              </p>
            </div>
            <div className={`icon-glow bg-gradient-to-br ${stat.gradient} p-3 rounded-2xl`}>
              <stat.icon className={`text-2xl ${stat.iconColor} float-slow`} style={{ animationDelay: `${index * 0.3}s` }} />
            </div>
          </div>
          <div className={`progress-bar h-1 ${stat.progress} rounded-full mt-4`}></div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
