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
  { name: "مؤكد", value: 90 },
  { name: "قيد الانتظار", value: 30 },
  { name: "ملغي", value: 22 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function BookingPieChart() {
  return (
    <div className="glass-premium rounded-2xl p-6 w-full h-[350px]">
      
      <h2 className="mb-4 font-bold text-white">
        🧾 توزيع حجوزات الطيران
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 12, 41, 0.9)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#fff",
              borderRadius: "12px",
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}