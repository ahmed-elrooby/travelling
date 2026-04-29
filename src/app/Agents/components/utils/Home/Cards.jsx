import React from 'react'
import { FaArrowUp, FaArrowDown, FaCalendarCheck, FaChartLine, FaPercent, FaUserPlus, FaUsers } from 'react-icons/fa'

const Cards = () => {
    const cardsData = [
        {
            id: 1,
            title: "إجمالي الحجوزات",
            value: "292",
            unit: "",
            change: "+18%",
            changeType: "up",
            comparison: "عن الشهر الماضي",
            icon: FaCalendarCheck,
            color: "purple",
            progress: "100",
            delay: "100"
        },
        {
            id: 2,
            title: "إجمالي المبيعات",
            value: "142.8",
            unit: "k$",
            change: "+12%",
            changeType: "up",
            comparison: "عن الشهر الماضي",
            icon: FaChartLine,
            color: "green",
            progress: "75",
            delay: "200"
        },
        {
            id: 3,
            title: "العمولات المستحقة",
            value: "21,420",
            unit: "$",
            change: "15%",
            changeType: "neutral",
            comparison: "نسبة العمولة",
            icon: FaPercent,
            color: "yellow",
            progress: "66",
            delay: "300"
        },
        {
            id: 4,
            title: "العملاء النشطون",
            value: "156",
            unit: "",
            change: "+12",
            changeType: "up",
            comparison: "هذا الشهر",
            icon: FaUsers,
            color: "blue",
            progress: "50",
            delay: "400"
        }
    ]

    const colorStyles = {
        purple: {
            bg: "from-purple-600/20 to-pink-600/10",
            border: "border-purple-500/30",
            iconBg: "bg-purple-500/20",
            iconColor: "text-purple-400",
            progressBg: "bg-purple-500/50",
            glow: "shadow-purple-500/20"
        },
        green: {
            bg: "from-emerald-600/20 to-teal-600/10",
            border: "border-emerald-500/30",
            iconBg: "bg-emerald-500/20",
            iconColor: "text-emerald-400",
            progressBg: "bg-emerald-500/50",
            glow: "shadow-emerald-500/20"
        },
        yellow: {
            bg: "from-amber-600/20 to-orange-600/10",
            border: "border-amber-500/30",
            iconBg: "bg-amber-500/20",
            iconColor: "text-amber-400",
            progressBg: "bg-amber-500/50",
            glow: "shadow-amber-500/20"
        },
        blue: {
            bg: "from-blue-600/20 to-cyan-600/10",
            border: "border-blue-500/30",
            iconBg: "bg-blue-500/20",
            iconColor: "text-blue-400",
            progressBg: "bg-blue-500/50",
            glow: "shadow-blue-500/20"
        }
    }

    return (
        <div className="grid grid-cols-1 gap-6 mt-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {cardsData.map((card) => {
                const Icon = card.icon
                const styles = colorStyles[card.color]
                return (
                    <div
                        key={card.id}
                        className={`group relative overflow-hidden bg-gradient-to-br ${styles.bg} backdrop-blur-md border ${styles.border} rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${styles.glow} hover:shadow-lg cursor-pointer`}
                        data-aos="fade-up"
                        data-aos-delay={card.delay}
                    >
                        {/* Animated Background Effect */}
                        <div className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/5 to-transparent"></div>
                        
                        <div className="relative p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm font-medium tracking-wide text-gray-400">{card.title}</p>
                                    <div className="flex items-baseline gap-1 mt-2">
                                        <p className="text-3xl font-bold text-white">{card.value}</p>
                                        {card.unit && <span className="text-lg font-semibold text-gray-400">{card.unit}</span>}
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        {card.changeType === 'up' && (
                                            <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-green-400 bg-green-500/20 rounded-full">
                                                <FaArrowUp className="text-[10px]" />
                                                {card.change}
                                            </span>
                                        )}
                                        {card.changeType === 'down' && (
                                            <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-red-400 bg-red-500/20 rounded-full">
                                                <FaArrowDown className="text-[10px]" />
                                                {card.change}
                                            </span>
                                        )}
                                        {card.changeType === 'neutral' && (
                                            <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-yellow-400 bg-yellow-500/20 rounded-full">
                                                {card.change}
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-500">{card.comparison}</span>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-xl ${styles.iconBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                    <Icon className={`text-xl ${styles.iconColor}`} />
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="relative mt-4">
                                <div className="w-full h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${styles.progressBg} transition-all duration-1000 ease-out relative`}
                                        style={{ width: `${card.progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                    </div>
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