"use client";

import { Clients } from '@/app/Providers/ClientContext/ClientsProviders';
import React, { useContext } from 'react';
import { 
  FaCalendarCheck, 
  FaDollarSign, 
  FaGem, 
  FaCrown,
  FaArrowUp
} from 'react-icons/fa';

const Cards = () => {
  const {overview} = useContext(Clients)
  console.log(overview)
  const stats = [
    {
      title: "إجمالي الحجوزات",
      value: "12",
      change: "+3 هذا العام",
      icon: FaCalendarCheck,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400"
    },
    {
      title: "إجمالي الإنفاق",
      value: "12,500$",
      change: "+8%",
      icon: FaDollarSign,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400"
    },
    {
      title: "نقاط الولاء",
      value: "2,500",
      subtitle: "تكافئ 125$",
      icon: FaGem,
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
      valueColor: "text-yellow-400",
      showProgress: true
    },
    {
      title: "مستوى العضوية",
      value: "VIP",
      badge: "الذهبي",
      subtitle: "خصم 15% على جميع الرحلات",
      icon: FaCrown,
      iconBg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 my-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <div 
            key={index}
            className="relative p-5 overflow-hidden transition-all duration-300 rounded-2xl hover:scale-105 hover:shadow-2xl group animate-fadeInUp"
            style={{
              animationDelay: `${index * 100}ms`,
              background: "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            }}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <p className="mb-1 text-sm text-gray-400">{stat.title}</p>
                
                <div className="flex items-baseline gap-1 mt-1">
                  <p className={`text-3xl font-bold ${
                    stat.valueColor || 'text-white'
                  }`}>
                    {stat.value}
                  </p>
                  {stat.badge && (
                    <span className="text-sm font-medium text-purple-400">
                      {stat.badge}
                    </span>
                  )}
                </div>
                
                {stat.change && (
                  <p className="flex items-center gap-1 mt-1 text-xs text-green-400">
                    <FaArrowUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                )}
                
                {stat.subtitle && (
                  <p className="mt-1 text-xs text-gray-400">{stat.subtitle}</p>
                )}
              </div>
              
              <div className={`${stat.iconBg} p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <Icon className={`${stat.iconColor} text-xl`} />
              </div>
            </div>
            
            {stat.showProgress && (
              <div className="mt-3">
                <div className="w-full h-1 overflow-hidden bg-gray-700 rounded-full">
                  <div 
                    className="h-full transition-all duration-1000 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl"></div>
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Cards;