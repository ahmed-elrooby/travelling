import React from "react";
import Agents from "../components/Agents/Agents";

export const metadata = {
  title: "بوابة الوكلاء B2B | إدارة الحجوزات والشركات",
  description:
    "منصة B2B لإدارة حجوزات الوكلاء والشركات مع تحكم كامل في الرحلات والفنادق والسيارات بأسعار خاصة للشركاء.",
  keywords: [
    "B2B travel",
    "وكلاء السفر",
    "إدارة الحجوزات",
    "شركات سياحة",
    "Travel agents platform",
  ],

  openGraph: {
    title: "بوابة الوكلاء B2B",
    description:
      "نظام احترافي لإدارة حجوزات الشركات والوكلاء في مجال السفر والسياحة.",
    type: "website",
    images: [
      {
        url: "/seo-b2b.png",
        width: 1200,
        height: 630,
        alt: "B2B Dashboard",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const Page = () => {
  return <Agents />;
};

export default Page;