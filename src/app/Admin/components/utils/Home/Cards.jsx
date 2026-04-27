"use client";

import React from "react";
import { 
  FiCalendar, 
  FiDollarSign, 
  FiUsers, 
  FiBriefcase,
  FiTrendingUp,
  FiArrowUp
} from "react-icons/fi";

const Cards = () => {
  const stats = [
    {
      title: "إجمالي الحجوزات",
      value: "1,284",
      change: "+12% عن الشهر الماضي",
      icon: FiCalendar,
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20",
      progress: "w-full",
    },
    {
      title: "إجمالي الأرباح",
      value: "348.5k$",
      change: "+8% عن الشهر الماضي",
      icon: FiDollarSign,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
      borderColor: "border-green-500/20",
      progress: "w-3/4",
    },
    {
      title: "العملاء B2C",
      value: "892",
      change: "+45 جديد",
      icon: FiUsers,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
      progress: "w-2/3",
    },
    {
      title: "الوكلاء B2B",
      value: "47",
      change: "+6 وكلاء جدد",
      icon: FiBriefcase,
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
      borderColor: "border-yellow-500/20",
      progress: "w-1/2",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative p-5 md:p-6 bg-slate-900/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="flex items-center gap-1 mt-1 text-xs text-green-400">
                  <FiArrowUp className="w-3 h-3" />
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} border ${stat.borderColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${stat.iconColor.replace('text-', 'from-').replace('-400', '-500')} to-transparent rounded-full transition-all duration-1000 ${stat.progress}`}
                style={{ 
                  backgroundImage: `linear-gradient(90deg, var(--${stat.iconColor.split('-')[1]}-color), transparent)` 
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
