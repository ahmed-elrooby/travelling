import React from "react";
import Hotels from "../components/Hotels/Hotels";

export const metadata = {
  title: "حجز الفنادق | أفضل عروض الفنادق بأرخص الأسعار",
  description:
    "ابحث واحجز أفضل الفنادق حول العالم بأرخص الأسعار مع إلغاء مجاني وخيارات إقامة متعددة تناسب جميع الميزانيات.",
  keywords: [
    "حجز فنادق",
    "فنادق رخيصة",
    "hotel booking",
    "cheap hotels",
    "حجز فنادق اونلاين",
    "فنادق دبي",
    "فنادق القاهرة",
  ],

  openGraph: {
    title: "حجز الفنادق بأفضل الأسعار",
    description:
      "احجز فنادقك بسهولة مع أفضل العروض والإقامات المميزة حول العالم.",
    type: "website",
    images: [
      {
        url: "/seo-hotels.png",
        width: 1200,
        height: 630,
        alt: "Hotels Booking",
      },
    ],
  },

  robots: {
    index: true,   // ✔️ لازم تتأرشف
    follow: true,
  },

  alternates: {
    canonical: "/hotels",
  },
};

const Page = () => {
  return <Hotels />;
};

export default Page;