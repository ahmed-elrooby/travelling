"use client"
import { Admin } from '@/app/Providers/AdminContext/AdminProvider'
import React, { useContext } from 'react'
import { FiBriefcase, FiTrendingUp, FiDollarSign, FiPercent } from 'react-icons/fi'

const Cards = () => {
const {B2B}=useContext(Admin)
console.log(B2B)
  const stats = [
    {
      title: "إجمالي الوكلاء",
      value: "47",
      icon: FiBriefcase,
      iconColor: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      title: "إجمالي مبيعاتهم",
      value: "482k$",
      icon: FiTrendingUp,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    {
      title: "العمولات المدفوعة",
      value: "96.4k$",
      icon: FiDollarSign,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      title: "متوسط العمولة",
      value: "12.5%",
      icon: FiPercent,
      iconColor: "text-pink-400",
      bgColor: "bg-pink-500/20",
      borderColor: "border-pink-500/30",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 md:mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative p-5 transition-all duration-300 border group rounded-2xl bg-slate-900/60 backdrop-blur-sm border-white/5 hover:border-white/10 hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <p className="mt-1 text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards
