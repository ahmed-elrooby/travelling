"use client";

import { FaUsers, FaBuilding, FaUserFriends, FaChartLine } from "react-icons/fa";

export default function UsersStats() {
  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "1,284",
      icon: FaUsers,
      iconColor: "text-purple-400",
      bg: "bg-purple-500/20",
      delay: 100,
    },
    {
      title: "الوكلاء B2B",
      value: "47",
      icon: FaBuilding,
      iconColor: "text-pink-400",
      bg: "bg-pink-500/20",
      delay: 200,
    },
    {
      title: "العملاء B2C",
      value: "892",
      icon: FaUserFriends,
      iconColor: "text-green-400",
      bg: "bg-green-500/20",
      delay: 300,
    },
    {
      title: "مستخدمين جدد (هذا الشهر)",
      value: "+124",
      icon: FaChartLine,
      iconColor: "text-yellow-400",
      bg: "bg-yellow-500/20",
      delay: 400,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={item.delay}
            className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10"
          >
            <div className="flex justify-between items-center">
              
              {/* Text */}
              <div>
                <p className="text-gray-400 text-sm">{item.title}</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {item.value}
                </p>
              </div>

              {/* Icon */}
              <div className={`${item.bg} p-3 rounded-xl`}>
                <Icon className={`${item.iconColor} text-xl`} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}