"use client";

import React, { useState, useEffect } from "react";
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
  FaSignOutAlt 
} from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { GiCommercialAirplane } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi"; // Feather Icons
const Aside = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(true);
      } else {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navItems = [
    {
      section: "الرئيسية",
      items: [
        {
          name: "لوحة التحكم",
          href: "/Admin",
          icon: FaTachometerAlt,
          icon2: FaChartLine,
          badge: null,
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
          href: "/users/all",
          icon: FaUsers,
          badge: null,
        },
        {
          name: "الوكلاء B2B",
          href: "/Admin/AgentsPage",
          icon: FaBuilding,
          badge: null,
        },
        {
          name: "العملاء B2C",
          href: "/users/b2c",
          icon: FaUserCheck,
          badge: null,
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
      {/* Mobile Toggle Button */}
      {isMobile && (
     <button
  onClick={toggleSidebar}
  className={`fixed z-50 p-2 text-purple-400 border rounded-lg 
  ${isMobileOpen ? "top-4 right-4" : "top-4 right-4"}
  bg-gray-800/90 backdrop-blur-md border-purple-500/30 md:hidden`}
>
  {isMobileOpen ? (
    <FiX className="w-6 h-6" />
  ) : (
    <FiMenu className="w-6 h-6" />
  )}
</button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isMobileOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full
         md:w-64 lg:w-72
          bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800
          shadow-2xl z-40
          flex flex-col
          transition-all duration-300 ease-in-out
          overflow-y-auto
          border-l border-purple-500/20
          ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0 md:relative
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
                      className={`
                        flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl
                        transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg shadow-purple-500/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <Icon
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          isActive ? "text-purple-400" : "text-gray-500 group-hover:text-purple-400"
                        } transition-colors`}
                      />
                      <span className="flex-1 text-sm font-medium md:text-base">
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

        {/* User Profile */}
        <div className="p-3 m-3 transition-all duration-300 border md:p-4 md:m-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=Admin&size=40&rounded=true&bold=true&length=2"
                alt="Admin"
                className="object-cover w-10 h-10 rounded-full ring-2 ring-purple-500"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">أحمد المدير</p>
              <p className="text-xs text-gray-400 truncate">admin@travel.com</p>
            </div>
            <button className="p-2 transition-colors rounded-lg hover:bg-red-500/10 group">
              <FaSignOutAlt className="w-4 h-4 text-gray-500 transition-colors group-hover:text-red-400" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;