import React from 'react'
import { FaCarSide, FaCheckCircle, FaClock, FaPercent, FaArrowUp } from 'react-icons/fa'

const Cards = () => {
    
    const cardsData = [
        {
            id: 1,
            title: "إجمالي حجوزات السيارات",
            value: "8",
            icon: FaCarSide,
            iconColor: "text-blue-400",
            bgColor: "bg-blue-500/20",
            gradient: "from-blue-600/20 to-cyan-600/10",
            trend: "+9%"
        },
        {
            id: 2,
            title: "الحجوزات النشطة",
            value: "5",
            icon: FaCheckCircle,
            iconColor: "text-green-400",
            bgColor: "bg-green-500/20",
            gradient: "from-emerald-600/20 to-teal-600/10",
            trend: "+2"
        },
        {
            id: 3,
            title: "قيد الانتظار",
            value: "2",
            icon: FaClock,
            iconColor: "text-yellow-400",
            bgColor: "bg-yellow-500/20",
            gradient: "from-amber-600/20 to-orange-600/10",
            trend: "-1"
        },
        {
            id: 4,
            title: "إجمالي العمولات (8%)",
            value: "$355",
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
                        className={`group relative overflow-hidden bg-gradient-to-br ${card.gradient} backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}
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