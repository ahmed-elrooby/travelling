"use client";

import { Agent } from "@/app/Providers/AgentContext/AgentProvider";
import { useContext } from "react";
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

export default function SalesChart() {
  const { overview } = useContext(Agent);

  // ✅ تحويل الداتا من API
  const chartData =
    overview?.data?.topAgencies?.map((item) => ({
      name: item.name,
      sales: item.sales,
      orders: Math.floor(item.sales * 0.7), // مؤقت
    })) || [];

  // ✅ loading
  if (!overview) {
    return (
      <div className="text-center text-gray-400">
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-[#0f0c29] p-6 rounded-2xl shadow-lg border border-white/10">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          📊 أعلى الشركات مبيعًا
        </h2>

        <div className="text-sm text-gray-400">
          من بيانات API
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          
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