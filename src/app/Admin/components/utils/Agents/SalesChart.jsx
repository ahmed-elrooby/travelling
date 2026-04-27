"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "السفر البحرية", value: 45, color: "#8b5cf6" },
  { name: "ميناء السياحة", value: 31, color: "#ec4899" },
  { name: "السفر الذهبي", value: 22, color: "#3b82f6" },
  { name: "سفر الخليج", value: 18, color: "#10b981" },
];

export default function StatsChart() {
  return (
    <div className="bg-[#0f0c29] p-6 rounded-2xl border border-purple-500/30 shadow-xl">
      <h2 className="mb-6 text-xl font-bold text-right text-white">
        مبيعات الوكالات (أعلى 5)
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3a" />
            <XAxis dataKey="name" tick={{ fill: "#aaa", fontSize: 12 }} />
            <YAxis tick={{ fill: "#aaa" }} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #8b5cf6",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Bar
                  key={index}
                  dataKey="value"
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}