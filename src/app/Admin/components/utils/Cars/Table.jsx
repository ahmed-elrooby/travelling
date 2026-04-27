"use client";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCalendarCheck,
  FaSearch,
  FaCar,
  FaCarSide,
  FaTruckPickup,
  FaGasPump,
  FaCrown,
  FaUsers,
  FaSnowflake,
  FaWifi,
  FaCoffee,
  FaList,
  FaThLarge,
  FaChevronRight,
  FaChevronLeft,
  FaEye,
  FaEdit,
  FaStar,
} from "react-icons/fa";
import { useState } from "react";

// ========== البيانات الثابتة للسيارات ==========
const carsData = [
  { id: 1, name: "مرسيدس E-Class", type: "فاخرة", category: "فاخرة", pricePerDay: 130, totalPrice: 650, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop", features: ["بنزين", "أوتوماتيك", "مكيف", "بلوتوث"], transmission: "أوتوماتيك", seats: 5, fuel: "بنزين", pickup: "مطار دبي", return: "مطار دبي", rating: 4.8, reviews: 234 },
  { id: 2, name: "تويوتا لاند كروزر", type: "SUV", category: "SUV", pricePerDay: 120, totalPrice: 1080, image: "https://images.unsplash.com/photo-1533473359331-fd3220e718f1?w=400&h=300&fit=crop", features: ["دفع رباعي", "أوتوماتيك", "مكيف", "7 مقاعد"], transmission: "أوتوماتيك", seats: 7, fuel: "ديزل", pickup: "مدينة الكويت", return: "مدينة الكويت", rating: 4.7, reviews: 189 },
  { id: 3, name: "بي ام دبليو الفئة السابعة", type: "فاخرة مع سائق", category: "فاخرة", pricePerDay: 330, totalPrice: 1650, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", features: ["سائق خاص", "جلد فاخر", "مكيف", "وايفاي"], transmission: "أوتوماتيك", seats: 4, fuel: "بنزين", pickup: "فندق جميرا", return: "مطار دبي", rating: 4.9, reviews: 456 },
  { id: 4, name: "هيونداي إلنترا", type: "اقتصادية", category: "اقتصادية", pricePerDay: 55, totalPrice: 110, image: "https://images.unsplash.com/photo-1619767886558-2dc9e3b5d9f5?w=400&h=300&fit=crop", features: ["موفر للوقود", "أوتوماتيك", "مكيف"], transmission: "أوتوماتيك", seats: 5, fuel: "بنزين", pickup: "مطار القاهرة", return: "مطار القاهرة", rating: 4.3, reviews: 567 },
  { id: 5, name: "نيسان باترول", type: "SUV", category: "SUV", pricePerDay: 140, totalPrice: 420, image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=400&h=300&fit=crop", features: ["دفع رباعي", "7 مقاعد", "مكيف", "كاميرا خلفية"], transmission: "أوتوماتيك", seats: 7, fuel: "بنزين", pickup: "الرياض", return: "الرياض", rating: 4.6, reviews: 342 },
  { id: 6, name: "أودي A6", type: "فاخرة", category: "فاخرة", pricePerDay: 200, totalPrice: 1000, image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop", features: ["جلد فاخر", "مقاعد مدفأة", "وايفاي", "كاميرا 360"], transmission: "أوتوماتيك", seats: 5, fuel: "بنزين", pickup: "مطار دبي", return: "مطار دبي", rating: 4.8, reviews: 278 },
  { id: 7, name: "شيفروليه تاهو", type: "SUV", category: "SUV", pricePerDay: 180, totalPrice: 1260, image: "https://images.unsplash.com/photo-1533473359331-fd3220e718f1?w=400&h=300&fit=crop", features: ["8 مقاعد", "دفع رباعي", "مكيف", "شاشة ترفيه"], transmission: "أوتوماتيك", seats: 8, fuel: "بنزين", pickup: "جدة", return: "جدة", rating: 4.5, reviews: 198 },
  { id: 8, name: "كيا سبورتاج", type: "اقتصادية", category: "اقتصادية", pricePerDay: 65, totalPrice: 325, image: "https://images.unsplash.com/photo-1619767886558-2dc9e3b5d9f5?w=400&h=300&fit=crop", features: ["موفرة للوقود", "مكيف", "بلوتوث"], transmission: "أوتوماتيك", seats: 5, fuel: "بنزين", pickup: "الدوحة", return: "الدوحة", rating: 4.2, reviews: 423 },
];

export default function CarRentalSearchFilter() {
  const [view, setView] = useState("cards");
  const [activeFilter, setActiveFilter] = useState("جميع السيارات");
  const [searchLocation, setSearchLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [carType, setCarType] = useState("جميع الفئات");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("rating");
  const itemsPerPage = 6;

  const filterOptions = [
    "جميع السيارات",
    "دفع فوري",
    "سائق خاص",
    "توصيل مجاني",
    "تأمين شامل",
    "سيارات فاخرة",
  ];

  // دالة البحث والفلترة
  const getFilteredCars = () => {
    let filtered = [...carsData];

    if (searchLocation) {
      filtered = filtered.filter(car =>
        car.pickup.toLowerCase().includes(searchLocation.toLowerCase()) ||
        car.return.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (activeFilter === "سيارات فاخرة") {
      filtered = filtered.filter(car => car.category === "فاخرة");
    } else if (activeFilter === "دفع فوري") {
      // فلترة السيارات المتاحة للدفع الفوري
      filtered = filtered.filter(car => car.available !== false);
    } else if (activeFilter === "سائق خاص") {
      filtered = filtered.filter(car => car.type === "فاخرة مع سائق");
    } else if (activeFilter !== "جميع السيارات" && !["دفع فوري", "سائق خاص", "توصيل مجاني", "تأمين شامل", "سيارات فاخرة"].includes(activeFilter)) {
      filtered = filtered.filter(car => car.type === activeFilter);
    }

    if (carType !== "جميع الفئات") {
      if (carType === "اقتصادية") filtered = filtered.filter(car => car.category === "اقتصادية");
      else if (carType === "SUV") filtered = filtered.filter(car => car.category === "SUV");
      else if (carType === "فاخرة") filtered = filtered.filter(car => car.category === "فاخرة");
      else if (carType === "سيدان") filtered = filtered.filter(car => car.type === "سيدان");
    }

    if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price_asc") filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sortBy === "price_desc") filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);

    return filtered;
  };

  const filteredCars = getFilteredCars();
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => setCurrentPage(1);

  const handleFilterChange = (filterName) => {
    setActiveFilter(filterName);
    setCurrentPage(1);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<FaStar key={i} className="text-xs text-yellow-400" />);
    }
    return stars;
  };

  const getCarIcon = (category) => {
    if (category === "فاخرة") return <FaCrown className="text-yellow-400" />;
    if (category === "SUV") return <FaTruckPickup className="text-green-400" />;
    return <FaCarSide className="text-blue-400" />;
  };

  // مكون Pagination
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);
      if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    };

    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10"><FaChevronRight /></button>
        {getPageNumbers().map(page => (
          <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1.5 rounded-lg transition-all ${currentPage === page ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "text-gray-400 hover:bg-white/10"}`}>{page}</button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10"><FaChevronLeft /></button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* فلتر البحث */}
      <div className="p-6 transition-all duration-300 border rounded-2xl bg-white/5 backdrop-blur-md border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10" data-aos="fade-up">
        {/* عنوان القسم */}
        <div className="flex items-center gap-2 pb-2 mb-5 border-b border-purple-500/20">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
          <h3 className="text-lg font-bold text-white">تأجير السيارات</h3>
          <p className="mr-2 text-sm text-gray-400">ابحث عن أفضل عروض تأجير السيارات</p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400"><FaMapMarkerAlt className="inline ml-1 text-blue-400" /> موقع الاستلام</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute text-sm text-blue-400 right-3 top-3" />
              <input type="text" placeholder="المدينة أو المطار" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400"><FaCalendarAlt className="inline ml-1 text-purple-400" /> تاريخ الاستلام</label>
            <div className="relative">
              <FaCalendarAlt className="absolute text-sm text-purple-400 right-3 top-3" />
              <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [color-scheme:dark]" />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400"><FaCalendarCheck className="inline ml-1 text-purple-400" /> تاريخ الإعادة</label>
            <div className="relative">
              <FaCalendarCheck className="absolute text-sm text-purple-400 right-3 top-3" />
              <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-10 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [color-scheme:dark]" />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-400"><FaCar className="inline ml-1 text-blue-400" /> نوع السيارة</label>
            <select value={carType} onChange={(e) => setCarType(e.target.value)} className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer">
              <option className="bg-[#1a1638]">جميع الفئات</option>
              <option className="bg-[#1a1638]">اقتصادية</option>
              <option className="bg-[#1a1638]">سيدان</option>
              <option className="bg-[#1a1638]">SUV / دفع رباعي</option>
              <option className="bg-[#1a1638]">فاخرة</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleSearch} className="w-full text-white py-2.5 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 font-medium">
              <FaSearch className="text-sm" /> بحث
            </button>
          </div>
        </div>

        {/* Filters Chips */}
        <div className="flex flex-wrap gap-2 pt-4 mt-5 border-t border-purple-500/20">
          {filterOptions.map((item, idx) => (
            <span key={idx} onClick={() => handleFilterChange(item)} className={`inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm cursor-pointer transition-all duration-300 ${activeFilter === item ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/25" : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"}`}>
              {item}
            </span>
          ))}
        </div>

        {/* نصائح سريعة */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-5 text-xs text-gray-500 border-t border-purple-500/20">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> إلغاء مجاني</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> تأمين شامل</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> أسعار تنافسية</span>
          </div>
          <button className="flex items-center gap-1 text-xs text-purple-400 transition hover:text-pink-400">مقارنة الأسعار <i className="text-xs fas fa-arrow-left"></i></button>
        </div>
      </div>

      {/* نتائج البحث */}
      <div className="p-5 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20">
        {/* Header مع خيارات العرض */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <span className="font-medium text-white">عرض:</span>
            <div className="flex gap-2">
              <button onClick={() => setView("cards")} className={`p-2 rounded-lg transition-all duration-300 ${view === "cards" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"}`}><FaThLarge size={16} /></button>
              <button onClick={() => setView("table")} className={`p-2 rounded-lg transition-all duration-300 ${view === "table" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"}`}><FaList size={16} /></button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">الترتيب حسب:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1.5 text-sm text-white bg-white/5 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="rating">الأكثر تقييماً</option>
              <option value="price_asc">السعر (من الأقل)</option>
              <option value="price_desc">السعر (من الأعلى)</option>
            </select>
          </div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="py-16 text-center">
            <FaCarSide className="mx-auto mb-4 text-5xl text-gray-500" />
            <p className="text-gray-400">لا توجد سيارات تطابق معايير البحث</p>
            <button onClick={() => { setSearchLocation(""); setActiveFilter("جميع السيارات"); setCarType("جميع الفئات"); setCurrentPage(1); }} className="px-4 py-2 mt-4 text-white rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">إعادة تعيين البحث</button>
          </div>
        ) : view === "cards" ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {paginatedCars.map((car) => (
              <div key={car.id} className="overflow-hidden transition-all duration-300 border rounded-2xl bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 group">
                <div className="relative h-48 overflow-hidden">
                  <img src={car.image} alt={car.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 left-3"><span className="px-2 py-1 text-xs text-white rounded-lg bg-black/50 backdrop-blur-sm">{car.type}</span></div>
                  <div className="absolute flex items-center gap-1 px-2 py-1 text-xs text-white rounded-lg bottom-3 right-3 bg-black/50 backdrop-blur-sm">{renderStars(car.rating)}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white">{car.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-gray-400">{getCarIcon(car.category)} {car.category}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {car.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="flex items-center gap-1 px-2 py-1 text-xs text-gray-300 rounded-lg bg-white/5"><FaGasPump className="text-xs text-gray-400" />{feature}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-4 border-t border-purple-500/20">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{car.seats} مقاعد</span>
                      <span className="text-sm text-gray-400">{car.transmission}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{car.pricePerDay}$</p>
                      <p className="text-xs text-gray-500">يومياً</p>
                    </div>
                  </div>
                  <button className="w-full py-2 mt-4 text-sm font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50">استأجر الآن</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-500/10">
                <tr><th className="p-3 text-right text-gray-300">السيارة</th><th className="p-3 text-right text-gray-300">النوع</th><th className="p-3 text-right text-gray-300">المقاعد</th><th className="p-3 text-right text-gray-300">التقييم</th><th className="p-3 text-right text-gray-300">السعر/يوم</th><th className="p-3 text-right text-gray-300">إجراءات</th></tr>
              </thead>
              <tbody>
                {paginatedCars.map((car, idx) => (
                  <tr key={car.id} className={`border-t border-purple-500/20 transition-all duration-200 hover:bg-purple-500/10 ${idx !== paginatedCars.length - 1 ? "border-b" : ""}`}>
                    <td className="p-3"><span className="font-medium text-white">{car.name}</span></td>
                    <td className="p-3 text-gray-400">{car.type}</td>
                    <td className="p-3 text-gray-400">{car.seats}</td>
                    <td className="p-3"><div className="flex items-center gap-1">{renderStars(car.rating)}<span className="mr-1 text-gray-400">({car.rating})</span></div></td>
                    <td className="p-3"><span className="font-semibold text-white">{car.pricePerDay}$</span></td>
                    <td className="p-3"><div className="flex gap-2"><button className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition"><FaEye size={14} /></button><button className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"><FaEdit size={14} /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredCars.length > 0 && <Pagination />}
        <div className="mt-4 text-sm text-center text-gray-500">عرض {paginatedCars.length} من {filteredCars.length} سيارة</div>
      </div>
    </div>
  );
}