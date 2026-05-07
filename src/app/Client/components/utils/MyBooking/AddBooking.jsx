"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";
import { Agent } from "@/app/Providers/AgentContext/AgentProvider";
import { Clients } from "@/app/Providers/ClientContext/ClientsProviders";

const AddBooking = () => {
  const { setOpenAddFlight,loadd,handleAddFlight, openAddFlight } = useContext(Clients);

  const initialValues = {
    customer: "",
    route: "",
    date: "",
    price: "",
    status: "pending", // الحالة الافتراضية
  };

  const validationSchema = Yup.object({
    customer: Yup.string().required("اسم العميل مطلوب"),
    route: Yup.string().required("مسار الرحلة مطلوب"),
    date: Yup.date().required("التاريخ مطلوب"),
    price: Yup.number()
      .required("السعر مطلوب")
      .positive("السعر يجب أن يكون موجباً"),
    status: Yup.string().required("الحالة مطلوبة"),
  });

  const generateId = () => {
    return `FL-${Math.floor(20000 + Math.random() * 90000)}`;
  };

  const handleSubmit = async (values) => {
    const newBooking = {
      id: generateId(),
      customer: values.customer,
      route: values.route,
      date: values.date,
      price: parseFloat(values.price),
      status: values.status,
      createdAt: new Date().toISOString(),
    };

    
    // استدعاء دالة الإضافة من الـ Context
    await handleAddFlight(newBooking);
    
    setOpenAddFlight(false);
  };

  // إذا لم يكن المودال مفتوحاً، لا تعرض شيء
  if (!openAddFlight) return null;

  // قائمة الحالات مع الألوان والأيقونات (للتوثيق)
  const statusOptions = [
    { value: "pending", label: "قيد الانتظار", color: "yellow" },
    { value: "confirmed", label: "مؤكد", color: "green" },
    { value: "cancelled", label: "ملغي", color: "red" },
    { value: "refunded", label: "تم الاسترداد", color: "orange" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl">
        
        {/* رأس المودال */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">إضافة حجز جديد</h2>
          <button
            onClick={() => setOpenAddFlight(true)}
            className="p-1 text-gray-400 transition-colors rounded-lg hover:bg-gray-800 hover:text-white"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* حقل اسم العميل */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  اسم العميل
                </label>
                <Field
                  name="customer"
                  placeholder="أدخل اسم العميل"
                  className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="customer"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* حقل مسار الرحلة */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  مسار الرحلة
                </label>
                <Field
                  name="route"
                  placeholder="مثال: القاهرة - دبي"
                  className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="route"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* حقل التاريخ */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  تاريخ الرحلة
                </label>
                <Field
                  type="date"
                  name="date"
                  className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* حقل السعر */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  السعر
                </label>
                <Field
                  name="price"
                  placeholder="أدخل السعر"
                  type="number"
                  className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* حقل الحالة - مع جميع الحالات الأربعة */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  الحالة
                </label>
                <Field
                  as="select"
                  name="status"
                  className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="pending">⏳ قيد الانتظار</option>
                  <option value="confirmed">✅ مؤكد</option>
                  <option value="cancelled">❌ ملغي</option>
                  <option value="refunded">💰 تم الاسترداد</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
                
                {/* عرض توضيحي للحالة المحددة (اختياري) */}
                <div className="mt-2 text-xs text-gray-500">
                  <p>تلميح: يمكنك تغيير حالة الحجز لاحقاً من قائمة الحجوزات</p>
                </div>
              </div>

              {/* أزرار التحكم */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenAddFlight(false)}
                  className="flex-1 px-4 py-2 text-gray-300 transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || loadd}
                  className="flex-1 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || loadd ? "جاري الإضافة..." : "إضافة حجز"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBooking;