"use client";

<<<<<<< HEAD
import { useContext } from "react";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
=======
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext } from "react";
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
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

<<<<<<< HEAD
  const data = B2C?.data;

  // 📈 Growth Data (آخر 6 شهور)
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
=======
  // 📈 بيانات نمو العملاء من الـ API
  const growthData = B2C?.data?.growthLast6Months || [];
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596

  // 🥧 بيانات توزيع العملاء من الـ API
  const customerDistribution = B2C?.data?.customerDistribution || [];

  // ألوان ثابتة للـ Pie Chart
  const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6"];

<<<<<<< HEAD
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
=======
  // لو مفيش بيانات، نعرض رسالة أو نضيف fallback
  const hasGrowthData = growthData.length > 0;
  const hasDistributionData = customerDistribution.length > 0;

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
      {/* 📈 Growth Chart */}
      <div
        data-aos="fade-right"
        className="p-6 border rounded-2xl bg-white/5 backdrop-blur-md border-white/10"
      >
        <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white">
          <span className="text-blue-400">📈</span>
          نمو العملاء (آخر 6 أشهر)
        </h3>

<<<<<<< HEAD
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
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
=======
        <div className="w-full h-64">
          {hasGrowthData ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              لا توجد بيانات للنمو
            </div>
          )}
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
        </div>
      </div>

      {/* 🥧 Customer Distribution Chart */}
      <div
        data-aos="fade-left"
        className="p-6 border rounded-2xl bg-white/5 backdrop-blur-md border-white/10"
      >
        <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white">
          <span className="text-pink-400">🥧</span>
          توزيع العملاء
        </h3>

<<<<<<< HEAD
        <div className="h-64 w-full flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={loyaltyData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {loyaltyData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
=======
        <div className="flex items-center justify-center w-full h-64">
          {hasDistributionData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {customerDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend
                  formatter={(value) => <span className="text-white">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400">لا توجد بيانات للتوزيع</div>
          )}
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
        </div>
      </div>
    </div>
  );
}