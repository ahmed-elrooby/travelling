"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "وكيل مباشر", value: 45 },
  { name: "وكيل فرعي", value: 25 },
  { name: "شركة", value: 30 },
];

const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6"];

export default function AgentsTypeChart() {
  return (
    <div className="bg-[#0f0c29] p-6 rounded-2xl border border-purple-500/30 shadow-xl">
      
      {/* Title */}
      <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white">
        <i className="text-pink-400 fas fa-chart-pie"></i>
        توزيع الوكلاء حسب النوع
      </h3>

      {/* Chart */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}