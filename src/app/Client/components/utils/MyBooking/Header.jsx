"use client";

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaChevronLeft, 
  FaBell, 
  FaCog,
  FaSearch,
  FaUser,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaPlus,
  FaCalendarAlt,
  FaPlane,
  FaHotel,
  FaCar,
  FaChartLine,
  FaHeadset,
  FaTicketAlt
} from 'react-icons/fa';
import AddBooking from './AddBooking';
import { Clients } from '@/app/Providers/ClientContext/ClientsProviders';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const {openAddFlight,setOpenAddFlight}=useContext(Clients)
  const pathname = usePathname();
  
  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname?.split('/').pop() || '';
    const titles = {
      'MyBookingPage': 'حجوزاتي',
      'ProfilePage': 'الملف الشخصي',
      'Dashboard': 'لوحة التحكم',
      'Offers': 'العروض',
      'Settings': 'الإعدادات',
      'Support': 'الدعم الفني'
    };
    return titles[path] ;
  };
  
  const pageTitle = getPageTitle();
  
  // Get page icon
  const getPageIcon = () => {
    const path = pathname?.split('/').pop() || '';
    const icons = {
      'MyBookingPage': FaCalendarAlt,
      'ProfilePage': FaUser,
      'Dashboard': FaChartLine,
      'Offers': FaTicketAlt,
      'Settings': FaCog,
      'Support': FaHeadset
    };
    const Icon = icons[path];
    return Icon ? <Icon className="text-purple-400" /> : <FaHome className="text-purple-400" />;
  };
  
  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-mode');
  };
  
  return (
    <>
    {
      openAddFlight && (<AddBooking/>)
    }
      <div className="relative mb-8">
        {/* Animated Background Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute w-64 h-64 rounded-full -top-20 -right-20 bg-purple-500/10 blur-3xl"></div>
          <div className="absolute w-64 h-64 rounded-full -bottom-20 -left-20 bg-pink-500/10 blur-3xl"></div>
        </div>
        
        <div className="relative flex flex-col items-start justify-between gap-4 p-6 border rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-purple-500/20 sm:flex-row sm:items-center">
          
          {/* Left side - Title and Breadcrumb */}
          <div className="flex-1">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
              <Link 
                href="/Client" 
                className="flex items-center gap-1 transition-all duration-300 hover:text-purple-400 group"
              >
                <FaHome className="text-purple-400 transition-transform group-hover:scale-110" />
                <span className="text-gray-400 group-hover:text-purple-400">الرئيسية</span>
              </Link>
              
              {pathname !== '/Client' && (
                <>
                  <FaChevronLeft className="text-xs text-gray-600" />
                  <Link 
                    href="/Client/BookingsPage"
                    className="flex items-center gap-1 transition-all duration-300 hover:text-purple-400"
                  >
                    {getPageIcon()}
                    <span className={pathname?.includes('BookingsPage') ? 'text-white font-medium' : 'text-gray-400'}>
                      {pageTitle}
                    </span>
                  </Link>
                </>
              )}
              
           
            </div>
            
            {/* Title with Animation */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-3xl font-bold text-transparent sm:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text animate-gradient">
                {pageTitle}
              </h2>
              
            
            </div>
 
          </div>
          
          {/* Right side - Action Buttons */}
          <div className="flex items-center gap-3">
         
            
            {/* Add Booking Button - Always visible with multiple styles */}
            <button 
            onClick={()=>{
              setOpenAddFlight(true)
            }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg shadow-purple-500/25 group"
            >
              <FaPlus className="text-sm transition-transform duration-300 group-hover:rotate-90" />
              <span className="hidden sm:inline">حجز جديد</span>
              <span className="sm:hidden">جديد</span>
            </button>
            
         
            
            {/* Quick Stats - Time */}
            <div className="hidden px-3 py-2 border rounded-xl bg-gray-800/50 border-purple-500/20 lg:block">
              <p className="text-xs text-gray-400">التوقيت المحلي</p>
              <p className="text-sm font-medium text-white">{currentTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;