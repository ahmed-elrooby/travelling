"use client";

import { Agent } from "@/app/Providers/AgentContext/AgentProvider";
import { useContext, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function HotelOccupancyChart() {
  const { BookingsHotels } = useContext(Agent);

  // تحليل البيانات ديناميكياً من BookingsHotels
  const chartData = useMemo(() => {
    if (!BookingsHotels || BookingsHotels.length === 0) {
      return [];
    }

    // أيام الأسبوع بالعربية
    const weekDays = {
      0: "الأحد",
      1: "الإثنين",
      2: "الثلاثاء",
      3: "الأربعاء",
      4: "الخميس",
      5: "الجمعة",
      6: "السبت",
    };

    // تهيئة البيانات لكل يوم من أيام الأسبوع
    const dailyData = {};
    for (let i = 0; i < 7; i++) {
      dailyData[i] = {
        day: weekDays[i],
        dayIndex: i,
        occupancy: 0,
        profit: 0,
        bookings: 0,
        totalNights: 0,
        maxOccupancy: 100, // افتراض أن الحد الأقصى للإشغال 100%
      };
    }

    // تجميع الحجوزات حسب اليوم
    BookingsHotels.forEach((booking) => {
      if (!booking.checkIn) return;

      const checkIn = new Date(booking.checkIn);
      const checkOut = booking.checkOut ? new Date(booking.checkOut) : new Date(checkIn);
      const dayOfWeek = checkIn.getDay(); // 0-6
      const price = booking.price || 0;
      
      // حساب عدد الليالي للإشغال
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const nightsCount = nights > 0 ? nights : 1;

      if (dailyData[dayOfWeek]) {
        dailyData[dayOfWeek].bookings += 1;
        dailyData[dayOfWeek].profit += price;
        dailyData[dayOfWeek].totalNights += nightsCount;
      }
    });

    // حساب نسبة الإشغال (افتراض أن كل حجز يمثل غرفة واحدة)
    // يمكن تعديل maxOccupancy حسب عدد الغرف في الفندق
    const maxRooms = 50; // افتراض أن الفندق لديه 50 غرفة - يمكن تعديلها
    
    Object.keys(dailyData).forEach((day) => {
      const data = dailyData[day];
      // الإشغال = (عدد الليالي المحجوزة / (عدد الغرف * 4 أسابيع تقريباً)) * 100
      // أو طريقة مبسطة: نسبة من الحد الأقصى للغرف
      const occupancyRate = data.bookings > 0 
        ? Math.min(100, (data.bookings / maxRooms) * 100)
        : 0;
      data.occupancy = Math.round(occupancyRate);
    });

    // ترتيب الأيام من السبت إلى الجمعة حسب الطلب العربي
    const orderedDays = [6, 0, 1, 2, 3, 4, 5]; // السبت, الأحد, ..., الجمعة
    const result = orderedDays.map(dayIndex => ({
      ...dailyData[dayIndex],
      day: dailyData[dayIndex]?.day || weekDays[dayIndex],
    }));

    return result;
  }, [BookingsHotels]);

  // إحصائيات إضافية
  const statistics = useMemo(() => {
    if (!chartData.length) {
      return {
        averageOccupancy: 0,
        totalProfit: 0,
        bestDay: null,
        bestDayOccupancy: 0,
      };
    }

    let totalOccupancy = 0;
    let totalProfit = 0;
    let bestDay = null;
    let bestDayOccupancy = 0;

    chartData.forEach((day) => {
      totalOccupancy += day.occupancy;
      totalProfit += day.profit;
      if (day.occupancy > bestDayOccupancy) {
        bestDayOccupancy = day.occupancy;
        bestDay = day.day;
      }
    });

    return {
      averageOccupancy: (totalOccupancy / chartData.length).toFixed(1),
      totalProfit,
      bestDay,
      bestDayOccupancy,
    };
  }, [chartData]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 border shadow-xl rounded-xl bg-gray-900/95 backdrop-blur-md border-purple-500/30">
          <p className="mb-2 font-semibold text-white">{label}</p>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-300">الإشغال:</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${payload[0]?.value || 0}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-purple-400">
                  {payload[0]?.value}%
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              الأرباح:{" "}
              <span className="font-bold text-pink-400">
                {formatCurrency(payload[1]?.value || 0)}
              </span>
            </p>
            {payload[0]?.payload?.bookings > 0 && (
              <p className="text-xs text-gray-500">
                عدد الحجوزات: {payload[0].payload.bookings}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0c29] to-[#1a1638] backdrop-blur-md border border-[#8b5cf64d] rounded-2xl p-5 h-auto">
      
      {/* Header */}
      <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            📈 الإشغال والأرباح اليومية
          </h2>
          <p className="text-sm text-gray-400">
            متوسط الإشغال:{" "}
            <span className="font-semibold text-purple-400">
              {statistics.averageOccupancy}%
            </span>
          </p>
        </div>
        
        {statistics.bestDay && (
          <div className="px-3 py-1 border rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
            <p className="text-xs text-green-300">
              🌟 أفضل يوم: {statistics.bestDay} (الإشغال {statistics.bestDayOccupancy}%)
            </p>
          </div>
        )}
      </div>

      {/* Chart */}
      {chartData.length > 0 && chartData.some(d => d.bookings > 0) ? (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#ffffff10"
                vertical={false}
              />
              
              <XAxis 
                dataKey="day" 
                stroke="#aaa"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              
              <YAxis 
                yAxisId="left"
                stroke="#aaa"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
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
                    occupancy: "نسبة الإشغال",
                    profit: "الأرباح"
                  };
                  return <span className="text-gray-300">{labels[value] || value}</span>;
                }}
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="occupancy"
                name="occupancy"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOccupancy)"
                animationDuration={1500}
                animationBegin={300}
              />

              <Area
                yAxisId="right"
                type="monotone"
                dataKey="profit"
                name="profit"
                stroke="#ec4899"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProfit)"
                animationDuration={1500}
                animationBegin={500}
              />
            </AreaChart>
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
      {chartData.length > 0 && chartData.some(d => d.bookings > 0) && (
        <div className="grid grid-cols-3 gap-3 pt-4 mt-6 border-t border-purple-500/20">
          <div className="text-center">
            <p className="text-xs text-gray-400">إجمالي الأرباح</p>
            <p className="text-lg font-bold text-pink-400">
              {formatCurrency(statistics.totalProfit)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">أعلى إشغال</p>
            <p className="text-lg font-bold text-purple-400">
              {Math.max(...chartData.map(d => d.occupancy))}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">الأيام المحجوزة</p>
            <p className="text-lg font-bold text-yellow-400">
              {chartData.filter(d => d.bookings > 0).length} / 7
            </p>
          </div>
        </div>
      )}
    </div>
  );
}