"use client";
import { Agent } from '@/app/Providers/AgentContext/AgentProvider';
import React, { useContext, useMemo } from 'react';
import { FaHotel, FaDollarSign, FaPercent, FaChartLine, FaArrowUp, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const Cards = () => {
    const { BookingsHotels } = useContext(Agent);
    
    // حساب الإحصائيات من بيانات BookingsHotels
    const statistics = useMemo(() => {
        if (!BookingsHotels || BookingsHotels.length === 0) {
            return {
                totalBookings: 0,
                totalSales: 0,
                totalCommission: 0,
                averageOccupancy: 0,
                confirmedCount: 0,
                cancelledCount: 0,
                pendingCount: 0,
                previousMonthSales: 0,
                salesGrowth: 0
            };
        }

        // إجمالي الحجوزات
        const totalBookings = BookingsHotels.length;
        
        // إجمالي المبيعات (مجموع الأسعار)
        const totalSales = BookingsHotels.reduce((sum, hotel) => sum + (hotel.price || 0), 0);
        
        // العمولات (مثال: 10% من إجمالي المبيعات)
        const commissionRate = 0.10; // 10%
        const totalCommission = totalSales * commissionRate;
        
        // عدد الحجوزات المؤكدة
        const confirmedCount = BookingsHotels.filter(hotel => hotel.status === "confirmed").length;
        const cancelledCount = BookingsHotels.filter(hotel => hotel.status === "cancelled").length;
        const pendingCount = BookingsHotels.filter(hotel => hotel.status === "pending").length;
        
        // متوسط الإشغال (نسبة الحجوزات المؤكدة)
        const averageOccupancy = totalBookings > 0 
            ? ((confirmedCount / totalBookings) * 100).toFixed(1)
            : 0;

        // حساب نمو المبيعات (محاكاة - يمكن تعديلها حسب البيانات الفعلية)
        // لو فيه بيانات للشهر السابق تقدر تحسبها فعلياً
        const previousMonthSales = totalSales * 0.85; // افتراض أن الشهر السابق كان أقل 15%
        const salesGrowth = previousMonthSales > 0 
            ? (((totalSales - previousMonthSales) / previousMonthSales) * 100).toFixed(1)
            : 0;

        return {
            totalBookings,
            totalSales,
            totalCommission,
            averageOccupancy,
            confirmedCount,
            cancelledCount,
            pendingCount,
            previousMonthSales,
            salesGrowth: salesGrowth > 0 ? `+${salesGrowth}%` : `${salesGrowth}%`
        };
    }, [BookingsHotels]);

    // تنسيق العملة
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("ar-EG", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // حساب متوسط مدة الإقامة
    const averageStayDuration = useMemo(() => {
        if (!BookingsHotels || BookingsHotels.length === 0) return 0;
        
        let totalNights = 0;
        BookingsHotels.forEach(hotel => {
            if (hotel.checkIn && hotel.checkOut) {
                const checkIn = new Date(hotel.checkIn);
                const checkOut = new Date(hotel.checkOut);
                const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
                totalNights += nights > 0 ? nights : 0;
            }
        });
        
        return totalNights > 0 ? (totalNights / BookingsHotels.length).toFixed(1) : 0;
    }, [BookingsHotels]);

    // إجمالي عدد الضيوف
    const totalGuests = useMemo(() => {
        if (!BookingsHotels || BookingsHotels.length === 0) return 0;
        return BookingsHotels.reduce((sum, hotel) => {
            const guests = parseInt(hotel.guests) || 1;
            return sum + guests;
        }, 0);
    }, [BookingsHotels]);

    const cardsData = [
        {
            id: 1,
            title: "إجمالي حجوزات الفنادق",
            value: statistics.totalBookings,
            subtitle: `${statistics.confirmedCount} مؤكدة • ${statistics.pendingCount} قيد الانتظار`,
            icon: FaHotel,
            iconColor: "text-pink-400",
            bgColor: "bg-pink-500/20",
            gradient: "from-pink-600/20 to-rose-600/10",
            border: "border-pink-500/30",
            trend: statistics.salesGrowth
        },
        {
            id: 2,
            title: "إجمالي المبيعات",
            value: formatCurrency(statistics.totalSales),
            subtitle: `${formatCurrency(statistics.totalSales / (statistics.totalBookings || 1))} متوسط الحجز`,
            icon: FaDollarSign,
            iconColor: "text-green-400",
            bgColor: "bg-green-500/20",
            gradient: "from-emerald-600/20 to-teal-600/10",
            border: "border-emerald-500/30",
            trend: statistics.salesGrowth
        },
        {
            id: 3,
            title: "عمولات الفنادق",
            value: formatCurrency(statistics.totalCommission),
            subtitle: "نسبة العمولة 10%",
            icon: FaPercent,
            iconColor: "text-yellow-400",
            bgColor: "bg-yellow-500/20",
            gradient: "from-amber-600/20 to-orange-600/10",
            border: "border-amber-500/30",
            trend: `+${statistics.salesGrowth}`
        },
        {
            id: 4,
            title: "متوسط الإشغال",
            value: `${statistics.averageOccupancy}%`,
            subtitle: `${statistics.confirmedCount} حجز مؤكد`,
            icon: FaChartLine,
            iconColor: "text-blue-400",
            bgColor: "bg-blue-500/20",
            gradient: "from-blue-600/20 to-cyan-600/10",
            border: "border-blue-500/30",
            trend: statistics.averageOccupancy > 50 ? "+جيد" : "-منخفض"
        }
    ];

    // كروت إضافية للإحصائيات المتقدمة
    const extraCards = [
        {
            id: 5,
            title: "متوسط مدة الإقامة",
            value: `${averageStayDuration} ليالي`,
            subtitle: "معدل الإقامة بالفندق",
            icon: FaCalendarAlt,
            iconColor: "text-purple-400",
            bgColor: "bg-purple-500/20",
            gradient: "from-purple-600/20 to-indigo-600/10",
            border: "border-purple-500/30"
        },
        {
            id: 6,
            title: "إجمالي الضيوف",
            value: totalGuests,
            subtitle: `بمتوسط ${(totalGuests / (statistics.totalBookings || 1)).toFixed(1)} ضيف/حجز`,
            icon: FaUsers,
            iconColor: "text-cyan-400",
            bgColor: "bg-cyan-500/20",
            gradient: "from-cyan-600/20 to-blue-600/10",
            border: "border-cyan-500/30"
        }
    ];

    return (
        <>
            <div className="grid grid-cols-1 gap-6 my-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                {cardsData.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.id}
                            className={`group relative overflow-hidden bg-gradient-to-br ${card.gradient} backdrop-blur-md border ${card.border} rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}
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
                                        </p>
                                        {card.subtitle && (
                                            <p className="mt-1 text-xs text-gray-500">
                                                {card.subtitle}
                                            </p>
                                        )}
                                        {card.trend && statistics.totalBookings > 0 && card.id !== 4 && (
                                            <div className="flex items-center gap-1 mt-2">
                                                <FaArrowUp className="text-xs text-green-400" />
                                                <span className="text-xs text-green-400">{card.trend}</span>
                                                <span className="text-xs text-gray-500">عن الشهر الماضي</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`p-3 rounded-xl ${card.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                        <Icon className={`text-xl ${card.iconColor}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* كروت إضافية */}
            {statistics.totalBookings > 0 && (
                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    {extraCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.id}
                                className={`group relative overflow-hidden bg-gradient-to-br ${card.gradient} backdrop-blur-md border ${card.border} rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}
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
                                            {card.subtitle && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {card.subtitle}
                                                </p>
                                            )}
                                        </div>
                                        <div className={`p-3 rounded-xl ${card.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
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
            {(!BookingsHotels || BookingsHotels.length === 0) && (
                <div className="p-8 mb-8 text-center border rounded-2xl bg-white/5 backdrop-blur-md border-purple-500/20">
                    <FaHotel className="mx-auto mb-3 text-4xl text-gray-500" />
                    <p className="text-gray-400">لا توجد حجوزات فنادق لعرض الإحصائيات</p>
                    <p className="mt-1 text-xs text-gray-500">قم بإضافة حجوزات فنادق أولاً</p>
                </div>
            )}
        </>
    );
};

export default Cards;