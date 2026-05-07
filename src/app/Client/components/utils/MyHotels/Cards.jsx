"use client";

import { Clients } from "@/app/Providers/ClientContext/ClientsProviders";
import React, { useContext, useMemo } from "react";
import {
  FaHotel,
  FaCalendarWeek,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const Cards = () => {
  const { BookingsHotels } = useContext(Clients);

  // ✅ حساب الإحصائيات
  const stats = useMemo(() => {
    if (!BookingsHotels || BookingsHotels.length === 0) {
      return {
        totalBookings: 0,
        upcomingNights: 0,
        freeCancellation: 0,
        confirmedBookings: 0,
      };
    }

    const totalBookings = BookingsHotels.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ✅ الليالي القادمة
    const upcomingNights = BookingsHotels.reduce((sum, booking) => {
      const checkOut = new Date(booking.checkOut);

      if (checkOut >= today) {
        const checkIn = new Date(booking.checkIn);

        const nights = Math.ceil(
          (checkOut - checkIn) / (1000 * 60 * 60 * 24)
        );

        return sum + (nights > 0 ? nights : 1);
      }

      return sum;
    }, 0);

    // ✅ الإلغاء المجاني
    const freeCancellation = BookingsHotels.filter(
      (booking) =>
        booking.status === "refunded" ||
        booking.status === "pending"
    ).length;

    // ✅ الحجوزات المؤكدة
    const confirmedBookings = BookingsHotels.filter(
      (booking) => booking.status === "confirmed"
    ).length;

    return {
      totalBookings,
      upcomingNights,
      freeCancellation,
      confirmedBookings,
    };
  }, [BookingsHotels]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        
        {/* إجمالي الحجوزات */}
        <div className="p-4 transition-all duration-300 border bg-white/5 backdrop-blur-md border-white/10 rounded-2xl hover:scale-105 hover:border-pink-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 md:text-sm">
                إجمالي حجوزات الفنادق
              </p>

              <p className="mt-1 text-2xl font-bold text-white md:text-3xl">
                {stats.totalBookings}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-pink-500/20">
              <FaHotel className="text-xl text-pink-400" />
            </div>
          </div>
        </div>

        {/* الليالي القادمة */}
        <div className="p-4 transition-all duration-300 border bg-white/5 backdrop-blur-md border-white/10 rounded-2xl hover:scale-105 hover:border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 md:text-sm">
                ليالي الحجز القادمة
              </p>

              <p className="mt-1 text-2xl font-bold text-green-400 md:text-3xl">
                {stats.upcomingNights}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-green-500/20">
              <FaCalendarWeek className="text-xl text-green-400" />
            </div>
          </div>
        </div>

        {/* الحجوزات المؤكدة */}
        <div className="p-4 transition-all duration-300 border bg-white/5 backdrop-blur-md border-white/10 rounded-2xl hover:scale-105 hover:border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 md:text-sm">
                الحجوزات المؤكدة
              </p>

              <p className="mt-1 text-2xl font-bold text-yellow-400 md:text-3xl">
                {stats.confirmedBookings}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-yellow-500/20">
              <FaCheckCircle className="text-xl text-yellow-400" />
            </div>
          </div>
        </div>

        {/* الإلغاء المجاني */}
        <div className="p-4 transition-all duration-300 border bg-white/5 backdrop-blur-md border-white/10 rounded-2xl hover:scale-105 hover:border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 md:text-sm">
                خيارات الإلغاء المجاني
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-400 md:text-3xl">
                {stats.freeCancellation}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/20">
              <FaShieldAlt className="text-xl text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;