import React from "react";
import Profile from "../components/Profile/Profile";

export const metadata = {
  title: "الملف الشخصي | إعدادات الحساب",
  description:
    "إدارة بيانات الحساب الشخصي وتحديث المعلومات وإعدادات الأمان داخل النظام.",
  robots: {
    index: false,   // ❌ مهم جدًا
    follow: false,
  },
};

const Page = () => {
  return <Profile />;
};

export default Page;