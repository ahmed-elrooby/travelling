"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FaTachometerAlt, 
  FaPlane, 
  FaHotel, 
  FaCar, 
  FaUserCircle,
  FaGem,
  FaHeart,
  FaHeadset,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChartLine,
  FaWallet,
  FaPercent,
  FaUserPlus
} from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { Auth } from "@/app/Providers/AuthContext/AuthProvider";

const Aside = () => {
  const {profile,handleLogoutFun}=useContext(Auth)
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

  // قائمة الروابط - Client Dashboard
  const navItems = [
    {
      section: "القائمة الرئيسية",
      items: [
        {
          name: "لوحة التحكم",
          href: "/Client",
          icon: FaTachometerAlt,
          badge: null,
        },
        {
          name: "حجوزاتي",
          href: "/Client/MyBookingPage",
          icon: FaPlane,
          badge: null,
        },
        {
          name: "فنادقي",
          href: "/Client/HotelsPage",
          icon: FaHotel,
          badge: null,
        },
        {
          name: "سياراتي المستأجرة",
          href: "/Client/CarsPage",
          icon: FaCar,
          badge: null,
        }
      ],
    },
    {
      section: "الحساب",
      items: [
        {
          name: "ملفي الشخصي",
          href: "/dashboard/profile",
          icon: FaUserCircle,
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
      case "green":
        return "bg-green-500/20 text-green-400";
      case "red":
        return "bg-red-500/20 text-red-400";
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

      {/* Sidebar - Client Dashboard */}
      <aside
        className={`
          fixed top-0 right-0 h-full
          w-80
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
        <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-full opacity-50 blur-xl animate-pulse"></div>
              <div className="relative z-10">
                <GiCommercialAirplane className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text neon-text">
                وكالة السفر
              </h1>
              <p className="text-xs text-gray-400">Client Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-6">
          {navItems.map((section, idx) => (
            <div key={idx}>
              <p className="px-3 mb-3 text-xs tracking-wider text-gray-500 uppercase">
                {section.section}
              </p>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl
                        transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg shadow-purple-500/10 border border-purple-500/30 sidebar-active"
                            : "text-gray-300 hover:text-white hover:bg-white/5 sidebar-item-premium"
                        }
                      `}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-purple-400" : "text-gray-500 group-hover:text-purple-400"
                        } transition-colors`}
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
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 m-4 transition-all duration-300 border rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 glass-premium">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=${profile?.name}&size=40&rounded=true&bold=true&length=2`}
                alt="Client"
                className="object-cover w-10 h-10 rounded-full ring-2 ring-purple-500"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white"> {profile?.name}</p>
              <p className="text-xs text-gray-400">عميل B2C</p>
            </div>
            <button onClick={handleLogoutFun} className="p-2 transition-colors rounded-lg hover:bg-red-500/10 group">
              <FaSignOutAlt className="w-4 h-4 text-gray-500 transition-colors cursor-pointer group-hover:text-purple-400" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;