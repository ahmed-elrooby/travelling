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

  // تحليل البيانات ديناميكياً من flightSection
  const chartData = useMemo(() => {
    if (!flightSection || flightSection?.data?.length === 0) {
      return [];
    }

    // تجميع المبيعات حسب شركة الطيران
    const airlinesMap = new Map();

    flightSection?.data?.forEach((flight) => {
      const airline = flight.airline || flight.flightNo || "شركة أخرى";
      const price = flight.price || 0;

      if (airlinesMap.has(airline)) {
        airlinesMap.set(airline, airlinesMap.get(airline) + price);
      } else {
        airlinesMap.set(airline, price);
      }
    });

    // تحويل الخريطة إلى مصفوفة وترتيبها تنازلياً
    const airlinesData = Array.from(airlinesMap, ([name, sales]) => ({
      name: name.length > 10 ? name.slice(0, 10) + "..." : name,
      fullName: name,
      sales: sales,
    }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 6); // عرض أفضل 6 شركات فقط

    return airlinesData;
  }, [flightSection]);

  // إحصائيات إضافية
  const totalSales = useMemo(() => {
    if (!flightSection || flightSection?.data?.length === 0) return 0;
    return flightSection?.data?.reduce((sum, flight) => sum + (flight.price || 0), 0);
  }, [flightSection]);

  const topAirline = chartData[0];

  return (
    <div className="glass-premium rounded-2xl p-6 w-full h-auto lg:h-[500px] bg-gradient-to-br from-white/5 to-purple-900/20 backdrop-blur-md border border-purple-500/20">
      
      {/* Header */}
      <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            📊 أفضل شركات الطيران مبيعًا
          </h2>
          <p className="text-sm text-gray-400">
            إجمالي المبيعات: <span className="font-semibold text-purple-400">
              {new Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              }).format(totalSales)}
            </span>
          </p>
        </div>
        
        {topAirline && (
          <div className="px-3 py-1 border rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
            <p className="text-xs text-yellow-300">
              🏆 الأعلى مبيعاً: {topAirline.fullName} 
              <span className="mr-1 font-bold">
                ({new Intl.NumberFormat("ar-EG").format(topAirline.sales)}$)
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <div className="w-full h-[300px] lg:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255,255,255,0.1)" 
                vertical={false}
              />

              <XAxis 
                dataKey="name" 
                stroke="#aaa"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />

              <YAxis 
                stroke="#aaa"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickFormatter={(value) => `${value / 1000}K`}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 12, 41, 0.95)",
                  border: "1px solid rgba(139, 92, 246, 0.5)",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#cbd5e1", fontWeight: "bold" }}
                formatter={(value) => [
                  new Intl.NumberFormat("ar-EG", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                  }).format(value),
                  "المبيعات"
                ]}
                cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
              />

              <Bar
                dataKey="sales"
                fill="url(#gradient)"
                radius={[10, 10, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
              />

              {/* Gradient for bars */}
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>

            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        // حالة عدم وجود بيانات
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <div className="p-4 mb-3 rounded-full bg-white/5">
            <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-400">لا توجد بيانات كافية لعرض الرسم البياني</p>
          <p className="mt-1 text-xs text-gray-500">قم بإضافة حجوزات طيران أولاً</p>
        </div>
      )}
    </div>
  );
}