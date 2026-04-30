"use client";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCalendarCheck,
  FaSearch,
  FaStar,
  FaStarHalfAlt,
  FaUmbrellaBeach,
  FaList,
  FaThLarge,
  FaChevronRight,
  FaChevronLeft,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaUtensils,
  FaDumbbell,
  FaEye,
  FaBed,
  FaUsers,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { MdRoomService, MdBreakfastDining, MdVerified } from "react-icons/md";
import { useState, useContext } from "react";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";

export default function HotelSearchFilter() {
  const { Hotel } = useContext(Admin);
  console.log(Hotel);
  const data = Hotel?.data;

  // ===== تحويل الداتا =====
  const hotelsData =
    data?.recentBookings?.map((item, index) => ({
      id: item.id || index,
      name: item.hotel,
      location: item.city,
      stars: 4,
      pricePerNight: item.price,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      rating: 4.5,
      reviews: Math.floor(Math.random() * 200) + 50,
      available: item.status === "confirmed",
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      amenities: ["wifi", "pool", "breakfast", "parking"],
      description: "فندق مميز يقدم أفضل الخدمات والمرافق الراقية",
      phone: "+966 50 123 4567",
      email: "info@hotel.com",
    })) || [];

  // ===== state =====
  const [view, setView] = useState("cards"); // cards, table, grid
  const [activeFilter, setActiveFilter] = useState("جميع الفنادق");
  const [searchDestination, setSearchDestination] = useState("");
  const [guests, setGuests] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const itemsPerPage = 6;

  // ===== filters من API =====
  const filterOptions =
    data?.filters?.categories?.map((cat) => ({
      name: cat,
    })) || [];

  // Add default filters if none exist
  const allFilters = filterOptions.length > 0 ? filterOptions : [
    { name: "جميع الفنادق" },
    { name: "فنادق 5 نجوم" },
    { name: "فنادق 4 نجوم" },
    { name: "منتجعات" },
    { name: "فنادق اقتصادية" },
  ];

  // ===== فلترة =====
  const filteredHotels = hotelsData.filter((hotel) => {
    const matchesSearch = hotel.name.includes(searchDestination) ||
      hotel.location.includes(searchDestination);
    const matchesFilter = activeFilter === "جميع الفنادق" || 
      (activeFilter === "فنادق 5 نجوم" && hotel.stars === 5) ||
      (activeFilter === "فنادق 4 نجوم" && hotel.stars === 4);
    return matchesSearch && matchesFilter;
  });

  // ===== pagination =====
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ===== stars =====
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    return (
      <div className="flex items-center gap-0.5">
        {Array(full)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} className="text-xs text-yellow-400" />
          ))}
        {half && <FaStarHalfAlt className="text-xs text-yellow-400" />}
        <span className="mr-1 text-xs text-gray-400">({rating})</span>
      </div>
    );
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <FaWifi className="text-blue-400" />,
      pool: <FaSwimmingPool className="text-cyan-400" />,
      breakfast: <MdBreakfastDining className="text-yellow-400" />,
      parking: <FaParking className="text-green-400" />,
      spa: <MdRoomService className="text-purple-400" />,
      restaurant: <FaUtensils className="text-orange-400" />,
      gym: <FaDumbbell className="text-red-400" />,
    };
    return icons[amenity] || <FaBed className="text-gray-400" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  return (
    <div className="space-y-6">
      {/* SEARCH SECTION */}
      <div className="p-6 border rounded-2xl bg-gradient-to-br from-white/5 to-transparent border-purple-500/20">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <FaMapMarkerAlt className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
            <input
              placeholder="ابحث عن فندق أو مدينة..."
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
              className="w-full px-4 py-2 pr-10 text-white border bg-white/5 border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="relative">
            <FaUsers className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-2 pr-10 text-white border bg-white/5 border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500"
            >
              <option value="" className="bg-gray-900">عدد الضيوف</option>
              {data?.filters?.guestsCount?.map((g, i) => (
                <option key={i} className="bg-gray-900" value={g}>
                  {g}
                </option>
              ))}
              <option value="1">شخص واحد</option>
              <option value="2">شخصين</option>
              <option value="3">3 أشخاص</option>
              <option value="4">4 أشخاص</option>
            </select>
          </div>

          <div className="relative">
            <FaCalendarAlt className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
            <input
              type="date"
              className="w-full px-4 py-2 pr-10 text-white border bg-white/5 border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>

          <button className="flex items-center justify-center gap-2 text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:scale-105 hover:shadow-lg">
            <FaSearch />
            <span>بحث</span>
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {allFilters.map((f, i) => (
            <span
              key={i}
              onClick={() => setActiveFilter(f.name)}
              className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-all duration-300 ${
                activeFilter === f.name
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {f.name}
            </span>
          ))}
        </div>
      </div>

      {/* HEADER WITH VIEW TOGGLE */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">
            {activeFilter}
          </h3>
          <p className="text-sm text-gray-400">
            {filteredHotels.length} فندق متاح
          </p>
        </div>
        
        <div className="flex gap-2 p-1 rounded-lg bg-white/5">
          <button
            onClick={() => setView("cards")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              view === "cards"
                ? "bg-purple-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
            title="عرض كروت"
          >
            <FaThLarge size={16} />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              view === "grid"
                ? "bg-purple-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
            title="عرض شبكة"
          >
            <FaThLarge size={16} className="rotate-90" />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              view === "table"
                ? "bg-purple-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
            title="عرض جدول"
          >
            <FaList size={16} />
          </button>
        </div>
      </div>

      {/* CARDS VIEW */}
      {view === "cards" && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {paginatedHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="relative overflow-hidden transition-all duration-500 border cursor-pointer group rounded-2xl bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-purple-500/40 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Available Badge */}
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-lg ${
                      hotel.available
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {hotel.available ? "متاح" : "غير متاح"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                {/* Hotel Name & Location */}
                <h3 className="text-lg font-bold text-white">{hotel.name}</h3>
                <p className="flex items-center gap-1 mt-1 text-sm text-gray-400">
                  <FaMapMarkerAlt className="text-xs text-purple-400" />
                  {hotel.location}
                </p>

                {/* Rating */}
                <div className="mt-2">{renderStars(hotel.rating)}</div>

                {/* Dates */}
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <FaCalendarCheck />
                  <span>{formatDate(hotel.checkIn)} → {formatDate(hotel.checkOut)}</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {hotel.amenities?.slice(0, 4).map((amenity, idx) => (
                    <div key={idx} className="text-gray-400">
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-3 mt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-gray-500">السعر لليلة</p>
                    <p className="text-2xl font-bold text-purple-400">
                      ${hotel.pricePerNight}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-500/20">
                    <FaEye />
                    <span>عرض التفاصيل</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GRID VIEW (Enhanced) */}
      {view === "grid" && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="p-4 transition-all duration-500 border cursor-pointer group rounded-2xl bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-purple-500/40 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative mb-3 overflow-hidden rounded-xl">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="object-cover w-full h-32 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-1 left-1">
                  <span className={`px-1.5 py-0.5 text-[10px] rounded ${
                    hotel.available ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"
                  }`}>
                    {hotel.available ? "متاح" : "غير متاح"}
                  </span>
                </div>
              </div>
              
              <h4 className="font-bold text-white truncate">{hotel.name}</h4>
              <p className="text-xs text-gray-400 truncate">{hotel.location}</p>
              <div className="mt-1">{renderStars(hotel.rating)}</div>
              <p className="mt-2 text-lg font-bold text-purple-400">
                ${hotel.pricePerNight}
                <span className="text-xs text-gray-500">/ليلة</span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-right">
            <thead className="text-sm text-gray-300 bg-white/5">
              <tr className="border-b border-white/10">
                <th className="p-3 rounded-tr-2xl">الفندق</th>
                <th className="p-3">الموقع</th>
                <th className="p-3">التقييم</th>
                <th className="p-3">تاريخ الوصول</th>
                <th className="p-3">تاريخ المغادرة</th>
                <th className="p-3">السعر/ليلة</th>
                <th className="p-3">الحالة</th>
                <th className="p-3 rounded-tl-2xl">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300">
              {paginatedHotels.map((hotel, index) => (
                <tr
                  key={hotel.id}
                  className="transition-all duration-300 border-b border-white/5 hover:bg-white/5 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img src={hotel.image} alt="" className="object-cover w-10 h-10 rounded-lg" />
                      <div>
                        <p className="font-medium text-white">{hotel.name}</p>
                        <div className="flex gap-0.5 mt-0.5">
                          {renderStars(hotel.rating)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs text-purple-400" />
                      {hotel.location}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-xs text-yellow-400" />
                      {hotel.rating} ({hotel.reviews})
                    </div>
                  </td>
                  <td className="p-3 text-gray-400">
                    {formatDate(hotel.checkIn)}
                  </td>
                  <td className="p-3 text-gray-400">
                    {formatDate(hotel.checkOut)}
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-purple-400">
                      ${hotel.pricePerNight}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-lg ${
                        hotel.available
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {hotel.available ? "متاح" : "غير متاح"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="p-1.5 text-blue-400 transition-all rounded-lg hover:bg-blue-500/20">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {paginatedHotels.length === 0 && (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">🏨</div>
          <p className="text-gray-400">لا توجد فنادق</p>
          <p className="mt-1 text-sm text-gray-500">
          </p>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-400">
            صفحة {currentPage} من {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 hover:bg-white/10"
            >
              <FaChevronRight />
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
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
                  className={`px-3 py-1 rounded-lg transition-all ${
                    currentPage === pageNum
                      ? "bg-purple-500 text-white"
                      : "text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 hover:bg-white/10"
            >
              <FaChevronLeft />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}