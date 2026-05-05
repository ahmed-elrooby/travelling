"use client";

<<<<<<< HEAD
import { useContext } from "react";
=======
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
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import {
  FaUsers,
  FaUserPlus,
  FaDollarSign,
  FaChartLine,
  FaCrown,
  FaUserCheck,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";

<<<<<<< HEAD
export default function B2CDashboard() {
  const { B2C } = useContext(Admin);

  const data = B2C?.data;

  if (!data) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  const { kpis, customerDistribution, growthLast6Months } = data;

  // Helper to get icon based on customer type
  const getCustomerIcon = (type) => {
    if (type.includes('VIP')) return <FaCrown className="text-yellow-400" />;
    if (type.includes('دائمون')) return <FaUserCheck className="text-green-400" />;
    return <FaUser className="text-blue-400" />;
  };

  // Helper to get gradient based on customer type
  const getCustomerGradient = (type) => {
    if (type.includes('VIP')) return 'from-yellow-600/20 to-amber-600/20 border-yellow-500/30';
    if (type.includes('دائمون')) return 'from-green-600/20 to-emerald-600/20 border-green-500/30';
    return 'from-blue-600/20 to-cyan-600/20 border-blue-500/30';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
=======
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
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
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
<<<<<<< HEAD
    <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 min-h-screen">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
          لوحة تحكم B2C
        </h1>
        <p className="text-gray-400 mt-2">نظرة عامة على أداء العملاء والإيرادات</p>
      </motion.div>

      {/* ===== KPI CARDS ===== */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {[
          { icon: FaUsers, label: 'إجمالي العملاء', value: kpis.totalCustomers, color: 'purple', prefix: '', suffix: '' },
          { icon: FaDollarSign, label: 'إجمالي القيمة', value: kpis.totalValue, color: 'green', prefix: '', suffix: '$' },
          { icon: FaUserPlus, label: 'عملاء جدد', value: kpis.newThisMonth, color: 'blue', prefix: '+', suffix: '' },
          { icon: FaChartLine, label: 'متوسط الإنفاق', value: kpis.avgSpend, color: 'pink', prefix: '', suffix: '$' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-${item.color}-600/10 to-${item.color}-600/5 backdrop-blur-sm border border-${item.color}-500/20 hover:border-${item.color}-500/40 transition-all duration-300 shadow-xl`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16"></div>
            <item.icon className={`text-${item.color}-400 text-3xl mb-3`} />
            <p className="text-gray-400 text-sm mb-1">{item.label}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {item.prefix}{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}{item.suffix}
            </h2>
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 w-full opacity-50`}></div>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== TWO COLUMN LAYOUT ===== */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Customer Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">توزيع العملاء</h2>
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FaUsers className="text-purple-400" />
            </div>
          </div>

          <div className="space-y-4">
            {customerDistribution.map((c, i) => {
              const percentage = c.value;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="relative"
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getCustomerIcon(c.type)}
                      <span className="text-gray-300 text-sm">{c.type}</span>
                    </div>
                    <span className="text-white font-bold">{percentage}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${
                        c.type.includes('VIP') ? 'from-yellow-400 to-amber-500' :
                        c.type.includes('دائمون') ? 'from-green-400 to-emerald-500' :
                        'from-blue-400 to-cyan-500'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Distribution Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10">
            {customerDistribution.map((c, i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-gray-500 mb-1">النسبة</p>
                <p className="text-lg font-bold text-white">{c.value}%</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats / Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">ملخص سريع</h2>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaChartLine className="text-green-400" />
            </div>
          </div>

          <div className="space-y-5">
            {/* Average per customer */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20">
              <p className="text-gray-400 text-sm mb-1">متوسط القيمة لكل عميل</p>
              <p className="text-2xl font-bold text-white">
                {(kpis.totalValue / kpis.totalCustomers).toLocaleString()}$
              </p>
            </div>

            {/* Growth indicator */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20">
              <p className="text-gray-400 text-sm mb-1">نسبة العملاء الجدد</p>
              <p className="text-2xl font-bold text-white">
                {((kpis.newThisMonth / kpis.totalCustomers) * 100).toFixed(1)}%
              </p>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  style={{ width: `${(kpis.newThisMonth / kpis.totalCustomers) * 100}%` }}
                />
              </div>
            </div>

            {/* Total customer value insight */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-500/20">
              <p className="text-gray-400 text-sm mb-1">إجمالي القيمة</p>
              <p className="text-2xl font-bold text-white">
                {kpis.totalValue.toLocaleString()}$
              </p>
              <p className="text-xs text-gray-500 mt-1">جميع العملاء</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Optional: Growth Chart Summary if growthLast6Months exists */}
      {growthLast6Months && growthLast6Months.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">النمو خلال 6 أشهر</h2>
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FaChartLine className="text-purple-400" />
            </div>
          </div>
          
          <div className="flex items-end justify-between gap-2 h-40">
            {growthLast6Months.map((month, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(month.value / Math.max(...growthLast6Months.map(m => m.value))) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + idx * 0.05 }}
                  className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg"
                  style={{ height: `${(month.value / Math.max(...growthLast6Months.map(m => m.value))) * 100}%` }}
                />
                <span className="text-xs text-gray-400">{month.month || `شهر ${idx + 1}`}</span>
              </div>
            ))}
          </div>
        </motion.div>
=======
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
>>>>>>> 6483676e4fa716de7a39df272d3210f5d2e6b596
      )}
    </div>
  );
}