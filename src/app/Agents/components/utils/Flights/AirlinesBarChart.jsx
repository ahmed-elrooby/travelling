"use client";

import { Agent } from "@/app/Providers/AgentContext/AgentProvider";
import { useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AirlinesBarChart() {
  const { flightSection } = useContext(Agent);

  // ✅ safe data extraction
  const rawData = useMemo(() => {
    return Array.isArray(flightSection?.data) ? flightSection.data : [];
  }, [flightSection?.data]);

  // 📊 group + transform
  const chartData = useMemo(() => {
    if (!rawData.length) return [];

    const map = new Map();

    rawData.forEach((flight) => {
      const airline = flight?.airline || flight?.flightNo || "شركة أخرى";
      const price = Number(flight?.price || 0);

      map.set(airline, (map.get(airline) || 0) + price);
    });

    return Array.from(map, ([name, sales]) => ({
      name: name.length > 12 ? name.slice(0, 12) + "..." : name,
      fullName: name,
      sales: Number(sales) || 0,
    }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 6);
  }, [rawData]);

  // 💰 total sales safe
  const totalSales = useMemo(() => {
    return rawData.reduce((sum, f) => sum + Number(f?.price || 0), 0);
  }, [rawData]);

  const topAirline = chartData[0];

  // ❌ empty state (important for Recharts)
  if (!chartData.length) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center text-gray-400">
        لا توجد بيانات متاحة
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-white/5 to-purple-900/20 rounded-2xl p-6">

      {/* Header */}
      <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:justify-between sm:items-center">

        <div>
          <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            📊 أفضل شركات الطيران مبيعًا
          </h2>

          <p className="text-sm text-gray-400">
            إجمالي المبيعات:{" "}
            <span className="font-semibold text-purple-400">
              {totalSales.toLocaleString("en-US")} $
            </span>
          </p>
        </div>

        {topAirline && (
          <div className="px-3 py-1 text-xs text-yellow-300 border rounded-full bg-yellow-500/10 border-yellow-500/30">
            🏆 الأعلى: {topAirline.fullName} ({topAirline.sales.toLocaleString()}$)
          </div>
        )}
      </div>

      {/* Chart container IMPORTANT FIX */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#aaa"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#aaa"
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v
              }
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid rgba(139,92,246,0.3)",
                borderRadius: "10px",
                color: "#fff",
              }}
              formatter={(value) => [`${value}$`, "المبيعات"]}
            />

            <Bar
              dataKey="sales"
              fill="#8b5cf6"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}