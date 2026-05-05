"use client";

import React from 'react';
import { 
  FaCalendarCheck, 
  FaPlaneDeparture, 
  FaHotel, 
  FaCar 
} from 'react-icons/fa';

const Cards = () => {
  const stats = [
    {
      title: "إجمالي الحجوزات",
      value: "12",
      icon: FaCalendarCheck,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      valueColor: "text-white",
      delay: "100"
    },
    {
      title: "رحلات قادمة",
      value: "2",
      icon: FaPlaneDeparture,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      valueColor: "text-green-400",
      delay: "200"
    },
    {
      title: "فنادق محجوزة",
      value: "3",
      icon: FaHotel,
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-400",
      valueColor: "text-pink-400",
      delay: "300"
    },
    {
      title: "سيارات مستأجرة",
      value: "1",
      icon: FaCar,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      valueColor: "text-blue-400",
      delay: "400"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
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
            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 transition-opacity duration-700 -translate-x-full opacity-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 group-hover:opacity-100 group-hover:translate-x-full"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-400">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.valueColor} mt-1`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.iconBg} p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 icon-glow`}>
                <Icon className={`${stat.iconColor} text-xl`} />
              </div>
            </div>
            
            {/* Glass reflection effect */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl"></div>
          </div>
        );
      })}
      
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
    </div>
  );
};

export default Cards;