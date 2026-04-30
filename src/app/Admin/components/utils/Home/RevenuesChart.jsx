"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useContext } from "react";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";

export default function RevenueChart() {
  const { overview } = useContext(Admin);

  const data = overview?.data;

  if (!data) return null;

  // تحويل بسيط من الـ API إلى شكل chart
  const chartData = [
    {
      name: "إجمالي الحجوزات",
      value: data.kpis.totalBookings.total,
    },
    {
      name: "B2C العملاء",
      value: data.kpis.b2cCustomers.total,
    },
    {
      name: "B2B الوكلاء",
      value: data.kpis.b2bAgencies.total,
    },
    {
      name: "الأرباح",
      value: data.kpis.totalProfit.total,
    },
  ];

  return (
    <div
      className="
        w-full 
        h-[420px] sm:h-[500px] lg:h-[600px]
        bg-gradient-to-br from-[#0f0c29] to-[#1a1a2e]
        p-4 sm:p-6 
        rounded-2xl 
        shadow-xl
        border border-white/5
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          📊 نظرة عامة على الأداء
        </h2>

        <p className="text-xs sm:text-sm text-gray-400">
          {data.greeting?.subtitle}
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid stroke="#2a2a40" strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            stroke="#aaa"
            tick={{ fontSize: 12 }}
          />

          <YAxis stroke="#aaa" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Legend />

          {/* خط واحد موحد للأداء */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
            name="القيم"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}