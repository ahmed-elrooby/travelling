"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaPlane,
  FaHotel,
  FaCar,
  FaUsers,
  FaBuilding,
  FaUserCheck,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { GiCommercialAirplane } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { Auth } from "@/app/Providers/AuthContext/AuthProvider";

const Aside = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
    const {profile,handleLogoutFun}=useContext(Auth)


  const navItems = [
    {
      section: "الرئيسية",
      items: [
        {
          name: "لوحة التحكم",
          href: "/Admin",
          icon: FaTachometerAlt,
          icon2: FaChartLine,
        },
      ],
    },
    {
      section: "الحجوزات",
      items: [
        {
          name: "حجوزات الطيران",
          href: "/Admin/BookingPage",
          icon: FaPlane,
          badge: "1.2k",
          badgeColor: "purple",
        },
        {
          name: "حجوزات الفنادق",
          href: "/Admin/HotelPage",
          icon: FaHotel,
          badge: "892",
          badgeColor: "pink",
        },
        {
          name: "السيارات والتأجير",
          href: "/Admin/CarsPage",
          icon: FaCar,
          badge: "156",
          badgeColor: "blue",
        },
      ],
    },
    {
      section: "المستخدمين",
      items: [
        {
          name: "جميع المستخدمين",
          href: "/Admin/UsersPage",
          icon: FaUsers,
        },
        {
          name: "الوكلاء B2B",
          href: "/Admin/AgentsPage",
          icon: FaBuilding,
        },
        {
          name: "العملاء B2C",
          href: "/Admin/ClientPage",
          icon: FaUserCheck,
        },
      ],
    },
  ];

  const getBadgeColor = (color) => {
    switch (color) {
      case "purple":
        return "bg-purple-500/20 text-purple-400";
      case "pink":
        return "bg-pink-500/20 text-pink-400";
      case "blue":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <>
      {/* زرار الموبايل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 p-2 text-purple-400 bg-gray-800 border rounded-lg top-4 right-4 border-purple-500/30 md:hidden"
      >
        {isOpen ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMenu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-72
          bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800
          shadow-2xl z-40
          flex flex-col
          transition-transform duration-300 ease-in-out
          overflow-y-auto
          border-l border-purple-500/20

          ${isOpen ? "translate-x-0" : "translate-x-full"}

          md:translate-x-0 md:static md:block
        `}
      >
        {/* Header */}
        <div className="p-4 border-b md:p-6 border-purple-500/20 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-full opacity-50 blur-xl animate-pulse"></div>
              <div className="relative z-10">
                <GiCommercialAirplane className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-transparent md:text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                وكالة السفر
              </h1>
              <p className="text-xs text-gray-400">Admin Dashboard Pro</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-4 md:py-8 md:px-4 md:space-y-6">
          {navItems.map((section, idx) => (
            <div key={idx}>
              <p className="px-3 mb-2 text-xs tracking-wider text-gray-500 uppercase md:mb-3">
                {section.section}
              </p>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const Icon2 = item.icon2;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl
                        transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg shadow-purple-500/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive
                            ? "text-purple-400"
                            : "text-gray-500 group-hover:text-purple-400"
                        }`}
                      />

                      <span className="flex-1 text-sm font-medium">
                        {item.name}
                      </span>

                      {item.badge && (
                        <span
                          className={`${getBadgeColor(
                            item.badgeColor
                          )} text-xs px-2 py-0.5 rounded-full font-medium`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {Icon2 && isActive && (
                        <Icon2 className="text-xs text-purple-400 opacity-70" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Profile */}
        <div className="p-4 m-4 border rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-purple-500/20">
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=Admin"
              className="w-10 h-10 rounded-full ring-2 ring-purple-500"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{profile.name}</p>
              <p className="text-xs text-gray-400">{profile?.email}</p>
            </div>
            <button onClick={handleLogoutFun} className="p-2 rounded-lg hover:bg-red-500/10">
              <FaSignOutAlt className="text-gray-400 hover:text-red-400" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;