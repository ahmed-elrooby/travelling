"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "السبت", occupancy: 65, profit: 4000 },
  { day: "الأحد", occupancy: 70, profit: 5200 },
  { day: "الإثنين", occupancy: 80, profit: 6000 },
  { day: "الثلاثاء", occupancy: 75, profit: 5800 },
  { day: "الأربعاء", occupancy: 90, profit: 7200 },
  { day: "الخميس", occupancy: 85, profit: 6900 },
];

export default function HotelOccupancyChart() {
  return (
    <div className="bg-gradient-to-br from-[#0f0c29] to-[#1a1638] backdrop-blur-md border border-[#8b5cf64d] rounded-2xl p-5 h-[350px]">
      
      <h2 className="mb-4 font-bold text-white">
        📈 الإشغال والأرباح اليومية
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="occupancy"
            stroke="#8b5cf6"
            fillOpacity={1}
            fill="url(#colorOccupancy)"
          />

          <Area
            type="monotone"
            dataKey="profit"
            stroke="#ec4899"
            fillOpacity={1}
            fill="url(#colorProfit)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}