import React from "react";
import ProfileB2C from "../components/Profile/Profile";

export const metadata = {
  title: "الملف الشخصي | إعدادات المستخدم",
  description:
    "إدارة وتحديث بيانات الحساب الشخصي وإعدادات الأمان داخل منصة الحجز.",
  robots: {
    index: false,   // ❌ مهم جدًا
    follow: false,
  },
};

const Page = () => {
  return <ProfileB2C />;
};

export default Page;