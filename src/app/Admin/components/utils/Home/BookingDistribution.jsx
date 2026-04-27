"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "طيران", value: 1284, color: "#8b5cf6" },
  { name: "فنادق", value: 892, color: "#ec4899" },
  { name: "سيارات", value: 156, color: "#3b82f6" },
];

export default function BookingDistribution() {
  return (
    <div className="w-full max-w-xl mx-auto bg-[#0f0c29] p-6 rounded-2xl shadow-lg">
      
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
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
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
        {data.map((item, i) => (
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
        {data.map((item, i) => (
          <div key={i}>
            <p className="text-sm text-gray-400">{item.name}</p>
            <p className="text-lg font-bold">{item.value.toLocaleString()}</p>

            {/* progress line */}
            <div className="h-1 mt-2 rounded-full bg-[#1a1a2e]">
              <div
                className="h-1 rounded-full"
                style={{
                  width: `${(item.value / 1300) * 100}%`,
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