import React from "react";
import Cars from "../components/Cars/Cars";

export const metadata = {
  title: "تأجير سيارات | احجز سيارة بأفضل الأسعار",
  description:
    "احجز سيارة للإيجار بسهولة وبأفضل الأسعار مع خيارات متعددة من السيارات الاقتصادية والفاخرة في جميع المدن.",
  keywords: [
    "تأجير سيارات",
    "حجز سيارات",
    "car rental",
    "rent a car",
    "سيارات للإيجار",
    "تأجير سيارات رخيصة",
  ],

  openGraph: {
    title: "تأجير السيارات بأفضل الأسعار",
    description:
      "استأجر سيارة بسهولة مع أفضل العروض والسيارات المتنوعة لجميع الاحتياجات.",
    type: "website",
    images: [
      {
        url: "/seo-cars.png",
        width: 1200,
        height: 630,
        alt: "Car Rental",
      },
    ],
  },

  robots: {
    index: true,   // ✔️ مهم جدًا (صفحة public)
    follow: true,
  },

  alternates: {
    canonical: "/cars",
  },
};

const Page = () => {
  return <Cars />;
};

export default Page;