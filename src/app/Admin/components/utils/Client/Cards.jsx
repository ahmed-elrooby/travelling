"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext } from "react";
import { FaUsers, FaChartLine, FaUserPlus, FaCoins } from "react-icons/fa";

export default function CustomersStats() {
  const { B2C } = useContext(Admin);
  console.log(`b2C ${B2C}`)
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
    <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={item.delay}
            className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10 hover:scale-[1.02] transition"
          >
            <div className="flex items-center justify-between">
              {/* Text */}
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

            {/* Progress bar */}
            {item.progress && (
              <div className="w-full h-1 mt-4 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full transition-all duration-500 bg-blue-400 rounded-full"
                  style={{
                    width: `${
                      kpis?.totalCustomers
                        ? Math.min(kpis.totalCustomers * 10, 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}