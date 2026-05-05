"use client";

import { useContext } from "react";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import {
  FaUsers,
  FaUserPlus,
  FaDollarSign,
  FaChartLine,
  FaCrown,
  FaUserCheck,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function B2CDashboard() {
  const { B2C } = useContext(Admin);

  const data = B2C?.data;

  if (!data) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  const { kpis, customerDistribution, growthLast6Months } = data;

  // Helper to get icon based on customer type
  const getCustomerIcon = (type) => {
    if (type.includes('VIP')) return <FaCrown className="text-yellow-400" />;
    if (type.includes('دائمون')) return <FaUserCheck className="text-green-400" />;
    return <FaUser className="text-blue-400" />;
  };

  // Helper to get gradient based on customer type
  const getCustomerGradient = (type) => {
    if (type.includes('VIP')) return 'from-yellow-600/20 to-amber-600/20 border-yellow-500/30';
    if (type.includes('دائمون')) return 'from-green-600/20 to-emerald-600/20 border-green-500/30';
    return 'from-blue-600/20 to-cyan-600/20 border-blue-500/30';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 min-h-screen">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
          لوحة تحكم B2C
        </h1>
        <p className="text-gray-400 mt-2">نظرة عامة على أداء العملاء والإيرادات</p>
      </motion.div>

      {/* ===== KPI CARDS ===== */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {[
          { icon: FaUsers, label: 'إجمالي العملاء', value: kpis.totalCustomers, color: 'purple', prefix: '', suffix: '' },
          { icon: FaDollarSign, label: 'إجمالي القيمة', value: kpis.totalValue, color: 'green', prefix: '', suffix: '$' },
          { icon: FaUserPlus, label: 'عملاء جدد', value: kpis.newThisMonth, color: 'blue', prefix: '+', suffix: '' },
          { icon: FaChartLine, label: 'متوسط الإنفاق', value: kpis.avgSpend, color: 'pink', prefix: '', suffix: '$' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-${item.color}-600/10 to-${item.color}-600/5 backdrop-blur-sm border border-${item.color}-500/20 hover:border-${item.color}-500/40 transition-all duration-300 shadow-xl`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16"></div>
            <item.icon className={`text-${item.color}-400 text-3xl mb-3`} />
            <p className="text-gray-400 text-sm mb-1">{item.label}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {item.prefix}{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}{item.suffix}
            </h2>
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 w-full opacity-50`}></div>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== TWO COLUMN LAYOUT ===== */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Customer Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">توزيع العملاء</h2>
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FaUsers className="text-purple-400" />
            </div>
          </div>

          <div className="space-y-4">
            {customerDistribution.map((c, i) => {
              const percentage = c.value;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="relative"
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getCustomerIcon(c.type)}
                      <span className="text-gray-300 text-sm">{c.type}</span>
                    </div>
                    <span className="text-white font-bold">{percentage}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${
                        c.type.includes('VIP') ? 'from-yellow-400 to-amber-500' :
                        c.type.includes('دائمون') ? 'from-green-400 to-emerald-500' :
                        'from-blue-400 to-cyan-500'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Distribution Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10">
            {customerDistribution.map((c, i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-gray-500 mb-1">النسبة</p>
                <p className="text-lg font-bold text-white">{c.value}%</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats / Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">ملخص سريع</h2>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaChartLine className="text-green-400" />
            </div>
          </div>

          <div className="space-y-5">
            {/* Average per customer */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20">
              <p className="text-gray-400 text-sm mb-1">متوسط القيمة لكل عميل</p>
              <p className="text-2xl font-bold text-white">
                {(kpis.totalValue / kpis.totalCustomers).toLocaleString()}$
              </p>
            </div>

            {/* Growth indicator */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20">
              <p className="text-gray-400 text-sm mb-1">نسبة العملاء الجدد</p>
              <p className="text-2xl font-bold text-white">
                {((kpis.newThisMonth / kpis.totalCustomers) * 100).toFixed(1)}%
              </p>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  style={{ width: `${(kpis.newThisMonth / kpis.totalCustomers) * 100}%` }}
                />
              </div>
            </div>

            {/* Total customer value insight */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-500/20">
              <p className="text-gray-400 text-sm mb-1">إجمالي القيمة</p>
              <p className="text-2xl font-bold text-white">
                {kpis.totalValue.toLocaleString()}$
              </p>
              <p className="text-xs text-gray-500 mt-1">جميع العملاء</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Optional: Growth Chart Summary if growthLast6Months exists */}
      {growthLast6Months && growthLast6Months.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">النمو خلال 6 أشهر</h2>
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FaChartLine className="text-purple-400" />
            </div>
          </div>
          
          <div className="flex items-end justify-between gap-2 h-40">
            {growthLast6Months.map((month, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(month.value / Math.max(...growthLast6Months.map(m => m.value))) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + idx * 0.05 }}
                  className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg"
                  style={{ height: `${(month.value / Math.max(...growthLast6Months.map(m => m.value))) * 100}%` }}
                />
                <span className="text-xs text-gray-400">{month.month || `شهر ${idx + 1}`}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}