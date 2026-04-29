"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext } from "react";
import {
  FaUsers,
  FaBuilding,
  FaUserFriends,
  FaChartLine,
} from "react-icons/fa";

export default function UsersStats() {
  const { Users } = useContext(Admin);

  console.log(Users);

  const kpis = Users?.data?.kpis;

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: kpis?.totalUsers || 0,
      icon: FaUsers,
      iconColor: "text-purple-400",
      bg: "bg-purple-500/20",
      delay: 100,
    },
    {
      title: "الوكلاء B2B",
      value: kpis?.b2bUsers || 0,
      icon: FaBuilding,
      iconColor: "text-pink-400",
      bg: "bg-pink-500/20",
      delay: 200,
    },
    {
      title: "العملاء B2C",
      value: kpis?.b2cUsers || 0,
      icon: FaUserFriends,
      iconColor: "text-green-400",
      bg: "bg-green-500/20",
      delay: 300,
    },
    {
      title: "مستخدمين جدد (هذا الشهر)",
      value: `+${kpis?.newUsersThisMonth || 0}`,
      icon: FaChartLine,
      iconColor: "text-yellow-400",
      bg: "bg-yellow-500/20",
      delay: 400,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={item.delay}
            className="
              rounded-2xl p-4 sm:p-5 
              bg-white/5 backdrop-blur-md 
              border border-white/10
              hover:scale-[1.02] transition-all duration-300
            "
          >
            <div className="flex justify-between items-center">

              {/* TEXT */}
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {item.title}
                </p>

                <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  {item.value}
                </p>
              </div>

              {/* ICON */}
              <div className={`${item.bg} p-2 sm:p-3 rounded-xl`}>
                <Icon className={`${item.iconColor} text-lg sm:text-xl`} />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}