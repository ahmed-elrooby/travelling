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
  other: "#6b7280",
};

const STATUS_LABELS = {
  confirmed: "مؤكد",
  pending: "قيد الانتظار",
  cancelled: "ملغي",
};

export default function BookingPieChart() {
  const { flightSection } = useContext(Agent);

  // تحليل البيانات ديناميكياً من flightSection
  const chartData = useMemo(() => {
    if (!flightSection || flightSection?.data?.length === 0) {
      return [];
    }

    // حساب عدد الرحلات حسب الحالة
    const statusCount = {
      confirmed: 0,
      pending: 0,
      cancelled: 0,
    };

    flightSection?.data?.forEach((flight) => {
      const status = flight.status || "pending";
      if (status === "confirmed") {
        statusCount.confirmed++;
      } else if (status === "pending") {
        statusCount.pending++;
      } else if (status === "cancelled") {
        statusCount.cancelled++;
      } else {
        // لأي حالة أخرى
        if (!statusCount[status]) {
          statusCount[status] = 0;
        }
        statusCount[status]++;
      }
    });

    // تحويل إلى مصفوفة للرسم البياني
    const data = [];
    
    if (statusCount.confirmed > 0) {
      data.push({ name: STATUS_LABELS.confirmed, value: statusCount.confirmed, status: "confirmed" });
    }
    if (statusCount.pending > 0) {
      data.push({ name: STATUS_LABELS.pending, value: statusCount.pending, status: "pending" });
    }
    if (statusCount.cancelled > 0) {
      data.push({ name: STATUS_LABELS.cancelled, value: statusCount.cancelled, status: "cancelled" });
    }

    return data;
  }, [flightSection]);

  // إحصائيات إضافية
  const statistics = useMemo(() => {
    if (!flightSection || flightSection?.data?.length === 0) {
      return { total: 0, confirmed: 0, pending: 0, cancelled: 0 };
    }

    const total = flightSection?.data?.length;
    const confirmed = flightSection?.data?.filter(f => f.status === "confirmed").length;
    const pending = flightSection?.data?.filter(f => f.status === "pending").length;
    const cancelled = flightSection?.data?.filter(f => f.status === "cancelled").length;

    return { total, confirmed, pending, cancelled };
  }, [flightSection]);

  // تخصيص نص legend
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4" dir="rtl">
        {payload.map((entry, index) => {
          const status = chartData[index]?.status;
          let percentage = 0;
          if (statistics.total > 0 && entry.payload?.value) {
            percentage = (entry.payload.value / statistics.total) * 100;
          }
          return (
            <li key={`item-${index}`} className="flex items-center gap-2 text-sm">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-300">{entry.value}</span>
              <span className="font-semibold text-white">
                {entry.payload?.value} ({percentage.toFixed(1)}%)
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  // تخصيص tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / statistics.total) * 100).toFixed(1);
      return (
        <div className="p-3 border shadow-xl rounded-xl bg-gray-900/95 backdrop-blur-md border-purple-500/30">
          <p className="mb-1 font-semibold text-white">{data.name}</p>
          <p className="text-sm text-gray-300">
            العدد: <span className="font-bold text-purple-400">{data.value}</span>
          </p>
          <p className="text-sm text-gray-300">
            النسبة: <span className="font-bold text-purple-400">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-premium rounded-2xl p-6 w-full h-auto lg:h-[450px] bg-gradient-to-br from-white/5 to-purple-900/20 backdrop-blur-md border border-purple-500/20">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
          🧾 توزيع حجوزات الطيران
        </h2>
        <p className="text-sm text-gray-400">
          إجمالي الحجوزات: <span className="font-semibold text-purple-400">{statistics.total}</span>
        </p>
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <div className="w-full h-[300px] lg:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                animationDuration={1500}
                animationBegin={300}
              >
                {chartData.map((entry, index) => {
                  let color = COLORS.other;
                  if (entry.status === "confirmed") color = COLORS.confirmed;
                  else if (entry.status === "pending") color = COLORS.pending;
                  else if (entry.status === "cancelled") color = COLORS.cancelled;
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Pie>

              <Tooltip content={<CustomTooltip />} />

              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        // حالة عدم وجود بيانات
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <div className="p-4 mb-3 rounded-full bg-white/5">
            <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <p className="text-gray-400">لا توجد بيانات كافية لعرض الرسم البياني</p>
          <p className="mt-1 text-xs text-gray-500">قم بإضافة حجوزات طيران أولاً</p>
        </div>
      )}

      {/* بطاقات إحصائيات سريعة - تظهر فقط عند وجود بيانات */}
      {statistics.total > 0 && (
        <div className="grid grid-cols-3 gap-3 pt-4 mt-6 border-t border-purple-500/20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <p className="text-xs text-gray-400">مؤكد</p>
            </div>
            <p className="text-lg font-bold text-green-400">{statistics.confirmed}</p>
            <p className="text-xs text-gray-500">
              ({((statistics.confirmed / statistics.total) * 100).toFixed(1)}%)
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <p className="text-xs text-gray-400">قيد الانتظار</p>
            </div>
            <p className="text-lg font-bold text-yellow-400">{statistics.pending}</p>
            <p className="text-xs text-gray-500">
              ({((statistics.pending / statistics.total) * 100).toFixed(1)}%)
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <p className="text-xs text-gray-400">ملغي</p>
            </div>
            <p className="text-lg font-bold text-red-400">{statistics.cancelled}</p>
            <p className="text-xs text-gray-500">
              ({((statistics.cancelled / statistics.total) * 100).toFixed(1)}%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}