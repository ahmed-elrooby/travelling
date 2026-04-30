"use client";

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
  // 📈 بيانات نمو العملاء
  const growthData = [
    { month: "Jan", customers: 200 },
    { month: "Feb", customers: 350 },
    { month: "Mar", customers: 500 },
    { month: "Apr", customers: 650 },
    { month: "May", customers: 800 },
    { month: "Jun", customers: 920 },
  ];

  // 🥧 بيانات الولاء
  const loyaltyData = [
    { name: "VIP", value: 30 },
    { name: "Regular", value: 50 },
    { name: "New", value: 20 },
  ];

  const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

      {/* 📈 Growth Chart */}
      <div
        data-aos="fade-right"
        className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10"
      >
        <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
          <span className="text-blue-400">📈</span>
          نمو العملاء (آخر 6 أشهر)
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🥧 Loyalty Chart */}
      <div
        data-aos="fade-left"
        className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10"
      >
        <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
          <span className="text-pink-400">🥧</span>
          توزيع العملاء حسب الولاء
        </h3>

        <div className="h-64 w-full flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={loyaltyData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {loyaltyData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}