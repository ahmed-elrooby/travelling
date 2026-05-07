import React from "react";
import Client from "../components/Client/Client";

export const metadata = {
  title: "خدمات العملاء | حجز فنادق وطيران وسفر بسهولة",
  description:
    "منصة متكاملة لخدمات العملاء لحجز الفنادق، الطيران، وتأجير السيارات بأفضل الأسعار وتجربة سهلة وآمنة.",
  keywords: [
    "حجز سفر",
    "حجز فنادق",
    "حجز طيران",
    "خدمات العملاء",
    "Travel booking",
    "B2C travel",
  ],

  openGraph: {
    title: "خدمات العملاء - حجز السفر",
    description:
      "احجز فنادقك ورحلات الطيران والسيارات بسهولة من مكان واحد.",
    type: "website",
    images: [
      {
        url: "/seo-client.png",
        width: 1200,
        height: 630,
        alt: "Client Booking Platform",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/client",
  },
};

const Page = () => {
  return <Client />;
};

export default Page;