"use client";

import {
  FaSearch,
  FaList,
  FaThLarge,
  FaChevronRight,
  FaChevronLeft,
  FaCar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";
import { useState, useContext } from "react";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";

export default function CarRentalSearchFilter() {
  const { carsSection } = useContext(Admin);

  const [view, setView] = useState("cards");
  const [searchLocation, setSearchLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState(false);

  const itemsPerPage = 6;

  const carsData =
    carsSection?.map((item) => ({
      id: item.id,
      car: item.car,
      duration: item.duration,
      fromCity: item.fromCity,
      toCity: item.toCity,
      pickupDate: item.pickupDate,
      returnDate: item.returnDate,
      price: item.price,
      status: item.status,
    })) || [];

  if (!carsSection) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-400">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  const getFilteredCars = () => {
    let filtered = [...carsData];

    if (searchLocation) {
      filtered = filtered.filter(
        (item) =>
          item.fromCity?.toLowerCase().includes(searchLocation.toLowerCase()) ||
          item.toCity?.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (pickupDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.pickupDate).toISOString().slice(0, 10) === pickupDate
      );
    }

    if (returnDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.returnDate).toISOString().slice(0, 10) === returnDate
      );
    }

    return filtered;
  };

  const filteredCars = getFilteredCars();
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearchLocation("");
    setPickupDate("");
    setReturnDate("");
    setCurrentPage(1);
  };

  const getArabicStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "مؤكد";
      case "pending": return "قيد الانتظار";
      case "cancelled": return "ملغي";
      case "refunded": return "مسترجع";
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "refunded": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-2 pt-4 mt-8 border-t border-gray-700">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 text-gray-400 transition-all rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronRight />
        </button>

        <div className="flex gap-1">
          {[...Array(Math.min(totalPages, 5))].map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageNum)}
                className={`min-w-[40px] h-10 px-3 rounded-lg transition-all duration-200 font-medium ${
                  currentPage === pageNum
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-400 transition-all rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronLeft />
        </button>
      </div>
    );
  };

  const hasActiveFilters = searchLocation || pickupDate || returnDate;

  return (
    <div className="min-h-screen" >
      <div className="mx-auto space-y-6 max-w-7xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
            استئجار السيارات
          </h1>
          <p className="mt-2 text-gray-400">اختر سيارتك المفضلة وانطلق في مغامرتك</p>
        </div>

        {/* Filter Section */}
        <div className="relative overflow-hidden transition-all duration-300 border border-gray-700 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaSearch className="text-purple-400" />
                <h3 className="font-bold text-white">فلترة البحث</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-red-400"
                >
                  <FaTimes />
                  <span>مسح الكل</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <FaMapMarkerAlt className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" />
                <input
                  placeholder="المدينة أو المنطقة"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-10 py-3 text-white placeholder-gray-500 transition-all border border-gray-700 bg-gray-800/50 rounded-xl focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="relative">
                <FaCalendarAlt className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-10 py-3 text-white placeholder-gray-500 transition-all border border-gray-700 bg-gray-800/50 rounded-xl focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="relative">
                <FaCalendarAlt className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-10 py-3 text-white placeholder-gray-500 transition-all border border-gray-700 bg-gray-800/50 rounded-xl focus:outline-none focus:border-purple-500"
                />
              </div>

              <button className="relative overflow-hidden transition-all group bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/25">
                <div className="absolute inset-0 transition-opacity bg-white opacity-0 group-hover:opacity-20"></div>
                <div className="relative flex items-center justify-center gap-2 px-6 py-3 font-medium text-white">
                  <FaSearch />
                  <span>بحث</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="overflow-hidden transition-all duration-300 border border-gray-700 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
          
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 mt-6 border-b border-gray-700">
            <div className="flex gap-2">
              <button
                onClick={() => setView("cards")}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  view === "cards"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setView("table")}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  view === "table"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <FaList />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">النتائج:</span>
              <span className="font-bold text-white">{filteredCars.length}</span>
              <span className="text-gray-400">سيارة</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {filteredCars.length === 0 ? (
              <div className="py-20 text-center">
                <div className="inline-block p-4 mb-4 bg-gray-800 rounded-full">
                  <FaCar className="w-12 h-12 text-gray-600" />
                </div>
                <p className="text-xl text-gray-400">لا توجد سيارات متاحة</p>
                <p className="mt-2 text-gray-500">حاول تعديل معايير البحث</p>
              </div>
            ) : view === "cards" ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedCars.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden transition-all duration-300 border border-gray-700 group bg-gray-800/50 rounded-2xl hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white">{item.car}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                            <FaMapMarkerAlt className="text-purple-400" />
                            <span>{item.fromCity} ← {item.toCity}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                          {getArabicStatus(item.status)}
                        </div>
                      </div>

                      <div className="p-3 mt-3 bg-gray-900/50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-400">
                            <FaCalendarAlt className="text-purple-400" />
                            <span className="text-sm">الاستلام</span>
                          </div>
                          <span className="text-sm text-white">
                            {new Date(item.pickupDate).toLocaleDateString('ar-EG')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-400">
                            <FaSyncAlt className="text-pink-400" />
                            <span className="text-sm">الإرجاع</span>
                          </div>
                          <span className="text-sm text-white">
                            {new Date(item.returnDate).toLocaleDateString('ar-EG')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-700">
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaMoneyBillWave className="text-green-400" />
                          <span className="text-sm">السعر الإجمالي</span>
                        </div>
                        <div>
                          <span className="text-2xl font-bold text-purple-400">{item.price}</span>
                          <span className="mr-1 text-gray-400">$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 font-medium text-right text-gray-400">السيارة</th>
                      <th className="px-4 py-3 font-medium text-right text-gray-400">المسار</th>
                      <th className="px-4 py-3 font-medium text-right text-gray-400">المدة</th>
                      <th className="px-4 py-3 font-medium text-right text-gray-400">تاريخ الاستلام</th>
                      <th className="px-4 py-3 font-medium text-right text-gray-400">تاريخ الإرجاع</th>
                      <th className="px-4 py-3 font-medium text-right text-gray-400">السعر</th>
                      <th className="px-4 py-3 font-medium text-right text-gray-400">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCars.map((item, index) => (
                      <tr key={item.id} className={`border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors ${index % 2 === 0 ? 'bg-gray-800/20' : ''}`}>
                        <td className="px-4 py-3 font-medium text-white">{item.car}</td>
                        <td className="px-4 py-3 text-gray-300">{item.fromCity} → {item.toCity}</td>
                        <td className="px-4 py-3 text-gray-300">{item.duration}</td>
                        <td className="px-4 py-3 text-gray-300">{new Date(item.pickupDate).toLocaleDateString('ar-EG')}</td>
                        <td className="px-4 py-3 text-gray-300">{new Date(item.returnDate).toLocaleDateString('ar-EG')}</td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-purple-400">{item.price}$</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                            {getArabicStatus(item.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}