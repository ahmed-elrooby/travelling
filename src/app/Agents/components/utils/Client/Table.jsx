"use client";
import React, { useState } from 'react'
import { 
    FaUsers, FaSearch, FaTable, FaThLarge, FaDownload, 
    FaPrint, FaEye, FaEdit, FaTrash, FaChevronLeft, 
    FaChevronRight, FaSort, FaUserPlus, FaEnvelope, 
    FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign,
    FaCheckCircle, FaTimesCircle, FaClock, FaStar,
    FaFilter, FaTags, FaUserTag, FaUserGraduate, FaUserTie,
    FaCrown,
    FaMedal,
    FaTrophy
} from 'react-icons/fa'
import { MdVerified, MdEmail, MdLocalOffer } from 'react-icons/md'

const CustomersList = () => {
    const [viewMode, setViewMode] = useState('table')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)
    const [sortField, setSortField] = useState('name')
    const [sortDirection, setSortDirection] = useState('asc')
    const [selectedTier, setSelectedTier] = useState('all')

    const customers = [
        {
            id: 1,
            customerId: "CUST-001",
            name: "أحمد محمد",
            email: "ahmed.mohamed@example.com",
            phone: "+966 50 123 4567",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            address: "الرياض، المملكة العربية السعودية",
            city: "الرياض",
            country: "السعودية",
            joinDate: "2024-01-15",
            totalBookings: 12,
            totalSpent: 12500,
            lastBooking: "2024-12-20",
            status: "active",
            tier: "gold",
            tierLabel: "ذهبي",
            tierColor: "yellow",
            verified: true,
            preferences: ["طيران", "فنادق فاخرة"],
            notes: "عميل مميز يفضل السفر درجة رجال الأعمال"
        },
        {
            id: 2,
            customerId: "CUST-002",
            name: "سارة عبدالله",
            email: "sara.abdullah@example.com",
            phone: "+966 55 234 5678",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            address: "جدة، المملكة العربية السعودية",
            city: "جدة",
            country: "السعودية",
            joinDate: "2024-02-20",
            totalBookings: 8,
            totalSpent: 8500,
            lastBooking: "2024-12-18",
            status: "active",
            tier: "silver",
            tierLabel: "فضي",
            tierColor: "gray",
            verified: true,
            preferences: ["فنادق", "سيارات"],
            notes: "تحب حجز الفنادق الفاخرة"
        },
        {
            id: 3,
            customerId: "CUST-003",
            name: "محمد علي",
            email: "mohamed.ali@example.com",
            phone: "+966 50 345 6789",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            address: "دبي، الإمارات العربية المتحدة",
            city: "دبي",
            country: "الإمارات",
            joinDate: "2024-03-10",
            totalBookings: 25,
            totalSpent: 45600,
            lastBooking: "2024-12-22",
            status: "active",
            tier: "platinum",
            tierLabel: "بلاتينيوم",
            tierColor: "purple",
            verified: true,
            preferences: ["طيران درجة أولى", "فنادق 5 نجوم"],
            notes: "أفضل العملاء - يسافر كثيراً للعمل"
        },
        {
            id: 4,
            customerId: "CUST-004",
            name: "نورة خالد",
            email: "noura.khaled@example.com",
            phone: "+966 55 456 7890",
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
            address: "الكويت، الكويت",
            city: "الكويت",
            country: "الكويت",
            joinDate: "2024-04-05",
            totalBookings: 3,
            totalSpent: 2200,
            lastBooking: "2024-11-30",
            status: "inactive",
            tier: "bronze",
            tierLabel: "برونزي",
            tierColor: "orange",
            verified: false,
            preferences: ["سيارات", "رحلات"],
            notes: "تحتاج إلى متابعة"
        },
        {
            id: 5,
            customerId: "CUST-005",
            name: "عمر إبراهيم",
            email: "omar.ibrahim@example.com",
            phone: "+966 50 567 8901",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg",
            address: "الدوحة، قطر",
            city: "الدوحة",
            country: "قطر",
            joinDate: "2024-05-12",
            totalBookings: 18,
            totalSpent: 28900,
            lastBooking: "2024-12-21",
            status: "active",
            tier: "gold",
            tierLabel: "ذهبي",
            tierColor: "yellow",
            verified: true,
            preferences: ["فنادق", "طيران"],
            notes: "يسافر عادة مع العائلة"
        },
        {
            id: 6,
            customerId: "CUST-006",
            name: "فاطمة حسن",
            email: "fatima.hassan@example.com",
            phone: "+966 55 678 9012",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
            address: "المنامة، البحرين",
            city: "المنامة",
            country: "البحرين",
            joinDate: "2024-06-18",
            totalBookings: 6,
            totalSpent: 5400,
            lastBooking: "2024-12-15",
            status: "active",
            tier: "silver",
            tierLabel: "فضي",
            tierColor: "gray",
            verified: true,
            preferences: ["رحلات سياحية"],
            notes: "تحب العروض الخاصة"
        },
        {
            id: 7,
            customerId: "CUST-007",
            name: "خالد عبدالرحمن",
            email: "khaled.abdulrahman@example.com",
            phone: "+966 50 789 0123",
            avatar: "https://randomuser.me/api/portraits/men/7.jpg",
            address: "مسقط، عمان",
            city: "مسقط",
            country: "عمان",
            joinDate: "2024-07-22",
            totalBookings: 10,
            totalSpent: 15700,
            lastBooking: "2024-12-19",
            status: "active",
            tier: "gold",
            tierLabel: "ذهبي",
            tierColor: "yellow",
            verified: true,
            preferences: ["طيران", "فنادق"],
            notes: "عميل منتظم"
        },
        {
            id: 8,
            customerId: "CUST-008",
            name: "منى يوسف",
            email: "mona.youssef@example.com",
            phone: "+966 55 890 1234",
            avatar: "https://randomuser.me/api/portraits/women/8.jpg",
            address: "القاهرة، مصر",
            city: "القاهرة",
            country: "مصر",
            joinDate: "2024-08-30",
            totalBookings: 2,
            totalSpent: 980,
            lastBooking: "2024-10-10",
            status: "blocked",
            tier: "bronze",
            tierLabel: "برونزي",
            tierColor: "orange",
            verified: false,
            preferences: ["سيارات"],
            notes: "تأخر في الدفع"
        },
        {
            id: 9,
            customerId: "CUST-009",
            name: "يوسف حسن",
            email: "youssef.hassan@example.com",
            phone: "+966 50 901 2345",
            avatar: "https://randomuser.me/api/portraits/men/9.jpg",
            address: "عمان، الأردن",
            city: "عمان",
            country: "الأردن",
            joinDate: "2024-09-14",
            totalBookings: 14,
            totalSpent: 22300,
            lastBooking: "2024-12-23",
            status: "active",
            tier: "platinum",
            tierLabel: "بلاتينيوم",
            tierColor: "purple",
            verified: true,
            preferences: ["طيران درجة رجال أعمال", "فنادق 4 نجوم"],
            notes: "عميل مهم جداً"
        },
        {
            id: 10,
            customerId: "CUST-010",
            name: "هدى سليمان",
            email: "houda.sulaiman@example.com",
            phone: "+966 55 012 3456",
            avatar: "https://randomuser.me/api/portraits/women/10.jpg",
            address: "طرابلس، ليبيا",
            city: "طرابلس",
            country: "ليبيا",
            joinDate: "2024-10-25",
            totalBookings: 5,
            totalSpent: 4300,
            lastBooking: "2024-12-10",
            status: "active",
            tier: "silver",
            tierLabel: "فضي",
            tierColor: "gray",
            verified: true,
            preferences: ["فنادق اقتصادية"],
            notes: "تسأل عن العروض دائماً"
        }
    ]

    const tiers = [
        { id: 'all', label: 'الكل', count: customers.length },
        { id: 'platinum', label: 'بلاتينيوم', count: customers.filter(c => c.tier === 'platinum').length, color: 'purple' },
        { id: 'gold', label: 'ذهبي', count: customers.filter(c => c.tier === 'gold').length, color: 'yellow' },
        { id: 'silver', label: 'فضي', count: customers.filter(c => c.tier === 'silver').length, color: 'gray' },
        { id: 'bronze', label: 'برونزي', count: customers.filter(c => c.tier === 'bronze').length, color: 'orange' }
    ]

    const getTierBadge = (tier, label, color) => {
        const colors = {
            purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
            orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
        }
        const icons = {
            platinum: <FaCrown className="text-[10px]" />,
            gold: <FaStar className="text-[10px]" />,
            silver: <FaMedal className="text-[10px]" />,
            bronze: <FaTrophy className="text-[10px]" />
        }
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${colors[color]}`}>
                {icons[tier]}
                {label}
            </span>
        )
    }

    const getStatusBadge = (status) => {
        switch(status) {
            case 'active':
                return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-400 border rounded-full bg-green-500/20 border-green-500/30">
                    <FaCheckCircle className="text-[10px]" /> نشط
                </span>
            case 'inactive':
                return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-400 border rounded-full bg-gray-500/20 border-gray-500/30">
                    <FaClock className="text-[10px]" /> غير نشط
                </span>
            case 'blocked':
                return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-400 border rounded-full bg-red-500/20 border-red-500/30">
                    <FaTimesCircle className="text-[10px]" /> محظور
                </span>
            default:
                return null
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('ar-EG', options)
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ar-EG', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount)
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
    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = 
            customer.name.includes(searchTerm) ||
            customer.email.includes(searchTerm) ||
            customer.phone.includes(searchTerm) ||
            customer.customerId.includes(searchTerm)
        const matchesTier = selectedTier === 'all' || customer.tier === selectedTier
        return matchesSearch && matchesTier
    })

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]
        if (sortField === 'joinDate' || sortField === 'lastBooking') {
            aVal = new Date(aVal)
            bVal = new Date(bVal)
        }
        if (sortField === 'totalSpent') {
            aVal = a.totalSpent
            bVal = b.totalSpent
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
    const currentItems = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage)

    return (
        <div className="w-full bg-[#0f0c29] rounded-2xl shadow-lg border border-white/10">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white">قائمة العملاء</h3>
                        <p className="mt-1 text-sm text-gray-400">إدارة ومتابعة جميع العملاء المسجلين في المنصة</p>
                    </div>
                    
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative">
                            <FaSearch className="absolute text-sm text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
                            <input
                                type="text"
                                placeholder="بحث بالاسم أو البريد أو الجوال..."
                                className="w-full py-2 pl-4 text-sm text-white border rounded-lg pr-9 bg-white/5 border-white/10 focus:outline-none focus:border-purple-500/50 md:w-64"
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
                            <FaUserPlus />
                            <span>عميل جديد</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 transition-all duration-300 border rounded-lg border-white/10 hover:bg-white/5">
                            <FaDownload />
                            <span>تصدير</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tier Filters */}
            <div className="px-6 py-3 border-b border-white/10">
                <div className="flex flex-wrap gap-2">
                    {tiers.map(tier => (
                        <button
                            key={tier.id}
                            onClick={() => setSelectedTier(tier.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                                selectedTier === tier.id
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                    : 'text-gray-400 hover:bg-white/5'
                            }`}
                        >
                            {tier.label}
                            <span className="mr-1 text-xs">({tier.count})</span>
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
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('customerId')} className="flex items-center gap-1">
                                        رقم العميل
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('name')} className="flex items-center gap-1">
                                        العميل
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">معلومات الاتصال</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('joinDate')} className="flex items-center gap-1">
                                        تاريخ التسجيل
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('totalBookings')} className="flex items-center gap-1">
                                        الحجوزات
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">
                                    <button onClick={() => handleSort('totalSpent')} className="flex items-center gap-1">
                                        الإنفاق
                                        <FaSort className="text-xs" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">المستوى</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">الحالة</th>
                                <th className="px-4 py-3 text-sm font-semibold text-right text-gray-400">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((customer) => (
                                <tr key={customer.id} className="transition-all duration-300 border-b border-white/5 hover:bg-white/5">
                                    <td className="px-4 py-3 text-sm font-medium text-purple-400">{customer.customerId}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <img src={customer.avatar} alt="" className="object-cover w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="text-sm font-medium text-white">{customer.name}</p>
                                                {customer.verified && (
                                                    <MdVerified className="inline-block mr-1 text-xs text-blue-400" />
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                                <FaEnvelope className="text-gray-500" />
                                                <span>{customer.email}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                                <FaPhone className="text-gray-500" />
                                                <span>{customer.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-300">{formatDate(customer.joinDate)}</td>
                                    <td className="px-4 py-3">
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-white">{customer.totalBookings}</p>
                                            <p className="text-xs text-gray-500">حجز</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm font-bold text-yellow-400">{formatCurrency(customer.totalSpent)}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getTierBadge(customer.tier, customer.tierLabel, customer.tierColor)}
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(customer.status)}
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
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {currentItems.map((customer) => (
                            <div
                                key={customer.id}
                                className="relative overflow-hidden transition-all duration-500 border group bg-gradient-to-br from-white/5 to-transparent border-white/10 rounded-xl hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="p-4">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <img src={customer.avatar} alt="" className="object-cover w-12 h-12 rounded-full ring-2 ring-purple-500/30" />
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <p className="text-sm font-semibold text-white">{customer.name}</p>
                                                    {customer.verified && (
                                                        <MdVerified className="text-sm text-blue-400" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500">{customer.customerId}</p>
                                            </div>
                                        </div>
                                        {getTierBadge(customer.tier, customer.tierLabel, customer.tierColor)}
                                    </div>

                                    {/* Contact Info */}
                                    <div className="p-3 mb-3 space-y-2 rounded-lg bg-white/5">
                                        <div className="flex items-center gap-2 text-xs">
                                            <FaEnvelope className="text-gray-400" />
                                            <span className="text-gray-300">{customer.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <FaPhone className="text-gray-400" />
                                            <span className="text-gray-300">{customer.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <FaMapMarkerAlt className="text-gray-400" />
                                            <span className="text-gray-300">{customer.city}, {customer.country}</span>
                                        </div>
                                    </div>

                                    {/* Statistics */}
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div className="p-2 text-center rounded-lg bg-white/5">
                                            <p className="text-xs text-gray-500">إجمالي الحجوزات</p>
                                            <p className="text-lg font-bold text-white">{customer.totalBookings}</p>
                                        </div>
                                        <div className="p-2 text-center rounded-lg bg-white/5">
                                            <p className="text-xs text-gray-500">إجمالي الإنفاق</p>
                                            <p className="text-lg font-bold text-yellow-400">{formatCurrency(customer.totalSpent)}</p>
                                        </div>
                                    </div>

                                    {/* Preferences */}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {customer.preferences.map((pref, idx) => (
                                            <span key={idx} className="px-2 py-0.5 text-xs bg-white/10 rounded-full text-gray-300">
                                                {pref}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Last Booking & Actions */}
                                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                        <div>
                                            <p className="text-xs text-gray-500">آخر حجز</p>
                                            <p className="text-xs text-gray-300">{formatDate(customer.lastBooking)}</p>
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

                                    {/* Status Badge */}
                                    <div className="absolute top-2 left-2">
                                        {getStatusBadge(customer.status)}
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
                        عرض {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedCustomers.length)} من {sortedCustomers.length} عميل
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

export default CustomersList