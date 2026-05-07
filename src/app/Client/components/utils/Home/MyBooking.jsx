"use client";

import { Clients } from '@/app/Providers/ClientContext/ClientsProviders';
import React, { useContext, useState, useMemo } from 'react';
import { 
  FaPlane, 
  FaHotel, 
  FaCar, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaEye,
  FaReceipt,
  FaDollarSign,
  FaClock,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaUser,
  FaIdCard
} from 'react-icons/fa';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { myBooking } = useContext(Clients);

  // ✅ تنسيق التاريخ
  const formatDate = (date) => {
    if (!date) return '--';
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // ✅ تنسيق السعر
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // ✅ تجميع جميع الحجوزات في مصفوفة واحدة
  const allBookings = useMemo(() => {
    const bookings = [];
    
    // إضافة حجوزات الفنادق
    if (myBooking?.hotels && myBooking.hotels.length > 0) {
      myBooking.hotels.forEach(hotel => {
        bookings.push({
          id: hotel.id,
          type: 'hotel',
          customer: hotel.customer,
          status: hotel.status || 'confirmed',
          amount: hotel.price || 0,
          date: hotel.updatedAt || hotel.checkIn,
          color: 'purple',
          details: {
            hotelName: hotel.hotel,
            location: hotel.city,
            checkIn: hotel.checkIn,
            checkOut: hotel.checkOut,
            guests: hotel.guests,
            nights: Math.ceil((new Date(hotel.checkOut) - new Date(hotel.checkIn)) / (1000 * 60 * 60 * 24))
          }
        });
      });
    }
    
    // إضافة حجوزات الطيران
    if (myBooking?.flights && myBooking.flights.length > 0) {
      myBooking.flights.forEach(flight => {
        // تقسيم المسار (مثال: "القاهره - جيبوتي")
        const routeParts = flight.route?.split(' - ') || ['', ''];
        bookings.push({
          id: flight.id,
          type: 'flight',
          customer: flight.customer,
          status: flight.status || 'confirmed',
          amount: flight.price || 0,
          date: flight.date,
          color: 'blue',
          details: {
            airline: flight.airline || 'شركة طيران',
            flightNumber: flight.flightNumber || flight.id,
            from: routeParts[0] || '---',
            to: routeParts[1] || '---',
            departureTime: flight.departureTime || '--:--',
            arrivalTime: flight.arrivalTime || '--:--',
            passengers: flight.passengers || 1,
            class: flight.class || 'اقتصادي'
          }
        });
      });
    }
    
    // إضافة حجوزات السيارات
    if (myBooking?.cars && myBooking.cars.length > 0) {
      myBooking.cars.forEach(car => {
        bookings.push({
          id: car.id,
          type: 'car',
          customer: car.customer,
          status: car.status || 'confirmed',
          amount: car.price || 0,
          date: car.pickupDate || car.date,
          color: 'green',
          details: {
            carModel: car.car,
            carCompany: car.company || 'شركة تأجير',
            fromCity: car.fromCity,
            toCity: car.toCity,
            pickupDate: car.pickupDate,
            returnDate: car.returnDate,
            days: car.days || 1
          }
        });
      });
    }
    
    return bookings;
  }, [myBooking]);

  // ✅ فلترة الحجوزات حسب التبويب النشط
  const filteredBookings = useMemo(() => {
    if (activeTab === 'all') return allBookings;
    if (activeTab === 'confirmed') return allBookings.filter(b => b.status === 'confirmed');
    if (activeTab === 'pending') return allBookings.filter(b => b.status === 'pending');
    if (activeTab === 'refunded') return allBookings.filter(b => b.status === 'refunded');
    if (activeTab === 'cancelled') return allBookings.filter(b => b.status === 'cancelled');
    return allBookings;
  }, [allBookings, activeTab]);



  // ✅ الحصول على حالة الحجز
  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { icon: FaCheckCircle, color: 'green', text: 'مؤكد' },
      pending: { icon: FaHourglassHalf, color: 'yellow', text: 'قيد الانتظار' },
      cancelled: { icon: FaTimesCircle, color: 'red', text: 'ملغي' },
      refunded: { icon: FaCheckCircle, color: 'blue', text: 'مسترد' },
    };
    const config = statusConfig[status] || statusConfig.confirmed;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-${config.color}-500/20 text-${config.color}-400`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  // ✅ الحصول على أيقونة نوع الحجز
  const getTypeIcon = (type) => {
    const icons = {
      flight: <FaPlane className="text-xl" />,
      hotel: <FaHotel className="text-xl" />,
      car: <FaCar className="text-xl" />
    };
    return icons[type];
  };

  // ✅ الحصول على اسم نوع الحجز
  const getTypeName = (type) => {
    const names = {
      flight: 'رحلة طيران',
      hotel: 'فندق',
      car: 'تأجير سيارات'
    };
    return names[type];
  };

  // ✅ الحصول على ألوان التدرج
  const getColorClasses = (type) => {
    const colors = {
      hotel: 'from-purple-600 to-purple-400',
      flight: 'from-blue-600 to-blue-400',
      car: 'from-green-600 to-green-400'
    };
    return colors[type] || colors.hotel;
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
     

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-700">
        {[
          { id: 'all', name: 'الكل' },
          { id: 'confirmed', name: 'مؤكد' },
          { id: 'pending', name: 'قيد الانتظار' },
          { id: 'refunded', name: 'مسترد' },
          { id: 'cancelled', name: 'ملغي' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${getColorClasses(booking.type)} p-4`}>
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
                {/* Customer Name */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-700">
                  <span className="text-sm text-gray-400">العميل:</span>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-sm text-purple-400" />
                    <span className="font-medium text-white">{booking.customer || '---'}</span>
                  </div>
                </div>

                {/* Hotel Details */}
                {booking.type === 'hotel' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">اسم الفندق:</span>
                      <span className="font-medium text-white">{booking.details.hotelName || '---'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaMapMarkerAlt className="text-xs text-red-400" />
                      <span className="text-gray-400">{booking.details.location || '---'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-2">
                      <div>
                        <p className="text-xs text-gray-400">تسجيل الدخول</p>
                        <p className="text-sm text-white">{formatDate(booking.details.checkIn)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">تسجيل الخروج</p>
                        <p className="text-sm text-white">{formatDate(booking.details.checkOut)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">عدد الليالي:</span>
                      <span className="font-medium text-white">{booking.details.nights} ليالي</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">الضيوف:</span>
                      <span className="text-white">{booking.details.guests || 'شخصان'}</span>
                    </div>
                  </div>
                )}

                {/* Flight Details */}
                {booking.type === 'flight' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">رقم الرحلة:</span>
                      <span className="font-mono text-purple-400">{booking.details.flightNumber}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-2">
                      <div className="flex-1 text-center">
                        <p className="text-xs text-gray-400">من</p>
                        <p className="font-bold text-white">{booking.details.from}</p>
                      </div>
                      <FaPlane className="text-sm text-purple-400" />
                      <div className="flex-1 text-center">
                        <p className="text-xs text-gray-400">إلى</p>
                        <p className="font-bold text-white">{booking.details.to}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 text-sm">
                      <span className="text-gray-400">المسافرين:</span>
                      <span className="text-white">{booking.details.passengers} أشخاص</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">الدرجة:</span>
                      <span className="text-white">{booking.details.class}</span>
                    </div>
                  </div>
                )}

                {/* Car Details */}
                {booking.type === 'car' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">السيارة:</span>
                      <span className="font-medium text-white">{booking.details.carModel || '---'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">من مدينة:</span>
                      <span className="text-white">{booking.details.fromCity || '---'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-2">
                      <div>
                        <p className="text-xs text-gray-400">تاريخ الاستلام</p>
                        <p className="text-sm text-white">{formatDate(booking.details.pickupDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">تاريخ التسليم</p>
                        <p className="text-sm text-white">{formatDate(booking.details.returnDate)}</p>
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
                    <p className="text-sm text-white">{formatDate(booking.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">المبلغ</p>
                    <p className="text-lg font-bold text-green-400">${formatPrice(booking.amount)}</p>
                  </div>
                </div>

               
              </div>

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 transition-opacity duration-700 opacity-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl text-gray-500">📋</div>
          <p className="text-lg text-gray-400">لا توجد حجوزات في هذا القسم</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;