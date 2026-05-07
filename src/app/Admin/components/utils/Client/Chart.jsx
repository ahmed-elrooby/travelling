"use client";

import { useContext } from "react";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function CustomersCharts() {
  const { B2C } = useContext(Admin);

  const data = B2C?.data;

  // 📈 Growth Data
  const growthData =
    data?.growthLast6Months?.map((item, index) => ({
      month: item.month || `M${index + 1}`,
      customers: item.customers || item.value || 0,
    })) || [];

  // 🥧 Loyalty Data
  const loyaltyData =
    data?.customerDistribution?.map((item) => ({
      name: item.type,
      value: item.value,
    })) || [];

  // 🎨 Colors
  const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6"];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
      {/* 📈 Growth Chart */}
      <div
        data-aos="fade-right"
        className="p-6 border rounded-2xl bg-white/5 backdrop-blur-md border-white/10"
      >
        <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white">
          <span className="text-blue-400">📈</span>
          نمو العملاء (آخر 6 أشهر)
        </h3>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={
                growthData.length
                  ? growthData
                  : [{ month: "", customers: 0 }]
              }
            >
              <XAxis dataKey="month" stroke="#9ca3af" />

              <YAxis stroke="#9ca3af" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="customers"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🥧 Customer Distribution */}
      <div
        data-aos="fade-left"
        className="p-6 border rounded-2xl bg-white/5 backdrop-blur-md border-white/10"
      >
        <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white">
          <span className="text-pink-400">🥧</span>
          توزيع العملاء
        </h3>

        <div className="w-full h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={
                  loyaltyData.length
                    ? loyaltyData
                    : [{ name: "No Data", value: 1 }]
                }
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {(loyaltyData.length
                  ? loyaltyData
                  : [{ name: "No Data", value: 1 }]
                ).map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}