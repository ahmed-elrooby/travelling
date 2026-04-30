"use client";

import { Admin } from '@/app/Providers/AdminContext/AdminProvider'
import React, { useContext } from 'react'
import { FiBriefcase, FiTrendingUp, FiDollarSign, FiPercent } from 'react-icons/fi'

const colorStyles = {
  yellow: {
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    glow: "bg-yellow-500/10"
  },
  green: {
    bg: "bg-green-500/20",
    border: "border-green-500/30",
    text: "text-green-400",
    glow: "bg-green-500/10"
  },
  purple: {
    bg: "bg-purple-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
    glow: "bg-purple-500/10"
  },
  pink: {
    bg: "bg-pink-500/20",
    border: "border-pink-500/30",
    text: "text-pink-400",
    glow: "bg-pink-500/10"
  },
}

const Cards = () => {
  const { B2B } = useContext(Admin)

  const kpis = B2B?.data?.kpis

  const stats = [
    {
      title: "إجمالي الوكلاء",
      value: kpis?.totalAgencies,
      icon: FiBriefcase,
      color: "yellow"
    },
    {
      title: "إجمالي المبيعات",
      value: kpis?.totalRevenue,
      suffix: "$",
      icon: FiTrendingUp,
      color: "green"
    },
    {
      title: "إجمالي العمولات",
      value: kpis?.totalCommission,
      suffix: "$",
      icon: FiDollarSign,
      color: "purple"
    },
    {
      title: "متوسط العمولة",
      value: kpis?.avgCommissionRate,
      suffix: "%",
      icon: FiPercent,
      color: "pink"
    },
  ]

  if (!kpis) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-28 bg-slate-800 animate-pulse rounded-2xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 md:mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const style = colorStyles[stat.color]

        return (
          <div
            key={index}
            className="relative overflow-hidden p-5 border rounded-2xl bg-gradient-to-br from-slate-900/70 to-slate-800/50 backdrop-blur-xl border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/5"
          >
            {/* glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${style.glow} blur-3xl`} />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>

                <p className="mt-2 text-2xl md:text-3xl font-bold text-white">
                  {stat.value?.toLocaleString() ?? 0}
                  <span className="text-sm ml-1 text-gray-400">
                    {stat.suffix || ""}
                  </span>
                </p>
              </div>

              <div className={`p-3 rounded-xl ${style.bg} border ${style.border}`}>
                <Icon className={`w-5 h-5 ${style.text}`} />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        )
      })}
    </div>
  )
}

export default Cards