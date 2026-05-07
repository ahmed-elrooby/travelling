import React from "react";
import Cars from "../components/Cars/Cars";

export const metadata = {
  title: "لوحة تحكم تأجير السيارات B2B | إدارة الأسطول",
  description:
    "نظام إدارة تأجير السيارات للشركات والوكلاء B2B مع التحكم في الحجوزات والأسعار والأسطول.",
  keywords: [
    "B2B car rental",
    "إدارة تأجير السيارات",
    "لوحة تحكم السيارات",
    "fleet management",
    "travel agents cars",
  ],

  robots: {
    index: false,   // ❌ مهم جدًا (داش بورد داخلي)
    follow: false,
  },

  openGraph: {
    title: "إدارة تأجير السيارات B2B",
    description:
      "نظام احترافي لإدارة حجوزات السيارات للشركات والوكلاء.",
    type: "website",
    images: [
      {
        url: "/seo-b2b-cars.png",
        width: 1200,
        height: 630,
        alt: "B2B Cars Dashboard",
      },
    ],
  },
};

const Page = () => {
  return <Cars />;
};

export default Page;