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
  { name: "يناير", sales: 120, orders: 80 },
  { name: "فبراير", sales: 150, orders: 95 },
  { name: "مارس", sales: 140, orders: 90 },
  { name: "أبريل", sales: 180, orders: 110 },
  { name: "مايو", sales: 220, orders: 130 },
  { name: "يونيو", sales: 200, orders: 125 },
];

export default function SalesChart() {
  return (
    <div className="w-full h-[600px] bg-[#0f0c29] p-6 rounded-2xl shadow-lg border border-white/10">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          📊 المبيعات الشهرية
        </h2>

        <div className="text-sm text-gray-400">
          تحليل الأداء
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

          {/* Sales */}
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="المبيعات"
          />

          {/* Orders */}
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="الطلبات"
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}