"use client";
import { Agent } from '@/app/Providers/AgentContext/AgentProvider';
import React, { useContext, useState, useEffect } from 'react'
import {
  FaCarSide, FaTable, FaThLarge, FaSearch, FaSort,
  FaChevronLeft, FaChevronRight,
  FaCheckCircle, FaTimesCircle, FaClock,
  FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaHashtag,
  FaCalendarCheck, FaExchangeAlt, FaWallet, FaUser
} from 'react-icons/fa'

const CarRentalsTable = () => {

  const { carsSection } = useContext(Agent)

  const [viewMode, setViewMode] = useState('table')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [sortField, setSortField] = useState('pickupDate')
  const [sortDirection, setSortDirection] = useState('desc')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // API DATA
  const apiData = carsSection || []

  // Mapping
  const rentals = apiData.map((item) => {

    const days = Math.ceil(
      (new Date(item.returnDate) - new Date(item.pickupDate)) /
      (1000 * 60 * 60 * 24)
    )

    const statusMap = {
      confirmed: {
        text: "مؤكد",
        color: "green",
        icon: <FaCheckCircle />
      },
      pending: {
        text: "قيد الانتظار",
        color: "yellow",
        icon: <FaClock />
      },
      cancelled: {
        text: "ملغي",
        color: "red",
        icon: <FaTimesCircle />
      },
      refunded: {
        text: "مسترد",
        color: "blue",
        icon: <FaWallet />
      }
    }

    return {
      id: item.id,
      bookingNumber: `#${String(item.id).padStart(6, '0')}`,
      customerName: item.customer,
      carModel: item.car,
      pickupDate: item.pickupDate,
      dropoffDate: item.returnDate,
      days,
      totalPrice: item.price,
      pricePerDay: Math.round(item.price / days),
      pickupLocation: item.fromCity,
      dropoffLocation: item.toCity,
      status: item.status,
      statusText: statusMap[item.status]?.text,
      statusColor: statusMap[item.status]?.color,
      statusIcon: statusMap[item.status]?.icon
    }
  })

  // Status Filters
  const statuses = [
    {
      id: 'all',
      label: 'الكل',
      count: rentals.length,
      color: 'gray',
      icon: <FaCarSide />
    },
    {
      id: 'confirmed',
      label: 'مؤكد',
      count: rentals.filter(r => r.status === 'confirmed').length,
      color: 'green',
      icon: <FaCheckCircle />
    },
    {
      id: 'pending',
      label: 'قيد الانتظار',
      count: rentals.filter(r => r.status === 'pending').length,
      color: 'yellow',
      icon: <FaClock />
    },
    {
      id: 'cancelled',
      label: 'ملغي',
      count: rentals.filter(r => r.status === 'cancelled').length,
      color: 'red',
      icon: <FaTimesCircle />
    },
    {
      id: 'refunded',
      label: 'مسترد',
      count: rentals.filter(r => r.status === 'refunded').length,
      color: 'blue',
      icon: <FaWallet />
    }
  ]

  // Status Badge
  const getStatusBadge = (status, text, color, icon) => {

    const colors = {
      green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      blue: 'bg-sky-500/10 text-sky-400 border-sky-500/20'
    }

    return (
      <span
        className={`px-3 py-1.5 text-xs rounded-full flex items-center gap-2 font-medium border ${colors[color]}`}
      >
        {icon}
        {text}
      </span>
    )
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  // Filter
  const filteredRentals = rentals
    .filter(r =>
      r.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.carModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.bookingNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(r =>
      selectedStatus === 'all' || r.status === selectedStatus
    )

  // Sort
  const sortedRentals = [...filteredRentals].sort((a, b) => {

    let aVal = a[sortField]
    let bVal = b[sortField]

    if (sortField === 'pickupDate') {
      aVal = new Date(aVal)
      bVal = new Date(bVal)
    }

    return sortDirection === 'asc'
      ? aVal > bVal ? 1 : -1
      : aVal < bVal ? 1 : -1
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage

  const currentItems = sortedRentals.slice(
    indexOfLastItem - itemsPerPage,
    indexOfLastItem
  )

  const totalPages = Math.ceil(sortedRentals.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus, sortField, sortDirection])

  const handleSort = (field) => {

    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <div className="bg-[#0f0c29] p-6 rounded-xl">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center gap-3 mb-3">

            <div className="p-2.5 bg-blue-500/10 rounded-xl">
              <FaCarSide className="text-blue-400 text-xl" />
            </div>

            <h1 className="text-2xl font-bold text-white">
              حجوزات تأجير السيارات
            </h1>

          </div>

          <p className="mr-12 text-sm text-gray-400">
            إدارة ومتابعة جميع حجوزات السيارات
          </p>

        </div>

        {/* Filters */}
        <div className="bg-white/5 rounded-xl p-5 mb-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">

            {/* Search */}
            <div className="relative flex-1">

              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                placeholder="بحث بالعميل، السيارة، أو رقم الحجز..."
                className="w-full px-10 py-2.5 text-sm text-white bg-white/5 rounded-lg border border-white/10 focus:border-blue-500/50 focus:outline-none transition-all placeholder:text-gray-500"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />

            </div>

            {/* Toggle */}
            <div className="flex gap-2 bg-white/5 rounded-lg p-1">

              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-1.5 rounded-md transition-all flex items-center gap-2 text-sm ${
                  viewMode === 'table'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FaTable className="text-xs" />
                جدول
              </button>

              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-1.5 rounded-md transition-all flex items-center gap-2 text-sm ${
                  viewMode === 'cards'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FaThLarge className="text-xs" />
                بطاقات
              </button>

            </div>

          </div>

        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 mb-6">

          {statuses.map((s) => (

            <button
              key={s.id}
              onClick={() => setSelectedStatus(s.id)}
              className={`px-3 py-1.5 rounded-lg transition-all text-sm flex items-center gap-2 ${
                selectedStatus === s.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >

              {s.icon}

              {s.label}

              <span className="px-1.5 py-0.5 rounded-full text-xs bg-white/10">
                {s.count}
              </span>

            </button>

          ))}

        </div>

        {/* Empty */}
        {rentals.length === 0 && (

          <div className="text-center py-16 bg-white/5 rounded-xl">

            <FaCarSide className="mx-auto mb-3 text-5xl text-gray-600" />

            <p className="text-gray-400">
              لا توجد حجوزات حالياً
            </p>

          </div>

        )}

        {/* Table */}
        {viewMode === 'table' && rentals.length > 0 && (

          <div className="bg-white/5 rounded-xl overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-white/5 border-b border-white/10">

                  <tr>

                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-400">
                      رقم الحجز
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-400">
                      العميل
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-400">
                      السيارة
                    </th>

                    <th
                      onClick={() => handleSort('pickupDate')}
                      className="px-5 py-3 text-right text-xs font-medium text-gray-400 cursor-pointer hover:text-white"
                    >

                      <div className="flex items-center justify-end gap-1">
                        تاريخ الاستلام
                        <FaSort className="text-xs" />
                      </div>

                    </th>

                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-400">
                      الموقع
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-400">
                      السعر
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-400">
                      المدة
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-400">
                      الحالة
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {currentItems.map((r) => (

                    <tr
                      key={r.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >

                      <td className="px-5 py-3">

                        <div className="flex items-center gap-1.5">

                          <FaHashtag className="text-gray-500 text-xs" />

                          <span className="text-sm text-white font-mono">
                            {r.bookingNumber}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-3">

                        <div className="flex items-center gap-2">

                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <FaUser className="text-blue-400 text-xs" />
                          </div>

                          <span className="text-sm text-white">
                            {r.customerName}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-3">

                        <div className="flex items-center gap-2">

                          <FaCarSide className="text-blue-400 text-xs" />

                          <span className="text-sm text-white">
                            {r.carModel}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-3">

                        <div className="flex items-center gap-1.5">

                          <FaCalendarAlt className="text-gray-500 text-xs" />

                          <span className="text-sm text-gray-300">
                            {formatDate(r.pickupDate)}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-3">

                        <div className="flex items-center gap-1.5">

                          <FaMapMarkerAlt className="text-gray-500 text-xs" />

                          <span className="text-sm text-gray-300">
                            {r.pickupLocation}
                          </span>

                          <FaExchangeAlt className="text-gray-600 text-xs" />

                          <span className="text-sm text-gray-300">
                            {r.dropoffLocation}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-3">

                        <div>

                          <span className="text-sm text-white font-medium">
                            {r.totalPrice.toLocaleString()} ريال
                          </span>

                          <div className="text-xs text-gray-500">
                            {r.pricePerDay.toLocaleString()} ريال/يوم
                          </div>

                        </div>

                      </td>

                      <td className="px-5 py-3">

                        <div className="flex items-center gap-1">

                          <FaClock className="text-gray-500 text-xs" />

                          <span className="text-sm text-gray-300">
                            {r.days} أيام
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-3">

                        {getStatusBadge(
                          r.status,
                          r.statusText,
                          r.statusColor,
                          r.statusIcon
                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

        {/* Cards */}
        {viewMode === 'cards' && rentals.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {currentItems.map((r) => (

              <div
                key={r.id}
                className="bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all"
              >

                <div className="p-4">

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">

                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <FaUser className="text-blue-400 text-sm" />
                    </div>

                    <div className="flex-1">

                      <p className="text-white font-medium text-sm">
                        {r.customerName}
                      </p>

                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <FaHashtag className="text-xs" />
                        {r.bookingNumber}
                      </p>

                    </div>

                    {getStatusBadge(
                      r.status,
                      r.statusText,
                      r.statusColor,
                      r.statusIcon
                    )}

                  </div>

                  {/* Car */}
                  <div className="mb-3 pb-2 border-b border-white/5">

                    <div className="flex items-center gap-2">

                      <FaCarSide className="text-blue-400 text-sm" />

                      <span className="text-white text-sm font-medium">
                        {r.carModel}
                      </span>

                    </div>

                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-1.5 text-gray-400">

                        <FaCalendarAlt className="text-xs" />

                        <span className="text-xs">
                          الاستلام
                        </span>

                      </div>

                      <span className="text-gray-300 text-xs">
                        {formatDate(r.pickupDate)}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-1.5 text-gray-400">

                        <FaCalendarCheck className="text-xs" />

                        <span className="text-xs">
                          الإرجاع
                        </span>

                      </div>

                      <span className="text-gray-300 text-xs">
                        {formatDate(r.dropoffDate)}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-1.5 text-gray-400">

                        <FaMapMarkerAlt className="text-xs" />

                        <span className="text-xs">
                          الموقع
                        </span>

                      </div>

                      <span className="text-gray-300 text-xs">
                        {r.pickupLocation} → {r.dropoffLocation}
                      </span>

                    </div>

                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/5">

                      <div className="flex items-center gap-1.5 text-gray-400">

                        <FaMoneyBillWave className="text-xs" />

                        <span className="text-xs">
                          السعر
                        </span>

                      </div>

                      <div className="text-right">

                        <span className="text-white text-sm font-medium">
                          {r.totalPrice.toLocaleString()} ريال
                        </span>

                        <div className="text-gray-500 text-xs">
                          {r.pricePerDay.toLocaleString()} ريال/يوم
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* Pagination */}
        {totalPages > 1 && (

          <div className="flex justify-center items-center gap-2 mt-6">

            <button
              onClick={() =>
                setCurrentPage(prev => Math.max(prev - 1, 1))
              }
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              <FaChevronRight />
            </button>

            <div className="flex gap-1">

              {[...Array(totalPages)].map((_, i) => {

                const pageNumber = i + 1

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg transition-colors text-sm ${
                      currentPage === pageNumber
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              })}

            </div>

            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>

          </div>

        )}

        {/* Footer */}
        {rentals.length > 0 && (

          <div className="mt-4 text-center">

            <span className="text-xs text-gray-500">

              عرض {currentItems.length} من {sortedRentals.length} حجز

            </span>

          </div>

        )}

      </div>

    </div>
  )
}

export default CarRentalsTable