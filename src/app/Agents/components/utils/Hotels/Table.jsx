"use client";
import React, { useState } from 'react'
import { 
    FaHotel, FaCalendarAlt, FaUsers, FaDollarSign, FaEye, 
    FaEdit, FaTrash, FaPrint, FaDownload, FaTable, FaThLarge,
    FaSearch, FaSort, FaChevronLeft, FaChevronRight,
    FaCheckCircle, FaTimesCircle, FaClock, FaSpinner,
    FaBed, FaWifi, FaParking, FaSwimmingPool, FaUtensils,
    FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser
} from 'react-icons/fa'
import { MdRoomService, MdBreakfastDining } from 'react-icons/md'

const HotelBookings = () => {
    const [viewMode, setViewMode] = useState('table')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(6)
    const [sortField, setSortField] = useState('checkIn')
    const [sortDirection, setSortDirection] = useState('desc')
    const [selectedStatus, setSelectedStatus] = useState('all')

    const bookings = [
        {
            id: 1,
            bookingNumber: "HT-2024-001",
            customerName: "أحمد محمد",
            customerImage: "https://randomuser.me/api/portraits/men/1.jpg",
            customerEmail: "ahmed@example.com",
            customerPhone: "+966 50 123 4567",
            hotelName: "فندق برج العرب",
            hotelImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/232902247.jpg?k=7e6a6c8c609819a2dccfadf190bb95c9ed2ef95b9e2d9f5b5c5d8e9f8e7d8a6e&o=",
            location: "دبي، الإمارات",
            roomType: "جناح رئاسي",
            bedType: "سرير كينج",
            checkIn: "2024-12-20",
            checkOut: "2024-12-25",
            nights: 5,
            guests: 2,
            rooms: 1,
            pricePerNight: 850,
            totalPrice: 4250,
            status: "confirmed",
            statusText: "مؤكد",
            statusColor: "green",
            paymentStatus: "paid",
            paymentText: "مدفوع بالكامل",
            specialRequests: "غرفة غير مدخنين، إطلالة على البحر",
            amenities: ["wifi", "pool", "breakfast", "parking"],
            rating: 4.8,
            createdAt: "2024-12-01"
        },
        {
            id: 2,
            bookingNumber: "HT-2024-002",
            customerName: "سارة عبدالله",
            customerImage: "https://randomuser.me/api/portraits/women/2.jpg",
            customerEmail: "sara@example.com",
            customerPhone: "+966 55 234 5678",
            hotelName: "فندق الفيصلية",
            hotelImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/235852662.jpg?k=8f5f9c5d4f9d1e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6",
            location: "الرياض، السعودية",
            roomType: "جناح تنفيذي",
            bedType: "سرير كوين",
            checkIn: "2024-12-18",
            checkOut: "2024-12-22",
            nights: 4,
            guests: 2,
            rooms: 1,
            pricePerNight: 450,
            totalPrice: 1800,
            status: "confirmed",
            statusText: "مؤكد",
            statusColor: "green",
            paymentStatus: "paid",
            paymentText: "مدفوع",
            specialRequests: "تجهيز ورد و شوكولاتة",
            amenities: ["wifi", "breakfast", "parking"],
            rating: 4.6,
            createdAt: "2024-12-05"
        },
        {
            id: 3,
            bookingNumber: "HT-2024-003",
            customerName: "محمد علي",
            customerImage: "https://randomuser.me/api/portraits/men/3.jpg",
            customerEmail: "mohamed@example.com",
            customerPhone: "+966 50 345 6789",
            hotelName: "هيلتون جدة",
            hotelImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/284632811.jpg?k=8c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
            location: "جدة، السعودية",
            roomType: "غرفة ديلوكس",
            bedType: "سرير كينج + سرير مفرد",
            checkIn: "2024-12-22",
            checkOut: "2024-12-28",
            nights: 6,
            guests: 4,
            rooms: 2,
            pricePerNight: 650,
            totalPrice: 3900,
            status: "pending",
            statusText: "قيد الانتظار",
            statusColor: "yellow",
            paymentStatus: "partial",
            paymentText: "دفعة مقدمة 50%",
            specialRequests: "غرف متجاورة",
            amenities: ["wifi", "pool", "breakfast", "parking", "spa"],
            rating: 4.7,
            createdAt: "2024-12-08"
        },
        {
            id: 4,
            bookingNumber: "HT-2024-004",
            customerName: "نورة خالد",
            customerImage: "https://randomuser.me/api/portraits/women/4.jpg",
            customerEmail: "noura@example.com",
            customerPhone: "+966 55 456 7890",
            hotelName: "فندق موفنبيك",
            hotelImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/296524937.jpg?k=4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
            location: "القاهرة، مصر",
            roomType: "غرفة سوبيريور",
            bedType: "سرير كوين",
            checkIn: "2024-12-25",
            checkOut: "2024-12-30",
            nights: 5,
            guests: 2,
            rooms: 1,
            pricePerNight: 180,
            totalPrice: 900,
            status: "cancelled",
            statusText: "ملغي",
            statusColor: "red",
            paymentStatus: "refunded",
            paymentText: "تم الاسترجاع",
            specialRequests: "-",
            amenities: ["wifi", "breakfast"],
            rating: 4.3,
            createdAt: "2024-12-10"
        },
        {
            id: 5,
            bookingNumber: "HT-2024-005",
            customerName: "عمر إبراهيم",
            customerImage: "https://randomuser.me/api/portraits/men/5.jpg",
            customerEmail: "omar@example.com",
            customerPhone: "+966 50 567 8901",
            hotelName: "فندق فور سيزونز",
            hotelImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/163742616.jpg?k=2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
            location: "باريس، فرنسا",
            roomType: "جناح فاخر",
            bedType: "سرير كينج",
            checkIn: "2024-12-28",
            checkOut: "2025-01-04",
            nights: 7,
            guests: 2,
            rooms: 1,
            pricePerNight: 1200,
            totalPrice: 8400,
            status: "processing",
            statusText: "قيد المعالجة",
            statusColor: "blue",
            paymentStatus: "processing",
            paymentText: "جاري المعالجة",
            specialRequests: "ترتيب استقبال خاص",
            amenities: ["wifi", "pool", "breakfast", "parking", "spa", "restaurant"],
            rating: 4.9,
            createdAt: "2024-12-12"
        },
        {
            id: 6,
            bookingNumber: "HT-2024-006",
            customerName: "فاطمة حسن",
            customerImage: "https://randomuser.me/api/portraits/women/6.jpg",
            customerEmail: "fatima@example.com",
            customerPhone: "+966 55 678 9012",
            hotelName: "فندق ريتز كارلتون",
            hotelImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/198457328.jpg?k=1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
            location: "لندن، بريطانيا",
            roomType: "غرفة كلوب",
            bedType: "سرير كينج",
            checkIn: "2025-01-05",
            checkOut: "2025-01-10",
            nights: 5,
            guests: 2,
            rooms: 1,
            pricePerNight: 950,
            totalPrice: 4750,
            status: "confirmed",
            statusText: "مؤكد",
            statusColor: "green",
            paymentStatus: "paid",
            paymentText: "مدفوع",
            specialRequests: "سرير إضافي للطفل",
            amenities: ["wifi", "pool", "breakfast", "parking", "spa"],
            rating: 4.8,
            createdAt: "2024-12-14"
        },
        {
            id: 7,
            bookingNumber: "HT-2024-007",
            customerName: "خالد عبدالرحمن",
            customerImage: "https://randomuser.me/api/portraits/men/7.jpg",
            customerEmail: "khaled@example.com",
            customerPhone: "+966 50 789 0123",
            hotelName: "فندق جميرا",
            hotelImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/300822491.jpg?k=3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4",
            location: "كوالالمبور، ماليزيا",
            roomType: "غرفة ديلوكس",
            bedType: "سرير كينج",
            checkIn: "2025-01-08",
            checkOut: "2025-01-15",
            nights: 7,
            guests: 3,
            rooms: 1,
            pricePerNight: 320,
            totalPrice: 2240,
            status: "pending",
            statusText: "قيد الانتظار",
            statusColor: "yellow",
            paymentStatus: "pending",
            paymentText: "بانتظار الدفع",
            specialRequests: "-",
            amenities: ["wifi", "pool", "breakfast"],
            rating: 4.5,
            createdAt: "2024-12-15"
        }
    ]

    const statuses = [
        { id: 'all', label: 'الكل', count: bookings.length },
        { id: 'confirmed', label: 'مؤكد', count: bookings.filter(b => b.status === 'confirmed').length },
        { id: 'pending', label: 'قيد الانتظار', count: bookings.filter(b => b.status === 'pending').length },
        { id: 'processing', label: 'قيد المعالجة', count: bookings.filter(b => b.status === 'processing').length },
        { id: 'cancelled', label: 'ملغي', count: bookings.filter(b => b.status === 'cancelled').length }
    ]

    const getAmenityIcon = (amenity) => {
        const icons = {
            wifi: <FaWifi className="text-blue-400" />,
            pool: <FaSwimmingPool className="text-cyan-400" />,
            breakfast: <MdBreakfastDining className="text-yellow-400" />,
            parking: <FaParking className="text-green-400" />,
            spa: <MdRoomService className="text-purple-400" />,
            restaurant: <FaUtensils className="text-orange-400" />
        }
        return icons[amenity] || null
    }

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
            partial: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            processing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
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
    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = 
            booking.customerName.includes(searchTerm) ||
            booking.bookingNumber.includes(searchTerm) ||
            booking.hotelName.includes(searchTerm) ||
            booking.location.includes(searchTerm)
        const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus
        return matchesSearch && matchesStatus
    })

    const sortedBookings = [...filteredBookings].sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]
        if (sortField === 'checkIn') {
            aVal = new Date(a.checkIn)
            bVal = new Date(b.checkIn)
        }
        if (sortField === 'totalPrice') {
            aVal = a.totalPrice
            bVal = b.totalPrice
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
        <div className="w-full bg-[#0f0c29] rounded-2xl shadow-lg border border-white/10">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white">حجوزات الفنادق</h3>
                        <p className="mt-1 text-sm text-gray-400">إدارة ومتابعة جميع حجوزات الفنادق والغرف</p>
                    </div>
                    
                    <div className="flex flex-col gap-3 sm:flex-row">
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

            {/* Status Filters */}
            <div className="px-6 py-3 border-b border-white/10">
                <div className="flex flex-wrap gap-2">
                    {statuses.map(status => (
                        <button
                            key={status.id}
                            onClick={() => setSelectedStatus(status.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                                selectedStatus === status.id
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                    : 'text-gray-400 hover:bg-white/5'
                            }`}
                        >
                            {status.label}
                            <span className="mr-1 text-xs">({status.count})</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr className="border-b border-white/10">
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">رقم الحجز</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">العميل / الفندق</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('checkIn')} className="flex items-center gap-1">
                                        تاريخ الوصول
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">المدة / الضيوف</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('totalPrice')} className="flex items-center gap-1">
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
                                                <p className="text-xs text-gray-500">{booking.hotelName}</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <FaMapMarkerAlt className="text-gray-500 text-[8px]" />
                                                    <p className="text-xs text-gray-600">{booking.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-white">{formatDate(booking.checkIn)}</p>
                                        <p className="text-xs text-gray-500">→ {formatDate(booking.checkOut)}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-white">{booking.nights} ليالي</p>
                                        <p className="text-xs text-gray-500">{booking.guests} ضيوف • {booking.rooms} غرفة</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm font-bold text-white">${booking.totalPrice}</p>
                                        <p className="text-xs text-gray-500">${booking.pricePerNight}/ليلة</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(booking.statusColor, booking.statusText)}
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
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {currentItems.map((booking) => (
                            <div
                                key={booking.id}
                                className="relative overflow-hidden transition-all duration-300 border group bg-gradient-to-br from-white/5 to-transparent border-white/10 rounded-xl hover:scale-105 hover:shadow-xl"
                            >
                                {/* Hotel Image Banner */}
                                <div className="relative h-32 overflow-hidden">
                                    <img 
                                        src={booking.hotelImage} 
                                        alt={booking.hotelName}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-2 right-2 left-2">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-bold text-white">{booking.hotelName}</h4>
                                            <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full">
                                                <FaStar className="text-yellow-400 text-[10px]" />
                                                <span className="text-xs text-white">{booking.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <FaMapMarkerAlt className="text-gray-300 text-[8px]" />
                                            <span className="text-xs text-gray-200">{booking.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    {/* Customer Info */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <img src={booking.customerImage} alt="" className="object-cover w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="text-sm font-semibold text-white">{booking.customerName}</p>
                                                <p className="text-xs text-gray-500">{booking.bookingNumber}</p>
                                            </div>
                                        </div>
                                        {getStatusBadge(booking.statusColor, booking.statusText)}
                                    </div>

                                    {/* Room Details */}
                                    <div className="p-3 mb-3 rounded-lg bg-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <p className="text-sm font-semibold text-white">{booking.roomType}</p>
                                                <p className="text-xs text-gray-500">{booking.bedType}</p>
                                            </div>
                                            <FaBed className="text-purple-400" />
                                        </div>
                                        
                                        {/* Dates */}
                                        <div className="flex items-center justify-between mb-2 text-xs">
                                            <div className="flex items-center gap-1">
                                                <FaCalendarAlt className="text-purple-400" />
                                                <span className="text-gray-300">وصول: {formatDate(booking.checkIn)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaCalendarAlt className="text-green-400" />
                                                <span className="text-gray-300">مغادرة: {formatDate(booking.checkOut)}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Guests & Nights */}
                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1">
                                                <FaUsers className="text-gray-400" />
                                                <span className="text-gray-300">{booking.guests} ضيوف</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-300">{booking.nights} ليالي</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {booking.amenities.map((amenity, idx) => (
                                            <div key={idx} className="flex items-center gap-1">
                                                {getAmenityIcon(amenity)}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price and Actions */}
                                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                        <div>
                                            <p className="text-xs text-gray-500">السعر الإجمالي</p>
                                            <div className="flex items-baseline gap-1">
                                                <p className="text-xl font-bold text-white">${booking.totalPrice}</p>
                                                <span className="text-xs text-gray-500">/ ${booking.pricePerNight} لليلة</span>
                                            </div>
                                            {getPaymentBadge(booking.paymentStatus, booking.paymentText)}
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-blue-400 transition-all rounded-lg hover:bg-blue-500/20">
                                                <FaEye />
                                            </button>
                                            <button className="p-2 text-green-400 transition-all rounded-lg hover:bg-green-500/20">
                                                <FaEdit />
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

export default HotelBookings