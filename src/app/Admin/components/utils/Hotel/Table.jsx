"use client"
import { Admin } from '@/app/Providers/AdminContext/AdminProvider'
import React, { useContext, useState } from 'react'
import { 
  FaHotel, 
  FaCalendarAlt, 
  FaUsers, 
  FaMoneyBillWave, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaMapMarkerAlt,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaPrint,
  FaDownload
} from 'react-icons/fa'

const Table = () => {
  const { BookingsHotels } = useContext(Admin)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Handle loading state
  if (!BookingsHotels) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-400">جاري تحميل الحجوزات...</p>
        </div>
      </div>
    )
  }

  const { data, pagination, filters, sorting } = BookingsHotels

  // Filter data based on search and status
  const filteredData = data.filter(booking => {
    const matchesSearch = searchTerm === '' || 
      booking.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.city.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Pagination
  const itemsPerPage = pagination?.limit || 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      confirmed: { 
        label: 'مؤكد', 
        color: 'text-green-400 bg-green-500/20 border-green-500/30',
        icon: FaCheckCircle
      },
      pending: { 
        label: 'قيد الانتظار', 
        color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
        icon: FaClock
      },
      cancelled: { 
        label: 'ملغي', 
        color: 'text-red-400 bg-red-500/20 border-red-500/30',
        icon: FaTimesCircle
      }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    )
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-EG', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen ">
      <div className="mx-auto ">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-transparent md:text-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
            حجوزات الفنادق
          </h1>
          <p className="mt-2 text-gray-400">إدارة ومتابعة جميع حجوزات الفنادق</p>
        </div>

        {/* Filters Section */}
        <div className="p-4 mb-6 border bg-gray-900/50 rounded-2xl backdrop-blur-sm border-purple-500/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
              <input
                type="text"
                placeholder="بحث عن فندق أو عميل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {['all', 'confirmed', 'pending', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    statusFilter === status
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 border border-purple-500/20'
                  }`}
                >
                  {status === 'all' ? 'الكل' : 
                   status === 'confirmed' ? 'مؤكد' : 
                   status === 'pending' ? 'قيد الانتظار' : 'ملغي'}
                </button>
              ))}
            </div>

         
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
          <div className="p-4 text-center border bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border-purple-500/20">
            <p className="text-2xl font-bold text-purple-400">{data?.length || 0}</p>
            <p className="text-xs text-gray-400">إجمالي الحجوزات</p>
          </div>
          <div className="p-4 text-center border bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border-green-500/20">
            <p className="text-2xl font-bold text-green-400">
              {data?.filter(b => b.status === 'confirmed').length || 0}
            </p>
            <p className="text-xs text-gray-400">مؤكدة</p>
          </div>
          <div className="p-4 text-center border bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border-yellow-500/20">
            <p className="text-2xl font-bold text-yellow-400">
              {data?.filter(b => b.status === 'pending').length || 0}
            </p>
            <p className="text-xs text-gray-400">قيد الانتظار</p>
          </div>
          <div className="p-4 text-center border bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-2xl border-red-500/20">
            <p className="text-2xl font-bold text-red-400">
              {data?.filter(b => b.status === 'cancelled').length || 0}
            </p>
            <p className="text-xs text-gray-400">ملغية</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border bg-gray-900/50 rounded-2xl backdrop-blur-sm border-purple-500/20">
          <table className="min-w-full divide-y divide-purple-500/10">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right text-gray-300 uppercase">معلومات الحجز</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right text-gray-300 uppercase">العميل</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right text-gray-300 uppercase">المدة</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right text-gray-300 uppercase">السعر</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right text-gray-300 uppercase">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {currentData.map((booking) => (
                <tr key={booking.id} className="transition-all duration-300 hover:bg-purple-500/5 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <FaHotel className="text-purple-400" />
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{booking.hotel}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <FaMapMarkerAlt className="text-xs text-gray-500" />
                          <p className="text-xs text-gray-400">{booking.city}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">رقم الحجز: {booking.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{booking.customer}</p>
                    <p className="text-xs text-gray-400">{booking.guests}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-xs text-purple-400" />
                        <span className="text-sm text-white">{formatDate(booking.checkIn)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-xs text-pink-400" />
                        <span className="text-sm text-white">{formatDate(booking.checkOut)}</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))} ليالي
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-green-400" />
                      <span className="text-lg font-bold text-white">${booking.price}</span>
                    </div>
                    <p className="text-xs text-gray-400">الإجمالي</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                    <p className="mt-2 text-xs text-gray-400">آخر تحديث: {booking.updatedAt}</p>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {currentData.length === 0 && (
            <div className="py-12 text-center">
              <FaHotel className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">لا توجد حجوزات مطابقة للبحث</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-400">
              عرض {startIndex + 1} - {Math.min(endIndex, filteredData.length)} من {filteredData.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 transition-all duration-300 border rounded-lg bg-gray-800/50 border-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500/10"
              >
                <FaChevronRight />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 transition-all duration-300 border rounded-lg bg-gray-800/50 border-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500/10"
              >
                <FaChevronLeft />
              </button>
            </div>
          </div>
        )}

        {/* Sorting Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            مرتب حسب: {sorting?.sortBy === 'checkIn' ? 'تاريخ الوصول' : sorting?.sortBy} 
            {' '}({sorting?.sortOrder === 'desc' ? 'أحدث أولاً' : 'أقدم أولاً'})
          </p>
        </div>
      </div>
    </div>
  )
}

export default Table