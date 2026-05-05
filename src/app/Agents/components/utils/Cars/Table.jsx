"use client";
import React, { useState } from 'react'
import { 
    FaCarSide, FaCalendarAlt, FaUsers, FaDollarSign, FaEye, 
    FaEdit, FaTrash, FaPrint, FaDownload, FaTable, FaThLarge,
    FaSearch, FaSort, FaChevronLeft, FaChevronRight,
    FaCheckCircle, FaTimesCircle, FaClock, FaSpinner,
    FaGasPump, FaTachometerAlt, FaCogs, FaSnowflake,
    FaMapMarkerAlt, FaPhone, FaUser, FaIdCard, FaCreditCard
} from 'react-icons/fa'
import { MdElectricCar, MdOutlineSpeed, MdLocalGasStation } from 'react-icons/md'

const CarRentalsTable = () => {
    const [viewMode, setViewMode] = useState('table')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(6)
    const [sortField, setSortField] = useState('pickupDate')
    const [sortDirection, setSortDirection] = useState('desc')
    const [selectedStatus, setSelectedStatus] = useState('all')

    const rentals = [
        {
            id: 1,
            bookingNumber: "CR-2024-001",
            customerName: "أحمد محمد",
            customerImage: "https://randomuser.me/api/portraits/men/1.jpg",
            customerEmail: "ahmed@example.com",
            customerPhone: "+966 50 123 4567",
            customerLicense: "SA-12345678",
            carModel: "تويوتا كامري",
            carImage: "https://media.ed.edmunds-media.com/toyota/camry/2024/oem/2024_toyota_camry_sedan_xse_fq_oem_1_600.jpg",
            carYear: 2024,
            carColor: "أسود",
            plateNumber: "ABC 1234",
            category: "سيدان",
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
            fuelConsumption: "14 كم/لتر",
            seats: 5,
            pickupLocation: "مطار الملك خالد الدولي",
            dropoffLocation: "فندق الرياض",
            pickupDate: "2024-12-20",
            pickupTime: "10:00",
            dropoffDate: "2024-12-25",
            dropoffTime: "18:00",
            days: 5,
            pricePerDay: 45,
            totalPrice: 225,
            status: "active",
            statusText: "نشط",
            statusColor: "green",
            paymentStatus: "paid",
            paymentText: "مدفوع بالكامل",
            driverName: "محمد أحمد",
            driverAge: 35,
            driverLicense: "SA-87654321",
            extras: ["GPS", "كرسي أطفال", "تأمين شامل"],
            insurance: "تأمين شامل",
            createdAt: "2024-12-01"
        },
        {
            id: 2,
            bookingNumber: "CR-2024-002",
            customerName: "سارة عبدالله",
            customerImage: "https://randomuser.me/api/portraits/women/2.jpg",
            customerEmail: "sara@example.com",
            customerPhone: "+966 55 234 5678",
            customerLicense: "SA-23456789",
            carModel: "هونداي سوناتا",
            carImage: "https://media.ed.edmunds-media.com/hyundai/sonata/2024/oem/2024_hyundai_sonata_sedan_sel_fq_oem_1_600.jpg",
            carYear: 2023,
            carColor: "أبيض",
            plateNumber: "XYZ 5678",
            category: "سيدان",
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
            fuelConsumption: "15 كم/لتر",
            seats: 5,
            pickupLocation: "فندق فيرمونت",
            dropoffLocation: "مطار الملك عبدالعزيز",
            pickupDate: "2024-12-18",
            pickupTime: "14:00",
            dropoffDate: "2024-12-22",
            dropoffTime: "12:00",
            days: 4,
            pricePerDay: 40,
            totalPrice: 160,
            status: "completed",
            statusText: "مكتمل",
            statusColor: "blue",
            paymentStatus: "paid",
            paymentText: "مدفوع",
            driverName: "سارة عبدالله",
            driverAge: 28,
            driverLicense: "SA-98765432",
            extras: ["GPS", "تأمين شامل"],
            insurance: "تأمين شامل",
            createdAt: "2024-12-05"
        },
        {
            id: 3,
            bookingNumber: "CR-2024-003",
            customerName: "محمد علي",
            customerImage: "https://randomuser.me/api/portraits/men/3.jpg",
            customerEmail: "mohamed@example.com",
            customerPhone: "+966 50 345 6789",
            customerLicense: "SA-34567890",
            carModel: "بي ام دبليو X5",
            carImage: "https://media.ed.edmunds-media.com/bmw/x5/2024/oem/2024_bmw_x5_4dr-suv_xdrive40i_fq_oem_1_600.jpg",
            carYear: 2024,
            carColor: "أزرق",
            plateNumber: "DEF 9012",
            category: "SUV",
            transmission: "أوتوماتيك",
            fuelType: "ديزل",
            fuelConsumption: "12 كم/لتر",
            seats: 7,
            pickupLocation: "منزل العميل",
            dropoffLocation: "مطار الملك خالد",
            pickupDate: "2024-12-22",
            pickupTime: "09:00",
            dropoffDate: "2024-12-28",
            dropoffTime: "20:00",
            days: 6,
            pricePerDay: 120,
            totalPrice: 720,
            status: "pending",
            statusText: "قيد الانتظار",
            statusColor: "yellow",
            paymentStatus: "partial",
            paymentText: "دفعة مقدمة 50%",
            driverName: "عمر محمد",
            driverAge: 42,
            driverLicense: "SA-54321678",
            extras: ["GPS", "طفاية حريق", "تأمين إضافي"],
            insurance: "تأمين إضافي",
            createdAt: "2024-12-08"
        },
        {
            id: 4,
            bookingNumber: "CR-2024-004",
            customerName: "نورة خالد",
            customerImage: "https://randomuser.me/api/portraits/women/4.jpg",
            customerEmail: "noura@example.com",
            customerPhone: "+966 55 456 7890",
            customerLicense: "SA-45678901",
            carModel: "شيفروليه كابتيفا",
            carImage: "https://media.ed.edmunds-media.com/chevrolet/captiva/2023/oem/2023_chevrolet_captiva_4dr-suv_ls_fq_oem_1_600.jpg",
            carYear: 2022,
            carColor: "فضي",
            plateNumber: "GHI 3456",
            category: "SUV",
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
            fuelConsumption: "10 كم/لتر",
            seats: 7,
            pickupLocation: "فندق هيلتون",
            dropoffLocation: "فندق هيلتون",
            pickupDate: "2024-12-25",
            pickupTime: "11:00",
            dropoffDate: "2024-12-30",
            dropoffTime: "15:00",
            days: 5,
            pricePerDay: 55,
            totalPrice: 275,
            status: "cancelled",
            statusText: "ملغي",
            statusColor: "red",
            paymentStatus: "refunded",
            paymentText: "تم الاسترجاع",
            driverName: "خالد نورة",
            driverAge: 38,
            driverLicense: "SA-65432109",
            extras: ["كرسي أطفال"],
            insurance: "تأمين أساسي",
            createdAt: "2024-12-10"
        },
        {
            id: 5,
            bookingNumber: "CR-2024-005",
            customerName: "عمر إبراهيم",
            customerImage: "https://randomuser.me/api/portraits/men/5.jpg",
            customerEmail: "omar@example.com",
            customerPhone: "+966 50 567 8901",
            customerLicense: "SA-56789012",
            carModel: "تسلا موديل 3",
            carImage: "https://media.ed.edmunds-media.com/tesla/model-3/2024/oem/2024_tesla_model-3_sedan_long-range_fq_oem_1_600.jpg",
            carYear: 2024,
            carColor: "أحمر",
            plateNumber: "JKL 7890",
            category: "كهربائية",
            transmission: "أوتوماتيك",
            fuelType: "كهرباء",
            fuelConsumption: "16 كيلوواط/100كم",
            seats: 5,
            pickupLocation: "منزل العميل",
            dropoffLocation: "منزل العميل",
            pickupDate: "2024-12-28",
            pickupTime: "08:30",
            dropoffDate: "2025-01-04",
            dropoffTime: "10:00",
            days: 7,
            pricePerDay: 150,
            totalPrice: 1050,
            status: "confirmed",
            statusText: "مؤكد",
            statusColor: "green",
            paymentStatus: "processing",
            paymentText: "جاري المعالجة",
            driverName: "عمر إبراهيم",
            driverAge: 31,
            driverLicense: "SA-78901234",
            extras: ["GPS", "شاحن سيارة", "تأمين شامل"],
            insurance: "تأمين شامل",
            createdAt: "2024-12-12"
        },
        {
            id: 6,
            bookingNumber: "CR-2024-006",
            customerName: "فاطمة حسن",
            customerImage: "https://randomuser.me/api/portraits/women/6.jpg",
            customerEmail: "fatima@example.com",
            customerPhone: "+966 55 678 9012",
            customerLicense: "SA-67890123",
            carModel: "نيسان باترول",
            carImage: "https://media.ed.edmunds-media.com/nissan/patrol/2024/oem/2024_nissan_patrol_4dr-suv_le_fq_oem_1_600.jpg",
            carYear: 2024,
            carColor: "ذهبي",
            plateNumber: "MNO 2345",
            category: "SUV فاخر",
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
            fuelConsumption: "7 كم/لتر",
            seats: 8,
            pickupLocation: "مطار دبي الدولي",
            dropoffLocation: "مطار دبي الدولي",
            pickupDate: "2025-01-05",
            pickupTime: "13:00",
            dropoffDate: "2025-01-12",
            dropoffTime: "16:00",
            days: 7,
            pricePerDay: 180,
            totalPrice: 1260,
            status: "active",
            statusText: "نشط",
            statusColor: "green",
            paymentStatus: "paid",
            paymentText: "مدفوع بالكامل",
            driverName: "أحمد حسن",
            driverAge: 45,
            driverLicense: "SA-89012345",
            extras: ["GPS", "تأمين شامل", "طفاية حريق", "مثلجات"],
            insurance: "تأمين شامل",
            createdAt: "2024-12-14"
        },
        {
            id: 7,
            bookingNumber: "CR-2024-007",
            customerName: "خالد عبدالرحمن",
            customerImage: "https://randomuser.me/api/portraits/men/7.jpg",
            customerEmail: "khaled@example.com",
            customerPhone: "+966 50 789 0123",
            customerLicense: "SA-78901234",
            carModel: "فورد اكسبدشن",
            carImage: "https://media.ed.edmunds-media.com/ford/expedition/2024/oem/2024_ford_expedition_4dr-suv_max-platinum_fq_oem_1_600.jpg",
            carYear: 2023,
            carColor: "أسود",
            plateNumber: "PQR 6789",
            category: "SUV",
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
            fuelConsumption: "8 كم/لتر",
            seats: 8,
            pickupLocation: "منزل العميل",
            dropoffLocation: "منزل العميل",
            pickupDate: "2025-01-08",
            pickupTime: "07:00",
            dropoffDate: "2025-01-15",
            dropoffTime: "21:00",
            days: 7,
            pricePerDay: 140,
            totalPrice: 980,
            status: "pending",
            statusText: "قيد الانتظار",
            statusColor: "yellow",
            paymentStatus: "pending",
            paymentText: "بانتظار الدفع",
            driverName: "خالد عبدالرحمن",
            driverAge: 29,
            driverLicense: "SA-90123456",
            extras: ["GPS"],
            insurance: "تأمين أساسي",
            createdAt: "2024-12-15"
        }
    ]

    const statuses = [
        { id: 'all', label: 'الكل', count: rentals.length },
        { id: 'active', label: 'نشط', count: rentals.filter(r => r.status === 'active').length },
        { id: 'confirmed', label: 'مؤكد', count: rentals.filter(r => r.status === 'confirmed').length },
        { id: 'pending', label: 'قيد الانتظار', count: rentals.filter(r => r.status === 'pending').length },
        { id: 'completed', label: 'مكتمل', count: rentals.filter(r => r.status === 'completed').length },
        { id: 'cancelled', label: 'ملغي', count: rentals.filter(r => r.status === 'cancelled').length }
    ]

    const getStatusBadge = (status, text, color) => {
        const colors = {
            green: 'bg-green-500/20 text-green-400 border-green-500/30',
            yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            red: 'bg-red-500/20 text-red-400 border-red-500/30',
            blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
        }
        const icons = {
            active: <FaCheckCircle className="text-[10px]" />,
            confirmed: <FaCheckCircle className="text-[10px]" />,
            pending: <FaClock className="text-[10px]" />,
            cancelled: <FaTimesCircle className="text-[10px]" />,
            completed: <FaCheckCircle className="text-[10px]" />
        }
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${colors[color]}`}>
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
    const filteredRentals = rentals.filter(rental => {
        const matchesSearch = 
            rental.customerName.includes(searchTerm) ||
            rental.bookingNumber.includes(searchTerm) ||
            rental.carModel.includes(searchTerm) ||
            rental.plateNumber.includes(searchTerm)
        const matchesStatus = selectedStatus === 'all' || rental.status === selectedStatus
        return matchesSearch && matchesStatus
    })

    const sortedRentals = [...filteredRentals].sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]
        if (sortField === 'pickupDate') {
            aVal = new Date(a.pickupDate)
            bVal = new Date(b.pickupDate)
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
    const currentItems = sortedRentals.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(sortedRentals.length / itemsPerPage)

    return (
        <div className="w-full bg-[#0f0c29] rounded-2xl shadow-lg border border-white/10">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white">تأجير السيارات</h3>
                        <p className="mt-1 text-sm text-gray-400">إدارة ومتابعة جميع حجوزات تأجير السيارات</p>
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
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">العميل / السيارة</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('pickupDate')} className="flex items-center gap-1">
                                        تاريخ الاستلام
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">المدة / السعر</th>
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
                            {currentItems.map((rental) => (
                                <tr key={rental.id} className="transition-all duration-300 border-b border-white/5 hover:bg-white/5">
                                    <td className="px-4 py-3 text-sm font-medium text-purple-400">{rental.bookingNumber}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <img src={rental.customerImage} alt="" className="object-cover w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="text-sm text-white">{rental.customerName}</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <FaCarSide className="text-gray-500 text-[8px]" />
                                                    <p className="text-xs text-gray-400">{rental.carModel}</p>
                                                </div>
                                                <p className="text-xs text-gray-600">{rental.plateNumber}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-white">{formatDate(rental.pickupDate)}</p>
                                        <p className="text-xs text-gray-500">{rental.pickupTime}</p>
                                        <p className="mt-1 text-xs text-gray-400">→ {formatDate(rental.dropoffDate)}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-white">{rental.days} أيام</p>
                                        <p className="text-xs text-gray-500">${rental.pricePerDay}/يوم</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm font-bold text-white">${rental.totalPrice}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(rental.status, rental.statusText, rental.statusColor)}
                                    </td>
                                    <td className="px-4 py-3">
                                        {getPaymentBadge(rental.paymentStatus, rental.paymentText)}
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
                        {currentItems.map((rental) => (
                            <div
                                key={rental.id}
                                className="relative overflow-hidden transition-all duration-300 border group bg-gradient-to-br from-white/5 to-transparent border-white/10 rounded-xl hover:scale-105 hover:shadow-xl"
                            >
                                <div className="p-4">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <img src={rental.customerImage} alt="" className="object-cover w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="text-sm font-semibold text-white">{rental.customerName}</p>
                                                <p className="text-xs text-gray-500">{rental.bookingNumber}</p>
                                            </div>
                                        </div>
                                        {getStatusBadge(rental.status, rental.statusText, rental.statusColor)}
                                    </div>

                                    {/* Car Details */}
                                    <div className="p-3 mb-3 rounded-lg bg-white/5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaCarSide className="text-2xl text-blue-400" />
                                            <div>
                                                <p className="text-sm font-semibold text-white">{rental.carModel}</p>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <span>{rental.carYear}</span>
                                                    <span>•</span>
                                                    <span>{rental.carColor}</span>
                                                    <span>•</span>
                                                    <span>{rental.plateNumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Car Specifications */}
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex items-center gap-1">
                                                <FaCogs className="text-gray-400" />
                                                <span className="text-gray-300">{rental.transmission}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MdLocalGasStation className="text-gray-400" />
                                                <span className="text-gray-300">{rental.fuelType}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaUsers className="text-gray-400" />
                                                <span className="text-gray-300">{rental.seats} مقاعد</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaTachometerAlt className="text-gray-400" />
                                                <span className="text-gray-300">{rental.fuelConsumption}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pickup & Dropoff */}
                                    <div className="mb-3 space-y-2">
                                        <div className="flex items-start gap-2 text-sm">
                                            <FaMapMarkerAlt className="text-green-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500">موقع الاستلام</p>
                                                <p className="text-xs text-gray-300">{rental.pickupLocation}</p>
                                                <p className="text-xs text-gray-500">{formatDate(rental.pickupDate)} - {rental.pickupTime}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm">
                                            <FaMapMarkerAlt className="text-red-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500">موقع الإرجاع</p>
                                                <p className="text-xs text-gray-300">{rental.dropoffLocation}</p>
                                                <p className="text-xs text-gray-500">{formatDate(rental.dropoffDate)} - {rental.dropoffTime}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Extras */}
                                    {rental.extras.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {rental.extras.map((extra, idx) => (
                                                <span key={idx} className="px-2 py-0.5 text-xs bg-white/10 rounded-full text-gray-300">
                                                    {extra}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Price and Actions */}
                                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                        <div>
                                            <p className="text-xs text-gray-500">السعر الإجمالي</p>
                                            <div className="flex items-baseline gap-1">
                                                <p className="text-xl font-bold text-white">${rental.totalPrice}</p>
                                                <span className="text-xs text-gray-500">/${rental.days} أيام</span>
                                            </div>
                                            {getPaymentBadge(rental.paymentStatus, rental.paymentText)}
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
                        عرض {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedRentals.length)} من {sortedRentals.length}
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

export default CarRentalsTable