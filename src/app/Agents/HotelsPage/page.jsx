import React from "react";
import Hotel from "../components/Hotel/Hotel";

export const metadata = {
  title: "حجز الفنادق | أفضل عروض وأسعار الفنادق حول العالم",
  description:
    "احجز أفضل الفنادق بأرخص الأسعار مع خيارات متعددة في جميع المدن مع إلغاء مجاني وتجربة حجز سهلة وآمنة.",
  keywords: [
    "حجز فنادق",
    "فنادق رخيصة",
    "حجز فنادق اونلاين",
    "hotel booking",
    "cheap hotels",
    "فنادق دبي",
    "فنادق القاهرة",
  ],

  openGraph: {
    title: "حجز الفنادق بأفضل الأسعار",
    description:
      "ابحث واحجز أفضل الفنادق حول العالم مع أفضل العروض والإقامة المميزة.",
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
  return <Hotel />;
};

export default Page;