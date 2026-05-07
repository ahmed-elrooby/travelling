"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { 
  FaHotel, 
  FaCity, 
  FaCalendarAlt, 
  FaUsers, 
  FaMoneyBillWave, 
  FaTimes, 
  FaPlus,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";
import { Clients } from "@/app/Providers/ClientContext/ClientsProviders";

// 🔥 function لتوليد ID ديناميك
const generateId = () => {
  return "H-" + Math.floor(10000 + Math.random() * 90000);
};

const AddHotel = () => {
  const { openHotels, setOpenHotels, handleAddHotelFinal, loading } = useContext(Clients);
  
  const initialValues = {
    hotel: "",
    city: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    price: "",
    status: "pending",
  };

  const validationSchema = Yup.object({
    hotel: Yup.string().required("اسم الفندق مطلوب"),
    city: Yup.string().required("المدينة مطلوبة"),
    checkIn: Yup.date().required("تاريخ الوصول مطلوب"),
    checkOut: Yup.date()
      .required("تاريخ المغادرة مطلوب")
      .min(Yup.ref('checkIn'), "تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول"),
    guests: Yup.string().required("عدد النزلاء مطلوب"),
    price: Yup.number()
      .required("السعر مطلوب")
      .positive("السعر يجب أن يكون أكبر من 0"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const data = {
      id: generateId(),
      ...values,
      updatedAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      customer: "أحمد محمد", // You can make this dynamic
      userId: null
    };

    await handleAddHotelFinal(data);
    resetForm();
    setSubmitting(false);
  };

  if (!openHotels) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden border shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border-purple-500/20 animate-slideUp">
        
        {/* Header */}
        <div className="relative p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20">
                <FaHotel className="text-2xl text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
                  إضافة حجز فندق جديد
                </h2>
                <p className="text-sm text-gray-400">أدخل بيانات الحجز لإضافته إلى النظام</p>
              </div>
            </div>
            <button
              onClick={() => setOpenHotels(false)}
              className="p-2 transition-all duration-300 rounded-xl hover:bg-gray-800/50 group"
            >
              <FaTimes className="text-gray-400 transition-colors group-hover:text-purple-400" />
            </button>
          </div>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="p-6">
              <div className="grid gap-5 md:grid-cols-2">
                
                {/* Hotel Name */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaHotel className="text-purple-400" />
                    اسم الفندق
                  </label>
                  <Field
                    name="hotel"
                    placeholder="مثال: فندق بوتيك السخنة"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="hotel" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaCity className="text-purple-400" />
                    المدينة
                  </label>
                  <Field
                    name="city"
                    placeholder="مثال: العين السخنة - مصر"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="city" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* Check-in Date */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaCalendarAlt className="text-purple-400" />
                    تاريخ الوصول
                  </label>
                  <Field
                    type="date"
                    name="checkIn"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="checkIn" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* Check-out Date */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaCalendarAlt className="text-pink-400" />
                    تاريخ المغادرة
                  </label>
                  <Field
                    type="date"
                    name="checkOut"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="checkOut" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* Guests */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaUsers className="text-purple-400" />
                    عدد النزلاء
                  </label>
                  <Field
                    name="guests"
                    placeholder="مثال: شخصان - جناح"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="guests" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaMoneyBillWave className="text-green-400" />
                    السعر (دولار)
                  </label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="مثال: 580"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="price" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* Status */}
                <div className="space-y-1 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaCheckCircle className="text-purple-400" />
                    حالة الحجز
                  </label>
                  <Field
                    as="select"
                    name="status"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all duration-300 cursor-pointer"
                  >
                    <option value="pending">⏳ قيد الانتظار</option>
                    <option value="confirmed">✅ مؤكد</option>
                    <option value="cancelled">❌ ملغي</option>
                    <option value="refunded">💰 مسترد</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="mt-1 text-xs text-red-400" />
                </div>

              </div>

              {/* Preview Section */}
              {values.hotel && values.city && values.price && (
                <div className="p-4 mt-6 border bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl border-purple-500/20">
                  <p className="mb-2 text-xs text-gray-400">معاينة سريعة:</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaHotel className="text-purple-400" />
                      <span className="font-medium text-white">{values.hotel}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-green-400">${values.price}</span>
                      <p className="text-xs text-gray-400">{values.guests || 'غير محدد'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setOpenHotels(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري الإضافة...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      إضافة الحجز
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddHotel;