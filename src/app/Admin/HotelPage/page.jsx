import React from "react";
import Hotel from "../components/Hotel/Hotel";

export const metadata = {
  title: "حجز الفنادق | أفضل أسعار الفنادق حول العالم",
  description:
    "احجز أفضل الفنادق بأرخص الأسعار في جميع المدن مع خيارات متعددة وإلغاء مجاني وتجربة حجز سهلة وآمنة.",
  keywords: [
    "حجز فنادق",
    "فنادق رخيصة",
    "فنادق دبي",
    "hotel booking",
    "cheap hotels",
    "حجز فنادق اونلاين",
  ],

  openGraph: {
    title: "حجز الفنادق بأفضل الأسعار",
    description:
      "ابحث واحجز أفضل الفنادق حول العالم بأرخص الأسعار والعروض الحصرية.",
    type: "website",
    images: [
      {
        url: "/seo-hotels.png",
        width: 1200,
        height: 630,
        alt: "Hotel Booking",
      },
    ],
  },

  robots: {
    index: true,
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