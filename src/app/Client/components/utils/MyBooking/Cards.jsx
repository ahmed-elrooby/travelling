"use client";

import { Clients } from '@/app/Providers/ClientContext/ClientsProviders';
import React, { useContext, useMemo } from 'react';
import { 
  FaCalendarCheck, 
  FaPlaneDeparture, 
  FaHotel, 
  FaCar 
} from 'react-icons/fa';

const Cards = () => {
  const { flightSection,BookingsHotels } = useContext(Clients);
  console.log('Flight Data:', flightSection);

  // Calculate statistics based on actual flight data
  const stats = useMemo(() => {
    if (!flightSection || flightSection.length === 0) {
      return {
        total: 0,
        upcoming: 0,
        completed: 0,
        cancelled: 0,
        hotels: 0,
        cars: 0
      };
    }

    const now = new Date();
    
    // Filter flights by status
    const upcomingFlights = flightSection.filter(flight => {
      const flightDate = new Date(flight.date);
      return flightDate >= now && flight.status !== 'cancelled';
    });

    const completedFlights = flightSection.filter(flight => {
      const flightDate = new Date(flight.date);
      return flightDate < now && flight.status !== 'cancelled';
    });

    const cancelledFlights = flightSection.filter(flight => 
      flight.status === 'cancelled'
    );

    return {
      total: flightSection.length,
      upcoming: upcomingFlights.length,
      completed: completedFlights.length,
      cancelled: cancelledFlights.length,
      hotels: BookingsHotels?.length || 0, // يمكنك ربطها ببيانات الفنادق الحقيقية
      cars: 0    // يمكنك ربطها ببيانات السيارات الحقيقية
    };
  }, [flightSection]);

  // Prepare stats array for display
  const statsDisplay = [
    {
      title: "إجمالي الحجوزات",
      value: stats.total.toString(),
      icon: FaCalendarCheck,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      valueColor: "text-white",
      delay: "100",
      subtitle: `${stats.completed} منتهية • ${stats.cancelled} ملغية`
    },
    {
      title: "رحلات قادمة",
      value: stats.upcoming.toString(),
      icon: FaPlaneDeparture,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      valueColor: "text-green-400",
      delay: "200",
      subtitle: stats.upcoming > 0 ? "رحلة قادمة" : "لا توجد رحلات قادمة"
    },
    {
      title: "فنادق محجوزة",
      value: stats.hotels.toString(),
      icon: FaHotel,
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-400",
      valueColor: "text-pink-400",
      delay: "300",
      subtitle: "قريباً"
    },
    {
      title: "سيارات مستأجرة",
      value: stats.cars.toString(),
      icon: FaCar,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      valueColor: "text-blue-400",
      delay: "400",
      subtitle: "قريباً"
    }
  ];

  // Display message if no flights
  if (!flightSection || flightSection.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="relative p-5 overflow-hidden transition-all duration-300 group rounded-2xl hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
              }}
            >
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-gray-400">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.valueColor} mt-1`}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`${stat.iconBg} p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon className={`${stat.iconColor} text-xl`} />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl"></div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <div
              key={index}
              className="relative p-5 overflow-hidden transition-all duration-300 group rounded-2xl hover:scale-105 hover:shadow-2xl stat-card"
              style={{
                background: "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
              }}
              data-aos="fade-up"
              data-aos-delay={stat.delay}
            >
              <div className="absolute inset-0 transition-opacity duration-700 -translate-x-full opacity-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 group-hover:opacity-100 group-hover:translate-x-full"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-gray-400">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.valueColor} mt-1`}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`${stat.iconBg} p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 icon-glow`}>
                  <Icon className={`${stat.iconColor} text-xl`} />
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl"></div>
            </div>
          );
        })}
      </div>
      
      {/* Optional: Recent flights summary */}
      {flightSection && flightSection.length > 0 && (
        <div className="p-4 mb-8 border border-gray-700 rounded-xl bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white">آخر الرحلات</h3>
            <span className="text-xs text-gray-400">آخر 3 حجوزات</span>
          </div>
          <div className="space-y-2">
            {flightSection.slice(0, 3).map((flight, idx) => (
              <div key={flight.id} className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-gray-300">{flight.route || 'رحلة غير محددة'}</span>
                  <span className="mr-2 text-xs text-gray-500">
                    {new Date(flight.date).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  flight.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                  flight.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {flight.status === 'cancelled' ? 'ملغي' :
                   flight.status === 'confirmed' ? 'مؤكد' : 'قيد الانتظار'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .group:hover .absolute {
          animation: slide 1s ease-in-out;
        }
        
        .stat-card {
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          transition: left 0.5s;
        }
        
        .stat-card:hover::before {
          left: 100%;
        }
      `}</style>
    </>
  );
};

export default Cards;