"use client";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCalendarCheck,
  FaSearch,
  FaStar,
  FaStarHalfAlt,
  FaUmbrellaBeach,
  FaBriefcase,
  FaGift,
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaDumbbell,
  FaParking,
  FaSpa,
  FaList,
  FaThLarge,
  FaChevronRight,
  FaChevronLeft,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { useState } from "react";

// ========== البيانات الثابتة للفنادق (20 فندق للاختبار) ==========
const hotelsData = [
  { id: 1, name: "فندق بورتو السخنة", location: "العين السخنة، مصر", stars: 4.5, pricePerNight: 116, totalPrice: 580, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop", amenities: ["مسبح", "وايفاي", "إفطار", "موقف سيارات"], type: "منتجعات شاطئية", rating: 4.5, reviews: 1284, available: true, nights: 5, checkIn: "2025-06-10", checkOut: "2025-06-15" },
  { id: 2, name: "فندق جميرا بيتش", location: "دبي، الإمارات", stars: 5, pricePerNight: 408, totalPrice: 2450, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop", amenities: ["مسبح خاص", "سبا", "شاطئ خاص", "وايفاي"], type: "منتجعات شاطئية", rating: 4.9, reviews: 3421, available: true, nights: 6, checkIn: "2025-07-01", checkOut: "2025-07-07" },
  { id: 3, name: "فندق فور سيزونز", location: "القاهرة، مصر", stars: 5, pricePerNight: 560, totalPrice: 1120, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop", amenities: ["وايفاي", "جيم", "سبا", "مطعم"], type: "فنادق للأعمال", rating: 4.8, reviews: 892, available: true, nights: 2, checkIn: "2025-05-28", checkOut: "2025-05-30" },
  { id: 4, name: "فندق هيلتون جاردن", location: "الرياض، السعودية", stars: 4, pricePerNight: 130, totalPrice: 520, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop", amenities: ["وايفاي", "جيم", "مطعم", "موقف"], type: "فنادق للأعمال", rating: 4.3, reviews: 567, available: true, nights: 4, checkIn: "2025-06-20", checkOut: "2025-06-24" },
  { id: 5, name: "منتجع موڤنبيك", location: "الغردقة، مصر", stars: 5, pricePerNight: 180, totalPrice: 1260, image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop", amenities: ["شاطئ خاص", "مسبح", "وايفاي", "سبا"], type: "منتجعات شاطئية", rating: 4.7, reviews: 2341, available: true, nights: 7, checkIn: "2025-08-01", checkOut: "2025-08-08" },
  { id: 6, name: "فندق ريتز كارلتون", location: "الدوحة، قطر", stars: 5, pricePerNight: 320, totalPrice: 1280, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop", amenities: ["وايفاي", "جيم فاخر", "سبا", "مطعم راقي"], type: "فنادق للأعمال", rating: 4.9, reviews: 2103, available: true, nights: 4, checkIn: "2025-09-10", checkOut: "2025-09-14" },
  { id: 7, name: "فندق شيراتون", location: "الإسكندرية، مصر", stars: 4, pricePerNight: 95, totalPrice: 380, image: "https://images.unsplash.com/photo-1584132904107-7e3ac8f2fa70?w=400&h=300&fit=crop", amenities: ["إطلالة بحر", "وايفاي", "مطعم", "موقف"], type: "جميع الفنادق", rating: 4.2, reviews: 734, available: true, nights: 4, checkIn: "2025-07-15", checkOut: "2025-07-19" },
  { id: 8, name: "فندق إنتركونتيننتال", location: "عمّان، الأردن", stars: 5, pricePerNight: 210, totalPrice: 840, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop", amenities: ["وايفاي", "جيم", "سبا", "مطعم", "مسبح"], type: "باقات شاملة", rating: 4.6, reviews: 1567, available: true, nights: 4, checkIn: "2025-10-01", checkOut: "2025-10-05" },
  { id: 9, name: "فندق روتانا", location: "أبوظبي، الإمارات", stars: 5, pricePerNight: 350, totalPrice: 1750, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop", amenities: ["مسبح لا نهائي", "سبا", "وايفاي", "مطاعم"], type: "منتجعات شاطئية", rating: 4.8, reviews: 1892, available: true, nights: 5, checkIn: "2025-11-01", checkOut: "2025-11-06" },
  { id: 10, name: "فندق جراند حياة", location: "الكويت، الكويت", stars: 5, pricePerNight: 280, totalPrice: 1120, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop", amenities: ["وايفاي", "جيم", "مطعم", "موقف"], type: "فنادق للأعمال", rating: 4.5, reviews: 945, available: true, nights: 4, checkIn: "2025-12-01", checkOut: "2025-12-05" },
  { id: 11, name: "فندق الماريوت", location: "المنامة، البحرين", stars: 4, pricePerNight: 150, totalPrice: 600, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop", amenities: ["مسبح", "وايفاي", "إفطار"], type: "فنادق للأعمال", rating: 4.3, reviews: 678, available: true, nights: 4, checkIn: "2025-08-15", checkOut: "2025-08-19" },
  { id: 12, name: "فندق موفنبيك", location: "طيبة، السعودية", stars: 4, pricePerNight: 120, totalPrice: 480, image: "https://images.unsplash.com/photo-1584132904107-7e3ac8f2fa70?w=400&h=300&fit=crop", amenities: ["وايفاي", "مطعم", "موقف"], type: "جميع الفنادق", rating: 4.1, reviews: 423, available: true, nights: 4, checkIn: "2025-09-20", checkOut: "2025-09-24" },
];

export default function HotelSearchFilter() {
  const [view, setView] = useState("cards"); // "cards" or "table"
  const [activeFilter, setActiveFilter] = useState("جميع الفنادق");
  const [searchDestination, setSearchDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("شخصين");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("rating");
  const itemsPerPage = 6;

  const filterOptions = [
    { name: "جميع الفنادق", icon: null },
    { name: "5 نجوم", icon: <FaStar className="ml-1 text-xs text-yellow-400" /> },
    { name: "4 نجوم", icon: <FaStar className="ml-1 text-xs text-yellow-400" /> },
    { name: "منتجعات شاطئية", icon: <FaUmbrellaBeach className="ml-1 text-xs text-blue-400" /> },
    { name: "فنادق للأعمال", icon: <FaBriefcase className="ml-1 text-xs text-gray-400" /> },
    { name: "باقات شاملة", icon: <FaGift className="ml-1 text-xs text-green-400" /> },
  ];

  // دالة البحث والفلترة
  const getFilteredHotels = () => {
    let filtered = [...hotelsData];

    // فلترة حسب الوجهة
    if (searchDestination) {
      filtered = filtered.filter(hotel =>
        hotel.location.toLowerCase().includes(searchDestination.toLowerCase()) ||
        hotel.name.toLowerCase().includes(searchDestination.toLowerCase())
      );
    }

    // فلترة حسب الفئة المختارة
    if (activeFilter !== "جميع الفنادق") {
      if (activeFilter === "5 نجوم") {
        filtered = filtered.filter(hotel => hotel.stars === 5);
      } else if (activeFilter === "4 نجوم") {
        filtered = filtered.filter(hotel => hotel.stars === 4);
      } else {
        filtered = filtered.filter(hotel => hotel.type === activeFilter);
      }
    }

    // ترتيب النتائج
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return filtered;
  };

  const filteredHotels = getFilteredHotels();
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName) => {
    setActiveFilter(filterName);
    setCurrentPage(1);
  };

  // دالة عرض التصنيف بالنجوم
  const renderStars = (stars) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;
    const starsArray = [];

    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<FaStar key={i} className="text-sm text-yellow-400" />);
    }
    if (hasHalfStar) {
      starsArray.push(<FaStarHalfAlt key="half" className="text-sm text-yellow-400" />);
    }
    return starsArray;
  };

  // دالة عرض أيقونات المرافق
  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "وايفاي": return <FaWifi className="text-purple-400" />;
      case "مسبح": return <FaSwimmingPool className="text-blue-400" />;
      case "مسبح خاص": return <FaSwimmingPool className="text-blue-400" />;
      case "إفطار": return <FaUtensils className="text-green-400" />;
      case "جيم": return <FaDumbbell className="text-orange-400" />;
      case "موقف سيارات": return <FaParking className="text-gray-400" />;
      case "موقف": return <FaParking className="text-gray-400" />;
      case "سبا": return <FaSpa className="text-pink-400" />;
      case "شاطئ خاص": return <FaUmbrellaBeach className="text-cyan-400" />;
      case "مطعم": return <FaUtensils className="text-green-400" />;
      case "مطاعم": return <FaUtensils className="text-green-400" />;
      default: return <FaGift className="text-gray-400" />;
    }
  };

  // مكون Pagination
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    };

    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10"
        >
          <FaChevronRight />
        </button>
        
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              currentPage === page
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-400 hover:bg-white/10"
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10"
        >
          <FaChevronLeft />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* فلتر البحث */}
      <div
        className="p-6 transition-all duration-300 border rounded-2xl bg-white/5 backdrop-blur-md border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10"
        data-aos="fade-up"
      >
        {/* عنوان القسم */}
        <div className="flex items-center gap-2 pb-2 mb-5 border-b border-purple-500/20">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
          <h3 className="text-lg font-bold text-white">البحث عن فندق</h3>
          <p className="mr-2 text-sm text-gray-400">ابحث عن أفضل العروض والفنادق</p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">
              <FaMapMarkerAlt className="inline ml-1 text-pink-400" /> الوجهة
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute text-sm text-pink-400 right-3 top-3" />
              <input
                type="text"
                placeholder="المدينة أو اسم الفندق"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">
              <FaCalendarAlt className="inline ml-1 text-purple-400" /> تاريخ الوصول
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute text-sm text-purple-400 right-3 top-3" />
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">
              <FaCalendarCheck className="inline ml-1 text-purple-400" /> تاريخ المغادرة
            </label>
            <div className="relative">
              <FaCalendarCheck className="absolute text-sm text-purple-400 right-3 top-3" />
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400">عدد الضيوف</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              <option className="bg-[#1a1638]">شخص واحد</option>
              <option className="bg-[#1a1638]">شخصين</option>
              <option className="bg-[#1a1638]">3 أشخاص</option>
              <option className="bg-[#1a1638]">4 أشخاص</option>
              <option className="bg-[#1a1638]">5+ أشخاص</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full text-white py-2.5 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 font-medium"
            >
              <FaSearch className="text-sm" />
              بحث
            </button>
          </div>
        </div>

        {/* Filters Chips */}
        <div className="flex flex-wrap gap-2 pt-4 mt-5 border-t border-purple-500/20">
          {filterOptions.map((item, idx) => (
            <span
              key={idx}
              onClick={() => handleFilterChange(item.name)}
              className={`inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm cursor-pointer transition-all duration-300 ${
                activeFilter === item.name
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/25"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </span>
          ))}
        </div>

        {/* نصائح سريعة */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-5 text-xs text-gray-500 border-t border-purple-500/20">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> إلغاء مجاني</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> دفع عند الوصول</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> عروض حصرية</span>
          </div>
          <button className="flex items-center gap-1 text-xs text-purple-400 transition hover:text-pink-400">
            بحث متقدم <i className="text-xs fas fa-arrow-left"></i>
          </button>
        </div>
      </div>

      {/* نتائج البحث - مع خيار عرض الجدول أو البطاقات */}
      <div className="p-5 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20">
        {/* Header مع خيارات العرض */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <span className="font-medium text-white">عرض:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setView("cards")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  view === "cards"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <FaThLarge size={16} />
              </button>
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  view === "table"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <FaList size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">الترتيب حسب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-sm text-white bg-white/5 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="rating">الأكثر تقييماً</option>
              <option value="price_asc">السعر (من الأقل)</option>
              <option value="price_desc">السعر (من الأعلى)</option>
            </select>
          </div>
        </div>

        {/* عرض النتائج */}
        {filteredHotels.length === 0 ? (
          <div className="py-16 text-center">
            <FaUmbrellaBeach className="mx-auto mb-4 text-5xl text-gray-500" />
            <p className="text-gray-400">لا توجد فنادق تطابق معايير البحث</p>
            <button
              onClick={() => {
                setSearchDestination("");
                setActiveFilter("جميع الفنادق");
                setCurrentPage(1);
              }}
              className="px-4 py-2 mt-4 text-white rounded-xl bg-gradient-to-r from-purple-500 to-pink-500"
            >
              إعادة تعيين البحث
            </button>
          </div>
        ) : view === "cards" ? (
          // عرض البطاقات
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {paginatedHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="overflow-hidden transition-all duration-300 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 left-3"><span className="px-2 py-1 text-xs text-white rounded-lg bg-black/50 backdrop-blur-sm">{hotel.type}</span></div>
                  <div className="absolute flex items-center gap-1 px-2 py-1 text-xs text-white rounded-lg bottom-3 right-3 bg-black/50 backdrop-blur-sm">{renderStars(hotel.stars)}</div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-white">{hotel.name}</h4>
                  <p className="flex items-center gap-1 mt-1 text-sm text-gray-400"><FaMapMarkerAlt className="text-xs text-pink-400" />{hotel.location}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="flex items-center gap-1 px-2 py-1 text-xs text-gray-300 rounded-lg bg-white/5">{getAmenityIcon(amenity)}{amenity}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-4 border-t border-purple-500/20">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1"><span className="text-lg font-bold text-yellow-400">{hotel.rating}</span>{renderStars(hotel.rating)}</div>
                      <span className="text-xs text-gray-500">({hotel.reviews})</span>
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{hotel.pricePerNight}$</p>
                      <p className="text-xs text-gray-500">ليلة</p>
                    </div>
                  </div>
                  <button className="w-full py-2 mt-4 text-sm font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50">عرض التفاصيل</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // عرض الجدول
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-500/10">
                <tr>
                  <th className="p-3 text-right text-gray-300">الفندق</th>
                  <th className="p-3 text-right text-gray-300">الموقع</th>
                  <th className="p-3 text-right text-gray-300">التقييم</th>
                  <th className="p-3 text-right text-gray-300">سعر الليلة</th>
                  <th className="p-3 text-right text-gray-300">المرافق</th>
                  <th className="p-3 text-right text-gray-300">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {paginatedHotels.map((hotel, idx) => (
                  <tr key={hotel.id} className={`border-t border-purple-500/20 transition-all duration-200 hover:bg-purple-500/10 ${idx !== paginatedHotels.length - 1 ? "border-b" : ""}`}>
                    <td className="p-3"><span className="font-medium text-white">{hotel.name}</span></td>
                    <td className="p-3 text-gray-400">{hotel.location}</td>
                    <td className="p-3"><div className="flex items-center gap-1">{renderStars(hotel.rating)}<span className="mr-1 text-gray-400">({hotel.rating})</span></div></td>
                    <td className="p-3"><span className="font-semibold text-white">{hotel.pricePerNight}$</span></td>
                    <td className="p-3"><div className="flex flex-wrap gap-1">{hotel.amenities.slice(0, 2).map((a, i) => <span key={i} className="text-xs text-gray-400">{a}</span>)}</div></td>
                    <td className="p-3"><div className="flex gap-2"><button className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition"><FaEye size={14} /></button><button className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"><FaEdit size={14} /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredHotels.length > 0 && <Pagination />}
        
        {/* معلومات العدد */}
        <div className="mt-4 text-sm text-center text-gray-500">
          عرض {paginatedHotels.length} من {filteredHotels.length} فندق
        </div>
      </div>
    </div>
  );
}