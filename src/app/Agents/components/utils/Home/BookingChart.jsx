"use client";

import { Agent } from "@/app/Providers/AgentContext/AgentProvider";
import { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function BookingChart() {
  const { booking } = useContext(Agent);

  // ✅ تحويل الداتا من API
  const chartData = booking
    ? [
        {
          name: "طيران",
          value: booking.flights.length,
          color: "#8b5cf6",
        },
        {
          name: "فنادق",
          value: booking.hotels.length,
          color: "#ec4899",
        },
        {
          name: "سيارات",
          value: booking.cars.length,
          color: "#3b82f6",
        },
      ]
    : [];

  // ✅ إجمالي
  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  // ✅ loading
  if (!booking) {
    return (
      <div className="text-center text-gray-400">
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-[#0f0c29] p-2 md:p-6 rounded-2xl shadow-lg">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          توزيع الحجوزات 🟣
        </h2>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a2e",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-300">
        {chartData.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-6 h-2 rounded-full"
              style={{ background: item.color }}
            ></span>
            {item.name}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 mt-6 text-center text-white">
        {chartData.map((item, i) => (
          <div key={i}>
            <p className="text-sm text-gray-400">{item.name}</p>
            <p className="text-lg font-bold">{item.value}</p>

            {/* progress */}
            <div className="h-1 mt-2 rounded-full bg-[#1a1a2e]">
              <div
                className="h-1 rounded-full"
                style={{
                  width: total ? `${(item.value / total) * 100}%` : "0%",
                  background: item.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}