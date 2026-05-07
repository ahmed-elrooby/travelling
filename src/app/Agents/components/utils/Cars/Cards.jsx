"use client"
import { Agent } from '@/app/Providers/AgentContext/AgentProvider'
import React, { useContext } from 'react'
import {
    FaCarSide,
    FaCheckCircle,
    FaClock,
    FaPercent,
    FaArrowUp
} from 'react-icons/fa'

const Cards = () => {

    const { carsSection } = useContext(Agent)

    const carsData = carsSection || []

    // ✅ Total Bookings
    const totalBookings = carsData.length

    // ✅ Active / Confirmed
    const confirmedBookings = carsData.filter(
        (item) => item.status === "confirmed"
    ).length

    // ✅ Pending
    const pendingBookings = carsData.filter(
        (item) => item.status === "pending"
    ).length

    // ✅ Total Revenue
    const totalRevenue = carsData.reduce(
        (acc, item) => acc + Number(item.price || 0),
        0
    )

    // ✅ Commission 8%
    const commission = (totalRevenue * 0.08).toFixed(0)

    const cardsData = [
        {
            id: 1,
            title: "إجمالي حجوزات السيارات",
            value: totalBookings,
            icon: FaCarSide,
            iconColor: "text-blue-400",
            bgColor: "bg-blue-500/20",
            gradient: "from-blue-600/20 to-cyan-600/10",
            trend: "+9%"
        },
        {
            id: 2,
            title: "الحجوزات المؤكدة",
            value: confirmedBookings,
            icon: FaCheckCircle,
            iconColor: "text-green-400",
            bgColor: "bg-green-500/20",
            gradient: "from-emerald-600/20 to-teal-600/10",
            trend: "+2"
        },
        {
            id: 3,
            title: "قيد الانتظار",
            value: pendingBookings,
            icon: FaClock,
            iconColor: "text-yellow-400",
            bgColor: "bg-yellow-500/20",
            gradient: "from-amber-600/20 to-orange-600/10",
            trend: "-1"
        },
        {
            id: 4,
            title: "إجمالي العمولات (8%)",
            value: `${commission} ريال`,
            icon: FaPercent,
            iconColor: "text-purple-400",
            bgColor: "bg-purple-500/20",
            gradient: "from-purple-600/20 to-pink-600/10",
            trend: "+12%"
        }
    ]

    return (
        <div className="grid grid-cols-1 gap-5 my-8 sm:grid-cols-2 lg:grid-cols-4">
            {cardsData.map((card, index) => {

                const Icon = card.icon

                return (
                    <div
                        key={card.id}
                        className={`group relative overflow-hidden bg-gradient-to-br ${card.gradient} backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl cursor-pointer`}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >

                        {/* Glow */}
                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-white/5 group-hover:opacity-100" />

                        <div className="relative p-5">

                            <div className="flex items-center justify-between">

                                {/* Content */}
                                <div>

                                    <p className="text-sm font-medium tracking-wide text-gray-400">
                                        {card.title}
                                    </p>

                                    <h3 className="mt-3 text-3xl font-bold text-white">
                                        {card.value}
                                    </h3>

                                    <div className="flex items-center gap-1 mt-3">
                                        <FaArrowUp className="text-xs text-green-400" />
                                        <span className="text-xs font-medium text-green-400">
                                            {card.trend}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            عن الشهر الماضي
                                        </span>
                                    </div>

                                </div>

                                {/* Icon */}
                                <div
                                    className={`p-3 rounded-2xl ${card.bgColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}
                                >
                                    <Icon className={`text-3xl ${card.iconColor}`} />
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