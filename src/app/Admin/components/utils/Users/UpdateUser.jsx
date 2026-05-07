"use client";

import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { FaUser, FaEnvelope, FaUserTag, FaToggleOn, FaSave, FaTimes, FaEdit } from "react-icons/fa";

const UpdateUser = ({ setOpenUpdateUser, openUpdateUser, user }) => {
  const { handleUpdateUserFinal } = useContext(Admin);

  // منع السكرول خلف المودال
  useEffect(() => {
    if (openUpdateUser) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openUpdateUser]);

  // إغلاق المودال بالضغط على Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && openUpdateUser) {
        setOpenUpdateUser(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [openUpdateUser, setOpenUpdateUser]);

  if (!openUpdateUser) return null;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("الاسم مطلوب")
      .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
      .max(50, "الاسم طويل جداً"),
    email: Yup.string()
      .email("بريد إلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    role: Yup.string().required("نوع المستخدم مطلوب"),
    status: Yup.string().required("الحالة مطلوبة"),
  });

  const roleOptions = [
    { value: "b2c", label: "عميل B2C", color: "green" },
    { value: "b2b", label: "وكيل B2B", color: "blue" },
    { value: "admin", label: "مدير Admin", color: "red" },
  ];

  const statusOptions = [
    { value: "active", label: "نشط", emoji: "✅" },
    { value: "inactive", label: "غير نشط", emoji: "❌" },
  ];

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" 
      dir="rtl"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpenUpdateUser(false);
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-gradient-to-br from-gray-900 to-purple-900 border border-purple-500/30 rounded-2xl shadow-2xl">
        
        {/* Header - ثابت */}
        <div className="flex-shrink-0 p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                ✏️ تعديل المستخدم
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                تعديل بيانات المستخدم: <span className="text-purple-400">{user?.name}</span>
              </p>
            </div>
            <button
              onClick={() => setOpenUpdateUser(false)}
              className="p-2 text-gray-400 transition-all duration-300 rounded-lg hover:bg-white/10 hover:text-white"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content - قابل للسكرول */}
        <div className="flex-1 p-6 space-y-5 overflow-y-auto custom-scrollbar">
          <Formik
            enableReinitialize
            initialValues={{
              name: user?.name || "",
              email: user?.email || "",
              role: user?.role || "b2c",
              status: user?.status || "active",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await handleUpdateUserFinal({ id: user.id, values });
                setOpenUpdateUser(false);
              } catch (error) {
                console.error("Error updating user:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-5">
                
                {/* NAME */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300">
                    <FaUser className="text-purple-400" size={16} />
                    الاسم الكامل
                    <span className="text-red-400">*</span>
                  </label>
                  <Field
                    name="name"
                    className={`w-full px-4 py-3 transition-all duration-300 rounded-xl bg-white/10 border ${
                      errors.name && touched.name
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-purple-500/30 focus:border-purple-500"
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    placeholder="أدخل الاسم الكامل"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300">
                    <FaEnvelope className="text-purple-400" size={16} />
                    البريد الإلكتروني
                    <span className="text-red-400">*</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className={`w-full px-4 py-3 transition-all duration-300 rounded-xl bg-white/10 border ${
                      errors.email && touched.email
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-purple-500/30 focus:border-purple-500"
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    placeholder="example@travel.com"
                  />
                  <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-400" />
                </div>

                {/* ROLE */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300">
                    <FaUserTag className="text-purple-400" size={16} />
                    نوع المستخدم
                    <span className="text-red-400">*</span>
                  </label>
                  <Field
                    as="select"
                    name="role"
                    className="w-full px-4 py-3 text-white transition-all duration-300 border cursor-pointer rounded-xl bg-white/10 border-purple-500/30 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-800">
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="role" component="div" className="mt-1 text-sm text-red-400" />
                </div>

                {/* STATUS - Radio Buttons */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300">
                    <FaToggleOn className="text-purple-400" size={16} />
                    الحالة
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-3">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className="relative flex-1 cursor-pointer"
                      >
                        <Field
                          type="radio"
                          name="status"
                          value={option.value}
                          className="sr-only peer"
                        />
                        <div className="flex items-center justify-center gap-2 p-3 text-gray-300 transition-all duration-300 border rounded-xl bg-white/5 border-purple-500/30 peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500 peer-checked:text-white peer-checked:border-transparent hover:bg-white/10">
                          <span>{option.emoji}</span>
                          <span>{option.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="status" component="div" className="mt-1 text-sm text-red-400" />
                </div>

                {/* BUTTONS */}
                <div className="sticky bottom-0 flex gap-3 pt-4 pb-4 -mb-4 bg-gradient-to-b from-transparent to-gray-900">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaSave size={18} />
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        جاري التحديث...
                      </>
                    ) : (
                      "تحديث المستخدم"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpenUpdateUser(false)}
                    className="px-6 py-3 text-gray-300 transition-all duration-300 rounded-xl bg-white/10 hover:bg-white/20 hover:text-white"
                  >
                    إلغاء
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #c084fc, #f472b6);
        }
      `}</style>
    </div>
  );
};

export default UpdateUser;