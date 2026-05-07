"use client";

import { Agent } from "@/app/Providers/AgentContext/AgentProvider";
import { useContext, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  confirmed: "#22c55e",
  pending: "#f59e0b",
  cancelled: "#ef4444",
};

const STATUS_LABELS = {
  confirmed: "مؤكد",
  pending: "قيد الانتظار",
  cancelled: "ملغي",
};

export default function BookingPieChart() {
  const { flightSection } = useContext(Agent);

  // ✅ Data safe
  const chartData = useMemo(() => {
    const list = flightSection?.data || [];
    if (!list.length) return [];

    const statusCount = {
      confirmed: 0,
      pending: 0,
      cancelled: 0,
    };

    list.forEach((flight) => {
      const status = flight.status || "pending";
      if (statusCount[status] !== undefined) {
        statusCount[status]++;
      } else {
        statusCount.pending++;
      }
    });

    return Object.entries(statusCount)
      .filter(([, value]) => value > 0)
      .map(([key, value]) => ({
        status: key,
        name: STATUS_LABELS[key],
        value,
      }));
  }, [flightSection]);

  // ✅ stats safe
  const statistics = useMemo(() => {
    const list = flightSection?.data || [];

    return {
      total: list.length,
      confirmed: list.filter((f) => f.status === "confirmed").length,
      pending: list.filter((f) => f.status === "pending").length,
      cancelled: list.filter((f) => f.status === "cancelled").length,
    };
  }, [flightSection]);

  // ✅ Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;
    const percentage =
      statistics.total > 0
        ? ((data.value / statistics.total) * 100).toFixed(1)
        : 0;

    return (
      <div className="p-3 text-white bg-gray-900 border border-purple-500/30 rounded-xl">
        <p className="font-bold">{data.name}</p>
        <p>عدد: {data.value}</p>
        <p>نسبة: {percentage}%</p>
      </div>
    );
  };

  // ✅ Legend safe (important fix)
  const renderLegend = () => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {chartData.map((item, index) => {
          const percent =
            statistics.total > 0
              ? ((item.value / statistics.total) * 100).toFixed(1)
              : 0;

          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[item.status],
                }}
              />
              <span className="text-gray-300">{item.name}</span>
              <span className="font-bold text-white">
                {item.value} ({percent}%)
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // ✅ Empty state safe
  if (!chartData.length) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400">
        لا توجد بيانات
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] bg-gradient-to-br from-white/5 to-purple-900/20 rounded-2xl p-6">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">
          🧾 توزيع حجوزات الطيران
        </h2>
        <p className="text-sm text-gray-400">
          إجمالي الحجوزات: {statistics.total}
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
            >
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={COLORS[entry.status]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-6 text-center text-white">
        <div>مؤكد: {statistics.confirmed}</div>
        <div>قيد الانتظار: {statistics.pending}</div>
        <div>ملغي: {statistics.cancelled}</div>
      </div>
    </div>
  );
}