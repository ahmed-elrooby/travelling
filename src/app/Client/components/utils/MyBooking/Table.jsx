"use client";

import React, { useState } from 'react';
import { 
  FaPlane, 
  FaHotel, 
  FaCar, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaEye,
  FaReceipt,
  FaDownload,
  FaStar,
  FaWifi,
  FaUtensils,
  FaSwimmingPool,
  FaParking,
  FaSnowflake,
  FaTv,
  FaCoffee,
  FaFilter,
  FaSearch,
  FaThLarge,
  FaList,
  FaChevronLeft,
  FaChevronRight,
  FaBed,
  FaPlaneDeparture,
  FaCarSide
} from 'react-icons/fa';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';

const AllBookings = () => {
  const [activeFilter, setActiveFilter] = useState('all'); // all, flights, hotels, cars
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Static bookings data
  const bookings = [
    {
      id: 'BK-1001',
      type: 'flight',
      status: 'confirmed',
      date: '2024-03-20',
      amount: 450,
      rating: 4.5,
      details: {
        airline: 'الاتحاد للطيران',
        flightNumber: 'EY123',
        from: 'دبي (DXB)',
        to: 'لندن (LHR)',
        fromCode: 'DXB',
        toCode: 'LHR',
        departureTime: '10:30',
        arrivalTime: '15:45',
        date: '2024-03-20',
        returnDate: '2024-03-27',
        passengers: 2,
        class: 'درجة رجال الأعمال',
        seatNumbers: '12A, 12B',
        duration: '7h 15m',
        terminal: 'المحطة 3'
      }
    },
    {
      id: 'BK-1002',
      type: 'hotel',
      status: 'confirmed',
      date: '2024-03-21',
      amount: 890,
      rating: 4.8,
      details: {
        hotelName: 'برج العرب',
        location: 'دبي، الإمارات',
        roomType: 'جناح رئاسي',
        checkIn: '2024-03-21',
        checkOut: '2024-03-25',
        nights: 4,
        guests: 2,
        amenities: ['مسبح', 'واي فاي', 'موقف سيارات', 'سبا', 'مطعم'],
        breakfast: true,
        view: 'مطل على البحر',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
      }
    },
    {
      id: 'BK-1003',
      type: 'flight',
      status: 'pending',
      date: '2024-04-05',
      amount: 320,
      rating: 4.2,
      details: {
        airline: 'الطيران السعودي',
        flightNumber: 'SV456',
        from: 'جدة (JED)',
        to: 'القاهرة (CAI)',
        fromCode: 'JED',
        toCode: 'CAI',
        departureTime: '08:15',
        arrivalTime: '10:30',
        date: '2024-04-05',
        returnDate: '2024-04-12',
        passengers: 1,
        class: 'درجة السياحة',
        seatNumbers: '23A',
        duration: '3h 15m',
        terminal: 'المحطة 1'
      }
    },
    {
      id: 'BK-1004',
      type: 'car',
      status: 'cancelled',
      date: '2024-03-15',
      amount: 280,
      rating: 4.6,
      details: {
        carCompany: 'هيرتز',
        carModel: 'مرسيدس الفئة S',
        location: 'مطار دبي',
        pickupDate: '2024-03-15',
        returnDate: '2024-03-18',
        days: 3,
        transmission: 'أوتوماتيك',
        fuel: 'كاملة - كاملة',
        insurance: 'شامل',
        image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c'
      }
    },
    {
      id: 'BK-1005',
      type: 'hotel',
      status: 'completed',
      date: '2024-02-10',
      amount: 1250,
      rating: 4.9,
      details: {
        hotelName: 'فندق جميرا',
        location: 'دبي، الإمارات',
        roomType: 'غرفة ديلوكس',
        checkIn: '2024-02-10',
        checkOut: '2024-02-15',
        nights: 5,
        guests: 3,
        amenities: ['مسبح', 'واي فاي', 'موقف سيارات', 'جيم', 'سبا'],
        breakfast: true,
        view: 'اطلالة على المدينة',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945'
      }
    },
    {
      id: 'BK-1006',
      type: 'flight',
      status: 'confirmed',
      date: '2024-04-12',
      amount: 780,
      rating: 4.7,
      details: {
        airline: 'طيران الإمارات',
        flightNumber: 'EK789',
        from: 'دبي (DXB)',
        to: 'نيويورك (JFK)',
        fromCode: 'DXB',
        toCode: 'JFK',
        departureTime: '23:45',
        arrivalTime: '06:30',
        date: '2024-04-12',
        returnDate: '2024-04-20',
        passengers: 2,
        class: 'الدرجة الأولى',
        seatNumbers: '1A, 1B',
        duration: '14h 45m',
        terminal: 'المحطة 3'
      }
    },
    {
      id: 'BK-1007',
      type: 'car',
      status: 'confirmed',
      date: '2024-05-01',
      amount: 450,
      rating: 4.4,
      details: {
        carCompany: 'بدجت',
        carModel: 'بي ام دبليو الفئة 7',
        location: 'مطار الملك خالد',
        pickupDate: '2024-05-01',
        returnDate: '2024-05-05',
        days: 4,
        transmission: 'أوتوماتيك',
        fuel: 'كاملة - كاملة',
        insurance: 'شامل',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e'
      }
    },
    {
      id: 'BK-1008',
      type: 'hotel',
      status: 'pending',
      date: '2024-05-15',
      amount: 620,
      rating: 4.3,
      details: {
        hotelName: 'فندق الروز',
        location: 'القاهرة، مصر',
        roomType: 'غرفة سوبريور',
        checkIn: '2024-05-15',
        checkOut: '2024-05-18',
        nights: 3,
        guests: 2,
        amenities: ['واي فاي', 'مطعم', 'جيم'],
        breakfast: false,
        view: 'اطلالة على النيل',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd'
      }
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { icon: FaCheckCircle, color: 'green', text: 'مؤكد' },
      pending: { icon: FaHourglassHalf, color: 'yellow', text: 'قيد الانتظار' },
      cancelled: { icon: FaTimesCircle, color: 'red', text: 'ملغي' },
      completed: { icon: FaCheckCircle, color: 'blue', text: 'مكتمل' }
    };
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-${config.color}-500/20 text-${config.color}-400`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      flight: <FaPlane className="text-xl" />,
      hotel: <FaHotel className="text-xl" />,
      car: <FaCar className="text-xl" />
    };
    return icons[type];
  };

  const getTypeName = (type) => {
    const names = {
      flight: 'رحلة طيران',
      hotel: 'فندق',
      car: 'تأجير سيارات'
    };
    return names[type];
  };

  const getTypeColor = (type) => {
    const colors = {
      flight: 'purple',
      hotel: 'pink',
      car: 'blue'
    };
    return colors[type];
  };

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesType = activeFilter === 'all' || booking.type === activeFilter;
    const matchesSearch = searchTerm === '' || 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.type === 'flight' && booking.details.airline.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.type === 'hotel' && booking.details.hotelName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.type === 'car' && booking.details.carModel.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: bookings.length,
    flights: bookings.filter(b => b.type === 'flight').length,
    hotels: bookings.filter(b => b.type === 'hotel').length,
    cars: bookings.filter(b => b.type === 'car').length,
    totalSpent: bookings.reduce((sum, b) => sum + b.amount, 0)
  };

  const filterOptions = [
    { id: 'all', label: 'الجميع', icon: FaThLarge, count: stats.total },
    { id: 'flight', label: 'رحلات', icon: FaPlane, count: stats.flights },
    { id: 'hotel', label: 'فنادق', icon: FaHotel, count: stats.hotels },
    { id: 'car', label: 'سيارات', icon: FaCar, count: stats.cars }
  ];

  return (
    <div className="space-y-6">
     

      {/* Filters Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="text-sm" />
                <span>{filter.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-700/50'
                }`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search and View Options */}
        <div className="flex gap-2">
          <div className="relative">
            <FaSearch className="absolute text-sm text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
            <input
              type="text"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="py-2 pl-4 pr-10 text-white placeholder-gray-400 border rounded-lg bg-gray-800/50 border-purple-500/20 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex gap-1 p-1 rounded-lg bg-gray-800/50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
        : "space-y-4"
      }>
        {paginatedBookings.map((booking) => {
          const typeColor = getTypeColor(booking.type);
          
          if (viewMode === 'grid') {
            return (
              <div
                key={booking.id}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r from-${typeColor}-600 to-${typeColor}-400 p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl">
                        {getTypeIcon(booking.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{booking.id}</h3>
                        <p className="text-sm text-white/80">{getTypeName(booking.type)}</p>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  {/* Flight Details */}
                  {booking.type === 'flight' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">شركة الطيران:</span>
                        <span className="font-medium text-white">{booking.details.airline}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 py-2">
                        <div className="flex-1 text-center">
                          <p className="text-xs text-gray-400">من</p>
                          <p className="font-bold text-white">{booking.details.fromCode}</p>
                          <p className="text-xs text-purple-400">{booking.details.departureTime}</p>
                        </div>
                        <FaPlane className="text-sm text-purple-400" />
                        <div className="flex-1 text-center">
                          <p className="text-xs text-gray-400">إلى</p>
                          <p className="font-bold text-white">{booking.details.toCode}</p>
                          <p className="text-xs text-purple-400">{booking.details.arrivalTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 text-sm border-t border-gray-700">
                        <span className="text-gray-400">التاريخ:</span>
                        <span className="text-white">{booking.details.date}</span>
                      </div>
                    </div>
                  )}

                  {/* Hotel Details */}
                  {booking.type === 'hotel' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">اسم الفندق:</span>
                        <span className="font-medium text-white">{booking.details.hotelName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FaMapMarkerAlt className="text-xs text-red-400" />
                        <span className="text-gray-400">{booking.details.location}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 py-2">
                        <div>
                          <p className="text-xs text-gray-400">تسجيل الدخول</p>
                          <p className="text-sm text-white">{booking.details.checkIn}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">تسجيل الخروج</p>
                          <p className="text-sm text-white">{booking.details.checkOut}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Car Details */}
                  {booking.type === 'car' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">السيارة:</span>
                        <span className="font-medium text-white">{booking.details.carModel}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">الشركة:</span>
                        <span className="text-white">{booking.details.carCompany}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 py-2">
                        <div>
                          <p className="text-xs text-gray-400">تاريخ الاستلام</p>
                          <p className="text-sm text-white">{booking.details.pickupDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">تاريخ التسليم</p>
                          <p className="text-sm text-white">{booking.details.returnDate}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`w-3 h-3 ${i < Math.floor(booking.rating) ? 'text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                    <span className="mr-2 text-xs text-gray-400">({booking.rating})</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div>
                      <p className="text-xs text-gray-400">تاريخ الحجز</p>
                      <p className="text-sm text-white">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">المبلغ</p>
                      <p className="text-lg font-bold text-green-400">${booking.amount}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm text-purple-400 transition-all duration-200 rounded-lg bg-purple-500/20 hover:bg-purple-500/30">
                      <FaEye className="w-4 h-4" />
                      عرض التفاصيل
                    </button>
                    <button className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm text-blue-400 transition-all duration-200 rounded-lg bg-blue-500/20 hover:bg-blue-500/30">
                      <FaReceipt className="w-4 h-4" />
                      الفاتورة
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            // List View
            return (
              <div
                key={booking.id}
                className="p-4 transition-all duration-300 border bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border-purple-500/20 hover:border-purple-500/40"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className={`bg-${typeColor}-500/20 p-3 rounded-xl`}>
                      {getTypeIcon(booking.type)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-white">{booking.id}</h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      <p className="text-sm text-gray-400">{getTypeName(booking.type)}</p>
                      {booking.type === 'flight' && (
                        <p className="text-sm text-white">{booking.details.airline} - {booking.details.from} → {booking.details.to}</p>
                      )}
                      {booking.type === 'hotel' && (
                        <p className="text-sm text-white">{booking.details.hotelName} - {booking.details.location}</p>
                      )}
                      {booking.type === 'car' && (
                        <p className="text-sm text-white">{booking.details.carModel} - {booking.details.carCompany}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">المبلغ</p>
                      <p className="font-bold text-green-400">${booking.amount}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 transition-all duration-200 rounded-lg bg-purple-500/20 hover:bg-purple-500/30">
                        <FaEye className="w-4 h-4 text-purple-400" />
                      </button>
                      <button className="p-2 transition-all duration-200 rounded-lg bg-blue-500/20 hover:bg-blue-500/30">
                        <FaReceipt className="w-4 h-4 text-blue-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Empty State */}
      {paginatedBookings.length === 0 && (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl text-gray-500">📋</div>
          <p className="text-lg text-gray-400">لا توجد حجوزات تطابق معايير البحث</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 rounded-lg bg-gray-800/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                currentPage === i + 1
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 rounded-lg bg-gray-800/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBookings;