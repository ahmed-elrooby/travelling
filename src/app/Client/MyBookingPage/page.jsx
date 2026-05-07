import React from "react";
import MyBooking from "../components/MyBooking/MyBooking";

export const metadata = {
  title: "حجوزاتي | إدارة الحجوزات الشخصية",
  description:
    "عرض وإدارة جميع الحجوزات الخاصة بالمستخدم في الطيران والفنادق والسيارات.",
  robots: {
    index: false,   // ❌ مهم جدًا
    follow: false,
  },
};

const Page = () => {
  return <MyBooking />;
};

export default Page;