import React from "react";
import Booking from "../components/Booking/Booking";

export const metadata = {
  title: "حجوزات الطيران | احجز رحلاتك بأفضل الأسعار",
  description:
    "احجز تذاكر الطيران بسهولة مع أفضل العروض على الرحلات الداخلية والدولية. تجربة حجز سريعة وآمنة.",
  keywords: [
    "حجز طيران",
    "تذاكر طيران",
    "رحلات جوية",
    "Flight booking",
    "cheap flights",
  ],

  openGraph: {
    title: "حجوزات الطيران",
    description:
      "احجز رحلات الطيران الداخلية والدولية بأفضل الأسعار والعروض.",
    type: "website",
    images: [
      {
        url: "/seo-flights.png",
        width: 1200,
        height: 630,
        alt: "Flight Booking",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/flights",
  },
};

const Page = () => {
  return <Booking />;
};

export default Page;