"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import AuthProvider, { Auth } from "../Providers/AuthContext/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {handleLoginFun} = useContext(Auth);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  });


  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
            <FiLogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">تسجيل الدخول</h1>
          <p className="mt-2 text-gray-400">مرحباً بعودتك!</p>
        </div>

        {/* Form */}
        <div className="p-8 border bg-slate-900/80 backdrop-blur-xl border-white/10 rounded-2xl">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLoginFun}
          >
            {({ values, handleChange }) => (
              <Form className="space-y-6">

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    البريد الإلكتروني
                  </label>

                  <div className="relative">
                    <FiMail className="absolute w-5 h-5 text-gray-500 right-3 top-3.5" />

                    <Field
                      type="email"
                      name="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      className="w-full py-3 pl-4 pr-12 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    كلمة المرور
                  </label>

                  <div className="relative">
                    <FiLock className="absolute w-5 h-5 text-gray-500 right-3 top-3.5" />

                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="أدخل كلمة المرور"
                      className="w-full py-3 pl-12 pr-12 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3.5"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiEye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

              

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
                >
                  تسجيل الدخول
                </button>
              </Form>
            )}
          </Formik>

          {/* Links */}
          <div className="mt-6 text-center text-gray-400">
            ليس لديك حساب؟{" "}
            <Link href="/register" className="text-purple-400">
              إنشاء حساب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;