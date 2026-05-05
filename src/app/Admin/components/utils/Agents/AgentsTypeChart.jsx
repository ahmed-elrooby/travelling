"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import React, { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981"];

export default function AgentsTypeChart() {
  const { B2B } = useContext(Admin);

  const rawData = B2B?.data?.agencyDistribution;

  // ✅ تحويل الداتا
  const data =
    rawData?.map((item) => ({
      name: item.type,
      value: item.value,
    })) || [];

  // Loading
  if (!rawData) {
    return (
      <div className="bg-[#0f0c29] p-6 rounded-2xl border border-purple-500/30">
        <div className="w-full h-[320px] animate-pulse bg-slate-800 rounded-xl" />
      </div>
    );
  }

  // total (هنا فعليًا = 100%)
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="relative bg-gradient-to-br from-[#0f0c29] to-[#1a1a40] p-6 rounded-2xl border border-white/10 shadow-xl overflow-hidden">

      {/* Glow */}
      <div className="absolute w-40 h-40 bg-purple-500/10 blur-3xl -top-10 -right-10" />

      {/* Title */}
      <h3 className="mb-6 text-lg font-bold text-white flex items-center gap-2">
        📊 توزيع الوكلاء حسب النوع
      </h3>

      {/* Chart */}
      <div className="relative w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={75}
              outerRadius={110}
              paddingAngle={4}
              dataKey="value"
              label={({ percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* Tooltip */}
            <Tooltip
              formatter={(value) => `${value}%`}
              contentStyle={{
                background: "#111827",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center */}
        <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <p className="text-sm text-gray-400">إجمالي التوزيع</p>
          <p className="text-2xl font-bold text-white">
            {total}%
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 mt-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index % COLORS.length],
                }}
              />
              <span className="text-gray-300">
                {item.name}
              </span>
            </div>

            <span className="text-white font-medium">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}