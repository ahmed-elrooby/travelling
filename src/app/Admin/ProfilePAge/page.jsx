import React from "react";
import Profile from "../components/Profile/Profile";

export const metadata = {
  title: "الملف الشخصي | إدارة الحساب",
  description:
    "عرض وتحديث بيانات الحساب الشخصي وإدارة الإعدادات والحجوزات داخل منصة السفر.",
  keywords: [
    "الملف الشخصي",
    "حساب المستخدم",
    "تعديل البيانات",
    "profile",
    "user account",
  ],

  robots: {
    index: false, // ❌ مهم جدًا
    follow: false,
  },

  openGraph: {
    title: "الملف الشخصي",
    description: "إدارة بيانات الحساب والإعدادات الشخصية.",
    type: "website",
    images: [
      {
        url: "/seo-profile.png",
        width: 1200,
        height: 630,
        alt: "User Profile",
      },
    ],
  },
};

const Page = () => {
  return <Profile />;
};

export default Page;