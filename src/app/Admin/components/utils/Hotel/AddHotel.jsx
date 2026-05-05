"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
// 🔥 function لتوليد ID ديناميك
const generateId = () => {
  return "H-" + Math.floor(10000 + Math.random() * 90000);
};

const AddHotel = () => {
 const {openHotels,setOpenHotels,handleAddHotelFinal} = useContext(Admin)
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
    checkOut: Yup.date().required("تاريخ المغادرة مطلوب"),
    guests: Yup.string().required("عدد النزلاء مطلوب"),
    price: Yup.number().required("السعر مطلوب"),
  });

  const handleSubmit = (values) => {

    const data = {
      id: generateId(), // 🔥 هنا بيتولد ID جديد كل مرة
      ...values,
    };

    handleAddHotelFinal(data)

    // هنا تبعت لل API
    // axios.post("/api/hotels", data)
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">إضافة فندق</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-3">

          <Field name="hotel" placeholder="اسم الفندق" className="border p-2 rounded" />
          <ErrorMessage name="hotel" component="div" className="text-red-500 text-sm" />

          <Field name="city" placeholder="المدينة" className="border p-2 rounded" />
          <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />

          <Field type="date" name="checkIn" className="border p-2 rounded" />
          <ErrorMessage name="checkIn" component="div" className="text-red-500 text-sm" />

          <Field type="date" name="checkOut" className="border p-2 rounded" />
          <ErrorMessage name="checkOut" component="div" className="text-red-500 text-sm" />

          <Field name="guests" placeholder="عدد النزلاء" className="border p-2 rounded" />
          <ErrorMessage name="guests" component="div" className="text-red-500 text-sm" />

          <Field type="number" name="price" placeholder="السعر" className="border p-2 rounded" />
          <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />

          <Field as="select" name="status" className="border p-2 rounded">
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="cancelled">cancelled</option>
            <option value="refunded">refunded</option>
          </Field>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            إضافة
          </button>

        </Form>
      </Formik>
    </div>
  );
};

export default AddHotel;