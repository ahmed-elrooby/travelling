"use client";

import { Clients } from "@/app/Providers/ClientContext/ClientsProviders";
import React, { useContext, useMemo } from "react";
import {
  FaCalendarCheck,
  FaDollarSign,
  FaGem,
  FaCrown,
  FaArrowUp,
} from "react-icons/fa";

const Cards = () => {
  const { overview } = useContext(Clients);

  const kpis = overview?.data?.kpis;

  const stats = useMemo(() => {
    return [
      {
        title: "إجمالي العملاء",
        value: kpis?.totalCustomers ?? 0,
        change: "+ نشاط مستمر",
        icon: FaCalendarCheck,
        iconBg: "bg-purple-500/20",
        iconColor: "text-purple-400",
      },

      {
        title: "إجمالي القيمة",
        value: `${kpis?.totalValue?.toLocaleString() ?? 0}$`,
        change: "+ نمو مالي",
        icon: FaDollarSign,
        iconBg: "bg-green-500/20",
        iconColor: "text-green-400",
      },

      {
        title: "عملاء جدد",
        value: kpis?.newThisMonth ?? 0,
        subtitle: "هذا الشهر",
        icon: FaGem,
        iconBg: "bg-yellow-500/20",
        iconColor: "text-yellow-400",
        valueColor: "text-yellow-400",
        showProgress: true,
      },

      {
        title: "متوسط الإنفاق",
        value: `${kpis?.avgSpend?.toLocaleString() ?? 0}$`,
        badge: "متوسط",
        subtitle: "لكل عميل",
        icon: FaCrown,
        iconBg:
          "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
        iconColor: "text-purple-400",
      },
    ];
  }, [kpis]);

  return (
    <div className="grid grid-cols-1 gap-6 my-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="relative p-5 overflow-hidden transition-all duration-300 rounded-2xl hover:scale-105 hover:shadow-2xl group"
            style={{
              background:
                "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            }}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <p className="mb-1 text-sm text-gray-400">{stat.title}</p>

                <div className="flex items-baseline gap-1 mt-1">
                  <p
                    className={`text-3xl font-bold ${
                      stat.valueColor || "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>

                  {stat.badge && (
                    <span className="text-sm font-medium text-purple-400">
                      {stat.badge}
                    </span>
                  )}
                </div>

                {stat.change && (
                  <p className="flex items-center gap-1 mt-1 text-xs text-green-400">
                    <FaArrowUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                )}

                {stat.subtitle && (
                  <p className="mt-1 text-xs text-gray-400">
                    {stat.subtitle}
                  </p>
                )}
              </div>

              <div
                className={`${stat.iconBg} p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                <Icon className={`${stat.iconColor} text-xl`} />
              </div>
            </div>

            {stat.showProgress && (
              <div className="mt-3">
                <div className="w-full h-1 overflow-hidden bg-gray-700 rounded-full">
                  <div
                    className="h-full transition-all duration-1000 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                    style={{
                      width: `${Math.min(
                        ((kpis?.newThisMonth || 0) / 100) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl"></div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;