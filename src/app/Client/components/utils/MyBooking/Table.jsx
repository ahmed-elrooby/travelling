"use client";
import { Clients } from '@/app/Providers/ClientContext/ClientsProviders';
import React, { useContext, useState, useMemo } from 'react';
import {
  FaHotel,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaSearch,
  FaChevronRight,
  FaChevronLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaMoneyBillWave,
  FaUserAlt,
} from 'react-icons/fa';

const Table = () => {
  const { BookingsHotels } = useContext(Clients);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // ✅ تنسيق التاريخ
  const formatDate = (date) => {
    if (!date) return '--';
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  // ✅ تنسيق السعر
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // ✅ تنسيق الحالة
  const getStatus = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          text: 'مؤكد',
          className: 'bg-green-500/20 text-green-400 border-green-500/30',
          icon: <FaCheckCircle className="text-green-400" />,
        };
      case 'pending':
        return {
          text: 'قيد الانتظار',
          className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          icon: <FaHourglassHalf className="text-yellow-400" />,
        };
      case 'cancelled':
        return {
          text: 'ملغي',
          className: 'bg-red-500/20 text-red-400 border-red-500/30',
          icon: <FaTimesCircle className="text-red-400" />,
        };
      case 'refunded':
        return {
          text: 'مسترد',
          className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          icon: <FaCheckCircle className="text-blue-400" />,
        };
      default:
        return {
          text: 'غير معروف',
          className: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          icon: <FaCheckCircle className="text-gray-400" />,
        };
    }
  };

  // ✅ فلترة البيانات بناءً على البحث والحالة
  const filteredData = useMemo(() => {
    if (!BookingsHotels) return [];
    
    let filtered = [...BookingsHotels];
    
    // فلترة حسب البحث
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.customer?.includes(searchTerm) ||
        booking.hotel?.includes(searchTerm) ||
        booking.city?.includes(searchTerm) ||
        booking.id?.includes(searchTerm)
      );
    }
    
    // فلترة حسب الحالة
    if (filterStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }
    
    return filtered;
  }, [BookingsHotels, searchTerm, filterStatus]);

  // ✅ حساب الإحصائيات
  const stats = {
    total: filteredData.length,
    totalSpent: filteredData.reduce((sum, b) => sum + (b.price || 0), 0),
    totalNights: filteredData.reduce((sum, b) => {
      if (b.checkIn && b.checkOut) {
        const nights = Math.ceil((new Date(b.checkOut) - new Date(b.checkIn)) / (1000 * 60 * 60 * 24));
        return sum + (nights > 0 ? nights : 1);
      }
      return sum;
    }, 0),
  };

  // ✅ Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  // ✅ Reset page when filters change
  const handleFilterChange = (type, value) => {
    if (type === 'search') {
      setSearchTerm(value);
    } else if (type === 'status') {
      setFilterStatus(value);
    }
    setCurrentPage(1);
  };

  // ✅ Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FaHotel className="text-3xl text-pink-400" />
          <h1 className="text-3xl font-bold text-white">حجوزات الفنادق</h1>
        </div>
        <p className="text-gray-400">إدارة ومتابعة جميع حجوزات الفنادق</p>
      </div>

      {/* Stats Cards */}
      {filteredData.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3 p-4 border bg-white/5 border-white/10 rounded-xl">
            <div className="p-3 rounded-xl bg-pink-500/20">
              <FaHotel className="text-xl text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">إجمالي الحجوزات</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 border bg-white/5 border-white/10 rounded-xl">
            <div className="p-3 rounded-xl bg-green-500/20">
              <FaMoneyBillWave className="text-xl text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">إجمالي الإنفاق</p>
              <p className="text-2xl font-bold text-green-400">${formatPrice(stats.totalSpent)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 border bg-white/5 border-white/10 rounded-xl">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <FaCalendarAlt className="text-xl text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">إجمالي الليالي</p>
              <p className="text-2xl font-bold text-white">{stats.totalNights}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
          <input
            type="text"
            placeholder="بحث باسم الفندق، العميل، المدينة..."
            value={searchTerm}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full py-2 pl-4 pr-10 text-white border rounded-lg bg-white/5 border-white/10 focus:outline-none focus:border-pink-500"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-4 py-2 text-white border rounded-lg bg-white/5 border-white/10 focus:outline-none focus:border-pink-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="confirmed">مؤكد</option>
          <option value="pending">قيد الانتظار</option>
          <option value="refunded">مسترد</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="py-16 text-center border bg-white/5 border-white/10 rounded-2xl">
          <FaHotel className="mx-auto mb-4 text-6xl text-gray-600" />
          <p className="text-lg text-gray-400">
            {searchTerm || filterStatus !== 'all' 
              ? 'لا توجد نتائج مطابقة للبحث' 
              : 'لا توجد حجوزات فنادق حالياً'}
          </p>
        </div>
      )}

      {/* Table */}
      {filteredData.length > 0 && (
        <>
          <div className="overflow-hidden border bg-white/5 backdrop-blur-md border-white/10 rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="border-b bg-white/5 border-white/10">
                  <tr>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaUserAlt className="text-pink-400" />
                        العميل
                      </div>
                    </th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaHotel className="text-pink-400" />
                        الفندق
                      </div>
                    </th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-400" />
                        المدينة
                      </div>
                    </th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-green-400" />
                        الدخول
                      </div>
                    </th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-yellow-400" />
                        الخروج
                      </div>
                    </th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-blue-400" />
                        الضيوف
                      </div>
                    </th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-green-400" />
                        السعر
                      </div>
                    </th>
                    <th className="px-4 py-4 text-sm font-medium text-right text-gray-300">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((booking, index) => {
                    const status = getStatus(booking.status);
                    const checkInDate = new Date(booking.checkIn);
                    const checkOutDate = new Date(booking.checkOut);
                    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <tr
                        key={booking.id || index}
                        className="transition-all duration-200 border-b border-white/5 hover:bg-white/5 group"
                      >
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-white">{booking.customer || '---'}</p>
                            <p className="text-xs text-gray-500">#{booking.id}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <FaHotel className="text-pink-400" />
                            <span className="text-white">{booking.hotel || '---'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-400" />
                            <span className="text-gray-300">{booking.city || '---'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-gray-300">
                              <FaCalendarAlt className="text-green-400" />
                              {formatDate(booking.checkIn)}
                            </div>
                            <span className="text-xs text-gray-500">{nights} ليالي</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaCalendarAlt className="text-yellow-400" />
                            {formatDate(booking.checkOut)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaUsers className="text-blue-400" />
                            {booking.guests || 'شخصان'}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-green-400">
                              ${formatPrice(booking.price)}
                            </span>
                            <span className="text-xs text-gray-500">
                              ${formatPrice(booking.price / nights)} / ليلة
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border ${status.className}`}
                          >
                            {status.icon}
                            {status.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 mt-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">عرض:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1 text-white border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:border-pink-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-400">عناصر</span>
            </div>

            <div className="text-sm text-gray-400">
              عرض {(currentPage - 1) * itemsPerPage + 1} -{' '}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} من{' '}
              {filteredData.length} حجز
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaAngleDoubleRight />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </button>
              
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : page === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'text-gray-400 hover:bg-white/10'
                  }`}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaAngleDoubleLeft />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;