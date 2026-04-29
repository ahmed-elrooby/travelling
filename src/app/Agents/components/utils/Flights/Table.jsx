"use client";
import React, { useState } from 'react'
import { 
    FaPlane, FaCalendarAlt, FaUsers, FaDollarSign, FaEye, 
    FaEdit, FaTrash, FaPrint, FaDownload, FaTable, FaThLarge,
    FaSearch, FaFilter, FaSort, FaChevronLeft, FaChevronRight,
    FaCheckCircle, FaTimesCircle, FaClock, FaSpinner
} from 'react-icons/fa'
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md'

const FlightBookingsTable = () => {
    const [viewMode, setViewMode] = useState('table') // 'table' or 'cards'
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(6)
    const [sortField, setSortField] = useState('date')
    const [sortDirection, setSortDirection] = useState('desc')

    const bookings = [
        {
            id: 1,
            bookingNumber: "TK-2024-001",
            customerName: "أحمد محمد",
            customerImage: "https://randomuser.me/api/portraits/men/1.jpg",
            customerEmail: "ahmed@example.com",
            customerPhone: "+966 50 123 4567",
            from: "القاهرة",
            to: "دبي",
            departureDate: "2024-12-15",
            departureTime: "08:30",
            returnDate: "2024-12-22",
            returnTime: "14:20",
            passengers: 3,
            price: 1250,
            status: "confirmed",
            statusText: "مؤكد",
            statusColor: "green",
            airline: "طيران الإمارات",
            flightNumber: "EK 924",
            class: "درجة رجال الأعمال",
            paymentStatus: "paid",
            paymentText: "مدفوع",
            createdAt: "2024-12-01"
        },
        {
            id: 2,
            bookingNumber: "TK-2024-002",
            customerName: "سارة عبدالله",
            customerImage: "https://randomuser.me/api/portraits/women/2.jpg",
            customerEmail: "sara@example.com",
            customerPhone: "+966 55 234 5678",
            from: "جدة",
            to: "اسطنبول",
            departureDate: "2024-12-18",
            departureTime: "22:15",
            returnDate: "2024-12-25",
            returnTime: "19:30",
            passengers: 2,
            price: 890,
            status: "pending",
            statusText: "قيد الانتظار",
            statusColor: "yellow",
            airline: "الخطوط التركية",
            flightNumber: "TK 845",
            class: "درجة السياحة",
            paymentStatus: "pending",
            paymentText: "قيد الدفع",
            createdAt: "2024-12-05"
        },
        {
            id: 3,
            bookingNumber: "TK-2024-003",
            customerName: "محمد علي",
            customerImage: "https://randomuser.me/api/portraits/men/3.jpg",
            customerEmail: "mohamed@example.com",
            customerPhone: "+966 50 345 6789",
            from: "الرياض",
            to: "لندن",
            departureDate: "2024-12-20",
            departureTime: "09:45",
            returnDate: "2024-12-28",
            returnTime: "16:10",
            passengers: 4,
            price: 2350,
            status: "confirmed",
            statusText: "مؤكد",
            statusColor: "green",
            airline: "الخطوط البريطانية",
            flightNumber: "BA 106",
            class: "الدرجة الأولى",
            paymentStatus: "paid",
            paymentText: "مدفوع",
            createdAt: "2024-12-08"
        },
        {
            id: 4,
            bookingNumber: "TK-2024-004",
            customerName: "نورة خالد",
            customerImage: "https://randomuser.me/api/portraits/women/4.jpg",
            customerEmail: "noura@example.com",
            customerPhone: "+966 55 456 7890",
            from: "أبوظبي",
            to: "كوالالمبور",
            departureDate: "2024-12-22",
            departureTime: "11:30",
            returnDate: "2024-12-30",
            returnTime: "09:15",
            passengers: 2,
            price: 980,
            status: "cancelled",
            statusText: "ملغي",
            statusColor: "red",
            airline: "الاتحاد للطيران",
            flightNumber: "EY 418",
            class: "درجة السياحة",
            paymentStatus: "refunded",
            paymentText: "مسترجع",
            createdAt: "2024-12-10"
        },
        {
            id: 5,
            bookingNumber: "TK-2024-005",
            customerName: "عمر إبراهيم",
            customerImage: "https://randomuser.me/api/portraits/men/5.jpg",
            customerEmail: "omar@example.com",
            customerPhone: "+966 50 567 8901",
            from: "الدوحة",
            to: "باريس",
            departureDate: "2024-12-25",
            departureTime: "07:20",
            returnDate: "2025-01-02",
            returnTime: "21:35",
            passengers: 2,
            price: 1850,
            status: "processing",
            statusText: "قيد المعالجة",
            statusColor: "blue",
            airline: "القطرية",
            flightNumber: "QR 037",
            class: "درجة رجال الأعمال",
            paymentStatus: "processing",
            paymentText: "جاري المعالجة",
            createdAt: "2024-12-12"
        },
        {
            id: 6,
            bookingNumber: "TK-2024-006",
            customerName: "فاطمة حسن",
            customerImage: "https://randomuser.me/api/portraits/women/6.jpg",
            customerEmail: "fatima@example.com",
            customerPhone: "+966 55 678 9012",
            from: "دبي",
            to: "نيويورك",
            departureDate: "2024-12-28",
            departureTime: "13:40",
            returnDate: "2025-01-10",
            returnTime: "10:25",
            passengers: 3,
            price: 3200,
            status: "confirmed",
            statusText: "مؤكد",
            statusColor: "green",
            airline: "طيران الإمارات",
            flightNumber: "EK 201",
            class: "الدرجة الأولى",
            paymentStatus: "paid",
            paymentText: "مدفوع",
            createdAt: "2024-12-14"
        },
        {
            id: 7,
            bookingNumber: "TK-2024-007",
            customerName: "خالد عبدالرحمن",
            customerImage: "https://randomuser.me/api/portraits/men/7.jpg",
            customerEmail: "khaled@example.com",
            customerPhone: "+966 50 789 0123",
            from: "القاهرة",
            to: "كيب تاون",
            departureDate: "2025-01-05",
            departureTime: "23:15",
            returnDate: "2025-01-15",
            returnTime: "21:45",
            passengers: 2,
            price: 1450,
            status: "pending",
            statusText: "قيد الانتظار",
            statusColor: "yellow",
            airline: "مصر للطيران",
            flightNumber: "MS 839",
            class: "درجة السياحة",
            paymentStatus: "pending",
            paymentText: "قيد الدفع",
            createdAt: "2024-12-15"
        }
    ]

    const getStatusBadge = (status, text) => {
        const colors = {
            green: 'bg-green-500/20 text-green-400 border-green-500/30',
            yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            red: 'bg-red-500/20 text-red-400 border-red-500/30',
            blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
        }
        const icons = {
            confirmed: <FaCheckCircle className="text-[10px]" />,
            pending: <FaClock className="text-[10px]" />,
            cancelled: <FaTimesCircle className="text-[10px]" />,
            processing: <FaSpinner className="text-[10px] animate-spin" />
        }
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${colors[status]}`}>
                {icons[status]}
                {text}
            </span>
        )
    }

    const getPaymentBadge = (status, text) => {
        const colors = {
            paid: 'bg-green-500/20 text-green-400 border-green-500/30',
            pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            refunded: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
        }
        return (
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${colors[status]}`}>
                {text}
            </span>
        )
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('ar-EG', options)
    }

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    // Filter and sort data
    const filteredBookings = bookings.filter(booking => 
        booking.customerName.includes(searchTerm) ||
        booking.bookingNumber.includes(searchTerm) ||
        booking.from.includes(searchTerm) ||
        booking.to.includes(searchTerm)
    )

    const sortedBookings = [...filteredBookings].sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]
        if (sortField === 'date') {
            aVal = new Date(a.departureDate)
            bVal = new Date(b.departureDate)
        }
        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1
        } else {
            return aVal < bVal ? 1 : -1
        }
    })

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = sortedBookings.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage)

    return (
        <div className="w-full mt-8 bg-[#0f0c29] rounded-2xl shadow-lg border border-white/10">
            {/* Header with Controls */}
            <div className="p-6 border-b border-white/10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white">حجوزات الطيران</h3>
                        <p className="mt-1 text-sm text-gray-400">إدارة ومتابعة جميع حجوزات رحلات الطيران</p>
                    </div>
                    
                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* Search Box */}
                        <div className="relative">
                            <FaSearch className="absolute text-sm text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
                            <input
                                type="text"
                                placeholder="بحث..."
                                className="w-full py-2 pl-4 text-sm text-white border rounded-lg pr-9 bg-white/5 border-white/10 focus:outline-none focus:border-purple-500/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        {/* View Toggle Buttons */}
                        <div className="flex gap-2 p-1 rounded-lg bg-white/5">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-300 ${
                                    viewMode === 'table' 
                                        ? 'bg-purple-500/20 text-purple-400' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                <FaTable />
                                <span>جدول</span>
                            </button>
                            <button
                                onClick={() => setViewMode('cards')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-300 ${
                                    viewMode === 'cards' 
                                        ? 'bg-purple-500/20 text-purple-400' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                <FaThLarge />
                                <span>بطاقات</span>
                            </button>
                        </div>
                        
                        {/* Action Buttons */}
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 transition-all duration-300 border rounded-lg border-white/10 hover:bg-white/5">
                            <FaDownload />
                            <span>تصدير</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 transition-all duration-300 border rounded-lg border-white/10 hover:bg-white/5">
                            <FaPrint />
                            <span>طباعة</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr className="border-b border-white/10">
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('bookingNumber')} className="flex items-center gap-1">
                                        رقم الحجز
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">العميل</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">الرحلة</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('date')} className="flex items-center gap-1">
                                        تاريخ المغادرة
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">المسافرون</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('price')} className="flex items-center gap-1">
                                        السعر
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">الحالة</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">الدفع</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking) => (
                                <tr key={booking.id} className="transition-all duration-300 border-b border-white/5 hover:bg-white/5">
                                    <td className="px-4 py-3 text-sm font-medium text-purple-400">{booking.bookingNumber}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <img src={booking.customerImage} alt="" className="object-cover w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="text-sm text-white">{booking.customerName}</p>
                                                <p className="text-xs text-gray-500">{booking.customerPhone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <MdFlightTakeoff className="text-sm text-purple-400" />
                                            <span className="text-sm text-gray-300">{booking.from}</span>
                                            <span className="text-gray-600">→</span>
                                            <MdFlightLand className="text-sm text-green-400" />
                                            <span className="text-sm text-gray-300">{booking.to}</span>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">{booking.airline} • {booking.flightNumber}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-white">{formatDate(booking.departureDate)}</p>
                                        <p className="text-xs text-gray-500">{booking.departureTime}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <FaUsers className="text-xs text-gray-400" />
                                            <span className="text-sm text-gray-300">{booking.passengers}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm font-bold text-white">${booking.price}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(booking.status, booking.statusText)}
                                    </td>
                                    <td className="px-4 py-3">
                                        {getPaymentBadge(booking.paymentStatus, booking.paymentText)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all">
                                                <FaEye />
                                            </button>
                                            <button className="p-1.5 text-green-400 hover:bg-green-500/20 rounded-lg transition-all">
                                                <FaEdit />
                                            </button>
                                            <button className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-all">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Cards View */}
            {viewMode === 'cards' && (
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {currentItems.map((booking) => (
                            <div
                                key={booking.id}
                                className="relative overflow-hidden transition-all duration-300 border group bg-gradient-to-br from-white/5 to-transparent border-white/10 rounded-xl hover:scale-105 hover:shadow-xl"
                            >
                                <div className="p-4">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <img src={booking.customerImage} alt="" className="object-cover w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="text-sm font-semibold text-white">{booking.customerName}</p>
                                                <p className="text-xs text-gray-500">{booking.bookingNumber}</p>
                                            </div>
                                        </div>
                                        {getStatusBadge(booking.status, booking.statusText)}
                                    </div>

                                    {/* Flight Route */}
                                    <div className="p-3 mb-3 rounded-lg bg-white/5">
                                        <div className="flex items-center justify-between">
                                            <div className="text-center">
                                                <p className="text-lg font-bold text-white">{booking.from}</p>
                                                <p className="text-xs text-gray-500">{booking.departureTime}</p>
                                            </div>
                                            <div className="flex-1 mx-2">
                                                <div className="relative">
                                                    <div className="border-t border-gray-600 border-dashed"></div>
                                                    <FaPlane className="absolute text-xs text-purple-400 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-bold text-white">{booking.to}</p>
                                                <p className="text-xs text-gray-500">{booking.arrivalTime || '---'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="mb-3 space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">تاريخ المغادرة:</span>
                                            <span className="text-gray-300">{formatDate(booking.departureDate)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">شركة الطيران:</span>
                                            <span className="text-gray-300">{booking.airline}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">رقم الرحلة:</span>
                                            <span className="text-gray-300">{booking.flightNumber}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">الدرجة:</span>
                                            <span className="text-gray-300">{booking.class}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">المسافرون:</span>
                                            <span className="text-gray-300">{booking.passengers} أشخاص</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">حالة الدفع:</span>
                                            {getPaymentBadge(booking.paymentStatus, booking.paymentText)}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                        <div>
                                            <p className="text-xs text-gray-500">السعر الإجمالي</p>
                                            <p className="text-xl font-bold text-white">${booking.price}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-blue-400 transition-all rounded-lg hover:bg-blue-500/20">
                                                <FaEye />
                                            </button>
                                            <button className="p-2 text-green-400 transition-all rounded-lg hover:bg-green-500/20">
                                                <FaEdit />
                                            </button>
                                            <button className="p-2 text-red-400 transition-all rounded-lg hover:bg-red-500/20">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-white/10">
                    <p className="text-sm text-gray-400">
                        عرض {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedBookings.length)} من {sortedBookings.length}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 hover:bg-white/5"
                        >
                            <FaChevronRight />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                                    currentPage === i + 1
                                        ? 'bg-purple-500/20 text-purple-400'
                                        : 'text-gray-400 hover:bg-white/5'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 text-gray-400 transition-all rounded-lg disabled:opacity-50 hover:bg-white/5"
                        >
                            <FaChevronLeft />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FlightBookingsTable