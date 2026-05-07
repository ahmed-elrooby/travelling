import React from "react";
import Cars from "../components/Cars/Cars";

export const metadata = {
  title: "تأجير السيارات | احجز سيارة بأفضل الأسعار",
  description:
    "احجز سيارات للإيجار بسهولة في أي مدينة مع أفضل الأسعار وخيارات متعددة من السيارات الاقتصادية والفاخرة.",
  keywords: [
    "تأجير سيارات",
    "حجز سيارات",
    "Rent a car",
    "car rental",
    "سيارات للإيجار",
  ],

  openGraph: {
    title: "تأجير السيارات",
    description:
      "أفضل خدمة لتأجير السيارات بأسعار مناسبة وخيارات متنوعة تناسب كل الرحلات.",
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
    index: true,
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