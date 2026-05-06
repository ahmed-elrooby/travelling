"use client";
import { Agent } from "@/app/Providers/AgentContext/AgentProvider";
import React, { useContext, useMemo } from "react";
import { FaPlane, FaDollarSign, FaPercent, FaChartLine } from "react-icons/fa";

const Cards = () => {
  const { flightSection } = useContext(Agent);

  // حساب الإحصائيات من بيانات flightSection
  const statistics = useMemo(() => {
    if (!flightSection || flightSection?.data?.length === 0) {
      return {
        totalBookings: 0,
        totalSales: 0,
        totalCommission: 0,
        occupancyRate: 0,
      };
    }

    // إجمالي الحجوزات
    const totalBookings = flightSection?.data?.length;

    // إجمالي المبيعات (مجموع الأسعار)
    const totalSales = flightSection?.data?.reduce((sum, flight) => sum + (flight.price || 0), 0);

    // العمولات (مثال: 15% من إجمالي المبيعات)
    const commissionRate = 0.15; // 15%
    const totalCommission = totalSales * commissionRate;

    // حساب معدل الإشغال (عدد الحجوزات المؤكدة / إجمالي الحجوزات)
    const confirmedBookings = flightSection?.data?.filter(
      (flight) => flight.status === "confirmed"
    ).length;
    const occupancyRate = totalBookings > 0 
      ? ((confirmedBookings / totalBookings) * 100).toFixed(1)
      : 0;

    // إحصائيات إضافية (اختيارية)
    const cancelledBookings = flightSection?.data?.filter(
      (flight) => flight.status === "cancelled"
    ).length;
    const pendingBookings = flightSection?.data?.filter(
      (flight) => flight.status === "pending"
    ).length;

    return {
      totalBookings,
      totalSales,
      totalCommission,
      occupancyRate,
      confirmedBookings,
      cancelledBookings,
      pendingBookings,
    };
  }, [flightSection]);

  // تنسيق العملة
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cardsData = [
    {
      id: 1,
      title: "إجمالي حجوزات الطيران",
      value: statistics.totalBookings,
      icon: FaPlane,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/20",
      gradient: "from-purple-600/20 to-pink-600/10",
      suffix: " رحلة",
    },
    {
      id: 2,
      title: "إجمالي المبيعات",
      value: formatCurrency(statistics.totalSales),
      icon: FaDollarSign,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/20",
      gradient: "from-emerald-600/20 to-teal-600/10",
      suffix: "",
    },
    {
      id: 3,
      title: "عمولات الطيران",
      value: formatCurrency(statistics.totalCommission),
      icon: FaPercent,
      iconColor: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      gradient: "from-amber-600/20 to-orange-600/10",
      suffix: " (15%)",
    },
    {
      id: 4,
      title: "معدل الإشغال",
      value: `${statistics.occupancyRate}%`,
      icon: FaChartLine,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/20",
      gradient: "from-blue-600/20 to-cyan-600/10",
      suffix: "",
    },
  ];

  // كروت إضافية للإحصائيات المتقدمة (اختياري)
  const extraCards = [
    {
      id: 5,
      title: "حجوزات مؤكدة",
      value: statistics.confirmedBookings,
      icon: FaCheckCircle,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/20",
      gradient: "from-green-600/20 to-emerald-600/10",
    },
    {
      id: 6,
      title: "حجوزات ملغية",
      value: statistics.cancelledBookings,
      icon: FaTimesCircle,
      iconColor: "text-red-400",
      bgColor: "bg-red-500/20",
      gradient: "from-red-600/20 to-rose-600/10",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 my-8 sm:grid-cols-2 lg:grid-cols-4">
        {cardsData.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`group relative overflow-hidden bg-gradient-to-br ${card.gradient} backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer`}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="relative p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      {card.title}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white md:text-3xl">
                      {card.value}
                      {card.suffix && (
                        <span className="mr-1 text-sm font-normal text-gray-400">
                          {card.suffix}
                        </span>
                      )}
                    </p>
                    {/* تفاصيل إضافية صغيرة */}
                    {card.id === 1 && statistics.totalBookings > 0 && (
                      <p className="mt-1 text-xs text-gray-500">
                        {statistics.confirmedBookings} مؤكدة • {statistics.cancelledBookings} ملغية
                      </p>
                    )}
                    {card.id === 3 && (
                      <p className="mt-1 text-xs text-gray-500">
                        نسبة العمولة: 15%
                      </p>
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-xl ${card.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Icon className={`text-xl ${card.iconColor}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* كروت إضافية إذا كنت تريد عرضها */}
      {statistics.totalBookings > 0 && (
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {extraCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`group relative overflow-hidden bg-gradient-to-br ${card.gradient} backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer`}
                data-aos="fade-up"
                data-aos-delay={(index + 5) * 100}
              >
                <div className="relative p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        {card.title}
                      </p>
                      <p className="mt-2 text-2xl font-bold text-white md:text-3xl">
                        {card.value}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-xl ${card.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <Icon className={`text-xl ${card.iconColor}`} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* حالة عدم وجود بيانات */}
      {(!flightSection || flightSection.length === 0) && (
        <div className="p-8 mb-8 text-center border rounded-2xl bg-white/5 backdrop-blur-md border-white/10">
          <FaPlane className="mx-auto mb-3 text-4xl text-gray-500" />
          <p className="text-gray-400">لا توجد حجوزات طيران لعرض الإحصائيات</p>
        </div>
      )}
    </>
  );
};

// إضافة الأيقونات المفقودة
const FaCheckCircle = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const FaTimesCircle = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;

export default Cards;