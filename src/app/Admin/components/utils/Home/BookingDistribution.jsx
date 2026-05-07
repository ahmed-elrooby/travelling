"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useContext } from "react";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";

export default function BookingDistribution() {
  const { overview } = useContext(Admin);

  const data = overview?.data?.kpis;

  if (!data) return null;

  // تحويل البيانات من API
  const chartData = [
    {
      name: "B2C عملاء",
      value: data.b2cCustomers.total,
      color: "#8b5cf6",
    },
    {
      name: "B2B وكلاء",
      value: data.b2bAgencies.total,
      color: "#ec4899",
    },
    {
      name: "إجمالي الحجوزات",
      value: data.totalBookings.total,
      color: "#3b82f6",
    },
  ];

  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div
      className="
        w-full max-w-xl mx-auto 
        bg-gradient-to-br from-[#0f0c29] to-[#1a1a2e]
        p-4 sm:p-6 
        rounded-2xl 
        shadow-xl 
        border border-white/5
      "
    >
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white sm:text-xl">
          📊 توزيع الحجوزات
        </h2>
      </div>

      {/* Chart */}
      <div className="w-full h-[260px] sm:h-[300px]">
<ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a2e",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-300 sm:gap-6 sm:text-sm">
        {chartData.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-4 h-2 rounded-full sm:w-5"
              style={{ background: item.color }}
            />
            {item.name}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-6 text-center text-white sm:gap-4">
        {chartData.map((item, i) => (
          <div key={i} className="space-y-2">
            <p className="text-[10px] sm:text-sm text-gray-400">
              {item.name}
            </p>

            <p className="text-sm font-bold sm:text-lg">
              {item.value.toLocaleString()}
            </p>

            {/* Progress */}
            <div className="h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${(item.value / total) * 100}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}