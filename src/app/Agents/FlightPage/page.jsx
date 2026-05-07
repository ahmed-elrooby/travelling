import React from "react";
import Flights from "../components/Flights/Flights";

export const metadata = {
  title: "حجوزات الطيران | أرخص تذاكر طيران بأفضل الأسعار",
  description:
    "احجز رحلات الطيران الداخلية والدولية بأرخص الأسعار مع أفضل العروض وخيارات متعددة وسهولة في الحجز.",
  keywords: [
    "حجز طيران",
    "تذاكر طيران رخيصة",
    "رحلات جوية",
    "flight booking",
    "cheap flights",
    "حجز رحلات",
  ],

  openGraph: {
    title: "حجوزات الطيران بأفضل الأسعار",
    description:
      "احجز تذاكر الطيران بسهولة مع أفضل العروض على الرحلات المحلية والدولية.",
    type: "website",
    images: [
      {
        url: "/seo-flights.png",
        width: 1200,
        height: 630,
        alt: "Flights Booking",
      },
    ],
  },

  robots: {
    index: true,   // ✔️ مهم جدًا (صفحة public)
    follow: true,
  },

  alternates: {
    canonical: "/flights",
  },
};

const Page = () => {
  return <Flights />;
};

export default Page;