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
} from "react-icons/fa";
import { useState, useContext } from "react";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";

export default function HotelSearchFilter() {
  const { Hotel } = useContext(Admin);

  const data = Hotel?.data;

  // ===== تحويل الداتا =====
  const hotelsData =
    data?.recentBookings?.map((item, index) => ({
      id: item.id || index,
      name: item.hotel,
      location: item.city,
      stars: 4,
      pricePerNight: item.price,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      rating: 4.5,
      reviews: 100,
      available: item.status === "confirmed",
      checkIn: item.checkIn,
      checkOut: item.checkOut,
    })) || [];

  // ===== state =====
  const [view, setView] = useState("cards");
  const [activeFilter, setActiveFilter] = useState("جميع الفنادق");
  const [searchDestination, setSearchDestination] = useState("");
  const [guests, setGuests] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // ===== filters من API =====
  const filterOptions =
    data?.filters?.categories?.map((cat) => ({
      name: cat,
    })) || [];

  // ===== فلترة =====
  const filteredHotels = hotelsData.filter((hotel) => {
    return (
      hotel.name.includes(searchDestination) ||
      hotel.location.includes(searchDestination)
    );
  });

  // ===== pagination =====
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);

  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ===== stars =====
  const renderStars = (stars) => {
    const full = Math.floor(stars);
    const half = stars % 1 !== 0;
    return (
      <>
        {Array(full)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xs" />
          ))}
        {half && <FaStarHalfAlt className="text-yellow-400 text-xs" />}
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* SEARCH */}
      <div className="p-6 border rounded-2xl bg-white/5 border-purple-500/20">
        <div className="grid md:grid-cols-4 gap-4">
          <input
            placeholder="ابحث عن فندق"
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-purple-500/30 rounded-xl text-white"
          />

          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-purple-500/30 rounded-xl text-white"
          >
            {data?.filters?.guestsCount?.map((g, i) => (
              <option key={i} className="bg-black">
                {g}
              </option>
            ))}
          </select>

          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl">
            <FaSearch />
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filterOptions.map((f, i) => (
            <span
              key={i}
              onClick={() => setActiveFilter(f.name)}
              className={`px-3 py-1 rounded-full cursor-pointer ${
                activeFilter === f.name
                  ? "bg-purple-500 text-white"
                  : "bg-white/10 text-gray-300"
              }`}
            >
              {f.name}
            </span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button onClick={() => setView("cards")}>
            <FaThLarge />
          </button>
          <button onClick={() => setView("table")}>
            <FaList />
          </button>
        </div>
      </div>

      {/* RESULTS */}
      {view === "cards" ? (
        <div className="grid lg:grid-cols-3 gap-4">
          {paginatedHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="p-4 bg-white/5 border border-purple-500/20 rounded-2xl"
            >
              <img
                src={hotel.image}
                className="w-full h-40 object-cover rounded-xl"
              />

              <h3 className="text-white mt-2">{hotel.name}</h3>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <FaMapMarkerAlt /> {hotel.location}
              </p>

              <div className="flex gap-1 mt-2">
                {renderStars(hotel.rating)}
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {hotel.checkIn} → {hotel.checkOut}
              </p>

              <div className="flex justify-between mt-3">
                <span className="text-purple-400 font-bold">
                  {hotel.pricePerNight}$
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    hotel.available
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {hotel.available ? "متاح" : "غير متاح"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full text-white">
          <thead>
            <tr className="text-gray-400">
              <th>الفندق</th>
              <th>الموقع</th>
              <th>السعر</th>
            </tr>
          </thead>
          <tbody>
            {paginatedHotels.map((h) => (
              <tr key={h.id} className="border-t border-purple-500/20">
                <td>{h.name}</td>
                <td>{h.location}</td>
                <td>{h.pricePerNight}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() =>
            setCurrentPage((p) => Math.max(1, p - 1))
          }
        >
          <FaChevronRight />
        </button>

        <span className="text-white">{currentPage}</span>

        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
        >
          <FaChevronLeft />
        </button>
      </div>
    </div>
  );
}