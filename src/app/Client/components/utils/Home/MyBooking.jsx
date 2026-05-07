"use client";

import { Clients } from '@/app/Providers/ClientContext/ClientsProviders';
import React, { useContext, useState } from 'react';
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
  FaCoffee
} from 'react-icons/fa';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
const {myBooking}=useContext(Clients)
console.log(myBooking)
  // Static bookings data
  const bookings = [
    {
      id: 'BK-1001',
      type: 'flight',
      status: 'confirmed',
      date: '2024-03-20',
      amount: 450,
      icon: FaPlane,
      color: 'purple',
      details: {
        airline: 'الاتحاد للطيران',
        flightNumber: 'EY123',
        from: 'دبي (DXB)',
        to: 'لندن (LHR)',
        departureTime: '10:30',
        arrivalTime: '15:45',
        date: '2024-03-20',
        returnDate: '2024-03-27',
        passengers: 2,
        class: 'درجة رجال الأعمال',
        seatNumbers: '12A, 12B'
      }
    },
    {
      id: 'BK-1002',
      type: 'hotel',
      status: 'confirmed',
      date: '2024-03-21',
      amount: 890,
      icon: FaHotel,
      color: 'blue',
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
        view: 'مطل على البحر'
      }
    },
    {
      id: 'BK-1003',
      type: 'flight',
      status: 'pending',
      date: '2024-04-05',
      amount: 320,
      icon: FaPlane,
      color: 'yellow',
      details: {
        airline: 'الطيران السعودي',
        flightNumber: 'SV456',
        from: 'جدة (JED)',
        to: 'القاهرة (CAI)',
        departureTime: '08:15',
        arrivalTime: '10:30',
        date: '2024-04-05',
        returnDate: '2024-04-12',
        passengers: 1,
        class: 'درجة السياحة',
        seatNumbers: '23A'
      }
    },
    {
      id: 'BK-1004',
      type: 'car',
      status: 'cancelled',
      date: '2024-03-15',
      amount: 280,
      icon: FaCar,
      color: 'red',
      details: {
        carCompany: 'هيرتز',
        carModel: 'مرسيدس الفئة S',
        location: 'مطار دبي',
        pickupDate: '2024-03-15',
        returnDate: '2024-03-18',
        days: 3,
        transmission: 'أوتوماتيك',
        fuel: 'كاملة - كاملة',
        insurance: 'شامل'
      }
    },
    {
      id: 'BK-1005',
      type: 'hotel',
      status: 'completed',
      date: '2024-02-10',
      amount: 1250,
      icon: FaHotel,
      color: 'green',
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
        view: 'اطلالة على المدينة'
      }
    },
    {
      id: 'BK-1006',
      type: 'flight',
      status: 'confirmed',
      date: '2024-04-12',
      amount: 780,
      icon: FaPlane,
      color: 'purple',
      details: {
        airline: 'طيران الإمارات',
        flightNumber: 'EK789',
        from: 'دبي (DXB)',
        to: 'نيويورك (JFK)',
        departureTime: '23:45',
        arrivalTime: '06:30',
        date: '2024-04-12',
        returnDate: '2024-04-20',
        passengers: 2,
        class: 'الدرجة الأولى',
        seatNumbers: '1A, 1B'
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

  const getColorClasses = (color) => {
    const colors = {
      purple: 'from-purple-600 to-purple-400',
      blue: 'from-blue-600 to-blue-400',
      green: 'from-green-600 to-green-400',
      red: 'from-red-600 to-red-400',
      yellow: 'from-yellow-600 to-yellow-400'
    };
    return colors[color] || colors.purple;
  };

  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);

  const totalSpent = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  const activeBookings = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 border bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border-purple-500/20">
          <p className="text-sm text-gray-400">إجمالي الحجوزات</p>
          <p className="mt-1 text-2xl font-bold text-white">{bookings.length}</p>
          <p className="mt-1 text-xs text-green-400">+2 هذا الشهر</p>
        </div>
        <div className="p-4 border bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border-purple-500/20">
          <p className="text-sm text-gray-400">الحجوزات النشطة</p>
          <p className="mt-1 text-2xl font-bold text-white">{activeBookings}</p>
          <p className="mt-1 text-xs text-blue-400">رحلات قادمة</p>
        </div>
        <div className="p-4 border bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border-purple-500/20">
          <p className="text-sm text-gray-400">إجمالي الإنفاق</p>
          <p className="mt-1 text-2xl font-bold text-white">${totalSpent.toLocaleString()}</p>
          <p className="mt-1 text-xs text-green-400">شامل الضرائب</p>
        </div>
        <div className="p-4 border bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border-purple-500/20">
          <p className="text-sm text-gray-400">نقاط المكافآت</p>
          <p className="mt-1 text-2xl font-bold text-yellow-400">2,850</p>
          <p className="mt-1 text-xs text-gray-400">تكافئ $142.50</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-700">
        {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {tab === 'all' && 'الكل'}
            {tab === 'confirmed' && 'مؤكد'}
            {tab === 'pending' && 'قيد الانتظار'}
            {tab === 'completed' && 'مكتمل'}
            {tab === 'cancelled' && 'ملغي'}
          </button>
        ))}
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredBookings.map((booking) => {
          const Icon = booking.icon;
          return (
            <div
              key={booking.id}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${getColorClasses(booking.color)} p-4`}>
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
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">رقم الرحلة:</span>
                      <span className="font-mono text-purple-400">{booking.details.flightNumber}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-2">
                      <div className="flex-1 text-center">
                        <p className="text-xs text-gray-400">من</p>
                        <p className="font-bold text-white">{booking.details.from}</p>
                        <p className="text-xs text-purple-400">{booking.details.departureTime}</p>
                      </div>
                      <FaPlane className="text-sm text-purple-400" />
                      <div className="flex-1 text-center">
                        <p className="text-xs text-gray-400">إلى</p>
                        <p className="font-bold text-white">{booking.details.to}</p>
                        <p className="text-xs text-purple-400">{booking.details.arrivalTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 text-sm border-t border-gray-700">
                      <span className="text-gray-400">المسافرين:</span>
                      <span className="text-white">{booking.details.passengers} أشخاص</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">الدرجة:</span>
                      <span className="text-white">{booking.details.class}</span>
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
                    <div className="flex flex-wrap gap-2 pt-2">
                      {booking.details.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs text-gray-300 rounded-lg bg-gray-700/50">
                          {amenity}
                        </span>
                      ))}
                      {booking.details.amenities.length > 3 && (
                        <span className="text-xs text-purple-400">+{booking.details.amenities.length - 3}</span>
                      )}
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
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">المدة:</span>
                      <span className="text-white">{booking.details.days} أيام</span>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-700">
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
                <div className="flex gap-2 pt-2">
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

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 transition-opacity duration-700 opacity-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 group-hover:opacity-100"></div>
            </div>
          );
        })}
      </div>

      {filteredBookings.length === 0 && (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl text-gray-500">📋</div>
          <p className="text-lg text-gray-400">لا توجد حجوزات في هذا القسم</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;