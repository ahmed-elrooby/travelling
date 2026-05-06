"use client"
import { Agent } from '@/app/Providers/AgentContext/AgentProvider';
import React, { useContext, useState } from 'react'
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaPlane, FaClock, FaStar, FaCheckCircle, FaEye, FaHotel, FaCar, FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa'
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md'

const RecentBooking = () => {
  const { booking } = useContext(Agent);
  console.log(booking)
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'flights', 'hotels', 'cars'

  // Extract data from the API structure
  const flights = booking?.flights || []
  const hotels = booking?.hotels || []
  const cars = booking?.cars || []
  
  // Combine all bookings for "all" tab
  const allBookings = [
    ...flights.map(flight => ({ ...flight, type: 'flight' })),
    ...hotels.map(hotel => ({ ...hotel, type: 'hotel' })),
    ...cars.map(car => ({ ...car, type: 'car' }))
  ].sort((a, b) => new Date(b.date || b.checkIn || b.pickupDate) - new Date(a.date || a.checkIn || a.pickupDate))

  const getBookingsToShow = () => {
    switch(activeTab) {
      case 'flights': return flights.map(f => ({ ...f, type: 'flight' }))
      case 'hotels': return hotels.map(h => ({ ...h, type: 'hotel' }))
      case 'cars': return cars.map(c => ({ ...c, type: 'car' }))
      default: return allBookings
    }
  }

  const getStatusStyle = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return 'مؤكد'
      case 'pending': return 'قيد الانتظار'
      case 'processing': return 'قيد المعالجة'
      case 'cancelled': return 'ملغي'
      default: return status || 'غير محدد'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد'
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('ar-EG', options)
  }

  const renderFlightCard = (flight) => (
    <tr key={flight.id} className="transition-all duration-300 border-b border-gray-700/30 hover:bg-white/5 group">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <FaPlane className="text-white" />
          </div>
          <div>
            <p className="font-medium text-white">{flight.customer}</p>
            <p className="text-xs text-gray-400">مسافر</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <MdFlightTakeoff className="text-purple-400" />
            <span className="text-gray-300">{flight.route?.split(' - ')[0] || flight.fromCity || 'غير محدد'}</span>
            <span className="text-gray-600">→</span>
            <MdFlightLand className="text-green-400" />
            <span className="text-gray-300">{flight.route?.split(' - ')[1] || flight.toCity || 'غير محدد'}</span>
          </div>
          {flight.flightNo && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>رقم الرحلة: {flight.flightNo}</span>
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <FaCalendarAlt className="text-purple-400" />
          <span>{formatDate(flight.date)}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <FaUsers className="text-purple-400" />
          <span className="text-gray-300">{flight.customer}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="text-lg font-bold text-white">${flight.price}</p>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(flight.status)}`}>
          <FaCheckCircle className="text-[10px]" />
          {getStatusText(flight.status)}
        </span>
      </td>
    
    </tr>
  )

  const renderHotelCard = (hotel) => (
    <tr key={hotel.id} className="transition-all duration-300 border-b border-gray-700/30 hover:bg-white/5 group">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
            <FaHotel className="text-white" />
          </div>
          <div>
            <p className="font-medium text-white">{hotel.customer}</p>
            <p className="text-xs text-gray-400">نزيل</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className="text-purple-400" />
            <span className="text-gray-300">{hotel.hotel}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{hotel.city}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <FaCalendarAlt className="text-green-400" />
            <span>دخول: {formatDate(hotel.checkIn)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <FaCalendarAlt className="text-red-400" />
            <span>خروج: {formatDate(hotel.checkOut)}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <FaUsers className="text-purple-400" />
          <span className="text-gray-300">{hotel.guests}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="text-lg font-bold text-white">${hotel.price}</p>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(hotel.status)}`}>
          <FaCheckCircle className="text-[10px]" />
          {getStatusText(hotel.status)}
        </span>
      </td>
     
    </tr>
  )

  const renderCarCard = (car) => (
    <tr key={car.id} className="transition-all duration-300 border-b border-gray-700/30 hover:bg-white/5 group">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500">
            <FaCar className="text-white" />
          </div>
          <div>
            <p className="font-medium text-white">{car.customer}</p>
            <p className="text-xs text-gray-400">سائق</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <FaCar className="text-purple-400" />
            <span className="text-gray-300">{car.car}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{car.fromCity} → {car.toCity}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <FaCalendarAlt className="text-green-400" />
            <span>استلام: {formatDate(car.pickupDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <FaCalendarAlt className="text-red-400" />
            <span>تسليم: {formatDate(car.returnDate)}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <FaClock className="text-purple-400" />
            <span>{car.duration}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="text-lg font-bold text-white">${car.price}</p>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(car.status)}`}>
          <FaCheckCircle className="text-[10px]" />
          {getStatusText(car.status)}
        </span>
      </td>
     
    </tr>
  )

  const currentBookings = getBookingsToShow()

  return (
    <div className="w-full col-span-2 h-auto min-h-[600px] bg-gradient-to-br from-[#0f0c29] via-[#1a1a3e] to-[#0f0c29] p-3 md:p-6 rounded-2xl shadow-lg border border-white/10">
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">أحدث الحجوزات</h2>
          <p className="mt-1 text-sm text-gray-400">جميع حجوزات الطيران والفنادق والسيارات</p>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 p-1 rounded-xl bg-black/30 backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              activeTab === 'all' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setActiveTab('flights')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'flights' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FaPlane className="hidden text-xs md:block" />
            طيران
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'hotels' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FaHotel className="hidden text-xs md:block" />
            فنادق
          </button>
          <button
            onClick={() => setActiveTab('cars')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'cars' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FaCar className="hidden text-xs md:block" />
            سيارات
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 text-center border rounded-lg bg-white/5 border-white/10">
          <FaPlane className="mx-auto mb-1 text-purple-400" />
          <p className="text-2xl font-bold text-white">{flights.length}</p>
          <p className="text-xs text-gray-400">رحلات طيران</p>
        </div>
        <div className="p-3 text-center border rounded-lg bg-white/5 border-white/10">
          <FaHotel className="mx-auto mb-1 text-blue-400" />
          <p className="text-2xl font-bold text-white">{hotels.length}</p>
          <p className="text-xs text-gray-400">حجوزات فنادق</p>
        </div>
        <div className="p-3 text-center border rounded-lg bg-white/5 border-white/10">
          <FaCar className="mx-auto mb-1 text-orange-400" />
          <p className="text-2xl font-bold text-white">{cars.length}</p>
          <p className="text-xs text-gray-400">تأجير سيارات</p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">العميل</th>
              <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">
                {activeTab === 'flights' ? 'الرحلة' : activeTab === 'hotels' ? 'الفندق' : 'السيارة'}
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">التواريخ</th>
              <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">
                {activeTab === 'flights' ? 'المسافر' : activeTab === 'hotels' ? 'الضيوف' : 'المدة'}
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">السعر</th>
              <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.slice(0, 5).map((booking) => {
                if (booking.type === 'flight') return renderFlightCard(booking)
                if (booking.type === 'hotel') return renderHotelCard(booking)
                if (booking.type === 'car') return renderCarCard(booking)
                return null
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-12 text-center text-gray-400">
                  لا توجد حجوزات لعرضها
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 lg:hidden">
        {currentBookings.slice(0, 5).map((booking, index) => (
          <div 
            key={booking.id}
            className="p-4 transition-all duration-300 border bg-gradient-to-br from-white/5 to-transparent border-gray-700/30 rounded-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  booking.type === 'flight' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                  booking.type === 'hotel' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                  'bg-gradient-to-br from-orange-500 to-red-500'
                }`}>
                  {booking.type === 'flight' && <FaPlane className="text-white" />}
                  {booking.type === 'hotel' && <FaHotel className="text-white" />}
                  {booking.type === 'car' && <FaCar className="text-white" />}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {booking.customer}
                  </p>
                  <p className="text-xs text-gray-400">
                    {booking.type === 'flight' ? 'رحلة طيران' : booking.type === 'hotel' ? 'حجز فندق' : 'تأجير سيارة'}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyle(booking.status)}`}>
                {getStatusText(booking.status)}
              </span>
            </div>

            {/* Details */}
            <div className="p-3 mb-3 rounded-lg bg-white/5">
              {booking.type === 'flight' && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MdFlightTakeoff className="text-purple-400" />
                      <span className="text-gray-300">{booking.route?.split(' - ')[0]}</span>
                    </div>
                    <span className="text-gray-600">→</span>
                    <div className="flex items-center gap-2 text-sm">
                      <MdFlightLand className="text-green-400" />
                      <span className="text-gray-300">{booking.route?.split(' - ')[1]}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">التاريخ: {formatDate(booking.date)}</div>
                </>
              )}
              {booking.type === 'hotel' && (
                <>
                  <div className="mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FaHotel className="text-purple-400" />
                      <span>{booking.hotel}</span>
                    </div>
                    <div className="text-xs text-gray-500">{booking.city}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </div>
                </>
              )}
              {booking.type === 'car' && (
                <>
                  <div className="mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FaCar className="text-purple-400" />
                      <span>{booking.car}</span>
                    </div>
                    <div className="text-xs text-gray-500">{booking.fromCity} → {booking.toCity}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
              <div className="text-lg font-bold text-white">${booking.price}</div>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentBooking