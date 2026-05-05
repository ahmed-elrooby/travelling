"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext } from "react";
import { FaUsers, FaChartLine, FaUserPlus, FaCoins } from "react-icons/fa";

export default function CustomersStats() {
  const { B2C } = useContext(Admin);
<<<<<<< HEAD

=======
console.log("b2c to client ")
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
  const kpis = B2C?.data?.kpis;

  const stats = [
    {
      title: "إجمالي العملاء",
      value: kpis?.totalCustomers ?? 0,
      icon: FaUsers,
      iconColor: "text-blue-400",
      bg: "bg-blue-500/20",
      delay: 100,
      progress: true,
    },
    {
      title: "إجمالي إنفاقهم",
      value: `${kpis?.totalValue ?? 0}$`,
      icon: FaChartLine,
      iconColor: "text-green-400",
      bg: "bg-green-500/20",
      delay: 200,
    },
    {
      title: "عملاء جدد (هذا الشهر)",
      value: `+${kpis?.newThisMonth ?? 0}`,
      icon: FaUserPlus,
      iconColor: "text-yellow-400",
      bg: "bg-yellow-500/20",
      delay: 300,
    },
    {
      title: "متوسط الإنفاق",
      value: `${kpis?.avgSpend ?? 0}$`,
      icon: FaCoins,
      iconColor: "text-purple-400",
      bg: "bg-purple-500/20",
      delay: 400,
    },
  ];

  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
=======
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={item.delay}
<<<<<<< HEAD
            className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10 hover:scale-[1.02] transition"
          >
            <div className="flex justify-between items-center">
              {/* Text */}
=======
            className="p-5 border rounded-2xl bg-white/5 backdrop-blur-md border-white/10"
          >
            <div className="flex items-center justify-between">
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {item.value}
                </p>
              </div>

              <div className={`${item.bg} p-3 rounded-xl`}>
                <Icon className={`${item.iconColor} text-xl`} />
              </div>
            </div>

<<<<<<< HEAD
            {/* Progress bar */}
            {item.progress && (
              <div className="h-1 w-full bg-white/10 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-blue-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      kpis?.totalCustomers
                        ? Math.min(kpis.totalCustomers * 10, 100)
                        : 0
                    }%`,
                  }}
                />
=======
            {item.progress && (
              <div className="w-full h-1 mt-4 overflow-hidden rounded-full bg-white/10">
                <div className="w-2/3 h-full bg-blue-400 rounded-full" />
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}