"use client"
import { Auth } from '@/app/Providers/AuthContext/AuthProvider'
import React, { useContext } from 'react'
import { FaEnvelope, FaIdCard, FaUserTag, FaCheckCircle, FaCalendarAlt, FaUserCircle } from 'react-icons/fa'

const ProfileB2C = () => {
  const { profile } = useContext(Auth)

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-400">جاري تحميل ملفك الشخصي...</p>
        </div>
      </div>
    )
  }

  // Get role in Arabic (B2C only - just user/customer)
  const getRoleInArabic = (role) => {
    const roles = {
      'user': 'عميل',
      'customer': 'عميل'
      // No admin roles here for B2C
    }
    return roles[role] || 'عميل' // Default to customer
  }

  // Get status in Arabic
  const getStatusInArabic = (status) => {
    const statuses = {
      'active': 'نشط',
      'inactive': 'غير نشط',
      'suspended': 'موقوف'
    }
    return statuses[status] || status
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
            ملفي الشخصي
          </h1>
          <p className="mt-2 text-gray-400">مرحباً بك في حسابك | معلومات العميل</p>
        </div>

        {/* Main Profile Card */}
        <div className="overflow-hidden border shadow-2xl bg-gray-900/50 rounded-2xl backdrop-blur-sm border-purple-500/20 shadow-purple-500/10">
          
          {/* Cover Image */}
          <div className="relative h-32 md:h-40 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
          </div>
          
          {/* Avatar */}
          <div className="relative px-6">
            <div className="absolute -top-12 right-6">
              <div className="relative">
                <img
                  src={`https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=${encodeURIComponent(profile?.name || 'عميل')}&size=100&rounded=true&bold=true&length=2`}
                  alt={profile?.name}
                  className="w-24 h-24 shadow-xl rounded-2xl"
                />
                {/* Online status indicator */}
                {profile?.status === 'active' && (
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-gray-900"></div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pt-16 pb-8">
            {/* Name and Badges */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{profile?.name}</h2>
              
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                {/* Role Badge - Customer only */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-400 bg-purple-500/20 rounded-full border border-purple-500/30">
                  <FaUserCircle className="w-3 h-3" />
                  {getRoleInArabic(profile?.role)}
                </span>
                
                {/* Status Badge */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${
                  profile?.status === 'active' 
                    ? 'text-green-400 bg-green-500/20 border-green-500/30'
                    : 'text-red-400 bg-red-500/20 border-red-500/30'
                }`}>
                  <FaCheckCircle className="w-3 h-3" />
                  {getStatusInArabic(profile?.status)}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            </div>

            {/* Information Cards - B2C Customer Info */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="p-4 transition-all duration-300 border group rounded-xl bg-gray-800/30 border-purple-500/10 hover:border-purple-500/30 hover:bg-gray-800/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 transition-all duration-300 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20">
                    <FaEnvelope className="text-lg text-purple-400" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-gray-400 mb-0.5">البريد الإلكتروني</p>
                    <p className="font-medium text-white">{profile?.email}</p>
                  </div>
                </div>
              </div>

              {/* ID Card */}
              <div className="p-4 transition-all duration-300 border group rounded-xl bg-gray-800/30 border-purple-500/10 hover:border-purple-500/30 hover:bg-gray-800/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 transition-all duration-300 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20">
                    <FaIdCard className="text-lg text-purple-400" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-gray-400 mb-0.5">رقم العميل</p>
                    <p className="font-mono text-sm font-medium text-white">{profile?.id}</p>
                  </div>
                </div>
              </div>

              {/* Role Card (detailed) - Simplified for customer */}
              <div className="p-4 transition-all duration-300 border group rounded-xl bg-gray-800/30 border-purple-500/10 hover:border-purple-500/30 hover:bg-gray-800/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 transition-all duration-300 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20">
                    <FaUserTag className="text-lg text-purple-400" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-gray-400 mb-0.5">نوع الحساب</p>
                    <p className="font-medium text-white">حساب عميل (B2C)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note - Updated for B2C */}
            <div className="mt-8 text-center">
              <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <FaCalendarAlt className="w-3 h-3" />
                حساب عميل - يمكنك تعديل بياناتك من خلال الإعدادات
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileB2C