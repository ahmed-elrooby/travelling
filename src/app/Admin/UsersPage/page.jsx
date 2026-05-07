import React from "react";
import Users from "../components/Users/Users";

export const metadata = {
  title: "إدارة المستخدمين | لوحة التحكم",
  description:
    "إدارة حسابات المستخدمين داخل نظام الحجز والتحكم في البيانات والصلاحيات.",
  keywords: [
    "إدارة المستخدمين",
    "لوحة التحكم",
    "admin dashboard",
    "users management",
  ],

  robots: {
    index: false,   // ❌ مهم جدًا
    follow: false,
  },

  openGraph: {
    title: "إدارة المستخدمين",
    description: "لوحة تحكم لإدارة المستخدمين والصلاحيات.",
    type: "website",
    images: [
      {
        url: "/seo-users.png",
        width: 1200,
        height: 630,
        alt: "Users Dashboard",
      },
    ],
  },
};

const Page = () => {
  return <Users />;
};

export default Page;