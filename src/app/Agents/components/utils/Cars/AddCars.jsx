"use client";

import React, { useContext, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaCalendarAlt, FaCar, FaExchangeAlt, FaFlagCheckered, FaMoneyBillWave, FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Agent } from "@/app/Providers/AgentContext/AgentProvider";


const AddCarBooking = () => {
  const { setOpenCars, openCars, AddCarsFinal,loadd } = useContext(Agent);

  const counterRef = useRef(40107);

  const generateId = () => {
    counterRef.current += 1;
    return `C-${counterRef.current}`;
  };

  const initialValues = {
    car: "",
    fromCity: "",
    toCity: "",
    pickupDate: "",
    returnDate: "",
    price: "",
    status: "pending",
  };

  const validationSchema = Yup.object({
    car: Yup.string().required("نوع العربية مطلوب"),
    fromCity: Yup.string().required("مدينة الاستلام مطلوبة"),
    toCity: Yup.string().required("مدينة التسليم مطلوبة"),
    pickupDate: Yup.date().required("تاريخ الاستلام مطلوب"),
    returnDate: Yup.date()
      .required("تاريخ الرجوع مطلوب")
      .min(Yup.ref("pickupDate"), "تاريخ الرجوع يجب أن يكون بعد تاريخ الاستلام"),
    price: Yup.number()
      .required("السعر مطلوب")
      .positive("السعر لازم يكون موجب"),
    status: Yup.string().required("الحالة مطلوبة"),
  });

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const newBooking = {
      id: generateId(),
      ...values,
      price: Number(values.price),
      updatedAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      customer: "أحمد محمد",
    };

    AddCarsFinal(newBooking);
    resetForm();
    setSubmitting(false);
  };

  if (!openCars) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 bg-black/70 backdrop-blur-sm animate-fadeIn">
<div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border-purple-500/20 animate-slideUp">        
        {/* Header */}
        <div className="relative p-2 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20">
                <FaCar className="text-2xl text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
                  إضافة حجز سيارة جديد
                </h2>
                <p className="text-sm text-gray-400">أدخل بيانات حجز السيارة لإضافته إلى النظام</p>
              </div>
            </div>
            <button
              onClick={() => setOpenCars(false)}
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
          {({ isSubmitting, values }) => (
            <Form className="p-2">
              <div className="grid gap-5 md:grid-cols-2">
                
                {/* Car Type */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaCar className="text-purple-400" />
                    نوع السيارة
                  </label>
                  <Field
                    name="car"
                    placeholder="مثال: تويوتا كامري 2024"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="car" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* From City */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaLocationDot className="text-purple-400" />
                    مدينة الاستلام
                  </label>
                  <Field
                    name="fromCity"
                    placeholder="مثال: الرياض"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="fromCity" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* To City */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaFlagCheckered className="text-pink-400" />
                    مدينة التسليم
                  </label>
                  <Field
                    name="toCity"
                    placeholder="مثال: جدة"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="toCity" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* Exchange Route */}
                {values.fromCity && values.toCity && values.fromCity !== values.toCity && (
                  <div className="space-y-1 md:col-span-2">
                    <div className="flex items-center justify-center gap-2 p-2 border bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border-purple-500/20">
                      <FaExchangeAlt className="text-purple-400" />
                      <span className="text-sm text-gray-300">
                        من {values.fromCity} إلى {values.toCity}
                      </span>
                    </div>
                  </div>
                )}

                {/* Pickup Date */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaCalendarAlt className="text-purple-400" />
                    تاريخ الاستلام
                  </label>
                  <Field
                    type="date"
                    name="pickupDate"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="pickupDate" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* Return Date */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaCalendarAlt className="text-pink-400" />
                    تاريخ الرجوع
                  </label>
                  <Field
                    type="date"
                    name="returnDate"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="returnDate" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* Duration Preview */}
                {values.pickupDate && values.returnDate && (
                  <div className="space-y-1 md:col-span-2">
                    <div className="flex items-center justify-center gap-2 p-2 border bg-gray-800/30 rounded-xl border-purple-500/20">
                      <span className="text-xs text-gray-400">
                        المدة: {Math.ceil((new Date(values.returnDate) - new Date(values.pickupDate)) / (1000 * 60 * 60 * 24))} يوم
                      </span>
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="space-y-1 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaMoneyBillWave className="text-green-400" />
                    السعر (ريال)
                  </label>
                  <Field
                    name="price"
                    type="number"
                    placeholder="مثال: 500"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  />
                  <ErrorMessage name="price" component="div" className="mt-1 text-xs text-red-400" />
                </div>

                {/* Status */}
                <div className="space-y-1 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    📊 الحالة
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
              {(values.car || values.price) && (
                <div className="p-4 mt-6 border bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl border-purple-500/20">
                  <p className="mb-2 text-xs text-gray-400">معاينة سريعة:</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaCar className="text-purple-400" />
                      <span className="font-medium text-white">{values.car || 'غير محدد'}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-green-400">{values.price ? `${values.price} ريال` : 'غير محدد'}</span>
                      <p className="text-xs text-gray-400">{values.fromCity} → {values.toCity}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setOpenCars(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-800/50 border border-purple-500/20 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(isSubmitting) ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري الإضافة...
                    </>
                  ) : (
                    <>
                      <FaPlus/>
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

export default AddCarBooking;