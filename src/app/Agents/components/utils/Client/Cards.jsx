"use client";
import React from 'react'
import { FaUsers, FaUserCheck, FaCalendarAlt, FaChartLine, FaArrowUp } from 'react-icons/fa'

const Cards = () => {
    
    const cardsData = [
        {
            id: 1,
            title: "إجمالي العملاء",
            value: "8",
            icon: FaUsers,
            iconColor: "text-purple-400",
            bgColor: "bg-purple-500/20",
            trend: "+18%"
        },
        {
            id: 2,
            title: "عملاء نشطون (حجوزات)",
            value: "8",
            icon: FaUserCheck,
            iconColor: "text-green-400",
            bgColor: "bg-green-500/20",
            trend: "+2"
        },
        {
            id: 3,
            title: "إجمالي الحجوزات",
            value: "69",
            icon: FaCalendarAlt,
            iconColor: "text-blue-400",
            bgColor: "bg-blue-500/20",
            trend: "+23%"
        },
        {
            id: 4,
            title: "إجمالي الإنفاق",
            value: "$68,380",
            icon: FaChartLine,
            iconColor: "text-yellow-400",
            bgColor: "bg-yellow-500/20",
            trend: "+15%"
        }
    ]

    return (
        <div className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {cardsData.map((card, index) => {
                const Icon = card.icon
                return (
                    <div
                        key={card.id}
                        className="relative overflow-hidden transition-all duration-500 border cursor-pointer group bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border-white/10 rounded-2xl hover:scale-105 hover:shadow-2xl"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        <div className="relative p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-400">
                                        {card.title}
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-white">
                                        {card.value}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaArrowUp className="text-xs text-green-400" />
                                        <span className="text-xs text-green-400">{card.trend}</span>
                                        <span className="text-xs text-gray-500">عن الشهر الماضي</span>
                                    </div>
                                </div>
                                <div className={`p-2.5 rounded-xl ${card.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                    <Icon className={`text-2xl ${card.iconColor}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Cards