import Login from "./Login/Login";

export const metadata = {
  title: "تسجيل الدخول | Exclusive Travel",
  description:
    "سجل دخولك إلى منصة Exclusive Travel لحجز الفنادق والطيران والسيارات بسهولة وأمان.",
  keywords: [
    "تسجيل دخول",
    "حجز فنادق",
    "حجز طيران",
    "Travel Login",
  ],

  openGraph: {
    title: "تسجيل الدخول | Exclusive Travel",
    description:
      "ادخل حسابك وابدأ حجز رحلاتك وفنادقك بسهولة.",
    type: "website",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Login Page",
      },
    ],
  },

  robots: {
    index: false, // ❌ مهم جدًا: login page مايتأرشفش
    follow: false,
  },
};

export default function Home() {
  return <Login />;
}