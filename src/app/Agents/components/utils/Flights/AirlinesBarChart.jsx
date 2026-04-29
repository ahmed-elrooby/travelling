"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "القطرية", sales: 32000 },
  { name: "الإمارات", sales: 45000 },
  { name: "السعودية", sales: 28000 },
  { name: "مصر للطيران", sales: 22000 },
  { name: "الاتحاد", sales: 35000 },
];

export default function AirlinesBarChart() {
  return (
    <div className="glass-premium rounded-2xl p-6 w-full h-[350px]">
      
      <h2 className="mb-4 font-bold text-white">
        📊 أفضل شركات الطيران مبيعًا
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />

          <XAxis dataKey="name" stroke="#aaa" />

          <YAxis stroke="#aaa" />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 12, 41, 0.9)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#fff",
              borderRadius: "12px",
            }}
          />

          <Bar
            dataKey="sales"
            fill="url(#gradient)"
            radius={[10, 10, 0, 0]}
          />

          {/* Gradient for bars */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}