"use client";

import { Agent } from "@/app/Providers/AgentContext/AgentProvider";
import { useContext, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function HotelBookingTrendChart() {
  const { BookingsHotels } = useContext(Agent);

  // تحليل البيانات ديناميكياً من BookingsHotels
  const chartData = useMemo(() => {
    if (!BookingsHotels || BookingsHotels.length === 0) {
      return [];
    }

    // تجميع الحجوزات حسب الشهر
    const monthlyData = new Map();

    BookingsHotels.forEach((booking) => {
      if (!booking.checkIn) return;

      const date = new Date(booking.checkIn);
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthName = new Intl.DateTimeFormat("ar-EG", { month: "long" }).format(date);
      const key = `${year}-${month}`;

      if (!monthlyData.has(key)) {
        monthlyData.set(key, {
          month: monthName,
          year: year,
          monthIndex: month,
          bookings: 0,
          revenue: 0,
          totalGuests: 0,
          confirmedCount: 0,
        });
      }

      const current = monthlyData.get(key);
      current.bookings += 1;
      current.revenue += booking.price || 0;
      current.totalGuests += parseInt(booking.guests) || 1;
      if (booking.status === "confirmed") {
        current.confirmedCount += 1;
      }
    });

    // تحويل الخريطة إلى مصفوفة وترتيبها حسب الشهر
    let result = Array.from(monthlyData.values())
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.monthIndex - b.monthIndex;
      })
      .slice(-6); // عرض آخر 6 أشهر فقط

    return result;
  }, [BookingsHotels]);

  // إحصائيات إضافية
  const statistics = useMemo(() => {
    if (!BookingsHotels || BookingsHotels.length === 0) {
      return {
        totalBookings: 0,
        totalRevenue: 0,
        averageRevenue: 0,
        peakMonth: null,
      };
    }

    const totalBookings = BookingsHotels.length;
    const totalRevenue = BookingsHotels.reduce((sum, b) => sum + (b.price || 0), 0);
    const averageRevenue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    // العثور على الشهر الأكثر حجوزات
    let peakMonth = null;
    let maxBookings = 0;
    if (chartData.length > 0) {
      chartData.forEach((item) => {
        if (item.bookings > maxBookings) {
          maxBookings = item.bookings;
          peakMonth = item.month;
        }
      });
    }

    return {
      totalBookings,
      totalRevenue,
      averageRevenue,
      peakMonth,
      maxBookings,
    };
  }, [BookingsHotels, chartData]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("ar-EG").format(value);
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 border shadow-xl rounded-xl bg-gray-900/95 backdrop-blur-md border-purple-500/30">
          <p className="mb-2 font-semibold text-white">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-300">
              عدد الحجوزات:{" "}
              <span className="font-bold text-purple-400">
                {payload[0]?.value}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              الإيرادات:{" "}
              <span className="font-bold text-pink-400">
                {formatCurrency(payload[1]?.value)}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              متوسط السعر:{" "}
              <span className="font-bold text-yellow-400">
                {formatCurrency(payload[1]?.value / payload[0]?.value)}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-[#8b5cf61a] to-[#ec48990d] backdrop-blur-md border border-[#8b5cf64d] rounded-2xl p-5 h-auto">
      
      {/* Header */}
      <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            📊 تحليل حجوزات الفنادق
          </h2>
          <p className="text-sm text-gray-400">
            إجمالي الإيرادات:{" "}
            <span className="font-semibold text-purple-400">
              {formatCurrency(statistics.totalRevenue)}
            </span>
          </p>
        </div>
        
        {statistics.peakMonth && (
          <div className="px-3 py-1 border rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
            <p className="text-xs text-yellow-300">
              🏆 الشهر الأكثر حجوزات: {statistics.peakMonth} ({statistics.maxBookings} حجز)
            </p>
          </div>
        )}
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#ffffff10"
                vertical={false}
              />
              
              <XAxis 
                dataKey="month" 
                stroke="#aaa"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              
              <YAxis 
                yAxisId="left"
                stroke="#aaa"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickFormatter={(value) => formatNumber(value)}
              />
              
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#aaa"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickFormatter={(value) => formatCurrency(value)}
              />

              <Tooltip content={<CustomTooltip />} />
              
              <Legend
                wrapperStyle={{ color: "#cbd5e1" }}
                formatter={(value) => {
                  const labels = {
                    bookings: "عدد الحجوزات",
                    revenue: "الإيرادات"
                  };
                  return <span className="text-gray-300">{labels[value] || value}</span>;
                }}
              />

              <Bar
                yAxisId="left"
                dataKey="bookings"
                name="bookings"
                barSize={30}
                fill="#8b5cf6"
                radius={[10, 10, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                name="revenue"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ r: 5, fill: "#ec4899", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
                animationDuration={1500}
                animationBegin={500}
              />
            </ComposedChart>
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
          <p className="mt-1 text-xs text-gray-500">قم بإضافة حجوزات فنادق أولاً</p>
        </div>
      )}

      {/* إحصائيات سريعة أسفل الرسم البياني */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-3 gap-3 pt-4 mt-6 border-t border-purple-500/20">
          <div className="text-center">
            <p className="text-xs text-gray-400">إجمالي الحجوزات</p>
            <p className="text-lg font-bold text-white">{statistics.totalBookings}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">متوسط السعر</p>
            <p className="text-lg font-bold text-yellow-400">
              {formatCurrency(statistics.averageRevenue)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">عدد الأشهر</p>
            <p className="text-lg font-bold text-purple-400">{chartData.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}