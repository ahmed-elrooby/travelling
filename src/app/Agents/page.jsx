import React from "react";
import Home from "./components/Home/Home";

export const metadata = {
  title: "لوحة تحكم الوكلاء B2B | إدارة الحجوزات",
  description:
    "نظام إدارة الوكلاء B2B لإدارة حجوزات الفنادق والطيران والسيارات مع تقارير وأداء الشركات.",
  keywords: [
    "B2B dashboard",
    "لوحة تحكم الوكلاء",
    "إدارة الحجوزات للشركات",
    "travel agents system",
  ],

  robots: {
    index: false,   // ❌ مهم جدًا
    follow: false,
  },

  openGraph: {
    title: "لوحة تحكم الوكلاء B2B",
    description:
      "إدارة متكاملة لحجوزات الوكلاء والشركات مع تحليلات وتقارير.",
    type: "website",
    images: [
      {
        url: "/seo-b2b-dashboard.png",
        width: 1200,
        height: 630,
        alt: "B2B Dashboard",
      },
    ],
  },
};

const Page = () => {
  return <Home />;
};

export default Page;