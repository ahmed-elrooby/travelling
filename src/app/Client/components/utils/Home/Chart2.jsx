"use client";

import { Clients } from "@/app/Providers/ClientContext/ClientsProviders";
import React, { useContext, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#8B5CF6", "#EC4899", "#3B82F6"];

const Chart2 = () => {
  const { overview } = useContext(Clients);

  // 📈 Chart 1: Growth
  const growthData = useMemo(() => {
    return overview?.data?.growthLast6Months?.map((item) => ({
      month: item.month,
      value: item.value,
    })) || [];
  }, [overview]);

  // 🥧 Chart 2: Customer Distribution
  const pieData = useMemo(() => {
    return overview?.customerDistribution?.map((item) => ({
      name: item.type,
      value: item.value,
    })) || [];
  }, [overview]);

  return (
    <div className="">

      {/* 📊 Chart 1 - Line */}
      <div className="px-1 py-3 bg-gray-900 border border-gray-700 rounded-2xl">
        <h2 className="mb-4 text-lg font-bold text-white">
          نمو العملاء (6 شهور)
        </h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "10px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

 

    </div>
  );
};

export default Chart2;