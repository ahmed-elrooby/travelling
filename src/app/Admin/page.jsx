import React from "react";
import Header from "./components/Header/Header";
import Cards from "./components/utils/Home/Cards";
import RevenueChart from "./components/utils/Home/RevenuesChart";
import BookingDistribution from "./components/utils/Home/BookingDistribution";
import Booking from "./components/utils/Home/Booking";


export const metadata = {
  title: "لوحة التحكم | نظام إدارة الحجوزات",
  description:
    "نظام متكامل لإدارة حجوزات الفنادق والطيران والسيارات مع تقارير وتحليلات لحظية وأداء الأعمال.",
  keywords: [
    "لوحة التحكم",
    "إدارة الحجوزات",
    "Travel dashboard",
    "booking system",
    "hotel flights cars system",
  ],

  openGraph: {
    title: "نظام إدارة الحجوزات",
    description:
      "لوحة تحكم احترافية لإدارة الحجوزات والتحليلات والتقارير.",
    type: "website",
    images: [
      {
        url: "/seo-home.png",
        width: 1200,
        height: 630,
        alt: "Dashboard Home",
      },
    ],
  },

  robots: {
    index: false,   // ❌ مهم جدًا (dashboard مش لازم يظهر في Google)
    follow: false,
  },
};

const Page = () => {
  return (
    <>
    <Header/>
      <Cards />

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        <RevenueChart />
        <BookingDistribution />
      </div>

      <Booking />
    </>
  );
};

export default Page;