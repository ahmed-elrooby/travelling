"use client";

import React, { useContext, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";

const AddCarBooking = () => {
  const { setOpenAddCar, openAddCar,loadd, handleAddCarFinal } =
    useContext(Admin);

  const counterRef = useRef(40000);

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
      .min(Yup.ref("pickupDate"), "لازم بعد الاستلام"),
    price: Yup.number()
      .required("السعر مطلوب")
      .positive("السعر لازم يكون موجب"),
    status: Yup.string().required("الحالة مطلوبة"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newBooking = {
      id: generateId(),
      ...values,
      price: Number(values.price),
    };

    handleAddCarFinal(newBooking);

  };

  if (!openAddCar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="w-full max-w-md mx-4 duration-200 animate-in fade-in zoom-in">
        
        {/* Modal Content */}
<div className="flex flex-col max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-2xl">          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-xl font-bold text-gray-800">➕ إضافة حجز سيارة</h2>
            <button
              onClick={() => setOpenAddCar(false)}
              className="text-2xl leading-none text-gray-400 transition-colors duration-200 hover:text-red-500"
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
<Form className="flex-1 px-6 py-5 space-y-4 overflow-y-auto">                {/* Car Field */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    🚗 نوع العربية
                  </label>
                  <Field
                    name="car"
                    placeholder="مثل: تويوتا كامري"
                    className="w-full p-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="car" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                {/* From City */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    📍 مدينة الاستلام
                  </label>
                  <Field
                    name="fromCity"
                    placeholder="مثل: الرياض"
                    className="w-full p-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="fromCity" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                {/* To City */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    🏁 مدينة التسليم
                  </label>
                  <Field
                    name="toCity"
                    placeholder="مثل: جدة"
                    className="w-full p-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="toCity" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                {/* Pickup Date */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    📅 تاريخ الاستلام
                  </label>
                  <Field
                    type="date"
                    name="pickupDate"
                    className="w-full p-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="pickupDate" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                {/* Return Date */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    ↩️ تاريخ الرجوع
                  </label>
                  <Field
                    type="date"
                    name="returnDate"
                    className="w-full p-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="returnDate" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                {/* Price */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    💰 السعر (ريال)
                  </label>
                  <Field
                    name="price"
                    type="number"
                    placeholder="مثل: 500"
                    className="w-full p-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                {/* Status */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    📊 الحالة
                  </label>
                  <Field
                    as="select"
                    name="status"
                    className="w-full p-3 transition-all duration-200 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">⏳ قيد الانتظار</option>
                    <option value="confirmed">✅ مؤكد</option>
                    <option value="cancelled">❌ ملغي</option>
                    <option value="refunded">🔄 مسترجع</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadd ? 'جاري الإضافة...' : '✅ إضافة الحجز'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddCarBooking;