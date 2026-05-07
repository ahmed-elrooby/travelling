"use client";

import { Clients } from "@/app/Providers/ClientContext/ClientsProviders";
import React, { useContext, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Chart = () => {
  const { overview } = useContext(Clients);

  const chartData = useMemo(() => {
    return overview?.data?.growthLast6Months?.map((item) => ({
      month: item.month,
      value: item.value,
    })) || [];
  }, [overview]);

  return (
    <div className="px-1 py-3 border border-gray-800 shadow-lg bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">
          📈 نمو العملاء
        </h2>

        <span className="px-3 py-1 text-xs text-purple-300 border rounded-full border-purple-500/30 bg-purple-500/10">
          آخر 6 شهور
        </span>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData}>

            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />

            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />

            <YAxis stroke="#9CA3AF" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "10px",
              }}
              labelStyle={{ color: "#fff" }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              fill="url(#colorValue)"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;