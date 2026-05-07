"use client";
import { Agent } from '@/app/Providers/AgentContext/AgentProvider';
import React, { useContext, useState, useMemo } from 'react';
import { 
    FaHotel, FaCalendarAlt, FaUsers, FaDollarSign, FaEye, 
    FaEdit, FaTrash, FaPrint, FaDownload, FaTable, FaThLarge,
    FaSearch, FaSort, FaChevronLeft, FaChevronRight,
    FaCheckCircle, FaTimesCircle, FaClock, FaSpinner,
    FaBed, FaWifi, FaParking, FaSwimmingPool, FaUtensils,
    FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser,
    FaBuilding
} from 'react-icons/fa';
import { MdRoomService, MdBreakfastDining } from 'react-icons/md';

const HotelBookings = () => {
    const { BookingsHotels } = useContext(Agent);
    const [viewMode, setViewMode] = useState('table');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [sortField, setSortField] = useState('checkIn');
    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedStatus, setSelectedStatus] = useState('all');

    // تحويل بيانات BookingsHotels إلى تنسيق الجدول
    const bookings = useMemo(() => {
        if (!BookingsHotels || BookingsHotels.length === 0) return [];

        return BookingsHotels.map((booking, index) => {
            const checkInDate = booking.checkIn ? new Date(booking.checkIn) : new Date();
            const checkOutDate = booking.checkOut ? new Date(booking.checkOut) : new Date(checkInDate);
            const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
            
            return {
                id: booking.id || index,
                bookingNumber: booking.id || `HT-${index + 1}`,
                customerName: booking.customer || "غير محدد",
                customerEmail: booking.userId || "",
                customerPhone: booking.phone || "",
                hotelName: booking.hotel || "غير محدد",
                location: booking.city || "غير محدد",
                roomType: booking.roomType || "غرفة قياسية",
                bedType: booking.bedType || "سرير مزدوج",
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                nights: nights > 0 ? nights : 1,
                guests: parseInt(booking.guests) || 1,
                rooms: booking.rooms || 1,
                pricePerNight: booking.pricePerNight || Math.round((booking.price || 0) / (nights || 1)),
                totalPrice: booking.price || 0,
                status: booking.status || "pending",
                statusText: getStatusText(booking.status),
                statusColor: getStatusColor(booking.status),
                paymentStatus: booking.paymentStatus || "pending",
                paymentText: getPaymentText(booking.paymentStatus),
                specialRequests: booking.specialRequests || "-",
                amenities: booking.amenities || ["wifi"],
                rating: booking.rating || 4.0,
                createdAt: booking.createdAt || booking.checkIn,
                hotelImage: booking.hotelImage || `https://picsum.photos/seed/${booking.id || index}/400/200`,
                customerImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.customer || 'User')}&background=8b5cf6&color=fff&rounded=true`
            };
        });
    }, [BookingsHotels]);

    // دوال مساعدة
    function getStatusText(status) {
        const statusMap = {
            confirmed: "مؤكد",
            pending: "قيد الانتظار",
            cancelled: "ملغي",
            processing: "قيد المعالجة"
        };
        return statusMap[status] || status;
    }

    function getStatusColor(status) {
        const colorMap = {
            confirmed: "green",
            pending: "yellow",
            cancelled: "red",
            processing: "blue"
        };
        return colorMap[status] || "gray";
    }

    function getPaymentText(status) {
        const paymentMap = {
            paid: "مدفوع بالكامل",
            partial: "دفعة مقدمة",
            pending: "بانتظار الدفع",
            processing: "جاري المعالجة",
            refunded: "تم الاسترجاع"
        };
        return paymentMap[status] || status;
    }

    // إحصائيات الحالة
    const statuses = useMemo(() => {
        const counts = {
            all: bookings.length,
            confirmed: bookings.filter(b => b.status === 'confirmed').length,
            pending: bookings.filter(b => b.status === 'pending').length,
            processing: bookings.filter(b => b.status === 'processing').length,
            cancelled: bookings.filter(b => b.status === 'cancelled').length
        };

        return [
            { id: 'all', label: 'الكل', count: counts.all },
            { id: 'confirmed', label: 'مؤكد', count: counts.confirmed },
            { id: 'pending', label: 'قيد الانتظار', count: counts.pending },
            { id: 'processing', label: 'قيد المعالجة', count: counts.processing },
            { id: 'cancelled', label: 'ملغي', count: counts.cancelled }
        ];
    }, [bookings]);

    const getAmenityIcon = (amenity) => {
        const icons = {
            wifi: <FaWifi className="text-blue-400" />,
            pool: <FaSwimmingPool className="text-cyan-400" />,
            breakfast: <MdBreakfastDining className="text-yellow-400" />,
            parking: <FaParking className="text-green-400" />,
            spa: <MdRoomService className="text-purple-400" />,
            restaurant: <FaUtensils className="text-orange-400" />
        };
        return icons[amenity] || <FaBuilding className="text-gray-400" />;
    };

    const getStatusBadge = (status, text) => {
        const colors = {
            green: 'bg-green-500/20 text-green-400 border-green-500/30',
            yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            red: 'bg-red-500/20 text-red-400 border-red-500/30',
            blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
        };
        const icons = {
            confirmed: <FaCheckCircle className="text-[10px]" />,
            pending: <FaClock className="text-[10px]" />,
            cancelled: <FaTimesCircle className="text-[10px]" />,
            processing: <FaSpinner className="text-[10px] animate-spin" />
        };
        const colorKey = colors[status] ? status : 'gray';
        const icon = icons[status] || <FaClock className="text-[10px]" />;
        
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${colors[colorKey]}`}>
                {icon}
                {text}
            </span>
        );
    };

    const getPaymentBadge = (status, text) => {
        const colors = {
            paid: 'bg-green-500/20 text-green-400 border-green-500/30',
            partial: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            processing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            refunded: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
        };
        const colorKey = colors[status] ? status : 'pending';
        return (
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${colors[colorKey]}`}>
                {text}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return "---";
        try {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('ar-EG', options);
        } catch {
            return dateString;
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ar-EG', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount || 0);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // فلترة البيانات
    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = 
            booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.bookingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.hotelName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.location?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    // ترتيب البيانات
    const sortedBookings = [...filteredBookings].sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        
        if (sortField === 'checkIn') {
            aVal = new Date(a.checkIn);
            bVal = new Date(b.checkIn);
        }
        if (sortField === 'totalPrice') {
            aVal = a.totalPrice || 0;
            bVal = b.totalPrice || 0;
        }
        
        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);

    return (
        <div className="w-full bg-gradient-to-br from-[#0f0c29] to-[#1a1638] rounded-2xl shadow-lg border border-purple-500/20">
            {/* Header */}
            <div className="p-6 border-b border-purple-500/20">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                            🏨 حجوزات الفنادق
                        </h3>
                        <p className="mt-1 text-sm text-gray-400">إدارة ومتابعة جميع حجوزات الفنادق والغرف</p>
                        <div className="flex gap-4 mt-2">
                            <p className="text-sm text-gray-400">
                                إجمالي الحجوزات: <span className="font-semibold text-purple-400">{bookings.length}</span>
                            </p>
                            <p className="text-sm text-gray-400">
                                إجمالي الإيرادات: <span className="font-semibold text-purple-400">
                                    {formatCurrency(bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0))}
                                </span>
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative">
                            <FaSearch className="absolute text-sm text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
                            <input
                                type="text"
                                placeholder="بحث بالاسم أو الفندق..."
                                className="w-full py-2 pl-4 text-sm text-white border rounded-lg pr-9 bg-white/5 border-purple-500/30 focus:outline-none focus:border-purple-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex gap-2 p-1 rounded-lg bg-white/5">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-300 ${
                                    viewMode === 'table' 
                                        ? 'bg-purple-500/30 text-purple-400' 
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
                                        ? 'bg-purple-500/30 text-purple-400' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                <FaThLarge />
                                <span>بطاقات</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Filters */}
            <div className="px-6 py-3 border-b border-purple-500/20">
                <div className="flex flex-wrap gap-2">
                    {statuses.map(status => (
                        <button
                            key={status.id}
                            onClick={() => setSelectedStatus(status.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                                selectedStatus === status.id
                                    ? 'bg-purple-500/30 text-purple-400 border border-purple-500/30'
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
                    {currentItems.length > 0 ? (
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr className="border-b border-purple-500/20">
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

                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((booking) => (
                                    <tr key={booking.id} className="transition-all duration-300 border-b border-purple-500/10 hover:bg-white/5">
                                        <td className="px-4 py-3 text-sm font-medium text-purple-400">{booking.bookingNumber}</td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="text-sm text-white">{booking.customerName}</p>
                                                <p className="text-sm text-gray-400">{booking.hotelName}</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <FaMapMarkerAlt className="text-gray-500 text-[8px]" />
                                                    <p className="text-xs text-gray-500">{booking.location}</p>
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
                                            <p className="text-sm font-bold text-white">{formatCurrency(booking.totalPrice)}</p>
                                            <p className="text-xs text-gray-500">{formatCurrency(booking.pricePerNight)}/ليلة</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            {getStatusBadge(booking.statusColor, booking.statusText)}
                                        </td>
                                       
                                     
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-12 text-center text-gray-400">
                            <div className="flex flex-col items-center gap-2">
                                <FaHotel className="text-4xl text-gray-500" />
                                <p>لا توجد حجوزات فنادق لعرضها</p>
                                <p className="text-xs">قم بإضافة حجوزات فنادق أولاً</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Cards View */}
            {viewMode === 'cards' && (
                <div className="p-6">
                    {currentItems.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {currentItems.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="relative overflow-hidden transition-all duration-300 border group bg-gradient-to-br from-white/5 to-transparent border-purple-500/20 rounded-xl hover:scale-105 hover:shadow-xl"
                                >
                                    {/* Header */}
                                    <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-pink-600/10">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-white">{booking.customerName}</p>
                                                <p className="text-xs text-gray-500">{booking.bookingNumber}</p>
                                            </div>
                                            {getStatusBadge(booking.statusColor, booking.statusText)}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        {/* Hotel Info */}
                                        <div className="mb-3">
                                            <h4 className="text-lg font-bold text-white">{booking.hotelName}</h4>
                                            <div className="flex items-center gap-1 mt-1">
                                                <FaMapMarkerAlt className="text-xs text-gray-400" />
                                                <span className="text-xs text-gray-400">{booking.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1">
                                                <FaStar className="text-xs text-yellow-400" />
                                                <span className="text-xs text-gray-300">{booking.rating}</span>
                                            </div>
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
                                            {booking.amenities?.map((amenity, idx) => (
                                                <div key={idx} className="flex items-center gap-1">
                                                    {getAmenityIcon(amenity)}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Price and Actions */}
                                        <div className="flex items-center justify-between pt-3 border-t border-purple-500/20">
                                            <div>
                                                <p className="text-xs text-gray-500">السعر الإجمالي</p>
                                                <p className="text-xl font-bold text-white">{formatCurrency(booking.totalPrice)}</p>
                                                <p className="text-xs text-gray-500">{formatCurrency(booking.pricePerNight)}/ليلة</p>
                                              
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-gray-400">
                            <div className="flex flex-col items-center gap-2">
                                <FaHotel className="text-4xl text-gray-500" />
                                <p>لا توجد حجوزات فنادق لعرضها</p>
                                <p className="text-xs">قم بإضافة حجوزات فنادق أولاً</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-purple-500/20">
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
                                        ? 'bg-purple-500/30 text-purple-400'
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
    );
};

export default HotelBookings;