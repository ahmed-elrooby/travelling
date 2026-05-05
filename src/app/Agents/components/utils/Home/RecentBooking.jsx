import React from 'react'
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaPlane, FaClock, FaStar, FaCheckCircle, FaEye } from 'react-icons/fa'
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md'

const RecentBooking = () => {
    const bookings = [
        {
            id: 1,
            customerName: "أحمد محمد",
            customerImage: "https://randomuser.me/api/portraits/men/1.jpg",
            destination: "دبي، الإمارات",
            from: "القاهرة",
            to: "دبي",
            departureDate: "2024-12-15",
            returnDate: "2024-12-22",
            passengers: 3,
            price: 1250,
            status: "confirmed",
            statusText: "مؤكد",
            airline: "طيران الإمارات",
            flightNumber: "EK 924",
            rating: 4.5
        },
        {
            id: 2,
            customerName: "سارة عبدالله",
            customerImage: "https://randomuser.me/api/portraits/women/2.jpg",
            destination: "اسطنبول، تركيا",
            from: "جدة",
            to: "اسطنبول",
            departureDate: "2024-12-18",
            returnDate: "2024-12-25",
            passengers: 2,
            price: 890,
            status: "pending",
            statusText: "قيد الانتظار",
            airline: "الخطوط التركية",
            flightNumber: "TK 845",
            rating: 4.8
        },
        {
            id: 3,
            customerName: "محمد علي",
            customerImage: "https://randomuser.me/api/portraits/men/3.jpg",
            destination: "لندن، بريطانيا",
            from: "الرياض",
            to: "لندن",
            departureDate: "2024-12-20",
            returnDate: "2024-12-28",
            passengers: 4,
            price: 2350,
            status: "confirmed",
            statusText: "مؤكد",
            airline: "الخطوط البريطانية",
            flightNumber: "BA 106",
            rating: 4.7
        },
        {
            id: 4,
            customerName: "نورة خالد",
            customerImage: "https://randomuser.me/api/portraits/women/4.jpg",
            destination: "كوالالمبور، ماليزيا",
            from: "أبوظبي",
            to: "كوالالمبور",
            departureDate: "2024-12-22",
            returnDate: "2024-12-30",
            passengers: 2,
            price: 980,
            status: "cancelled",
            statusText: "ملغي",
            airline: "الاتحاد للطيران",
            flightNumber: "EY 418",
            rating: 4.3
        },
        {
            id: 5,
            customerName: "عمر إبراهيم",
            customerImage: "https://randomuser.me/api/portraits/men/5.jpg",
            destination: "باريس، فرنسا",
            from: "الدوحة",
            to: "باريس",
            departureDate: "2024-12-25",
            returnDate: "2025-01-02",
            passengers: 2,
            price: 1850,
            status: "processing",
            statusText: "قيد المعالجة",
            airline: "القطرية",
            flightNumber: "QR 037",
            rating: 4.9
        }
    ]

    const getStatusStyle = (status) => {
        switch(status) {
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('ar-EG', options)
    }

    return (
    <div className="w-full col-span-2 h-[600px] bg-[#0f0c29] p-6 rounded-2xl shadow-lg border border-white/10">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">أحدث الحجوزات</h2>
                    <p className="mt-1 text-sm text-gray-400">آخر 5 حجوزات تمت في المنصة</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-purple-400 transition-all duration-300 border rounded-lg border-purple-500/30 hover:bg-purple-500/20 hover:scale-105">
                    عرض الكل
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden overflow-x-auto lg:block">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-700/50">
                            <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">العميل</th>
                            <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">الرحلة</th>
                            <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">التواريخ</th>
                            <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">المسافرون</th>
                            <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">السعر</th>
                            <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">الحالة</th>
                            <th className="px-4 py-4 text-sm font-semibold text-right text-gray-400">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.slice(0, 4).map((booking, index) => (
                            <tr 
                                key={booking.id} 
                                className="transition-all duration-300 border-b border-gray-700/30 hover:bg-white/5 group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Customer Info */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={booking.customerImage} 
                                            alt={booking.customerName}
                                            className="object-cover w-10 h-10 rounded-full ring-2 ring-purple-500/30"
                                        />
                                        <div>
                                            <p className="font-medium text-white">{booking.customerName}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <FaStar className="text-[10px] text-yellow-400" />
                                                <span className="text-xs text-gray-400">{booking.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Trip Info */}
                                <td className="px-4 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm">
                                            <MdFlightTakeoff className="text-purple-400" />
                                            <span className="text-gray-300">{booking.from}</span>
                                            <span className="text-gray-600">→</span>
                                            <MdFlightLand className="text-green-400" />
                                            <span className="text-gray-300">{booking.to}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <FaPlane className="text-[10px]" />
                                            <span>{booking.airline}</span>
                                            <span className="text-gray-700">•</span>
                                            <span>{booking.flightNumber}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Dates */}
                                <td className="px-4 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-300">
                                            <FaCalendarAlt className="text-purple-400" />
                                            <span>المغادرة: {formatDate(booking.departureDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-300">
                                            <FaCalendarAlt className="text-green-400" />
                                            <span>العودة: {formatDate(booking.returnDate)}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Passengers */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        <FaUsers className="text-purple-400" />
                                        <span className="text-gray-300">{booking.passengers} أشخاص</span>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="px-4 py-4">
                                    <div className="space-y-1">
                                        <p className="text-lg font-bold text-white">${booking.price}</p>
                                        <p className="text-xs text-gray-500">شامل الضرائب</p>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(booking.status)}`}>
                                        <FaCheckCircle className="text-[10px]" />
                                        {booking.statusText}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-4">
                                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-500/20">
                                        <FaEye />
                                        <span>عرض</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="space-y-4 lg:hidden">
                {bookings.map((booking, index) => (
                    <div 
                        key={booking.id}
                        className="p-4 transition-all duration-300 bg-gradient-to-br from-white/5 to-transparent border border-gray-700/30 rounded-xl hover:scale-[1.02]"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <img 
                                    src={booking.customerImage} 
                                    alt={booking.customerName}
                                    className="object-cover w-12 h-12 rounded-full ring-2 ring-purple-500/30"
                                />
                                <div>
                                    <p className="font-semibold text-white">{booking.customerName}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <FaStar className="text-[10px] text-yellow-400" />
                                        <span className="text-xs text-gray-400">{booking.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyle(booking.status)}`}>
                                {booking.statusText}
                            </span>
                        </div>

                        {/* Trip Details */}
                        <div className="p-3 mb-3 rounded-lg bg-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <MdFlightTakeoff className="text-purple-400" />
                                    <span className="text-gray-300">{booking.from}</span>
                                </div>
                                <span className="text-gray-600">→</span>
                                <div className="flex items-center gap-2 text-sm">
                                    <MdFlightLand className="text-green-400" />
                                    <span className="text-gray-300">{booking.to}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{booking.airline}</span>
                                <span>{booking.flightNumber}</span>
                            </div>
                        </div>

                        {/* Dates & Info */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500">تاريخ المغادرة</p>
                                <div className="flex items-center gap-1 text-sm text-gray-300">
                                    <FaCalendarAlt className="text-purple-400" />
                                    <span>{formatDate(booking.departureDate)}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500">تاريخ العودة</p>
                                <div className="flex items-center gap-1 text-sm text-gray-300">
                                    <FaCalendarAlt className="text-green-400" />
                                    <span>{formatDate(booking.returnDate)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-sm text-gray-300">
                                    <FaUsers className="text-purple-400" />
                                    <span>{booking.passengers}</span>
                                </div>
                                <div className="text-lg font-bold text-white">${booking.price}</div>
                            </div>
                            <button className="px-3 py-1.5 text-sm text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-500/20">
                                عرض التفاصيل
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentBooking