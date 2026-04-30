"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext } from "react";
import { FaUsers, FaChartLine, FaUserPlus, FaCoins } from "react-icons/fa";

export default function CustomersStats() {
  const {B2C} = useContext(Admin)
  console.log(B2C )
  const stats = [
    {
      title: "إجمالي العملاء",
      value: "892",
      icon: FaUsers,
      iconColor: "text-blue-400",
      bg: "bg-blue-500/20",
      delay: 100,
      progress: true,
    },
    {
      title: "إجمالي إنفاقهم",
      value: "1.2M$",
      icon: FaChartLine,
      iconColor: "text-green-400",
      bg: "bg-green-500/20",
      delay: 200,
    },
    {
      title: "عملاء جدد (هذا الشهر)",
      value: "+45",
      icon: FaUserPlus,
      iconColor: "text-yellow-400",
      bg: "bg-yellow-500/20",
      delay: 300,
    },
    {
      title: "متوسط الإنفاق",
      value: "1,345$",
      icon: FaCoins,
      iconColor: "text-purple-400",
      bg: "bg-purple-500/20",
      delay: 400,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={item.delay}
            className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10"
          >
            <div className="flex justify-between items-center">

              {/* Text */}
              <div>
                <p className="text-gray-400 text-sm">{item.title}</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {item.value}
                </p>
              </div>

              {/* Icon */}
              <div className={`${item.bg} p-3 rounded-xl`}>
                <Icon className={`${item.iconColor} text-xl`} />
              </div>

            </div>

            {/* Progress bar (only for first card) */}
            {item.progress && (
              <div className="h-1 w-full bg-white/10 rounded-full mt-4 overflow-hidden">
                <div className="h-full w-2/3 bg-blue-400 rounded-full" />
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
}