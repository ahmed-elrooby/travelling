
"use client"
import React, { useState } from 'react'
import { 
    FaBell, FaTimes, FaCheckCircle, FaExclamationTriangle, 
    FaInfoCircle, FaGift, FaPlane, FaWallet, FaTag, 
    FaCalendarCheck, FaChartLine, FaUserPlus, FaTrash,
    FaCheck, FaEye, FaEllipsisH
} from 'react-icons/fa'
import { MdEventAvailable, MdPayment } from 'react-icons/md'

const Notifications = () => {
    const [activeTab, setActiveTab] = useState('all')
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'success',
            title: 'تأكيد الحجز',
            message: 'تم تأكيد حجز رحلتك إلى دبي بنجاح. رقم الحجز: #DB1234',
            time: 'منذ 5 دقائق',
            date: '2024-12-10T10:30:00',
            read: false,
            icon: FaCheckCircle,
            iconColor: 'text-green-400',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/30',
            link: '/bookings/1'
        },
        {
            id: 2,
            type: 'warning',
            title: 'تذكير بالرحلة',
            message: 'رحلة القاهرة - دبي بعد 24 ساعة. يرجى التأكد من وصولك للمطار قبل 3 ساعات.',
            time: 'منذ ساعة',
            date: '2024-12-10T08:15:00',
            read: false,
            icon: FaExclamationTriangle,
            iconColor: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/30',
            link: '/reminders'
        },
        {
            id: 3,
            type: 'info',
            title: 'عرض خاص',
            message: 'خصم 20% على حجوزات السفر لشهر ديسمبر. استخدم الكود: WINTER20',
            time: 'منذ 3 ساعات',
            date: '2024-12-10T06:00:00',
            read: true,
            icon: FaGift,
            iconColor: 'text-purple-400',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/30',
            link: '/offers'
        },
        {
            id: 4,
            type: 'success',
            title: 'إتمام الدفع',
            message: 'تم استلام مبلغ $1,250 بنجاح. شكراً لاستخدامك خدماتنا.',
            time: 'منذ 5 ساعات',
            date: '2024-12-10T04:20:00',
            read: true,
            icon: MdPayment,
            iconColor: 'text-green-400',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/30',
            link: '/payments'
        },
        {
            id: 5,
            type: 'info',
            title: 'تحديث جديد',
            message: 'تم إضافة ميزة تتبع الرحلات المباشر. يمكنك الآن متابعة رحلتك لحظة بلحظة.',
            time: 'منذ يوم',
            date: '2024-12-09T14:00:00',
            read: false,
            icon: FaChartLine,
            iconColor: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/30',
            link: '/updates'
        },
        {
            id: 6,
            type: 'warning',
            title: 'تغيير في موعد الرحلة',
            message: 'تم تغيير موعد رحلة اسطنبول إلى الساعة 10:00 صباحاً بدلاً من 8:00 صباحاً.',
            time: 'منذ يومين',
            date: '2024-12-08T09:45:00',
            read: true,
            icon: FaCalendarCheck,
            iconColor: 'text-orange-400',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/30',
            link: '/bookings/2'
        },
        {
            id: 7,
            type: 'success',
            title: 'مكافأة ترحيبية',
            message: 'أهلاً بك في برنامج الولاء! حصلت على 500 نقطة إضافية.',
            time: 'منذ 3 أيام',
            date: '2024-12-07T11:30:00',
            read: false,
            icon: FaUserPlus,
            iconColor: 'text-pink-400',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/30',
            link: '/loyalty'
        },
        {
            id: 8,
            type: 'info',
            title: 'تذكير بالدفع',
            message: 'موعد الدفعة المتبقية لرحلة لندن بعد 3 أيام. المبلغ المتبقي: $750',
            time: 'منذ 4 أيام',
            date: '2024-12-06T16:20:00',
            read: true,
            icon: FaWallet,
            iconColor: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10',
            borderColor: 'border-cyan-500/30',
            link: '/payments'
        }
    ])

    const tabs = [
        { id: 'all', label: 'الكل', count: notifications.length },
        { id: 'unread', label: 'غير مقروء', count: notifications.filter(n => !n.read).length },
        { id: 'success', label: 'مؤكد', count: notifications.filter(n => n.type === 'success').length },
        { id: 'warning', label: 'تنبيهات', count: notifications.filter(n => n.type === 'warning').length },
        { id: 'info', label: 'عروض وأخبار', count: notifications.filter(n => n.type === 'info').length }
    ]

    const getFilteredNotifications = () => {
        if (activeTab === 'all') return notifications
        if (activeTab === 'unread') return notifications.filter(n => !n.read)
        return notifications.filter(n => n.type === activeTab)
    }

    const markAsRead = (id) => {
        setNotifications(notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
        ))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })))
    }

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id))
    }

    const deleteAllNotifications = () => {
        if (window.confirm('هل أنت متأكد من حذف جميع الإشعارات؟')) {
            setNotifications([])
        }
    }

    const filteredNotifications = getFilteredNotifications()

    return (
    <div className="w-full max-h-[600px] bg-[#0f0c29] p-6 rounded-2xl shadow-lg border border-white/10">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/20">
                        <FaBell className="text-xl text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">الإشعارات</h2>
                        <p className="text-sm text-gray-400">
                            لديك {notifications.filter(n => !n.read).length} إشعارات غير مقروءة
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {notifications.length > 0 && (
                        <>
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-400 transition-all duration-300 border rounded-lg border-purple-500/30 hover:bg-purple-500/20"
                            >
                                <FaCheck />
                            </button>
                            <button
                                onClick={deleteAllNotifications}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 transition-all duration-300 border rounded-lg border-red-500/30 hover:bg-red-500/20"
                            >
                                <FaTrash />
                            </button>
                        </>
                    )}
                </div>
            </div>

          

            {/* Notifications List */}
            <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                    <div className="py-12 text-center">
                        <div className="mb-4 text-6xl">🔔</div>
                        <p className="text-gray-400">لا توجد إشعارات</p>
                        <p className="mt-1 text-sm text-gray-500">ستظهر الإشعارات الجديدة هنا</p>
                    </div>
                ) : (
                    filteredNotifications?.slice(0, 3).map((notification, index) => {
                        const IconComponent = notification.icon
                        return (
                            <div
                                key={notification.id}
                                className={`group relative overflow-hidden transition-all duration-300 rounded-xl border ${notification.borderColor} ${notification.bgColor} backdrop-blur-sm hover:scale-[1.02] hover:shadow-lg ${
                                    !notification.read ? 'ring-1 ring-purple-500/50' : ''
                                }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 p-2 rounded-lg ${notification.bgColor}`}>
                                            <IconComponent className={`text-lg ${notification.iconColor}`} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className={`text-base font-semibold ${
                                                    !notification.read ? 'text-white' : 'text-gray-300'
                                                }`}>
                                                    {notification.title}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500">{notification.time}</span>
                                                    {!notification.read && (
                                                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className={`text-sm mb-3 ${
                                                !notification.read ? 'text-gray-200' : 'text-gray-400'
                                            }`}>
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className={`text-xs transition-colors ${
                                                        notification.read
                                                            ? 'text-gray-500 cursor-default'
                                                            : 'text-purple-400 hover:text-purple-300'
                                                    }`}
                                                    disabled={notification.read}
                                                >
                                                    {notification.read ? 'تمت القراءة' : 'تحديد كمقروء'}
                                                </button>
                                                {!notification.read && <span className="text-gray-700">•</span>}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-xs text-red-400 transition-colors hover:text-red-300"
                                                >
                                                    حذف
                                                </button>
                                                <span className="text-gray-700">•</span>
                                                <button
                                                    onClick={() => window.location.href = notification.link}
                                                    className="text-xs text-blue-400 transition-colors hover:text-blue-300"
                                                >
                                                    عرض التفاصيل
                                                </button>
                                            </div>
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="absolute p-1 text-gray-500 transition-colors opacity-0 top-2 right-2 group-hover:opacity-100 hover:text-red-400"
                                        >
                                            <FaTimes className="text-xs" />
                                        </button>
                                    </div>
                                </div>

                                {/* Progress bar for unread */}
                                {!notification.read && (
                                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 animate-progress"></div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Notifications