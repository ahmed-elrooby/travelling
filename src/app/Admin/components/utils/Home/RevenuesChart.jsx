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

const data = [
  { name: "يناير", revenue: 45, profit: 28 },
  { name: "فبراير", revenue: 52, profit: 32 },
  { name: "مارس", revenue: 48, profit: 30 },
  { name: "أبريل", revenue: 60, profit: 38 },
  { name: "مايو", revenue: 72, profit: 45 },
  { name: "يونيو", revenue: 68, profit: 42 },
];

export default function RevenueChart() {
  return (
    <div className="w-full h-[600px] bg-[#0f0c29] p-6 rounded-2xl shadow-lg">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          الإيرادات الشهرية 📈
        </h2>
        <div className="text-sm text-gray-400">
          شهري | أسبوعي
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          
          <CartesianGrid stroke="#2a2a40" strokeDasharray="3 3" />
          
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a2e",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
          />

          <Legend />

          {/* الإيرادات */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="الإيرادات"
          />

          {/* الأرباح */}
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="الأرباح"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}