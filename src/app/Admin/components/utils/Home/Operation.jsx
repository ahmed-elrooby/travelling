"use client";

import React from "react";
import { FaArrowRight, FaBolt, FaDatabase, FaPercent, FaPlusCircle, FaTrophy } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";


const Operation = () => {
  const quickActions = [
    { icon: FaPlusCircle, text: "إضافة حجز جديد", primary: true },
    { icon: FaChartSimple, text: "تقرير الأرباح الشهرية", primary: false },
    { icon: FaPercent, text: "إضافة عرض أو خصم", primary: false },
    { icon: FaDatabase, text: "مراجعة طلبات API", primary: false },
  ];

  const topAgents = [
    { name: "السفر العربية", bookings: "142 حجز", revenue: "46,200$", hoverColor: "purple" },
    { name: "ماس للسياحة", bookings: "98 حجز", revenue: "31,750$", hoverColor: "pink" },
    { name: "السفر الذهبي", bookings: "67 حجز", revenue: "22,300$", hoverColor: "purple" },
  ];

  return (
    <div className="p-6 bg-[#0f0c2999] border border-[#8b5cf633] rounded-2xl">
      <h3 className="flex items-center mb-4 text-lg font-bold text-white">
        <FaBolt className="ml-2 text-yellow-400" />
        إجراءات سريعة
      </h3>
      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`w-full text-right text-white p-3 rounded-xl transition flex items-center gap-3 ${
              action.primary 
                ?"relative overflow-hidden transition-all duration-300 ease-in-out bg-gradient-to-br from-purple-500 to-pink-500" 
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <action.icon className={action.primary ? "text-purple-400" : "text-gray-400"} />
            <span>{action.text}</span>
            <FaArrowRight className="mr-auto text-xs text-gray-500" />
          </button>
        ))}
      </div>

      <hr className="my-6 border-purple-500/20" />

      <h3 className="flex items-center mb-4 text-lg font-bold text-white">
        <FaTrophy className="ml-2 text-yellow-400" />
        أفضل وكلاء B2B
      </h3>
      <div className="space-y-3">
        {topAgents.map((agent, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 transition rounded-xl bg-white/5 hover:bg-white/10 group"
          >
            <div>
              <span className={`font-semibold text-white group-hover:text-${agent.hoverColor}-400 transition`}>
                {agent.name}
              </span>
              <p className="text-xs text-gray-400">{agent.bookings}</p>
            </div>
            <span className="font-bold text-green-400">{agent.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Operation;
