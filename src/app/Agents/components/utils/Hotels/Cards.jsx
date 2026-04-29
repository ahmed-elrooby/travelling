import React from 'react'
import { FaHotel, FaDollarSign, FaPercent, FaChartLine, FaArrowUp } from 'react-icons/fa'

const Cards = () => {
    
    const cardsData = [
        {
            id: 1,
            title: "إجمالي حجوزات الفنادق",
            value: "98",
            icon: FaHotel,
            iconColor: "text-pink-400",
            bgColor: "bg-pink-500/20",
            gradient: "from-pink-600/20 to-rose-600/10",
            border: "border-pink-500/30",
            trend: "+15%"
        },
        {
            id: 2,
            title: "إجمالي المبيعات",
            value: "89.6k$",
            icon: FaDollarSign,
            iconColor: "text-green-400",
            bgColor: "bg-green-500/20",
            gradient: "from-emerald-600/20 to-teal-600/10",
            border: "border-emerald-500/30",
            trend: "+8%"
        },
        {
            id: 3,
            title: "عمولات الفنادق",
            value: "8,960$",
            icon: FaPercent,
            iconColor: "text-yellow-400",
            bgColor: "bg-yellow-500/20",
            gradient: "from-amber-600/20 to-orange-600/10",
            border: "border-amber-500/30",
            trend: "+12%"
        },
        {
            id: 4,
            title: "متوسط الإشغال",
            value: "74%",
            icon: FaChartLine,
            iconColor: "text-blue-400",
            bgColor: "bg-blue-500/20",
            gradient: "from-blue-600/20 to-cyan-600/10",
            border: "border-blue-500/30",
            trend: "+5%"
        }
    ]

    return (
        <div className="grid grid-cols-1 gap-6 my-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {cardsData.map((card, index) => {
                const Icon = card.icon
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
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaArrowUp className="text-xs text-green-400" />
                                        <span className="text-xs text-green-400">{card.trend}</span>
                                        <span className="text-xs text-gray-500">عن الشهر الماضي</span>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-xl ${card.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                    <Icon className={`text-xl ${card.iconColor}`} />
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