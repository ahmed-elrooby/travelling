"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981"];

export default function StatsChart() {
  const { B2B } = useContext(Admin);

  const rawData = B2B?.data?.topAgencies;

  // تحويل الداتا
  const data =
    rawData?.map((item, index) => ({
      name: item.name,
      value: item.sales,
      color: COLORS[index % COLORS.length],
    })) || [];

  // Loading
  if (!rawData) {
    return (
      <div className="bg-[#0f0c29] p-6 rounded-2xl border border-purple-500/30">
        <div className="w-full h-[300px] bg-slate-800 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-[#0f0c29] to-[#1a1a40] p-6 rounded-2xl border border-white/10 shadow-xl overflow-hidden">

      {/* Glow */}
      <div className="absolute w-40 h-40 bg-blue-500/10 blur-3xl -top-10 -left-10" />

      <h2 className="mb-6 text-xl font-bold text-white">
        أعلى الوكالات مبيعًا
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3a" />

            <XAxis
              dataKey="name"
              tick={{ fill: "#aaa", fontSize: 12 }}
            />

            <YAxis tick={{ fill: "#aaa" }} />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                background: "#111827",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
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