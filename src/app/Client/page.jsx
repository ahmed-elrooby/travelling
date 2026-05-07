import React from "react";
import Home from "./components/Home/Home";

export const metadata = {
  title: "منصة حجز السفر | فنادق - طيران - سيارات بأفضل الأسعار",
  description:
    "احجز رحلات الطيران والفنادق وتأجير السيارات بأفضل الأسعار مع تجربة حجز سهلة وسريعة وعروض حصرية.",
  keywords: [
    "حجز سفر",
    "حجز طيران",
    "حجز فنادق",
    "تأجير سيارات",
    "travel booking",
    "cheap flights",
    "hotel booking",
  ],

  openGraph: {
    title: "منصة حجز السفر الشاملة",
    description:
      "أفضل منصة لحجز الطيران والفنادق والسيارات بأرخص الأسعار.",
    type: "website",
    images: [
      {
        url: "/seo-home.png",
        width: 1200,
        height: 630,
        alt: "Travel Platform",
      },
    ],
  },

  robots: {
    index: true,   // ✔️ مهم جدًا لو الصفحة public
    follow: true,
  },

  alternates: {
    canonical: "/",
  },
};

const Page = () => {
  return <Home />;
};

export default Page;