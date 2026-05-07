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
  const { Users,User } = useContext(Admin);

  console.log(Users);
const b2bUser = User?.data?.filter(user => user.role === "b2b");
const b2cUser = User?.data?.filter(user => user.role === "b2c");
  const kpis = Users?.data?.kpis;

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value:User?.data?.length - 1 || 0,
      icon: FaUsers,
      iconColor: "text-purple-400",
      bg: "bg-purple-500/20",
      delay: 100,
    },
    {
      title: "الوكلاء B2B",
      value: b2bUser?.length || 0,
      icon: FaBuilding,
      iconColor: "text-pink-400",
      bg: "bg-pink-500/20",
      delay: 200,
    },
    {
      title: "العملاء B2C",
      value: b2cUser?.length || 0,
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
    <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">

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
            <div className="flex items-center justify-between">

              {/* TEXT */}
              <div>
                <p className="text-xs text-gray-400 sm:text-sm">
                  {item.title}
                </p>

                <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
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