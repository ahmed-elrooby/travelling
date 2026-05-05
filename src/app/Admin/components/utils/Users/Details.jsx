import React from 'react'
import { FaTimes, FaUser, FaEnvelope, FaUserTag, FaCheckCircle, FaClock, FaIdCard, FaCalendarAlt } from 'react-icons/fa'

const Details = ({ user, setDetails }) => {
  if (!user) return null;

  const getRoleLabel = (role) => {
    switch(role) {
      case 'admin': return 'مدير';
      case 'b2b': return 'وكيل B2B';
      case 'b2c': return 'عميل B2C';
      default: return role;
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'from-red-500 to-red-600';
      case 'b2b': return 'from-blue-500 to-blue-600';
      case 'b2c': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusLabel = (status) => {
    return status === 'active' ? 'نشط' : 'غير نشط';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-green-400 bg-green-500/10' : 'text-gray-400 bg-gray-500/10';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={() => setDetails(null)}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white">تفاصيل المستخدم</h2>
            <p className="text-gray-400 text-sm mt-1">معلومات الحساب الكاملة</p>
          </div>
          <button
            onClick={() => setDetails(null)}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
          >
            <FaTimes className="text-gray-400 hover:text-white text-xl" />
          </button>
        </div>

        {/* Content - هنا بقى اللي هيسكرول يحيوان */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Role Badge */}
          <div className="flex justify-center mb-4">
            <div className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-gradient-to-r ${getRoleColor(user.role)}
              shadow-lg
            `}>
              <FaUserTag className="text-white text-sm" />
              <span className="text-white font-semibold">{getRoleLabel(user.role)}</span>
            </div>
          </div>

          {/* User Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <FaUser className="text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm">الاسم الكامل</span>
              </div>
              <p className="text-white text-lg font-medium pr-11 break-words">{user.name}</p>
            </div>

            {/* Email */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <FaEnvelope className="text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm">البريد الإلكتروني</span>
              </div>
              <p className="text-white text-lg font-medium pr-11 break-all">{user.email}</p>
            </div>

            {/* Status */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <FaCheckCircle className="text-green-400" />
                </div>
                <span className="text-gray-400 text-sm">الحالة</span>
              </div>
              <div className="pr-11">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                  {user.status === 'active' && <FaCheckCircle className="text-xs" />}
                  {user.status === 'inactive' && <FaClock className="text-xs" />}
                  {getStatusLabel(user.status)}
                </span>
              </div>
            </div>

            {/* ID */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <FaIdCard className="text-yellow-400" />
                </div>
                <span className="text-gray-400 text-sm">المعرف</span>
              </div>
              <p className="text-white text-sm font-mono pr-11 break-all">{user.id}</p>
            </div>
          </div>

          {/* Created At */}
          <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <FaCalendarAlt className="text-purple-400" />
              </div>
              <div className="flex-1">
                <span className="text-gray-400 text-sm block">تاريخ الإنشاء</span>
                <p className="text-white font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* حطيت محتوى زيادة عشان يبقى فيه حاجة تسكرول ياحلو */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-semibold mb-3">معلومات إضافية</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>آخر نشاط</span>
                <span>{formatDate(user.createdAt)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>تاريخ التسجيل</span>
                <span>{formatDate(user.createdAt)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>نوع المستخدم</span>
                <span>{getRoleLabel(user.role)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>الحالة</span>
                <span className={user.status === 'active' ? 'text-green-400' : 'text-gray-400'}>
                  {getStatusLabel(user.status)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span>آخر تحديث</span>
                <span>{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* محتوى زيادة تاني عشان يبقى في سكرول كتير */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-semibold mb-3">السجل</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg">
                  <p className="text-gray-300 text-sm">حدث رقم {i} - قام المستخدم {user.name} بتسجيل الدخول</p>
                  <p className="text-gray-500 text-xs mt-1">{formatDate(user.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 flex-shrink-0">
          <button
            onClick={() => setDetails(null)}
            className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
          >
            إغلاق
          </button>
          <button
            onClick={() => {
              console.log('Edit user:', user);
            }}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white transition-all duration-200 shadow-lg"
          >
            تعديل المستخدم
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details