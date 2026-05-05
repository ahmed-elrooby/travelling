"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "يناير", bookings: 40, revenue: 12000 },
  { month: "فبراير", bookings: 55, revenue: 15000 },
  { month: "مارس", bookings: 70, revenue: 18000 },
  { month: "أبريل", bookings: 60, revenue: 17000 },
  { month: "مايو", bookings: 90, revenue: 25000 },
];

export default function HotelBookingTrendChart() {
  return (
    <div className="bg-gradient-to-br from-[#8b5cf61a] to-[#ec48990d] backdrop-blur-md border border-[#8b5cf64d] rounded-2xl p-5 h-[350px]">
      
      <h2 className="mb-4 font-bold text-white">
        📊 تحليل حجوزات الفنادق
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />

          <Bar
            dataKey="bookings"
            barSize={20}
            fill="#8b5cf6"
            radius={[10, 10, 0, 0]}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}