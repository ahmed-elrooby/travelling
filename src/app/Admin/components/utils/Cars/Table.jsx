"use client";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCalendarCheck,
  FaSearch,
  FaCar,
  FaCarSide,
  FaTruckPickup,
  FaCrown,
  FaList,
  FaThLarge,
  FaChevronRight,
  FaChevronLeft,
  FaEye,
  FaEdit,
  FaStar,
} from "react-icons/fa";

import { useState, useContext } from "react";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";

export default function CarRentalSearchFilter() {
  const { Cars } = useContext(Admin);

  const [view, setView] = useState("cards");
  const [searchLocation, setSearchLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [carType, setCarType] = useState("جميع الفئات");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("rating");

  const itemsPerPage = 6;

  // ====== API DATA ======
  const carsData =
    Cars?.data?.activeBookings?.map((item, index) => ({
      id: index,
      name: item.car,
      type: "حجز",
      category: "عام",
      pricePerDay: item.price || 0,
      totalPrice: item.price || 0,
      image: "https://via.placeholder.com/400x300",
      features: [],
      transmission: "أوتوماتيك",
      seats: 5,
      fuel: "بنزين",
      pickup: item.from,
      return: item.to,
      rating: 4,
      reviews: 0,
    })) || [];

  // ===== Loading =====
  if (!Cars) {
    return (
      <div className="text-center text-gray-400 py-10">
        جاري تحميل البيانات...
      </div>
    );
  }

  // ===== FILTER =====
  const getFilteredCars = () => {
    let filtered = [...carsData];

    if (searchLocation) {
      filtered = filtered.filter(
        (car) =>
          car.pickup.includes(searchLocation) ||
          car.return.includes(searchLocation)
      );
    }

    if (carType !== "جميع الفئات") {
      filtered = filtered.filter((car) => car.category === carType);
    }

    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return filtered;
  };

  const filteredCars = getFilteredCars();

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderStars = (rating) => {
    return [...Array(Math.floor(rating))].map((_, i) => (
      <FaStar key={i} className="text-yellow-400 text-xs" />
    ));
  };

  // ===== Pagination =====
  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="px-3 py-2 text-gray-400 hover:bg-white/10 rounded-lg"
        >
          <FaChevronRight />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === i + 1
                ? "bg-purple-500 text-white"
                : "text-gray-400 hover:bg-white/10"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
          className="px-3 py-2 text-gray-400 hover:bg-white/10 rounded-lg"
        >
          <FaChevronLeft />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">

      {/* ===== FILTER ===== */}
      <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          <input
            placeholder="الموقع"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2 text-white"
          />

          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2 text-white"
          />

          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2 text-white"
          />

          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2 text-white"
          >
            <option>جميع الفئات</option>
            <option>عام</option>
          </select>

          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-2 flex justify-center items-center">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* ===== RESULTS ===== */}
      <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">

          <div className="flex gap-2">
            <button
              onClick={() => setView("cards")}
              className={`p-2 rounded-lg ${
                view === "cards"
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              <FaThLarge />
            </button>

            <button
              onClick={() => setView("table")}
              className={`p-2 rounded-lg ${
                view === "table"
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              <FaList />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/5 border border-purple-500/30 rounded-xl px-3 py-1 text-white"
          >
            <option value="rating">الأكثر تقييماً</option>
            <option value="price_asc">السعر الأقل</option>
            <option value="price_desc">السعر الأعلى</option>
          </select>
        </div>

        {/* ===== CARDS ===== */}
        {view === "cards" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

            {paginatedCars.map((car) => (
              <div
                key={car.id}
                className="rounded-2xl overflow-hidden bg-white/5 border border-purple-500/20 hover:scale-[1.02] transition"
              >
                <img
                  src={car.image}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="text-white font-bold">{car.name}</h3>

                  <div className="flex gap-1 mt-2">
                    {renderStars(car.rating)}
                  </div>

                  <div className="flex justify-between mt-4">
                    <span className="text-gray-400 text-sm">
                      {car.seats} مقاعد
                    </span>

                    <span className="text-purple-400 font-bold">
                      {car.pricePerDay}$
                    </span>
                  </div>

                  <button className="w-full mt-4 py-2 bg-purple-500 text-white rounded-xl">
                    استأجر
                  </button>
                </div>
              </div>
            ))}

          </div>
        ) : (
          // ===== TABLE =====
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm">
              <thead>
                <tr className="text-gray-400">
                  <th className="p-2">السيارة</th>
                  <th>السعر</th>
                  <th>إجراءات</th>
                </tr>
              </thead>

              <tbody>
                {paginatedCars.map((car) => (
                  <tr
                    key={car.id}
                    className="border-t border-purple-500/20"
                  >
                    <td className="p-2 text-white">{car.name}</td>
                    <td className="text-white">{car.pricePerDay}$</td>
                    <td>
                      <button className="text-purple-400">
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <Pagination />

        <p className="text-center text-gray-500 mt-4 text-sm">
          عرض {paginatedCars.length} من {filteredCars.length}
        </p>
      </div>
    </div>
  );
}